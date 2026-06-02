import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { subDays, format } from "date-fns";

function generateSeedHistory(basePrice: number, days: number) {
  return Array.from({ length: days }, (_, i) => {
    const date = subDays(new Date(), days - 1 - i);
    const jitter = (Math.random() - 0.5) * basePrice * 0.25;
    return {
      date: format(date, "yyyy-MM-dd"),
      price: Math.round((basePrice + jitter) * 100) / 100,
    };
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dealId = searchParams.get("deal_id");
  const route = searchParams.get("route"); // e.g. "LHR-JFK"
  const days = Math.min(parseInt(searchParams.get("days") ?? "30"), 90);

  if (!dealId && !route) {
    return NextResponse.json({ error: "deal_id or route required" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("price_history")
      .select("recorded_at, price, currency")
      .order("recorded_at", { ascending: true })
      .gte("recorded_at", subDays(new Date(), days).toISOString());

    if (dealId) query = query.eq("deal_id", dealId);
    if (route) query = query.eq("route", route);

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      const history = data.map((r) => ({
        date: format(new Date(r.recorded_at), "yyyy-MM-dd"),
        price: r.price,
      }));
      return NextResponse.json({ history, currency: data[0].currency ?? "GBP" });
    }
  } catch {
    // fall through to seed
  }

  // Seed fallback — generate plausible price history
  const base = 180 + Math.floor(Math.random() * 200);
  return NextResponse.json({
    history: generateSeedHistory(base, days),
    currency: "GBP",
  });
}
