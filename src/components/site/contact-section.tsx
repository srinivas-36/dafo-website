"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type FieldName = "first_name" | "last_name" | "email" | "whats_on_your_mind";
type FieldErrors = Partial<Record<FieldName, string>>;

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  whats_on_your_mind: "",
};

const details: { label: string; value: string; href?: string }[] = [
  { label: "Email", value: "hello@dafotalk.com", href: "mailto:hello@dafotalk.com" },
  { label: "Press", value: "press@dafotalk.com", href: "mailto:press@dafotalk.com" },
  { label: "Hours", value: "We reply within 2 business days" },
];

const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-widest text-brand-ink/60 sm:text-xs";
const fieldClass =
  "w-full min-w-0 rounded-xl border border-brand-line bg-brand-mist/50 px-4 py-3 text-base text-brand-ink outline-none transition-colors placeholder:text-brand-ink/40 focus:border-brand-indigo";

export function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  function update(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setFormError("");
    setErrors({});

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, theme: "website" }),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const parsed = readErrors(data);
        setErrors(parsed.fields);
        setFormError(parsed.form || (Object.keys(parsed.fields).length ? "" : "We couldn't save that. Please try again."));
        return;
      }

      setDone(true);
    } catch {
      setFormError("We couldn't reach the waitlist just now. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-20 lg:px-8">
        <div className="min-w-0 lg:col-span-5">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-indigo">Contact</span>
          <h1
            className="mt-4 text-[2.65rem] leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-dm-serif-display), "DM Serif Display", Georgia, serif' }}
          >
            Let&apos;s <span className="hero-accent">talk.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-brand-ink/65 sm:mt-6 sm:text-lg">
            Join the waitlist, ask a question, or tell us about a transition you&apos;re navigating. A real person reads every
            message.
          </p>
          <div className="mt-8 space-y-3 text-sm sm:mt-10 sm:space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 sm:gap-4 sm:p-4"
              >
                <span className="w-14 shrink-0 text-[11px] uppercase tracking-widest text-brand-ink/50 sm:w-16">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="min-w-0 wrap-break-word text-brand-ink transition-colors hover:text-brand-indigo">
                    {item.value}
                  </a>
                ) : (
                  <span className="min-w-0 leading-snug text-brand-ink">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="rounded-3xl border border-brand-line bg-brand-card p-5 shadow-xl shadow-brand-indigo/5 sm:p-8 lg:p-10">
            {done ? (
              <div>
                <h2
                  className="text-4xl leading-[1.08] text-brand-ink"
                  style={{ fontFamily: 'var(--font-dm-serif-display), "DM Serif Display", Georgia, serif' }}
                >
                  You&apos;re on the list.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-brand-ink/65">
                  We&apos;ll email {form.email} when a conversation opens up.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="First name" id="firstName" error={errors.first_name}>
                    <input
                      id="firstName"
                      name="first_name"
                      required
                      autoComplete="given-name"
                      value={form.first_name}
                      aria-invalid={errors.first_name ? true : undefined}
                      aria-describedby={errors.first_name ? "firstName-error" : undefined}
                      className={fieldClass}
                      onChange={(event) => update("first_name", event.target.value)}
                    />
                  </Field>
                  <Field label="Last name" id="lastName" error={errors.last_name}>
                    <input
                      id="lastName"
                      name="last_name"
                      required
                      autoComplete="family-name"
                      value={form.last_name}
                      aria-invalid={errors.last_name ? true : undefined}
                      aria-describedby={errors.last_name ? "lastName-error" : undefined}
                      className={fieldClass}
                      onChange={(event) => update("last_name", event.target.value)}
                    />
                  </Field>
                </div>

                <Field label="Email" id="email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass}
                    onChange={(event) => update("email", event.target.value)}
                  />
                </Field>

                <Field label="What's on your mind? (optional)" id="message" error={errors.whats_on_your_mind}>
                  <textarea
                    id="message"
                    name="whats_on_your_mind"
                    rows={4}
                    value={form.whats_on_your_mind}
                    aria-invalid={errors.whats_on_your_mind ? true : undefined}
                    aria-describedby={errors.whats_on_your_mind ? "message-error" : undefined}
                    placeholder="A transition you're navigating, a question, or just a hello."
                    className={`${fieldClass} resize-none`}
                    onChange={(event) => update("whats_on_your_mind", event.target.value)}
                  />
                </Field>

                {formError ? (
                  <p className="text-sm text-red-700 dark:text-red-300" role="alert">
                    {formError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex w-full items-center justify-center rounded-full px-7 py-4 font-medium text-white shadow-lg shadow-brand-indigo/25 transition-shadow hover:shadow-brand-indigo/40 disabled:opacity-60"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {pending ? "Joining…" : "Join the Waitlist"}
                </button>
                <p className="text-center text-xs text-brand-ink/50">
                  We&apos;ll never share your email. Unsubscribe in one click.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function readErrors(data: unknown): { form?: string; fields: FieldErrors } {
  if (!data || typeof data !== "object") return { fields: {} };
  const record = data as Record<string, unknown>;
  if (typeof record.detail === "string") return { form: record.detail, fields: {} };

  const fields: FieldErrors = {};
  for (const key of ["first_name", "last_name", "email", "whats_on_your_mind"] as const) {
    const value = record[key];
    if (Array.isArray(value) && typeof value[0] === "string") fields[key] = value[0];
    else if (typeof value === "string") fields[key] = value;
  }

  const nonField = record.non_field_errors;
  const form = Array.isArray(nonField) && typeof nonField[0] === "string" ? nonField[0] : undefined;
  return { form, fields };
}
