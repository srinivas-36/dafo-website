"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { EarlyAccessModal } from "@/components/site/early-access-modal";
import { footerColumns } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  function onLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const hash = href.split("#")[1];
    if (!hash) return;

    const path = href.split("#")[0] || "/";
    if (pathname !== path) return;

    event.preventDefault();
    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `/#${hash}`);
  }

  return (
    <footer className="bg-brand-night text-brand-night-fg/80">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="DafoTalk home"
              className="mb-5 inline-flex items-center"
            >
              <Image
                src="/logo.webp"
                alt=""
                width={1920}
                height={518}
                className="h-10 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-brand-night-fg/60">
              Honest conversations with people who understand where you&apos;re
              coming from.
            </p>
            <div className="mt-8">
              <EarlyAccessModal label="Join Waitlist" variant="footer" />
            </div>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between md:col-span-7">
            <div className="grid flex-1 grid-cols-2 gap-8">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <p className="mb-5 text-[11px] uppercase tracking-widest text-brand-night-fg/40">
                    {column.title}
                  </p>
                  <ul className="space-y-3 text-sm">
                    {column.links.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            onClick={(event) => onLinkClick(event, link.href)}
                            className={cn(
                              "transition-colors hover:text-brand-night-fg",
                              active && "text-brand-night-fg",
                            )}
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
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-widest text-brand-night-fg/40">
                Social Links
              </p>
              <ul className="flex items-center gap-3">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-[#7c3aed] text-brand-night-fg/70 transition-colors hover:border-[#7c3aed]/15 hover:text-brand-night-fg"
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-brand-night-fg/10 pt-8 text-center text-xs text-brand-night-fg/40 sm:flex-row sm:text-left">
          <span>© {year} DafoTalk. All rights reserved.</span>
          <div className="flex justify-center gap-6 sm:justify-end">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/dafotalk",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2 1.7-4.8 4.9-4.9 1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/dafotalk",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
        <path
          fill="currentColor"
          d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"
        />
      </svg>
    ),
  },
  // {
  //   label: "X",
  //   href: "https://x.com/dafotalk",
  //   icon: (
  //     <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
  //       <path
  //         fill="currentColor"
  //         d="M18.2 2.3h3.3l-7.2 8.3 8.5 11.2h-6.7l-4.7-6.2-5.4 6.2H2.7l7.7-8.8L2.3 2.3h6.8l4.3 5.6 4.8-5.6zm-1.2 17.5h1.8L7.1 4.1H5.1l11.9 15.7z"
  //       />
  //     </svg>
  //   ),
  // },
] as const;
