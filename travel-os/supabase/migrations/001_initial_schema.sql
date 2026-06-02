-- ============================================================
-- Travel OS — Initial Schema
-- Run against your Supabase project via:
--   supabase db push  OR  Supabase SQL editor
-- ============================================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";   -- fast text search

-- ============================================================
-- ENUMS
-- ============================================================
create type deal_status as enum ('LIVE', 'COOLING', 'EXPIRED', 'UNVERIFIED', 'REJECTED');
create type deal_type   as enum ('flight', 'hotel', 'train', 'package', 'voucher', 'cashback', 'ferry', 'bus');
create type sub_type    as enum ('deal', 'hack', 'voucher', 'scam', 'price');
create type user_tier   as enum ('free', 'explorer', 'premium', 'pro');
create type contrib_tier as enum ('newcomer', 'verified_traveler', 'deal_hunter', 'travel_expert', 'insider');
create type alert_type  as enum ('route', 'destination', 'price_drop', 'deal_type');

-- ============================================================
-- PROFILES  (extends Supabase auth.users)
-- ============================================================
create table profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  display_name      text,
  avatar_url        text,
  home_airports     text[]    default '{}',
  travel_styles     text[]    default '{}',
  currency          char(3)   default 'GBP',
  timezone          text      default 'Europe/London',
  subscription_tier user_tier default 'free',
  sub_expires_at    timestamptz,
  reputation_points integer   default 0,
  contributor_tier  contrib_tier default 'newcomer',
  fraud_risk_score  numeric(4,3) default 0.000 check (fraud_risk_score between 0 and 1),
  total_saved_pence integer   default 0,
  country_code      char(2),
  bio               text,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can read own profile"   on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Public profiles are viewable" on profiles for select using (true);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- DEALS
-- ============================================================
create table deals (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text unique not null,
  title               text not null,
  description         text not null,
  deal_type           deal_type not null,
  status              deal_status default 'UNVERIFIED',

  -- Geography
  origin_codes        text[]  default '{}',
  destination_codes   text[]  default '{}',
  destinations        text[]  default '{}',

  -- Pricing
  price_from          numeric(10,2) not null,
  currency            char(3) not null default 'GBP',
  original_price      numeric(10,2),
  savings_percent     numeric(5,2),

  -- Conditions & metadata
  conditions          text[]  default '{}',
  cashback_available  text,
  booking_url         text,
  affiliate_url       text,
  badge               text,
  expires_in          text,
  valid_from          timestamptz,
  valid_until         timestamptz,

  -- Trust signals
  confidence_score    numeric(4,3) default 0.5 check (confidence_score between 0 and 1),
  verified_count      integer default 0,
  rejection_count     integer default 0,
  last_verified_at    timestamptz,
  view_count          integer default 0,
  save_count          integer default 0,
  click_count         integer default 0,

  -- Source
  contributor_id      uuid references profiles(id) on delete set null,
  contributor_name    text,
  source_type         text default 'community',
  source_url          text,

  -- Revenue
  affiliate_network   text,
  commission_rate     numeric(5,4),

  created_at          timestamptz default now(),
  updated_at          timestamptz default now(),
  expired_at          timestamptz
);

alter table deals enable row level security;
create policy "Deals are publicly readable"    on deals for select using (true);
create policy "Auth users can insert deals"    on deals for insert with check (auth.uid() is not null);
create policy "Contributors can update own"    on deals for update using (auth.uid() = contributor_id);

create index idx_deals_status       on deals(status, last_verified_at desc);
create index idx_deals_type         on deals(deal_type, status);
create index idx_deals_destinations on deals using gin(destination_codes);
create index idx_deals_origins      on deals using gin(origin_codes);
create index idx_deals_valid        on deals(valid_until) where status = 'LIVE';
create index idx_deals_search       on deals using gin(to_tsvector('english', title || ' ' || description));

-- ============================================================
-- DEAL VERIFICATIONS
-- ============================================================
create table deal_verifications (
  id            uuid primary key default uuid_generate_v4(),
  deal_id       uuid not null references deals(id) on delete cascade,
  verifier_id   uuid references profiles(id) on delete set null,
  verifier_type text not null default 'user',  -- user | ai_agent | editorial
  result        text not null,                 -- confirmed | rejected | expired | modified
  price_found   numeric(10,2),
  currency      char(3),
  notes         text,
  evidence_url  text,
  verified_at   timestamptz default now()
);

alter table deal_verifications enable row level security;
create policy "Verifications are public"    on deal_verifications for select using (true);
create policy "Auth users can verify deals" on deal_verifications for insert with check (auth.uid() is not null);

create index idx_verif_deal on deal_verifications(deal_id, verified_at desc);

-- Auto-update deal confidence after each verification
create or replace function update_deal_confidence()
returns trigger language plpgsql as $$
declare
  total_v  integer;
  confirmed_v integer;
  new_score numeric(4,3);
begin
  select count(*), count(*) filter (where result = 'confirmed')
  into total_v, confirmed_v
  from deal_verifications
  where deal_id = new.deal_id;

  if total_v > 0 then
    new_score := least(0.99, 0.3 + (confirmed_v::numeric / total_v) * 0.7);
    update deals
    set confidence_score  = new_score,
        verified_count    = total_v,
        last_verified_at  = now(),
        status = case
          when new_score >= 0.7 then 'LIVE'::deal_status
          when new_score >= 0.4 then 'UNVERIFIED'::deal_status
          else 'REJECTED'::deal_status
        end
    where id = new.deal_id;
  end if;
  return new;
end;
$$;
create trigger trg_update_confidence
  after insert on deal_verifications
  for each row execute function update_deal_confidence();

-- ============================================================
-- DEAL SAVES
-- ============================================================
create table deal_saves (
  user_id   uuid not null references profiles(id) on delete cascade,
  deal_id   uuid not null references deals(id) on delete cascade,
  saved_at  timestamptz default now(),
  primary key (user_id, deal_id)
);
alter table deal_saves enable row level security;
create policy "Users manage own saves" on deal_saves
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Increment save_count on deals
create or replace function inc_deal_save()
returns trigger language plpgsql as $$
begin
  update deals set save_count = save_count + 1 where id = new.deal_id;
  return new;
end;
$$;
create trigger trg_inc_save after insert on deal_saves
  for each row execute function inc_deal_save();

create or replace function dec_deal_save()
returns trigger language plpgsql as $$
begin
  update deals set save_count = greatest(0, save_count - 1) where id = old.deal_id;
  return old;
end;
$$;
create trigger trg_dec_save after delete on deal_saves
  for each row execute function dec_deal_save();

-- ============================================================
-- DEAL ALERTS
-- ============================================================
create table deal_alerts (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid not null references profiles(id) on delete cascade,
  alert_type        alert_type default 'route',
  origin_codes      text[] default '{}',
  destination_codes text[] default '{}',
  deal_types        text[] default '{}',
  max_price         numeric(10,2),
  currency          char(3) default 'GBP',
  email_override    text,
  is_active         boolean default true,
  last_triggered_at timestamptz,
  trigger_count     integer default 0,
  created_at        timestamptz default now()
);
alter table deal_alerts enable row level security;
create policy "Users manage own alerts" on deal_alerts
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create index idx_alerts_user   on deal_alerts(user_id) where is_active = true;
create index idx_alerts_active on deal_alerts(is_active, deal_types);

-- ============================================================
-- PRICE HISTORY  (TimescaleDB not available in Supabase free,
--   so we use a regular table with a time index)
-- ============================================================
create table price_history (
  id              uuid primary key default uuid_generate_v4(),
  origin          text not null,
  destination     text not null,
  route_key       text generated always as (origin || '→' || destination) stored,
  route_type      text default 'flight',
  price_amount    numeric(10,2) not null,
  currency        char(3) not null default 'GBP',
  price_usd       numeric(10,2),
  cabin_class     char(1) default 'Y',
  is_direct       boolean default false,
  source          text not null default 'community',
  contributor_id  uuid references profiles(id) on delete set null,
  travel_date     date,
  booking_date    date default current_date,
  snapshot_at     timestamptz default now()
);
alter table price_history enable row level security;
create policy "Price history is public"       on price_history for select using (true);
create policy "Auth users can add prices"     on price_history for insert with check (auth.uid() is not null);

create index idx_ph_route   on price_history(origin, destination, snapshot_at desc);
create index idx_ph_time    on price_history(snapshot_at desc);
create index idx_ph_key     on price_history(route_key, snapshot_at desc);

-- ============================================================
-- COMMUNITY SUBMISSIONS
-- ============================================================
create table submissions (
  id              uuid primary key default uuid_generate_v4(),
  contributor_id  uuid references profiles(id) on delete set null,
  sub_type        sub_type not null,
  title           text not null,
  description     text,
  url             text,
  origin          text,
  destination     text,
  price           numeric(10,2),
  currency        char(3) default 'GBP',
  code            text,
  location        text,
  category        text,
  status          text default 'pending',   -- pending | approved | rejected
  reviewer_notes  text,
  points_awarded  integer default 0,
  ip_hash         text,                      -- hashed for fraud detection
  created_at      timestamptz default now(),
  reviewed_at     timestamptz
);
alter table submissions enable row level security;
create policy "Auth users can submit"          on submissions for insert with check (auth.uid() is not null);
create policy "Users can view own submissions" on submissions for select using (auth.uid() = contributor_id);
create policy "Editors can view all"           on submissions for select using (
  exists (select 1 from profiles where id = auth.uid() and contributor_tier in ('travel_expert', 'insider'))
);

-- ============================================================
-- LOYALTY PROGRAMS + USER ACCOUNTS
-- ============================================================
create table loyalty_programs (
  id              uuid primary key default uuid_generate_v4(),
  program_code    text unique not null,
  program_name    text not null,
  program_type    text not null,  -- airline | hotel | credit_card
  operator_name   text,
  point_value_usd numeric(8,6),
  is_transferable boolean default false,
  transfer_to     text[] default '{}',
  expiry_months   integer,
  activity_based  boolean default false,
  logo_url        text,
  website_url     text,
  is_active       boolean default true,
  updated_at      timestamptz default now()
);

create table user_loyalty_accounts (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  program_id      uuid not null references loyalty_programs(id),
  membership_no   text,
  display_name    text,
  points_balance  bigint default 0,
  tier_status     text,
  tier_expires    date,
  last_synced_at  timestamptz,
  sync_method     text default 'manual',
  is_active       boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique (user_id, program_id)
);
alter table user_loyalty_accounts enable row level security;
create policy "Users manage own loyalty" on user_loyalty_accounts
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ============================================================
-- REPUTATION EVENTS
-- ============================================================
create table reputation_events (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references profiles(id) on delete cascade,
  event_type      text not null,
  points          integer not null,
  ref_type        text,    -- deal | submission | verification | vote
  ref_id          uuid,
  description     text,
  created_at      timestamptz default now()
);
alter table reputation_events enable row level security;
create policy "Users view own reputation" on reputation_events for select using (auth.uid() = user_id);

-- Auto-update profile reputation total
create or replace function update_reputation_total()
returns trigger language plpgsql as $$
begin
  update profiles
  set reputation_points = reputation_points + new.points,
      contributor_tier = case
        when reputation_points + new.points >= 10000 then 'insider'::contrib_tier
        when reputation_points + new.points >= 2000  then 'travel_expert'::contrib_tier
        when reputation_points + new.points >= 500   then 'deal_hunter'::contrib_tier
        when reputation_points + new.points >= 100   then 'verified_traveler'::contrib_tier
        else 'newcomer'::contrib_tier
      end
  where id = new.user_id;
  return new;
end;
$$;
create trigger trg_reputation
  after insert on reputation_events
  for each row execute function update_reputation_total();

-- ============================================================
-- CASHBACK RATES
-- ============================================================
create table cashback_rates (
  id              uuid primary key default uuid_generate_v4(),
  merchant        text not null,
  category        text not null,
  platform        text not null,  -- quidco | topcashback | rakuten
  rate_text       text not null,
  rate_min        numeric(5,2),
  rate_max        numeric(5,2),
  is_verified     boolean default false,
  last_checked_at timestamptz default now(),
  link            text,
  notes           text,
  created_at      timestamptz default now(),
  unique (merchant, platform)
);
alter table cashback_rates enable row level security;
create policy "Cashback rates are public" on cashback_rates for select using (true);

-- ============================================================
-- VOUCHER CODES
-- ============================================================
create table voucher_codes (
  id              uuid primary key default uuid_generate_v4(),
  merchant        text not null,
  code            text not null,
  discount_text   text not null,
  discount_type   text default 'percentage',  -- percentage | fixed | free
  discount_value  numeric(8,2),
  min_spend       numeric(8,2),
  conditions      text,
  valid_until     timestamptz,
  is_verified     boolean default false,
  verified_count  integer default 0,
  failed_count    integer default 0,
  contributor_id  uuid references profiles(id) on delete set null,
  last_tested_at  timestamptz,
  created_at      timestamptz default now()
);
alter table voucher_codes enable row level security;
create policy "Vouchers are public" on voucher_codes for select using (true);
create policy "Auth users can add codes" on voucher_codes for insert with check (auth.uid() is not null);

-- ============================================================
-- SCAM REPORTS
-- ============================================================
create table scam_reports (
  id              uuid primary key default uuid_generate_v4(),
  contributor_id  uuid references profiles(id) on delete set null,
  country_code    char(2) not null,
  city_name       text,
  area_name       text,
  latitude        numeric(9,6),
  longitude       numeric(9,6),
  scam_type       text not null,   -- taxi | street | restaurant | ticket | digital | accommodation
  severity        smallint not null check (severity between 1 and 5),
  title           text not null,
  description     text not null,
  avoidance       text not null,
  report_count    integer default 1,
  is_active       boolean default true,
  confidence_score numeric(4,3) default 0.5,
  last_reported_at timestamptz default now(),
  created_at      timestamptz default now()
);
alter table scam_reports enable row level security;
create policy "Scam reports are public" on scam_reports for select using (true);
create policy "Auth users can report scams" on scam_reports for insert with check (auth.uid() is not null);

create index idx_scams_country on scam_reports(country_code) where is_active = true;

-- ============================================================
-- SEED: Common loyalty programs
-- ============================================================
insert into loyalty_programs (program_code, program_name, program_type, operator_name, point_value_usd, is_transferable, transfer_to) values
('BAEC',   'British Airways Executive Club', 'airline', 'British Airways', 0.013, false, '{}'),
('FB',     'Flying Blue',                   'airline', 'Air France KLM',  0.009, false, '{}'),
('MILES',  'United MileagePlus',            'airline', 'United Airlines',  0.012, false, '{}'),
('BONVOY', 'Marriott Bonvoy',              'hotel',   'Marriott',         0.007, true,  '{"FB"}'),
('HONORS', 'Hilton Honors',               'hotel',   'Hilton',           0.005, false, '{}'),
('AMEX',   'American Express Membership Rewards', 'credit_card', 'Amex', 0.02, true, '{"BAEC","FB","BONVOY"}'),
('CHASE',  'Chase Ultimate Rewards',       'credit_card', 'Chase',        0.02, true, '{"MILES","BONVOY","HONORS"}');

-- ============================================================
-- HELPER VIEWS
-- ============================================================

-- Live deals with contributor info
create view live_deals as
  select d.*, p.display_name as contributor_display_name, p.contributor_tier
  from deals d
  left join profiles p on p.id = d.contributor_id
  where d.status = 'LIVE';

-- Route price summary (for booking timing intelligence)
create view route_price_summary as
  select
    origin,
    destination,
    route_key,
    count(*) as sample_count,
    min(price_amount) as price_min,
    max(price_amount) as price_max,
    avg(price_amount) as price_avg,
    percentile_cont(0.25) within group (order by price_amount) as price_p25,
    percentile_cont(0.75) within group (order by price_amount) as price_p75,
    max(snapshot_at) as last_updated
  from price_history
  where snapshot_at > now() - interval '365 days'
  group by origin, destination, route_key;
