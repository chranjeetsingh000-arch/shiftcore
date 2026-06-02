import { createClient } from "@/lib/supabase/server";
import { DEALS } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const origin = searchParams.get("origin");
  const status = searchParams.get("status");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 100);
  const offset = parseInt(searchParams.get("offset") ?? "0");

  try {
    const supabase = await createClient();
    let query = supabase
      .from("deals")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (type && type !== "all") query = query.eq("type", type.toUpperCase());
    if (origin && origin !== "anywhere") query = query.eq("origin_iata", origin);
    if (status && status !== "all") query = query.eq("status", status.toUpperCase());

    const { data, count, error } = await query;
    if (!error && data && data.length > 0) {
      return NextResponse.json({ deals: data, total: count ?? 0, limit, offset });
    }
  } catch {
    // Supabase not configured — fall through to seed data
  }

  // Seed data fallback
  let deals = [...DEALS];
  if (type && type !== "all") deals = deals.filter((d) => d.dealType === type);
  if (origin && origin !== "anywhere") {
    deals = deals.filter((d) => d.originCodes.length === 0 || d.originCodes.includes(origin));
  }
  if (status && status !== "all") deals = deals.filter((d) => d.status === status);

  return NextResponse.json({
    deals: deals.slice(offset, offset + limit),
    total: deals.length,
    limit,
    offset,
  });
}
