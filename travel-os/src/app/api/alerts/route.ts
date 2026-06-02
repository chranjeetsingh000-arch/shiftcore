import { NextRequest, NextResponse } from "next/server";

interface AlertRequest {
  email: string;
  origin?: string;
  destination?: string;
  dealType?: string;
  maxPrice?: number;
  currency?: string;
}

export async function POST(request: NextRequest) {
  let body: AlertRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (!body.origin && !body.destination) {
    return NextResponse.json(
      { error: "At least one of origin or destination is required" },
      { status: 400 }
    );
  }

  // In production: save alert to database, trigger matching job
  const id = `alert_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return NextResponse.json({
    success: true,
    id,
    message: `Alert created. We'll email ${body.email} when matching deals are found.`,
    alert: {
      origin: body.origin,
      destination: body.destination,
      dealType: body.dealType ?? "any",
      maxPrice: body.maxPrice ?? null,
      currency: body.currency ?? "GBP",
    },
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Alert id is required" }, { status: 400 });
  }

  // In production: delete from database
  return NextResponse.json({ success: true, message: "Alert deleted" });
}
