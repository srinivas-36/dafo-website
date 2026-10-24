export const SCHOOL_EMAIL_ERROR =
  "Use a school email from a participating university.";

export function emailDomain(email: string) {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf("@");
  if (at < 0) return "";
  return trimmed.slice(at + 1);
}

export function domainLooksComplete(domain: string) {
  const dot = domain.lastIndexOf(".");
  return dot > 0 && domain.length - dot > 2 && !domain.endsWith(".");
}
