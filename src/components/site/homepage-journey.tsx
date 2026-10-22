import Image from "next/image";
import { AmbientLight } from "@/components/site/ambient-light";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { Reveal } from "@/components/site/reveal";
import {
  journeyOpener,
  matchOutcomes,
  matchSteps,
  type MatchChip,
} from "@/content/home";
import { cn } from "@/lib/cn";

export function HomepageJourney() {
  return (
    <>
      <section className="journey-opener relative overflow-hidden border-y border-brand-line">
        <div className="relative mx-auto flex w-full min-w-0 max-w-7xl px-6 pt-12 pb-10 sm:px-6 sm:pt-12 sm:pb-9 lg:px-8 lg:pt-16">
          <span
            aria-hidden
            className="invisible hidden shrink-0 pl-7 text-base font-medium whitespace-pre lg:block"
          >
            {"Join Early "}
          </span>
          <div className="min-w-0">
            <div className="max-w-3xl space-y-2.5 sm:space-y-4">
              {journeyOpener.map((line, index) => (
                <Reveal key={line} delay={index * 70}>
                  <p className="journey-opener__lead lg:text-balance">
                    <OpenerLine line={line} />
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal
              delay={140}
              className="mt-7 max-w-3xl border-t border-white/12 pt-6 sm:mt-9 sm:pt-8 lg:mt-11"
            >
              <p className="journey-opener__follow lg:text-balance">
                Or maybe there&apos;s just{" "}
                <span className="max-sm:whitespace-nowrap">
                  something on your mind.
                </span>
              </p>
              <p className="journey-opener__follow journey-opener__accent mt-2.5 sm:mt-2 lg:text-balance">
                Or maybe... you simply feel like talking.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="hero-section journey-match relative scroll-mt-16 overflow-hidden bg-brand-cream pt-12 pb-14 font-serif sm:pt-14 sm:pb-20 lg:pb-32"
      >
        <AmbientLight variant="hero" />
        <div className="relative mx-auto w-full min-w-0 max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
            <h2 className="journey-match-title">
              That&apos;s what DafoTalk is for.
            </h2>
            <p className="journey-match-lede">
              Finding someone you might have something in common with.
            </p>
          </div>

          <div className="mt-8 sm:mt-14 sm:rounded-2xl sm:border sm:border-brand-line/60 sm:bg-brand-card/25 sm:p-7 lg:mt-20 lg:p-10">
            <div className="grid auto-rows-fr grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
              <article className="flex min-h-52 min-w-0 flex-col rounded-xl border border-brand-night-fg/10 bg-brand-night p-5 sm:min-h-[19rem]">
                <div className="relative flex h-full min-h-44 flex-col items-center justify-center gap-3.5 sm:min-h-64">
                  <Image
                    src="/logo-mark.webp"
                    alt=""
                    width={1254}
                    height={1254}
                    className="pointer-events-none h-14 w-14"
                  />
                  <Image
                    src="/brand.webp"
                    alt="DafoTalk"
                    width={1020}
                    height={400}
                    className="h-auto w-3/4 max-w-40"
                  />
                </div>
              </article>

              {matchSteps.map((step) => (
                <article
                  key={step.step}
                  className="flex min-h-0 min-w-0 flex-col rounded-xl border border-brand-line bg-brand-cream p-5 sm:min-h-[19rem]"
                >
                  <div className="flex h-full min-w-0 flex-col">
                    <span className="font-serif text-[10px] font-medium uppercase tracking-[0.18em] text-brand-indigo">
                      {step.step}
                    </span>
                    <h3 className="mt-3 font-serif text-xl leading-tight text-brand-ink sm:mt-4 sm:min-h-14 lg:text-[1.15rem]">
                      {step.title}
                    </h3>
                    <div className="mt-5 flex min-w-0 flex-wrap content-start gap-2.5 lg:mt-4 lg:gap-2">
                      {step.chips.map((chip) => (
                        <Chip key={chip.label} chip={chip} />
                      ))}
                    </div>
                  </div>
                </article>
              ))}

              <article className="flex min-h-52 min-w-0 flex-col rounded-xl border border-brand-indigo/20 bg-brand-mist p-5 sm:min-h-[19rem]">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="relative grid h-16 w-16 place-items-center rounded-full border border-brand-indigo/30">
                    <span className="finding-ring" />
                    <span className="h-7 w-7 rounded-full bg-brand-indigo/20" />
                  </span>
                  <p className="mt-6 font-serif text-xl text-brand-ink">
                    Finding someone...
                  </p>
                  <div className="mt-4 flex gap-1.5" aria-hidden>
                    <span className="finding-dot h-1.5 w-1.5 rounded-full bg-brand-indigo" />
                    <span className="finding-dot h-1.5 w-1.5 rounded-full bg-brand-indigo/55" />
                    <span className="finding-dot h-1.5 w-1.5 rounded-full bg-brand-indigo/25" />
                  </div>
                </div>
              </article>
            </div>
          </div>

          <p className="mx-auto mt-8 w-full max-w-2xl text-center font-serif text-lg font-medium leading-relaxed text-brand-ink/65 sm:mt-10 sm:text-xl">
            We&apos;ll use that context to help find someone you have something
            in common with.
          </p>

          <div className="journey-outcomes">
            <Reveal className="mx-auto mt-10 w-full max-w-5xl border-t border-brand-line pt-8 sm:mt-14 lg:mt-16 lg:pt-12">
              <div className="grid gap-6 text-center md:grid-cols-3 md:gap-8">
                {matchOutcomes.map((outcome) => (
                  <p
                    key={outcome.text}
                    className={cn(
                      "w-full whitespace-pre-line font-serif text-[clamp(1.9rem,8.4vw,2.35rem)] font-semibold leading-[1.15] sm:text-3xl sm:leading-tight md:text-balance",
                      outcome.tone === "ink" && "text-brand-ink",
                      outcome.tone === "muted" && "text-brand-ink/60",
                      outcome.tone === "accent" && "text-brand-indigo",
                    )}
                  >
                    {outcome.text}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-brand-line bg-brand-cream py-12 sm:py-14 lg:py-20">
        <div aria-hidden className="section-glow" />
        <Reveal className="relative mx-auto w-full max-w-5xl px-5 text-center sm:px-6 lg:px-8">
          <p className="whitespace-nowrap font-serif text-[clamp(1rem,calc((100vw-2.5rem)/12.8),2rem)] font-semibold leading-[1.15] text-brand-ink sm:text-balance sm:text-4xl sm:whitespace-normal lg:text-5xl">
            Whatever the conversation.
          </p>
          <p className="mt-2 whitespace-nowrap font-serif text-[clamp(1rem,calc((100vw-2.5rem)/12.8),2rem)] font-semibold leading-[1.15] text-brand-ink/55 sm:text-balance sm:text-4xl sm:whitespace-normal lg:text-5xl">
            Whatever the situation.
          </p>
          <p className="mt-2 whitespace-nowrap font-serif text-[clamp(1rem,calc((100vw-2.5rem)/12.8),2rem)] font-semibold leading-[1.15] text-brand-indigo sm:text-balance sm:text-4xl sm:whitespace-normal lg:text-5xl">
            Whatever&apos;s on your mind.
          </p>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#252B45] via-brand-night to-[#252B45] py-12 text-brand-night-fg sm:bg-brand-night sm:bg-none sm:py-24 lg:py-36">
        <AmbientLight variant="night" className="hidden sm:block" />
        <div className="conversation-band relative mx-auto w-full max-w-6xl px-5 text-center sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-2.5 text-[0.8125rem] font-medium uppercase leading-none tracking-[0.16em] text-brand-night-fg/70 sm:flex-row sm:gap-5 sm:text-sm sm:font-normal sm:leading-normal sm:tracking-[0.2em] sm:text-brand-night-fg/50">
            <span>No feed.</span>
            <span
              aria-hidden
              className="hidden h-px w-8 bg-brand-night-fg/20 sm:block"
            />
            <span>No followers.</span>
            <span
              aria-hidden
              className="hidden h-px w-8 bg-brand-night-fg/20 sm:block"
            />
            <span>No networking.</span>
          </div>
          <span
            aria-hidden
            className="mx-auto mt-5 block h-px w-10 bg-brand-night-fg/30 sm:hidden"
          />
          <h2 className="mt-5 font-serif font-semibold leading-none text-brand-night-fg sm:mt-10">
            Just conversation.
          </h2>
          <p className="mx-auto mt-4 w-full max-w-2xl text-[1.1875rem] leading-snug text-brand-night-fg/80 sm:mt-8 sm:text-lg sm:leading-relaxed sm:text-brand-night-fg/65 lg:text-xl">
            With someone you have
            <br className="sm:hidden" /> something in common with.
          </p>
        </div>
      </section>

      <section className="journey-close relative overflow-hidden border-t border-brand-line bg-brand-cream py-12 sm:py-14 lg:py-20">
        <div aria-hidden className="section-glow" />
        <div className="relative mx-auto w-full sm:w-11/12 lg:w-3/4">
          <Image
            src="/dafo-logo.png"
            alt=""
            width={1254}
            height={1254}
            className="journey-close__mark pointer-events-none absolute top-5 left-5 h-9 w-9 sm:top-8 sm:left-8 sm:h-12 sm:w-12 lg:left-12"
          />
          <div className="journey-close__copy relative mx-auto w-full max-w-4xl px-5 pt-16 pb-2 text-center sm:px-8 sm:pt-24">
            <h2 className="journey-close__title mx-auto w-full max-w-[50rem] text-balance font-serif text-[clamp(1.85rem,8vw,2.25rem)] font-semibold leading-[1.12] text-brand-ink sm:text-5xl lg:text-6xl">
              Maybe the conversation <br className="sm:hidden" />
              you&apos;re looking for <br className="sm:hidden" />
              starts here.
            </h2>
            <div className="journey-close__action mt-9">
              <EarlyAccessModal label="Join the Waitlist" variant="hero" />
            </div>
            <p className="journey-close__kicker mt-7 text-sm uppercase tracking-[0.18em] text-brand-ink/55">
              Where understanding begins.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function OpenerLine({ line }: { line: string }) {
  const kept = "just happened.";
  if (!line.endsWith(kept)) return line;

  return (
    <>
      {line.slice(0, -kept.length)}
      <span className="whitespace-nowrap sm:whitespace-normal">{kept}</span>
    </>
  );
}

function Chip({ chip }: { chip: MatchChip }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 font-sans text-[14px] font-medium leading-5",
        "lg:min-w-0 lg:max-w-full lg:gap-1 lg:whitespace-normal lg:px-2 lg:py-1 lg:text-[12px] lg:leading-4 lg:tracking-[-0.01em]",
        chip.selected
          ? "border-[#6f35d4] bg-[#161022] text-white"
          : "border-[#313135] bg-[#141418] text-[#d4d4d8]",
      )}
    >
      {chip.emoji ? (
        <span
          aria-hidden
          className="shrink-0 text-[15px] leading-none lg:text-[13px]"
        >
          {chip.emoji}
        </span>
      ) : null}
      <span className="lg:min-w-0">{chip.label}</span>
    </span>
  );
}
