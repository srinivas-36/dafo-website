"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { BrandMark } from "@/components/site/brand-mark";
import { cn } from "@/lib/cn";

type EarlyAccessVariant = "header" | "hero" | "footer" | "cta";

type EarlyAccessModalProps = {
  label: string;
  variant?: EarlyAccessVariant;
  className?: string;
};

const variantClass: Record<EarlyAccessVariant, string> = {
  header:
    "hidden sm:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium text-white shadow-lg shadow-brand-indigo/20 hover:shadow-brand-indigo/40 transition-shadow",
  hero: "inline-flex justify-center items-center px-7 py-4 rounded-full text-base font-medium text-white shadow-xl shadow-brand-indigo/25 hover:shadow-brand-indigo/40 hover:-translate-y-0.5 transition-all",
  footer: "px-5 py-3 rounded-full text-sm font-medium text-white",
  cta: "inline-flex items-center justify-center rounded-full bg-[var(--brand-indigo-solid)] px-8 py-4 text-base font-medium text-primary-foreground shadow-xl shadow-brand-indigo/20 transition-all hover:-translate-y-0.5 hover:opacity-90",
};

type FieldName = "first_name" | "last_name" | "email" | "whats_on_your_mind";
type FieldErrors = Partial<Record<FieldName, string>>;

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  whats_on_your_mind: "",
};

export function EarlyAccessModal({ label, variant = "header", className }: EarlyAccessModalProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const gradient = variant !== "cta";

  return (
    <>
      <button
        type="button"
        className={cn(variantClass[variant], className)}
        style={gradient ? { background: "var(--gradient-brand)" } : undefined}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      {open ? <WaitlistDialog titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function WaitlistDialog({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";

    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("input, button")?.focus({ preventScroll: true });
    });

    const shell = shellRef.current;
    const viewport = window.visualViewport;
    function fitViewport() {
      if (!shell) return;
      const height = viewport?.height ?? window.innerHeight;
      const offsetTop = viewport?.offsetTop ?? 0;
      shell.style.height = `${height}px`;
      shell.style.top = `${offsetTop}px`;
    }
    fitViewport();
    viewport?.addEventListener("resize", fitViewport);
    viewport?.addEventListener("scroll", fitViewport);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
    }

    document.addEventListener("keydown", onKey);
    return () => {
      style.overflow = previous.overflow;
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      window.scrollTo(0, scrollY);
      viewport?.removeEventListener("resize", fitViewport);
      viewport?.removeEventListener("scroll", fitViewport);
      document.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(frame);
    };
  }, []);

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

  return createPortal(
    <div ref={shellRef} className="fixed inset-0 z-50 h-dvh max-h-dvh">
      <div className="absolute inset-0 bg-brand-night/60 backdrop-blur-sm" onMouseDown={onClose} />
      <div className="relative z-10 h-full touch-pan-y overflow-y-auto overscroll-contain" onMouseDown={onClose}>
        <div className="flex min-h-full items-center justify-center px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="my-auto w-full max-w-lg rounded-3xl border border-brand-line bg-brand-cream p-6 text-brand-ink shadow-2xl sm:p-8"
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={trapFocus}
          >
        <div className="flex items-start justify-between gap-4">
          <BrandMark className="h-9 w-9" />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-brand-line text-brand-ink/70 hover:text-brand-indigo"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {done ? (
          <div className="mt-6">
            <h2 id={titleId} className="font-serif text-4xl leading-[1.08] text-brand-ink">
              You&apos;re on the list.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/65">
              We&apos;ll email {form.email} when a conversation opens up.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white"
              style={{ background: "var(--gradient-brand)" }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form className="mt-6" onSubmit={onSubmit}>
            <h2 id={titleId} className="font-serif text-4xl leading-[1.08] text-brand-ink">
              Join the waitlist
            </h2>
            <p className="mt-3 text-base leading-relaxed text-brand-ink/65">
              Be first to know when DafoTalk opens — a place to talk with someone who gets where you&apos;re coming from.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                name="first_name"
                autoComplete="given-name"
                value={form.first_name}
                error={errors.first_name}
                onChange={(value) => setForm((current) => ({ ...current, first_name: value }))}
              />
              <Field
                label="Last name"
                name="last_name"
                autoComplete="family-name"
                value={form.last_name}
                error={errors.last_name}
                onChange={(value) => setForm((current) => ({ ...current, last_name: value }))}
              />
            </div>
            <div className="mt-4">
              <Field
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={(value) => setForm((current) => ({ ...current, email: value }))}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-brand-ink" htmlFor="whats-on-your-mind">
                What&apos;s on your mind? <span className="font-normal text-brand-ink/50">Optional</span>
              </label>
              <textarea
                id="whats-on-your-mind"
                name="whats_on_your_mind"
                rows={3}
                value={form.whats_on_your_mind}
                onChange={(event) => setForm((current) => ({ ...current, whats_on_your_mind: event.target.value }))}
                className="mt-2 w-full resize-none rounded-2xl border border-brand-line bg-white/70 px-4 py-3 text-sm text-brand-ink outline-none placeholder:text-brand-ink/35 focus:border-brand-indigo/50 dark:bg-white/5"
                placeholder="A day, a question, or just a feeling."
              />
              {errors.whats_on_your_mind ? <p className="mt-1.5 text-sm text-red-700 dark:text-red-300">{errors.whats_on_your_mind}</p> : null}
            </div>

            {formError ? (
              <p className="mt-4 text-sm text-red-700 dark:text-red-300" role="alert">
                {formError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-brand-indigo/20 transition-opacity disabled:opacity-60"
              style={{ background: "var(--gradient-brand)" }}
            >
              {pending ? "Joining…" : "Join the Waitlist"}
            </button>
          </form>
        )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <div>
      <label className="block text-sm font-medium text-brand-ink" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 w-full rounded-2xl border border-brand-line bg-white/70 px-4 py-3 text-sm text-brand-ink outline-none placeholder:text-brand-ink/35 focus:border-brand-indigo/50 dark:bg-white/5"
      />
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

function trapFocus(event: React.KeyboardEvent<HTMLDivElement>) {
  if (event.key !== "Tab") return;
  const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
