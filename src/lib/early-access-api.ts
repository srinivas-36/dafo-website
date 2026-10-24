import { SCHOOL_EMAIL_ERROR, emailDomain } from "@/lib/school-email";

const API_BASE = (
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000"
).replace(/\/$/, "");

const SCHOOL_AUDIENCES = new Set(["indian-student", "other-student"]);
const AUDIENCES = new Set([
  "indian-student",
  "other-student",
  "us-resident",
  "other",
]);

const DOMAIN_TTL_MS = 60_000;

export { SCHOOL_EMAIL_ERROR, emailDomain };

type InterestPayload = {
  audience: string;
  email: string;
};

type DomainCache = {
  at: number;
  domains: Set<string>;
};

let domainCache: DomainCache | null = null;
let domainRequest: Promise<Set<string> | null> | null = null;

export function readInterest(payload: unknown): InterestPayload | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  if (typeof record.audience !== "string" || !AUDIENCES.has(record.audience)) {
    return null;
  }
  if (typeof record.email !== "string") return null;
  const email = record.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { audience: record.audience, email };
}

export function isSchoolAudience(audience: string) {
  return SCHOOL_AUDIENCES.has(audience);
}

function readDomainList(data: unknown): Set<string> | null {
  if (!data || typeof data !== "object") return null;
  const domains = (data as { domains?: unknown }).domains;
  if (!Array.isArray(domains)) return null;
  return new Set(
    domains
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function loadSchoolDomains(): Promise<Set<string> | null> {
  if (domainCache && Date.now() - domainCache.at < DOMAIN_TTL_MS) {
    return Promise.resolve(domainCache.domains);
  }
  if (!domainRequest) {
    domainRequest = fetch(`${API_BASE}/api/v1/early-access/school-domains/`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) return domainCache?.domains ?? null;
        const domains = readDomainList(await response.json().catch(() => null));
        if (!domains) return domainCache?.domains ?? null;
        domainCache = { at: Date.now(), domains };
        return domains;
      })
      .catch(() => domainCache?.domains ?? null)
      .finally(() => {
        domainRequest = null;
      });
  }
  return domainRequest;
}

export async function forwardInterest(payload: InterestPayload): Promise<Response> {
  return fetch(`${API_BASE}/api/v1/early-access/interest/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
}
