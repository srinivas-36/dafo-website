import { AmbientLight } from "@/components/site/ambient-light";
import { EarlyAccessModal } from "@/components/site/early-access-modal";

type InteriorPageProps = {
  title: string;
  lede: string;
};

export function InteriorPage({ title, lede }: InteriorPageProps) {
  return (
    <section className="relative overflow-hidden">
      <AmbientLight variant="hero" />
      <div className="relative mx-auto w-full max-w-3xl px-5 py-14 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <h1 className="w-full text-balance font-serif text-[clamp(2.25rem,10vw,2.75rem)] leading-[1.08] tracking-tight text-brand-ink sm:text-6xl">{title}</h1>
        <p className="mt-5 w-full max-w-xl text-base leading-relaxed text-brand-ink/65 sm:mt-6 sm:text-lg">{lede}</p>
        <div className="mt-10">
          <EarlyAccessModal label="Join the Waitlist" variant="hero" />
        </div>
      </div>
    </section>
  );
}
