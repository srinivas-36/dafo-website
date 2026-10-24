import { Inter } from "next/font/google";
import { AmbientLight } from "@/components/site/ambient-light";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { HeroDevice } from "@/components/site/hero-device";
import { heroTrust } from "@/content/home";

const heroLede = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const desktopTrustOrder: Record<string, string> = {
  "Anonymous conversations": "lg:order-1",
  "Context-based matching": "lg:order-2",
  "Moderated community": "lg:order-3",
};

export function Hero() {
  return (
    <section className="hero-section relative overflow-hidden pt-10 pb-12 sm:pb-20">
      <AmbientLight variant="hero" />
      <div className="relative mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 pt-6 pb-4 sm:gap-14 sm:px-6 sm:pt-16 sm:pb-20 lg:grid-cols-[minmax(0,56fr)_minmax(0,44fr)] lg:gap-x-20 lg:px-8 lg:pt-0 lg:pb-12">
        <div className="min-w-0 lg:-mt-4">
          <h1 className="max-w-full font-serif text-brand-ink">
            Sometimes, you <br className="hidden md:block" />
            just need someone <br className="hidden md:block" />
            to <span className="hero-accent whitespace-nowrap">talk to.</span>
          </h1>
          <p className="hero-copy mt-5 max-w-[90%] text-[17px] font-normal leading-relaxed text-brand-ink/65 sm:mt-7 sm:text-lg dark:text-white/65">
            DafoTalk helps you find someone who understands where you&apos;re
            coming from — based on who you are, what matters to you, and what
            you want to talk about.
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:flex-row">
            <EarlyAccessModal
              label="Join Early Access"
              variant="hero"
              className="w-full sm:w-auto"
            />
          </div>
          <ul className="mt-6 grid w-full grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-brand-ink/60 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 sm:text-xs lg:text-sm dark:text-white/60">
            {heroTrust.map((item) => (
              <li
                key={item}
                className={`inline-flex items-center gap-1.5 ${
                  item === "Anonymous conversations"
                    ? "lg:order-1"
                    : item === "Context-based matching"
                      ? "lg:order-2"
                      : "lg:order-3"
                }`}
              >
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

        <div className="relative min-w-0">
          {/* <div aria-hidden className="conversation-light" /> */}
          <HeroDevice />
        </div>
      </div>
    </section>
  );
}
