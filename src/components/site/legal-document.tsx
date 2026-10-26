import type { ReactNode } from "react";
import { AmbientLight } from "@/components/site/ambient-light";

export type LegalBlock =
  | { type: "paragraph"; content: ReactNode }
  | { type: "list"; items: string[] }
  | { type: "contact" };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

type LegalDocumentProps = {
  kicker: string;
  title: string;
  updated: string;
  updatedDate: string;
  sections: LegalSection[];
};

const displayFont = {
  fontFamily:
    'var(--font-dm-serif-display), "DM Serif Display", Georgia, serif',
} as const;

export function LegalDocument({
  kicker,
  title,
  updated,
  updatedDate,
  sections,
}: LegalDocumentProps) {
  return (
    <article>
      <header className="relative overflow-hidden border-b border-brand-line">
        <AmbientLight variant="soft" />
        <div className="relative mx-auto w-full max-w-3xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-indigo">
            {kicker}
          </p>
          <h1
            className="mt-4 text-balance text-[2.35rem] leading-[1.08] tracking-tight text-brand-ink sm:text-5xl"
            style={displayFont}
          >
            {title}
          </h1>
          <p className="mt-5 text-sm text-brand-ink/55">
            Last updated: <time dateTime={updatedDate}>{updated}</time>
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="space-y-0">
          {sections.map((section) => {
            const heading = splitHeading(section.title);
            return (
              <section
                key={section.title}
                className="border-t border-brand-line py-8 first:border-t-0 first:pt-0 last:pb-0 sm:py-10"
              >
                <h2
                  className="flex gap-3 text-xl leading-snug tracking-tight text-brand-ink sm:text-[1.65rem]"
                  style={displayFont}
                >
                  {heading.number ? (
                    <span className="shrink-0 tabular-nums text-brand-indigo">
                      {heading.number}.
                    </span>
                  ) : null}
                  <span>{heading.label}</span>
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-brand-ink/75 sm:text-base">
                  {section.blocks.map((block, index) => {
                    if (block.type === "paragraph") {
                      return <p key={index}>{block.content}</p>;
                    }
                    if (block.type === "list") {
                      return (
                        <ul key={index} className="space-y-2.5 pl-5">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="list-disc pl-1 marker:text-brand-indigo"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <ContactCard key={index} />;
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function splitHeading(title: string) {
  const match = /^(\d+)\.\s+(.+)$/.exec(title);
  if (!match) return { number: null, label: title };
  return { number: match[1], label: match[2] };
}

function ContactCard() {
  return (
    <div className="rounded-2xl border border-brand-line bg-brand-card p-5 text-brand-ink sm:p-6">
      <p className="text-base font-medium">DafoTalk Private Limited</p>
      <dl className="mt-4 space-y-4 text-sm">
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-brand-ink/45">
            Email
          </dt>
          <dd className="mt-1">
            <a
              href="mailto:hello@dafotalk.com"
              className="break-all text-brand-indigo underline-offset-4 transition-colors hover:underline"
            >
              hello@dafotalk.com
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-widest text-brand-ink/45">
            Registered office
          </dt>
          <dd className="mt-1 leading-relaxed text-brand-ink/80">
            89/2-16-8-1-A, Kurnool, Andhra Pradesh, India.
          </dd>
        </div>
      </dl>
    </div>
  );
}
