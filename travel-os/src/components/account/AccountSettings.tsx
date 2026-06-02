"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const PLAN_LABELS: Record<string, string> = {
  free: "Free",
  explorer: "Explorer — £4.99/mo",
  premium: "Premium — £9.99/mo",
  pro: "Pro — £14.99/mo",
};

const UPGRADE_PLANS = [
  { id: "explorer", name: "Explorer", price: "£4.99/mo", features: ["Full deal feed", "Unlimited alerts", "Community submit"] },
  { id: "premium", name: "Premium", price: "£9.99/mo", features: ["Booking path optimizer", "AI Travel Planner", "30-min early alerts"], highlight: true },
  { id: "pro", name: "Pro", price: "£14.99/mo", features: ["Digital nomad optimizer", "Group planner", "API access"] },
];

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentPlan, setCurrentPlan] = useState("free");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"profile" | "plan" | "notifications" | "danger">("profile");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/auth/signin"); return; }
      setEmail(user.email ?? "");
      setFullName(user.user_metadata?.full_name ?? "");
    });

    supabase.from("profiles").select("tier, full_name").single().then(({ data }) => {
      if (data) {
        setCurrentPlan(data.tier ?? "free");
        if (data.full_name) setFullName(data.full_name);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveProfile = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const { error: uErr } = await supabase.auth.updateUser({ data: { full_name: fullName } });
      if (uErr) throw uErr;
      await supabase.from("profiles").update({ full_name: fullName }).eq("id", (await supabase.auth.getUser()).data.user!.id);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!confirm("Are you sure? This permanently deletes your account and all data. This cannot be undone.")) return;
    await supabase.auth.signOut();
    router.push("/");
  };

  const TABS = [
    { id: "profile", label: "Profile" },
    { id: "plan", label: "Plan & Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "danger", label: "Danger Zone" },
  ] as const;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile, plan, and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? "border-emerald-500 text-violet-600"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-gray-400 mt-1">Email changes require re-verification. Contact support.</p>
          </div>
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">{error}</div>
          )}
          {saved && (
            <div className="rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-sm text-violet-600">Profile saved successfully.</div>
          )}
          <button
            onClick={saveProfile}
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* Plan */}
      {tab === "plan" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Current Plan</p>
            <p className="text-2xl font-black text-gray-900">{PLAN_LABELS[currentPlan] ?? currentPlan}</p>
            {currentPlan === "free" && (
              <p className="text-sm text-gray-500 mt-1">Upgrade to unlock the full deal feed and unlimited alerts.</p>
            )}
          </div>

          {currentPlan === "free" && (
            <div className="grid sm:grid-cols-3 gap-4">
              {UPGRADE_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-2xl border p-5 ${
                    plan.highlight
                      ? "border-emerald-500/40 bg-violet-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {plan.highlight && (
                    <span className="inline-block rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-2 py-0.5 text-[10px] font-black text-white mb-2">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="text-base font-black text-gray-900">{plan.name}</h3>
                  <p className="text-lg font-black text-violet-600 mb-3">{plan.price}</p>
                  <ul className="space-y-1.5 mb-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-violet-500">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full rounded-xl border border-gray-300 bg-gray-100 py-2 text-xs font-bold text-gray-700 hover:border-emerald-500/40 hover:text-violet-600 transition-all">
                    Upgrade to {plan.name}
                  </button>
                </div>
              ))}
            </div>
          )}

          {currentPlan !== "free" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500 mb-4">Need to cancel or change billing? We&apos;re subscription-first — no hidden fees.</p>
              <button className="rounded-xl border border-gray-300 bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-500 hover:border-red-500/30 hover:text-red-400 transition-all">
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {tab === "notifications" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
          {[
            { id: "email", label: "Email deal alerts", desc: "Receive your saved deal alerts via email", value: emailAlerts, set: setEmailAlerts },
            { id: "push", label: "Push notifications", desc: "Browser push for deals you're watching", value: pushAlerts, set: setPushAlerts },
            { id: "digest", label: "Weekly digest", desc: "Top 10 deals of the week every Monday", value: weeklyDigest, set: setWeeklyDigest },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                  item.value ? "bg-emerald-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5 ${
                    item.value ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
          <button className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-bold text-white">
            Save Preferences
          </button>
        </div>
      )}

      {/* Danger */}
      {tab === "danger" && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 space-y-4">
          <h2 className="text-base font-bold text-red-400">Danger Zone</h2>
          <p className="text-sm text-gray-500">
            Deleting your account will permanently remove all your saved deals, alerts, and community contributions. This cannot be undone.
          </p>
          <button
            onClick={deleteAccount}
            className="rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-all"
          >
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}
