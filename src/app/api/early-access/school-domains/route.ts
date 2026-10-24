import { NextResponse } from "next/server";
import { loadSchoolDomains } from "@/lib/early-access-api";

export async function GET() {
  const domains = await loadSchoolDomains();
  if (!domains) {
    return NextResponse.json(
      { detail: "We couldn't load university email domains just now." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { domains: [...domains].sort() },
    { headers: { "Cache-Control": "public, max-age=60" } },
  );
}
