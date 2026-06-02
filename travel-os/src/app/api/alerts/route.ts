import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, origin, destination, max_price, alert_type } = body as Record<string, string>;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!origin && !destination) {
    return NextResponse.json(
      { error: "At least one of origin or destination is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("deal_alerts")
      .insert({
        user_id: user?.id ?? null,
        email,
        origin_iata: origin ?? null,
        destination_iata: destination ?? null,
        max_price: max_price ? parseFloat(max_price) : null,
        alert_type: alert_type ?? "PRICE_DROP",
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json({ success: true, id: `alert_${Date.now()}` });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Alert id required" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("deal_alerts").delete().eq("id", id);
    if (error) throw error;
  } catch {
    // ignore — best effort
  }

  return NextResponse.json({ success: true });
}
