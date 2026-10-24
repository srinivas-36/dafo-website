import { NextResponse } from "next/server";

const API_BASE = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ detail: "Send a JSON body." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${API_BASE}/api/v1/early-access/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const data = await upstream.json().catch(() => ({
      detail: "Something went wrong. Try again in a moment.",
    }));
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    return NextResponse.json(
      { detail: "We couldn't reach the waitlist just now. Please try again." },
      { status: 502 },
    );
  }
}
