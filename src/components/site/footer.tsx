"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { footerColumns } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-night text-brand-night-fg/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label="DafoTalk home" className="mb-5 inline-flex items-center">
              <Image src="/logo.webp" alt="" width={1920} height={518} className="h-10 w-auto" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-brand-night-fg/60">
              Honest conversations with people who understand where you&apos;re coming from.
            </p>
            <div className="mt-8">
              <EarlyAccessModal label="Join Waitlist" variant="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="mb-5 text-[11px] uppercase tracking-widest text-brand-night-fg/40">{column.title}</p>
                <ul className="space-y-3 text-sm">
                  {column.links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn("transition-colors hover:text-brand-night-fg", active && "text-brand-night-fg")}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-night-fg/10 pt-8 text-xs text-brand-night-fg/40 sm:flex-row">
          <span>© {year} DafoTalk. All rights reserved.</span>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
