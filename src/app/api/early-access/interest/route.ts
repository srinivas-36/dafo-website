import { after } from "next/server";
import { NextResponse } from "next/server";
import {
  SCHOOL_EMAIL_ERROR,
  emailDomain,
  forwardInterest,
  isSchoolAudience,
  loadSchoolDomains,
  readInterest,
} from "@/lib/early-access-api";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ detail: "Send a JSON body." }, { status: 400 });
  }

  const interest = readInterest(payload);
  if (!interest) {
    return NextResponse.json(
      { detail: "Send an audience and a valid email." },
      { status: 400 },
    );
  }

  if (isSchoolAudience(interest.audience)) {
    const domains = await loadSchoolDomains();
    if (!domains) {
      return relay(interest);
    }
    if (!domains.has(emailDomain(interest.email))) {
      return NextResponse.json({ email: SCHOOL_EMAIL_ERROR }, { status: 400 });
    }
  }

  after(async () => {
    try {
      const upstream = await forwardInterest(interest);
      if (!upstream.ok) {
        console.error(
          "Early access interest worker was not accepted",
          upstream.status,
        );
      }
    } catch (error) {
      console.error("Early access interest worker could not reach the API", error);
    }
  });

  return NextResponse.json({ accepted: true }, { status: 202 });
}

async function relay(interest: { audience: string; email: string }) {
  try {
    const upstream = await forwardInterest(interest);
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
