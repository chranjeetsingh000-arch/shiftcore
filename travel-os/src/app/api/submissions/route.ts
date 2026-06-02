import { NextRequest, NextResponse } from "next/server";

interface Submission {
  type: "deal" | "hack" | "voucher" | "scam" | "price";
  title: string;
  description?: string;
  url?: string;
  origin?: string;
  destination?: string;
  price?: number;
  code?: string;
  location?: string;
}

export async function POST(request: NextRequest) {
  let body: Submission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.type || !body.title) {
    return NextResponse.json(
      { error: "type and title are required" },
      { status: 400 }
    );
  }

  const allowedTypes = ["deal", "hack", "voucher", "scam", "price"];
  if (!allowedTypes.includes(body.type)) {
    return NextResponse.json({ error: "Invalid submission type" }, { status: 400 });
  }

  // In production: validate, sanitize, save to database, trigger AI verification agent
  const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return NextResponse.json({
    success: true,
    id,
    status: "PENDING_REVIEW",
    message:
      "Your submission has been queued for AI verification and community review.",
    estimatedReviewTime: "15–30 minutes",
    pointsEarned: body.type === "deal" ? 50 : body.type === "scam" ? 30 : 20,
  });
}
