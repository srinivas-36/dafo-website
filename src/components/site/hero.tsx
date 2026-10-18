import { Inter } from "next/font/google";
import { AmbientLight } from "@/components/site/ambient-light";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { LivingConversations } from "@/components/site/living-conversations";
import { heroTrust } from "@/content/home";

const heroLede = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export function Hero() {
  return (
    <section className="hero-section relative overflow-hidden pt-12 pb-20">
      <AmbientLight variant="hero" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pt-16 pb-20 lg:grid-cols-[minmax(0,33rem)_minmax(0,1fr)] lg:gap-x-8 lg:px-8 lg:pt-24 lg:pb-28">
        <div>
          <h1 className="font-serif text-brand-ink">
            Sometimes, you
            <br />
            just need someone
            <br />
            to <span className="hero-accent">talk to.</span>
          </h1>
          <p className="mt-7 max-w-[33rem] text-[17px] leading-relaxed text-brand-ink/65 dark:text-white/65">
            DafoTalk helps you find someone who understands where you&apos;re
            coming from — based on who you are, what matters to you, and what
            you want to talk about.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <EarlyAccessModal label="Join Early Access" variant="hero" />
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-brand-ink/60 dark:text-white/60">
            {heroTrust.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-brand-indigo"
                  aria-hidden
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative mx-auto aspect-[1188/840] w-full max-w-xl lg:max-w-none">
            <div aria-hidden className="conversation-light" />
            <LivingConversations />
          </div>
        </div>
      </div>
    </section>
  );
}
