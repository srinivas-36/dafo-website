"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-cream/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="DafoTalk home" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo.webp"
            alt=""
            width={1920}
            height={518}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors",
                  active ? "text-brand-indigo" : "text-brand-ink/70 hover:text-brand-indigo",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <EarlyAccessModal label="Join Waitlist" variant="header" />
          <button
            type="button"
            className="p-2 -mr-2 text-brand-ink lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-brand-line bg-brand-cream px-6 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    active ? "text-brand-indigo" : "text-brand-ink/70 hover:text-brand-indigo",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <EarlyAccessModal label="Join Waitlist" variant="hero" className="mt-3 sm:hidden" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
