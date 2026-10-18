import { useId } from "react";
import { cn } from "@/lib/cn";

const LEFT_PATH =
  "M 2.49 29.51 L 2.84 29.16 L 2.84 28.09 L 3.20 27.73 L 3.20 26.67 L 3.91 25.60 L 3.91 24.89 L 4.98 22.76 L 5.69 22.04 L 6.04 20.98 L 8.53 18.13 L 9.60 16.36 L 12.09 13.87 L 12.09 13.51 L 19.20 6.76 L 19.56 6.76 L 20.27 6.04 L 20.98 6.04 L 22.40 5.33 L 25.96 5.33 L 26.31 5.69 L 27.73 6.04 L 29.87 7.82 L 29.87 8.18 L 30.58 8.89 L 30.58 9.60 L 30.93 9.96 L 30.93 11.38 L 31.29 11.73 L 30.93 12.09 L 30.93 13.51 L 29.87 15.64 L 25.96 19.91 L 25.60 19.91 L 23.82 21.69 L 23.47 21.69 L 22.04 23.11 L 21.69 23.11 L 20.27 24.53 L 19.91 24.53 L 18.13 26.31 L 16.71 29.16 L 16.71 32.36 L 18.13 35.20 L 20.98 37.69 L 22.04 38.04 L 22.76 38.76 L 24.53 39.47 L 25.24 40.18 L 26.31 40.53 L 27.02 41.24 L 29.16 42.31 L 30.58 44.09 L 30.58 44.80 L 30.93 45.16 L 30.93 48.71 L 29.87 51.20 L 27.38 54.04 L 25.60 55.11 L 23.47 55.47 L 23.11 55.82 L 20.27 55.47 L 18.13 54.40 L 16.71 52.98 L 16.36 52.98 L 14.93 51.56 L 14.58 51.56 L 13.16 50.13 L 12.80 50.13 L 11.02 48.36 L 10.67 48.36 L 5.69 43.38 L 3.56 39.47 L 3.56 38.76 L 2.84 37.33 L 2.84 36.27 L 2.49 35.91 L 2.49 29.87 Z";

const RIGHT_PATH =
  "M 32.36 52.98 L 33.42 50.49 L 41.60 41.60 L 41.60 41.24 L 44.80 38.04 L 46.22 34.84 L 46.22 32.36 L 45.87 32.00 L 45.51 30.22 L 44.80 29.51 L 44.80 29.16 L 41.60 26.31 L 40.53 25.96 L 39.82 25.24 L 37.33 23.82 L 35.91 22.04 L 35.91 21.33 L 35.56 20.98 L 35.56 18.49 L 35.91 18.13 L 35.91 17.42 L 38.40 14.58 L 38.76 14.58 L 39.47 13.87 L 41.60 13.51 L 41.96 13.16 L 44.80 13.51 L 45.16 13.87 L 46.58 14.22 L 57.24 24.89 L 57.24 25.24 L 58.67 27.02 L 59.02 28.44 L 60.09 30.58 L 60.44 33.42 L 60.80 33.78 L 60.80 38.76 L 60.44 39.11 L 60.09 41.96 L 59.73 42.31 L 59.38 44.09 L 57.60 47.64 L 55.11 50.84 L 55.11 51.20 L 51.20 55.11 L 50.84 55.11 L 47.29 57.96 L 46.22 58.31 L 45.51 59.02 L 43.38 60.09 L 41.24 60.44 L 40.89 60.80 L 38.40 60.80 L 38.04 60.44 L 35.56 59.73 L 33.42 57.60 L 32.36 55.11 L 32.36 53.33 Z";

type BrandMarkProps = {
  className?: string;
  title?: string;
};

export function BrandMark({ className, title }: BrandMarkProps) {
  const id = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={id} x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C149FA" />
          <stop offset="45%" stopColor="#7E32F9" />
          <stop offset="100%" stopColor="#1A0C9C" />
        </linearGradient>
      </defs>
      <path d={LEFT_PATH} fill={`url(#${id})`} />
      <path d={RIGHT_PATH} fill={`url(#${id})`} />
    </svg>
  );
}

type BrandLockupProps = {
  className?: string;
  tone?: "ink" | "night";
};

export function BrandLockup({ className, tone = "ink" }: BrandLockupProps) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2",
        tone === "night" ? "text-brand-night-fg" : "text-brand-ink",
        className,
      )}
    >
      <BrandMark className="h-8 w-8 shrink-0" />
      <span className="font-serif text-[1.35rem] leading-none tracking-tight">DafoTalk</span>
    </span>
  );
}
