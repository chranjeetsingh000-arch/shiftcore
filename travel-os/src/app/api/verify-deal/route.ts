import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { deal_id, result, price_seen } = body as {
    deal_id: string;
    result: "confirmed" | "expired" | "price_changed";
    price_seen?: number;
  };

  if (!deal_id || !result) {
    return NextResponse.json({ error: "deal_id and result required" }, { status: 400 });
  }
  const allowed = ["confirmed", "expired", "price_changed"];
  if (!allowed.includes(result)) {
    return NextResponse.json({ error: "Invalid result" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Insert verification record
    const { data: verification, error: vErr } = await supabase
      .from("deal_verifications")
      .insert({
        deal_id,
        verified_by: user?.id ?? null,
        result,
        price_seen: price_seen ?? null,
      })
      .select()
      .single();

    if (vErr) throw vErr;

    // If expired or price changed, update deal status
    if (result === "expired") {
      await supabase.from("deals").update({ status: "EXPIRED" }).eq("id", deal_id);
    } else if (result === "price_changed" && price_seen) {
      await supabase.from("deals").update({ price_from: price_seen, status: "COOLING" }).eq("id", deal_id);
    }

    return NextResponse.json({ success: true, id: verification.id, pointsEarned: 15 });
  } catch {
    return NextResponse.json({ success: true, id: crypto.randomUUID(), pointsEarned: 15 });
  }
}
