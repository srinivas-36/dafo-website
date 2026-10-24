"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import {
  SCHOOL_EMAIL_ERROR,
  domainLooksComplete,
  emailDomain,
} from "@/lib/school-email";

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

const accessGradient =
  "linear-gradient(90deg, #b44bf5 0%, #8e4bee 46%, #553de8 100%)";

type AudienceId = "indian-student" | "other-student" | "us-resident" | "other";

const audiences: {
  id: AudienceId;
  title: string;
  detail: string;
  schoolEmail: boolean;
}[] = [
  {
    id: "indian-student",
    title: "Indian international student in the U.S.",
    detail: "Studying in the U.S. on a student visa, from India.",
    schoolEmail: true,
  },
  {
    id: "other-student",
    title: "Other international student in the U.S.",
    detail: "Studying in the U.S., from somewhere else in the world.",
    schoolEmail: true,
  },
  {
    id: "us-resident",
    title: "U.S. resident",
    detail: "Born and raised in the United States.",
    schoolEmail: false,
  },
  {
    id: "other",
    title: "Others",
    detail: "None of the above — tell us where you're coming from.",
    schoolEmail: false,
  },
];

type Step = "qualify" | "join" | "later" | "done";
type DoneKind = "joined" | "noted";
type FieldName = "email";
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#2a2e48] bg-[#11152b] px-4 py-3 text-[15px] text-[#f8fafc] outline-none transition-colors placeholder:text-[#6f7280] focus:border-[#7970af] autofill:shadow-[inset_0_0_0_1000px_#11152b] autofill:[-webkit-text-fill-color:#f8fafc]";

const labelClass =
  "block text-[11px] font-medium uppercase tracking-[0.16em] text-[#6d6f81]";

const DOMAIN_TTL_MS = 60_000;

let schoolDomainCache: { at: number; domains: Set<string> } | null = null;
let schoolDomainRequest: Promise<Set<string> | null> | null = null;

function peekSchoolDomains() {
  if (schoolDomainCache && Date.now() - schoolDomainCache.at < DOMAIN_TTL_MS) {
    return schoolDomainCache.domains;
  }
  return undefined;
}

function readSchoolDomains(data: unknown) {
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

function fetchSchoolDomains() {
  if (schoolDomainCache && Date.now() - schoolDomainCache.at < DOMAIN_TTL_MS) {
    return Promise.resolve(schoolDomainCache.domains);
  }
  if (!schoolDomainRequest) {
    schoolDomainRequest = fetch("/api/early-access/school-domains", {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const domains = readSchoolDomains(
          await response.json().catch(() => null),
        );
        if (!domains) return null;
        schoolDomainCache = { at: Date.now(), domains };
        return domains;
      })
      .catch(() => null)
      .finally(() => {
        schoolDomainRequest = null;
      });
  }
  return schoolDomainRequest;
}

export function EarlyAccessModal({
  label,
  variant = "header",
  className,
}: EarlyAccessModalProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const gradient = variant !== "cta";

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(variantClass[variant], className)}
        style={gradient ? { background: "var(--gradient-brand)" } : undefined}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      {open ? <WaitlistDialog titleId={titleId} onClose={close} /> : null}
    </>
  );
}

function WaitlistDialog({
  titleId,
  onClose,
}: {
  titleId: string;
  onClose: () => void;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const onCloseRef = useRef(onClose);
  const [step, setStep] = useState<Step>("qualify");
  const [audienceId, setAudienceId] = useState<AudienceId | null>(null);
  const [choiceError, setChoiceError] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [doneKind, setDoneKind] = useState<DoneKind>("joined");
  const [schoolDomains, setSchoolDomains] = useState<
    Set<string> | null | undefined
  >(peekSchoolDomains);
  const attemptRef = useRef(0);
  const mountedRef = useRef(true);

  const audience = audiences.find((item) => item.id === audienceId) ?? null;
  const stepIndex = step === "qualify" ? 1 : 2;
  const progress = step === "qualify" ? 50 : 100;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;
    void fetchSchoolDomains().then((domains) => {
      if (!cancelled) setSchoolDomains(domains);
    });
    return () => {
      cancelled = true;
      mountedRef.current = false;
    };
  }, []);

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

    const viewport = window.visualViewport;
    function fitViewport() {
      const shell = shellRef.current;
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
    };
  }, []);

  useEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
  }, [step]);

  function selectAudience(id: AudienceId) {
    setAudienceId(id);
    setChoiceError("");
  }

  function onRadioKey(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (
      event.key !== "ArrowDown" &&
      event.key !== "ArrowUp" &&
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
    ) {
      return;
    }
    event.preventDefault();
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + delta + audiences.length) % audiences.length;
    selectAudience(audiences[next].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
      [next]?.focus();
  }

  function continueFromQualify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!audience) {
      setChoiceError("Select the option that fits you best.");
      return;
    }
    setErrors({});
    setFormError("");
    setStep(audience.schoolEmail ? "join" : "later");
  }

  async function submitSignup(payload: Record<string, string>, kind: DoneKind) {
    setPending(true);
    setFormError("");
    setErrors({});

    try {
      const response = await fetch("/api/early-access/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
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

      setDoneKind(kind);
      setStep("done");
    } catch {
      setFormError(
        "We couldn't reach the waitlist just now. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }

  function updateEmail(value: string) {
    setEmail(value);
    setFormError("");
    setErrors({});
  }

  async function queueInterest(
    payload: Record<string, string>,
    kind: DoneKind,
    returnStep: Step,
  ) {
    const attempt = ++attemptRef.current;
    setPending(false);
    setFormError("");
    setErrors({});
    setDoneKind(kind);
    setStep("done");

    try {
      const response = await fetch("/api/early-access/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      const data: unknown = await response.json().catch(() => null);
      if (!mountedRef.current || attempt !== attemptRef.current) return;
      if (response.ok || alreadyListed(data)) return;

      const parsed = readErrors(data);
      setErrors(parsed.fields);
      setFormError(
        parsed.form ||
          (Object.keys(parsed.fields).length
            ? ""
            : "We couldn't save that. Please try again."),
      );
      setStep(returnStep);
    } catch {
      if (!mountedRef.current || attempt !== attemptRef.current) return;
      setFormError(
        "We couldn't reach the waitlist just now. Please try again.",
      );
      setStep(returnStep);
    }
  }

  async function submitJoin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!audience) return;
    const trimmed = email.trim();
    if (!isEmail(trimmed)) {
      setErrors({ email: "Enter a valid email." });
      return;
    }

    let domains = schoolDomains;
    if (domains === undefined) {
      setPending(true);
      domains = await fetchSchoolDomains();
      if (!mountedRef.current) return;
      setSchoolDomains(domains);
      setPending(false);
    }

    if (domains && !domains.has(emailDomain(trimmed))) {
      setErrors({ email: SCHOOL_EMAIL_ERROR });
      return;
    }

    const payload = { audience: audience.id, email: trimmed };
    if (!domains) {
      void submitSignup(payload, "joined");
      return;
    }
    void queueInterest(payload, "joined", "join");
  }

  function submitLater(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setErrors({
        email: "Add an email if you'd like us to write when access expands.",
      });
      return;
    }
    if (!isEmail(email) || !audience) {
      setErrors({ email: "Enter a valid email." });
      return;
    }

    void queueInterest(
      {
        audience: audience.id,
        email: email.trim(),
      },
      "noted",
      "later",
    );
  }

  const typedDomain = emailDomain(email);
  const domainComplete = domainLooksComplete(typedDomain);
  const domainBlocked =
    step === "join" &&
    schoolDomains instanceof Set &&
    domainComplete &&
    !schoolDomains.has(typedDomain);
  const domainAllowed =
    step === "join" &&
    schoolDomains instanceof Set &&
    domainComplete &&
    schoolDomains.has(typedDomain) &&
    !errors.email;
  const domainChecking =
    step === "join" &&
    schoolDomains === undefined &&
    domainComplete &&
    !errors.email;

  let title = "Which best describes you?";
  let body = "This helps us open early access to the right people first.";
  if (step === "later" || (step === "done" && doneKind === "noted")) {
    title = "DafoTalk is rolling out in stages.";
    body =
      "We're starting with Indian international students in the U.S. We're glad you're interested, and we may expand access to more people in the future.";
  } else if (step === "join") {
    title = "Where can we reach you?";
    body = "We'll email you when early access opens. Nothing else.";
  } else if (step === "done" && doneKind === "joined") {
    title = "You're on the list.";
    body = `We'll email ${email} when early access opens.`;
  }

  if (step === "done" && doneKind === "noted") {
    title = "We'll keep your email.";
    body = `If access expands beyond Indian international students in the U.S., we'll write to ${email}.`;
  }

  return createPortal(
    <div ref={shellRef} className="fixed inset-0 z-50 h-dvh max-h-dvh">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ backgroundColor: "rgba(7, 9, 22, 0.78)" }}
        onMouseDown={onClose}
      />
      <div
        className="relative z-10 h-full touch-pan-y overflow-y-auto overscroll-contain"
        onMouseDown={onClose}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="my-auto w-full rounded-[26px] border px-5 py-6 shadow-[0_40px_90px_-28px_rgba(0,0,0,0.72)] outline-none sm:px-9 sm:py-8"
            style={{
              maxWidth: "520px",
              backgroundColor: "#12162c",
              borderColor: "#2a2a4a",
              color: "#f8fafc",
            }}
            onMouseDown={(event) => event.stopPropagation()}
            onKeyDown={trapFocus}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a6d80]">
                Early access · {stepIndex} of 2
              </p>
              <button
                type="button"
                className="grid h-8 w-8 place-items-center text-[#8b8da0] transition-colors hover:text-white"
                aria-label="Close"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </div>

            <h2
              ref={titleRef}
              id={titleId}
              tabIndex={-1}
              className="mt-4 font-serif text-[1.65rem] font-semibold leading-[1.16] tracking-[-0.02em] text-[#f8fafc] outline-none sm:text-[2rem]"
            >
              {step === "later" ? (
                <>
                  DafoTalk is rolling out in
                  <br />
                  stages.
                </>
              ) : (
                title
              )}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#8b8da0]">
              {body}
            </p>
            <Progress value={progress} />

            {step === "qualify" ? (
              <form className="mt-6" onSubmit={continueFromQualify}>
                <div
                  role="radiogroup"
                  aria-labelledby={titleId}
                  className="flex flex-col gap-2.5"
                >
                  {audiences.map((item, index) => {
                    const selected = audienceId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        tabIndex={
                          selected || (!audienceId && index === 0) ? 0 : -1
                        }
                        onClick={() => selectAudience(item.id)}
                        onKeyDown={(event) => onRadioKey(event, index)}
                        className={cn(
                          "w-full rounded-[14px] border px-4 py-3.5 text-left transition-colors duration-200",
                          selected
                            ? "border-[#a598d8]"
                            : "border-white/15 hover:border-white/30",
                        )}
                        style={{ backgroundColor: "#12162c" }}
                      >
                        <span className="block text-[15px] font-semibold leading-snug text-[#eeeaf8]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[13.5px] leading-snug text-[#8b8da0]">
                          {item.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {choiceError ? (
                  <p className="mt-3 text-sm text-[#ffb4c4]" role="alert">
                    {choiceError}
                  </p>
                ) : null}
                <GradientButton className="mt-5 w-full">
                  Continue
                </GradientButton>
              </form>
            ) : null}

            {step === "join" ? (
              <form className="mt-6" onSubmit={submitJoin}>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  error={
                    errors.email ||
                    (domainBlocked ? SCHOOL_EMAIL_ERROR : undefined)
                  }
                  onChange={updateEmail}
                  placeholder="name@university.edu"
                />
                {domainAllowed ? (
                  <p
                    className="mt-1.5 text-sm leading-snug wrap-break-word text-[#9ddeb5]"
                    aria-live="polite"
                  >
                    Valid school email.
                  </p>
                ) : null}
                {domainChecking ? (
                  <p
                    className="mt-1.5 text-sm leading-snug text-[#8b8da0]"
                    aria-live="polite"
                  >
                    Checking university list…
                  </p>
                ) : null}
                {formError ? (
                  <p
                    className="mt-4 text-sm leading-snug wrap-break-word text-[#ffb4c4]"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}
                <div className="mt-5 flex items-stretch gap-3">
                  <BackButton onClick={() => setStep("qualify")} />
                  <GradientButton
                    className="min-w-0 flex-1"
                    disabled={pending || domainBlocked}
                  >
                    {pending ? "Joining…" : "Join Early Access"}
                  </GradientButton>
                </div>
                <p className="mt-4 text-center text-[12px] leading-relaxed text-[#73758a]">
                  You&apos;re joining DafoTalk&apos;s early-access community.
                  We&apos;ll never share your email.
                </p>
              </form>
            ) : null}

            {step === "later" ? (
              <form className="mt-6" onSubmit={submitLater}>
                <p className="text-[15px] leading-relaxed text-[#a3a5b8]">
                  Optional: leave your email to hear if access expands.
                </p>
                <div className="mt-4">
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    error={errors.email}
                    onChange={updateEmail}
                    placeholder="you@example.com"
                  />
                </div>
                {formError ? (
                  <p
                    className="mt-4 text-sm leading-snug wrap-break-word text-[#ffb4c4]"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}
                <div className="mt-5 flex items-stretch gap-2.5 sm:gap-3">
                  <BackButton onClick={() => setStep("qualify")} />
                  <GradientButton
                    className="min-w-0 flex-1 whitespace-nowrap px-3 text-[13px] sm:px-5 sm:text-[15px]"
                    disabled={pending}
                  >
                    {pending ? "Saving…" : "Notify Me About Future Access"}
                  </GradientButton>
                </div>
                <p className="mt-4 text-center text-[12px] leading-relaxed text-[#73758a]">
                  This isn&apos;t a guarantee of access. We&apos;ll never share
                  your email.
                </p>
              </form>
            ) : null}

            {step === "done" ? (
              <div className="mt-6">
                <GradientButton
                  className="w-full"
                  type="button"
                  onClick={onClose}
                >
                  Done
                </GradientButton>
                {doneKind === "noted" ? (
                  <p className="mt-4 text-center text-[12px] leading-relaxed text-[#73758a]">
                    This isn&apos;t a guarantee of access. We&apos;ll never
                    share your email.
                  </p>
                ) : (
                  <p className="mt-4 text-center text-[12px] leading-relaxed text-[#73758a]">
                    We&apos;ll never share your email.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function Progress({ value }: { value: number }) {
  return (
    <div
      className="mt-5 h-1 overflow-hidden rounded-full"
      style={{ backgroundColor: "#2d2d4e" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-valuetext={`Step ${value === 100 ? 2 : 1} of 2`}
    >
      <div
        className="h-full rounded-full shadow-[0_0_10px_rgba(180,75,245,0.85)] transition-[width] duration-500 motion-reduce:transition-none"
        style={{ width: `${value}%`, background: accessGradient }}
      />
    </div>
  );
}

function GradientButton({
  children,
  className,
  type = "submit",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-[14px] font-medium leading-snug text-white shadow-[0_12px_28px_-10px_rgba(124,75,234,0.8)] transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-[15px]",
        className,
      )}
      style={{ background: accessGradient }}
      {...props}
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#343856] bg-transparent px-5 text-[15px] font-medium text-[#c5c6d4] transition-colors hover:border-[#4c516e] hover:text-white"
    >
      Back
    </button>
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
  placeholder,
}: {
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        autoCapitalize={type === "email" ? "none" : undefined}
        autoCorrect={type === "email" ? "off" : undefined}
        spellCheck={type === "email" ? false : undefined}
        inputMode={type === "email" ? "email" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass}
        style={{ backgroundColor: "#11152b", color: "#f8fafc" }}
      />
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-sm leading-snug wrap-break-word text-[#ffb4c4]"
          aria-live="polite"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function alreadyListed(data: unknown) {
  return (readErrors(data).fields.email ?? "")
    .toLowerCase()
    .includes("already");
}

function readErrors(data: unknown): { form?: string; fields: FieldErrors } {
  if (!data || typeof data !== "object") return { fields: {} };
  const record = data as Record<string, unknown>;
  if (typeof record.detail === "string")
    return { form: record.detail, fields: {} };

  const fields: FieldErrors = {};
  for (const key of ["email"] as const) {
    const value = record[key];
    if (Array.isArray(value) && typeof value[0] === "string")
      fields[key] = value[0];
    else if (typeof value === "string") fields[key] = value;
  }

  const nonField = record.non_field_errors;
  const form =
    Array.isArray(nonField) && typeof nonField[0] === "string"
      ? nonField[0]
      : undefined;
  return { form, fields };
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
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
      <path
        d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
