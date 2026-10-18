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
        <div className="relative mx-auto flex max-w-7xl px-6 pt-12 pb-9 lg:px-8 lg:pt-16">
          <span
            aria-hidden
            className="invisible shrink-0 pl-7 text-base font-medium whitespace-pre"
          >
            {"Join Early "}
          </span>
          <div className="min-w-0">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {journeyOpener.map((line, index) => (
                <Reveal key={line} delay={index * 70}>
                  <p className="journey-opener__lead text-balance">{line}</p>
                </Reveal>
              ))}
            </div>
            <Reveal
              delay={140}
              className="mt-8 max-w-3xl border-t border-white/12 pt-7 sm:mt-9 sm:pt-8 lg:mt-11"
            >
              <p className="journey-opener__follow text-balance">
                Or maybe there&apos;s just something on your mind.
              </p>
              <p className="journey-opener__follow journey-opener__accent mt-2 text-balance">
                Or maybe... you simply feel like talking.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hero-section journey-match relative overflow-hidden bg-brand-cream pt-14 pb-20 font-serif lg:pb-32">
        <AmbientLight variant="hero" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="journey-match-title">
              That&apos;s what DafoTalk is for.
            </h2>
            <p className="journey-match-lede">
              Finding someone you might have something in common with.
            </p>
          </div>

          <div className="mt-14 rounded-2xl border border-brand-line/60 bg-brand-card/25 p-4 sm:p-7 lg:mt-20 lg:p-10">
            <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <article className="flex min-h-[19rem] min-w-0 flex-col rounded-xl border border-brand-night-fg/10 bg-brand-night p-5">
                <div className="relative flex h-full min-h-64 flex-col items-center justify-center gap-3.5">
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
                  className="flex min-h-[19rem] min-w-0 flex-col rounded-xl border border-brand-line bg-brand-cream p-5"
                >
                  <div className="flex h-full flex-col">
                    <span className="font-serif text-[10px] font-medium uppercase tracking-[0.18em] text-brand-indigo">
                      {step.step}
                    </span>
                    <h3 className="mt-4 min-h-14 font-serif text-xl leading-tight text-brand-ink">
                      {step.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap content-start gap-2">
                      {step.chips.map((chip) => (
                        <Chip key={chip.label} chip={chip} />
                      ))}
                    </div>
                  </div>
                </article>
              ))}

              <article className="flex min-h-[19rem] min-w-0 flex-col rounded-xl border border-brand-indigo/20 bg-brand-mist p-5">
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

          <p className="mx-auto mt-10 max-w-2xl font-medium text-center font-serif text-xl leading-relaxed text-brand-ink/65">
            We&apos;ll use that context to help find someone you have something
            in common with.
          </p>

          <Reveal className="mx-auto mt-14 max-w-5xl border-t border-brand-line pt-10 lg:mt-16 lg:pt-12">
            <div className="grid gap-5 text-center md:grid-cols-3 md:gap-8">
              {matchOutcomes.map((outcome) => (
                <p
                  key={outcome.text}
                  className={cn(
                    "font-serif text-2xl font-semibold leading-tight sm:text-3xl",
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
      </section>

      <section className="relative overflow-hidden border-y border-brand-line bg-brand-cream py-14 lg:py-20">
        <div aria-hidden className="section-glow" />
        <Reveal className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <p className="font-serif text-2xl font-semibold leading-[1.16] text-brand-ink sm:text-4xl lg:text-5xl">
            Whatever the conversation.
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold leading-[1.16] text-brand-ink/55 sm:text-4xl lg:text-5xl">
            Whatever the situation.
          </p>
          <p className="mt-2 font-serif text-2xl font-semibold leading-[1.16] text-brand-indigo sm:text-4xl lg:text-5xl">
            Whatever&apos;s on your mind.
          </p>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-brand-night py-24 text-brand-night-fg lg:py-36">
        <AmbientLight variant="night" />
        <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-8">
          <div className="flex flex-col items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] text-brand-night-fg/50 sm:flex-row sm:gap-5">
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
          <h2 className="mt-10 font-serif font-semibold text-6xl leading-none text-brand-night-fg sm:text-7xl lg:text-8xl">
            Just conversation.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-brand-night-fg/65 lg:text-xl">
            With someone you have something in common with.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-brand-line bg-brand-cream py-14 lg:py-20">
        <div aria-hidden className="section-glow" />
        <div className="relative mx-auto w-full sm:w-11/12 lg:w-3/4">
          <Image
            src="/logo-mark.webp"
            alt=""
            width={1254}
            height={1254}
            className="pointer-events-none absolute top-5 left-5 h-10 w-10 sm:top-8 sm:left-8 sm:h-12 sm:w-12 lg:left-12"
          />
          <div className="relative mx-auto max-w-4xl px-5 pt-20 pb-2 text-center sm:px-8 sm:pt-24">
            <h2 className="mx-auto max-w-[50rem] text-balance font-serif font-semibold text-4xl leading-[1.08] text-brand-ink sm:text-5xl lg:text-6xl">
              Maybe the conversation you&apos;re looking for starts here.
            </h2>
            <div className="mt-9">
              <EarlyAccessModal label="Join the Waitlist" variant="hero" />
            </div>
            <p className="mt-7 text-sm uppercase tracking-[0.18em] text-brand-ink/55">
              Where understanding begins.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Chip({ chip }: { chip: MatchChip }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 max-w-full items-center rounded-full border px-3 py-1.5 font-serif text-[11px] leading-4",
        chip.selected
          ? "border-brand-violet/28 bg-brand-violet/10 text-brand-violet dark:border-brand-violet/36 dark:bg-brand-violet/20 dark:text-brand-night-accent"
          : "border-brand-ink/25 bg-transparent text-brand-ink/80",
      )}
    >
      {chip.label}
    </span>
  );
}
