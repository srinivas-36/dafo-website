"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type FieldName = "first_name" | "last_name" | "email" | "whats_on_your_mind";
type FieldErrors = Partial<Record<FieldName | "update_preferences", string>>;

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  whats_on_your_mind: "",
};

const details: { label: string; value: string; href?: string }[] = [
  {
    label: "Email",
    value: "hello@dafotalk.com",
    href: "mailto:hello@dafotalk.com",
  },
  // { label: "Press", value: "press@dafotalk.com", href: "mailto:press@dafotalk.com" },
  { label: "Response", value: "We aim to reply within 2 business days." },
];

const labelClass =
  "mb-2 block text-[11px] font-medium uppercase tracking-widest text-brand-ink/60 sm:text-xs";
const fieldClass =
  "w-full min-w-0 rounded-xl border border-brand-line bg-brand-mist/50 px-4 py-3 text-base text-brand-ink outline-none transition-colors placeholder:text-brand-ink/40 focus:border-brand-indigo";

export function ContactSection() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [updates, setUpdates] = useState(false);

  function update(name: FieldName, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setFormError("");
    setErrors({});

    try {
      const response = await fetch("/api/early-access/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          message: form.whats_on_your_mind,
          update_preferences: updates,
        }),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const parsed = readErrors(data);
        setErrors(parsed.fields);
        setFormError(
          parsed.form ||
            (Object.keys(parsed.fields).length
              ? ""
              : "We couldn't save that. Please try again."),
        );
        return;
      }

      setDone(true);
    } catch {
      setFormError(
        "We couldn't reach the waitlist just now. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="py-14 sm:py-20 lg:py-28">
      <div className="mx-auto grid w-full min-w-0 max-w-6xl gap-10 px-5 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:items-start lg:gap-20 lg:px-8">
        <div className="min-w-0 lg:col-span-5">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand-indigo">
            Contact
          </span>
          <h1
            className="mt-4 text-[2.65rem] leading-[1.05] tracking-tight text-brand-ink sm:text-5xl lg:text-6xl"
            style={{
              fontFamily:
                'var(--font-dm-serif-display), "DM Serif Display", Georgia, serif',
            }}
          >
            Let&apos;s <span className="hero-accent">talk.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-brand-ink/65 sm:mt-6 sm:text-lg">
            Joining the waitlist, have a question, or interested in working with
            us? Send us a message. We&apos;d love to hear from you.
          </p>
          <div className="mt-8 space-y-3 text-sm sm:mt-10 sm:space-y-4">
            {details.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 items-center gap-3 rounded-2xl border border-brand-line bg-brand-mist/40 p-3.5 sm:gap-4 sm:p-4"
              >
                <span className="w-[5.5rem] shrink-0 text-[11px] uppercase tracking-widest text-brand-ink/50">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="min-w-0 wrap-break-word text-brand-ink transition-colors hover:text-brand-indigo"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="min-w-0 leading-snug text-brand-ink">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div className="rounded-3xl border border-brand-line bg-brand-card p-5 shadow-xl shadow-brand-indigo/5 sm:p-8 lg:p-10">
            {done ? (
              <div className="flex flex-col items-center justify-center px-4 py-6 text-center sm:py-8">
                <CheckIcon />
                <h2
                  className="mt-5 text-[1.85rem] leading-[1.15] text-brand-ink sm:text-[2.15rem]"
                  style={{
                    fontFamily:
                      'var(--font-dm-serif-display), "DM Serif Display", Georgia, serif',
                  }}
                >
                  Thanks for your message.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-ink/55 sm:text-[15px]">
                  We aim to reply within 2 business days.
                </p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="First name"
                    id="firstName"
                    error={errors.first_name}
                  >
                    <input
                      id="firstName"
                      name="first_name"
                      required
                      autoComplete="given-name"
                      value={form.first_name}
                      aria-invalid={errors.first_name ? true : undefined}
                      aria-describedby={
                        errors.first_name ? "firstName-error" : undefined
                      }
                      className={fieldClass}
                      onChange={(event) =>
                        update("first_name", event.target.value)
                      }
                    />
                  </Field>
                  <Field
                    label="Last name"
                    id="lastName"
                    error={errors.last_name}
                  >
                    <input
                      id="lastName"
                      name="last_name"
                      // required
                      autoComplete="family-name"
                      value={form.last_name}
                      aria-invalid={errors.last_name ? true : undefined}
                      aria-describedby={
                        errors.last_name ? "lastName-error" : undefined
                      }
                      className={fieldClass}
                      onChange={(event) =>
                        update("last_name", event.target.value)
                      }
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

                <Field
                  label="What's on your mind? (optional)"
                  id="message"
                  error={errors.whats_on_your_mind}
                >
                  <textarea
                    id="message"
                    name="whats_on_your_mind"
                    rows={4}
                    value={form.whats_on_your_mind}
                    aria-invalid={errors.whats_on_your_mind ? true : undefined}
                    aria-describedby={
                      errors.whats_on_your_mind ? "message-error" : undefined
                    }
                    placeholder="Tell us what's on your mind"
                    className={`${fieldClass} resize-none`}
                    onChange={(event) =>
                      update("whats_on_your_mind", event.target.value)
                    }
                  />
                </Field>
                <Checkbox
                  label="I'd like to receive product updates, launch news, and occasional promotional emails from DafoTalk. I can unsubscribe anytime."
                  id="update_preferences"
                  error={errors.update_preferences}
                >
                  <input
                    id="update_preferences"
                    name="update_preferences"
                    type="checkbox"
                    value="true"
                    checked={updates}
                    onChange={(event) => setUpdates(event.target.checked)}
                    aria-invalid={errors.update_preferences ? true : undefined}
                    aria-describedby={
                      errors.update_preferences
                        ? "update_preferences-error"
                        : undefined
                    }
                    className="mt-1 size-4 shrink-0 accent-brand-indigo"
                  />
                </Checkbox>

                {formError ? (
                  <p
                    className="text-sm text-red-700 dark:text-red-300"
                    role="alert"
                  >
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
                  We&apos;ll never share your email.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="relative grid size-28 place-items-center" aria-hidden>
      <span className="absolute size-[4.6rem] rounded-full bg-[#7b5cff]/20" />
      <span
        className="relative grid size-20 place-items-center rounded-full text-white shadow-[0_0_0_12px_rgba(123,92,255,0.16)]"
        style={{
          background:
            "linear-gradient(180deg, #b49bff 0%, #8b6cff 48%, #6d4dff 100%)",
        }}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
          <path
            d="M5.1 12.6 9.6 17.2 19 7.4"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <svg
        viewBox="0 0 12 12"
        className="absolute top-2 right-3 size-2.5 text-[#d9ccff]"
      >
        <path
          d="M6 .4 7.05 4.95 11.6 6 7.05 7.05 6 11.6 4.95 7.05.4 6 4.95 4.95Z"
          fill="currentColor"
        />
      </svg>
      <span className="absolute bottom-4 left-2 size-1.5 rounded-full bg-[#efeaff]/80" />
      <svg
        viewBox="0 0 12 12"
        className="absolute right-1 bottom-3 size-2 text-[#c4b2ff]"
      >
        <path
          d="M6 .8 6.9 5.1 11.2 6 6.9 6.9 6 11.2 5.1 6.9.8 6 5.1 5.1Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function Checkbox({
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
      <div className="flex items-start gap-3">
        {children}
        <label
          htmlFor={id}
          className="text-sm leading-relaxed text-brand-ink/70"
        >
          {label} <span className="text-brand-ink/45">(optional)</span>
        </label>
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
    </div>
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
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function readErrors(data: unknown): { form?: string; fields: FieldErrors } {
  if (!data || typeof data !== "object") return { fields: {} };
  const record = data as Record<string, unknown>;
  if (typeof record.detail === "string")
    return { form: record.detail, fields: {} };

  const fields: FieldErrors = {};
  for (const key of [
    "first_name",
    "last_name",
    "email",
    "whats_on_your_mind",
    "update_preferences",
  ] as const) {
    const value = record[key];
    if (Array.isArray(value) && typeof value[0] === "string")
      fields[key] = value[0];
    else if (typeof value === "string") fields[key] = value;
  }

  const message = record.message;
  if (!fields.whats_on_your_mind) {
    if (Array.isArray(message) && typeof message[0] === "string")
      fields.whats_on_your_mind = message[0];
    else if (typeof message === "string") fields.whats_on_your_mind = message;
  }

  const nonField = record.non_field_errors;
  const form =
    Array.isArray(nonField) && typeof nonField[0] === "string"
      ? nonField[0]
      : undefined;
  return { form, fields };
}
