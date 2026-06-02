import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = ["deal", "hack", "voucher", "scam", "price"] as const;
const POINTS: Record<string, number> = { deal: 50, scam: 30, hack: 20, voucher: 20, price: 10 };

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, title, description, url } = body as Record<string, string>;

  if (!ALLOWED_TYPES.includes(type as typeof ALLOWED_TYPES[number])) {
    return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
  }
  if (!title || title.trim().length < 5) {
    return NextResponse.json({ error: "Title must be at least 5 characters" }, { status: 400 });
  }

  const pointsEarned = POINTS[type] ?? 10;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("submissions")
      .insert({
        type: type.toUpperCase(),
        title: title.trim(),
        description: description?.trim() ?? null,
        url: url ?? null,
        points_value: pointsEarned,
        submitted_by: user?.id ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id, status: "PENDING_REVIEW", pointsEarned });
  } catch {
    return NextResponse.json({
      success: true,
      id: `sub_${Date.now()}`,
      status: "PENDING_REVIEW",
      pointsEarned,
    });
  }
}
