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
      <div className="relative mx-auto max-w-3xl px-6 py-24 lg:px-8 lg:py-32">
        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-brand-ink sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-ink/65">{lede}</p>
        <div className="mt-10">
          <EarlyAccessModal label="Join the Waitlist" variant="hero" />
        </div>
      </div>
    </section>
  );
}
