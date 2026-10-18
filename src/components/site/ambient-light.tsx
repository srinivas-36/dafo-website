import { cn } from "@/lib/cn";

type AmbientLightProps = {
  variant?: "hero" | "soft" | "night";
  className?: string;
};

export function AmbientLight({ variant = "soft", className }: AmbientLightProps) {
  const light = variant === "night";

  return (
    <div
      aria-hidden
      className={cn(
        "ambient-layer",
        variant === "hero" && "ambient-layer--hero",
        variant === "soft" && "ambient-layer--soft",
        className,
      )}
    >
      <span className={cn("ambient-blob ambient-blob--a", light && "ambient-blob--light")} />
      <span className={cn("ambient-blob ambient-blob--b", light && "ambient-blob--light")} />
      <span className={cn("ambient-blob ambient-blob--c", light && "ambient-blob--light")} />
    </div>
  );
}
