import { NextRequest, NextResponse } from "next/server";
import { DEALS } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const origin = searchParams.get("origin");
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") ?? "50");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  let deals = [...DEALS];

  if (type && type !== "all") {
    deals = deals.filter((d) => d.dealType === type);
  }
  if (origin && origin !== "all") {
    deals = deals.filter(
      (d) => d.originCodes.length === 0 || d.originCodes.includes(origin)
    );
  }
  if (status && status !== "all") {
    deals = deals.filter((d) => d.status === status);
  }

  const paginated = deals.slice(offset, offset + limit);

  return NextResponse.json({
    deals: paginated,
    total: deals.length,
    limit,
    offset,
  });
}
