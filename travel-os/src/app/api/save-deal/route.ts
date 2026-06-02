import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { deal_id } = await request.json();
  if (!deal_id) return NextResponse.json({ error: "deal_id required" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { error } = await supabase
    .from("deal_saves")
    .upsert({ user_id: user.id, deal_id }, { onConflict: "user_id,deal_id" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, saved: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const deal_id = searchParams.get("deal_id");
  if (!deal_id) return NextResponse.json({ error: "deal_id required" }, { status: 400 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { error } = await supabase
    .from("deal_saves")
    .delete()
    .match({ user_id: user.id, deal_id });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, saved: false });
}
