import type { ReactNode } from "react";

export type PortraitName = "beard" | "bun" | "green" | "headphones" | "cap" | "pink";

export function PortraitArt({ name }: { name: PortraitName }) {
  return portraits[name];
}

const portraits: Record<PortraitName, ReactNode> = {
  beard: (
    <>
      <rect width="200" height="200" fill="#f3e4d4" />
      <path d="M28 200c8-52 36-78 72-78s64 26 72 78" fill="#243044" />
      <path d="M78 128c2 18 8 36 22 48" fill="#e4b08a" />
      <ellipse cx="58" cy="118" rx="10" ry="14" fill="#d9a07c" />
      <ellipse cx="142" cy="118" rx="10" ry="14" fill="#d9a07c" />
      <ellipse cx="100" cy="112" rx="48" ry="54" fill="#e8b48e" />
      <path d="M54 108c4-46 24-70 46-70s44 22 48 66c-10-22-26-32-48-32s-38 12-46 36z" fill="#2a211c" />
      <path d="M60 124c4 38 20 54 40 54s36-16 40-54c-10 18-24 26-40 26s-30-8-40-26z" fill="#3a2c26" />
      <ellipse cx="82" cy="108" rx="4.2" ry="5" fill="#2a211c" />
      <ellipse cx="118" cy="108" rx="4.2" ry="5" fill="#2a211c" />
      <path d="M72 98c8-5 16-4 20 1" stroke="#2a211c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M108 99c8-5 16-4 20 1" stroke="#2a211c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M88 132c8 7 18 7 26 0" stroke="#c4846a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="74" cy="120" rx="7" ry="4" fill="#e39a86" opacity="0.45" />
      <ellipse cx="126" cy="120" rx="7" ry="4" fill="#e39a86" opacity="0.45" />
    </>
  ),
  bun: (
    <>
      <rect width="200" height="200" fill="#efe4f6" />
      <path d="M34 200c10-48 34-74 66-74s56 26 66 74" fill="#6d5bd0" />
      <ellipse cx="56" cy="120" rx="9" ry="13" fill="#e3b194" />
      <ellipse cx="146" cy="120" rx="9" ry="13" fill="#e3b194" />
      <ellipse cx="100" cy="118" rx="46" ry="52" fill="#f0c3a4" />
      <circle cx="100" cy="46" r="22" fill="#241c2a" />
      <path d="M58 112c2-40 18-68 42-72 22 2 40 28 44 70-12-24-28-34-44-34s-32 12-42 36z" fill="#241c2a" />
      <ellipse cx="82" cy="114" rx="4" ry="4.8" fill="#2a211c" />
      <ellipse cx="118" cy="114" rx="4" ry="4.8" fill="#2a211c" />
      <path d="M74 104c7-4 14-3 18 1" stroke="#3a2a28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108 105c7-4 14-3 18 1" stroke="#3a2a28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M90 138c6 6 16 6 22 0" stroke="#d08b78" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="148" cy="128" r="3" fill="#c9a24a" />
      <ellipse cx="72" cy="126" rx="7" ry="3.5" fill="#eea18e" opacity="0.4" />
      <ellipse cx="128" cy="126" rx="7" ry="3.5" fill="#eea18e" opacity="0.4" />
    </>
  ),
  green: (
    <>
      <rect width="200" height="200" fill="#e4f3ea" />
      <path d="M30 200c12-58 38-86 70-86s58 28 70 86" fill="#1f8a5b" />
      <path d="M62 150h76c4 18 2 34-6 50H68c-8-16-10-32-6-50z" fill="#176b46" />
      <ellipse cx="54" cy="116" rx="10" ry="13" fill="#cc9672" />
      <ellipse cx="146" cy="116" rx="10" ry="13" fill="#cc9672" />
      <ellipse cx="100" cy="114" rx="47" ry="52" fill="#d9a27c" />
      <path d="M52 100c6-42 26-64 48-64s42 20 50 60c-6-8-16-18-28-22 8 6 12 16 10 28-14-20-30-28-46-24-10 2-20 10-26 22-4-22-6-40-8 0z" fill="#1a1a1a" />
      <ellipse cx="84" cy="112" rx="4.2" ry="5" fill="#1c1c1c" />
      <ellipse cx="120" cy="112" rx="4.2" ry="5" fill="#1c1c1c" />
      <path d="M72 100c8-4 16-3 20 1" stroke="#1c1c1c" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      <path d="M108 101c8-4 16-3 20 1" stroke="#1c1c1c" strokeWidth="2.1" fill="none" strokeLinecap="round" />
      <path d="M88 134c8 8 18 8 26 0" stroke="#b87460" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="124" rx="7" ry="3.5" fill="#e08a74" opacity="0.35" />
      <ellipse cx="128" cy="124" rx="7" ry="3.5" fill="#e08a74" opacity="0.35" />
    </>
  ),
  headphones: (
    <>
      <rect width="200" height="200" fill="#f6e6dc" />
      <path d="M36 200c8-46 32-72 64-72s56 26 64 72" fill="#c4553a" />
      <path d="M46 108c-2-28 10-52 28-64" stroke="#2a2a32" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M154 108c2-28-10-52-28-64" stroke="#2a2a32" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="34" y="100" width="18" height="28" rx="8" fill="#2a2a32" />
      <rect x="148" y="100" width="18" height="28" rx="8" fill="#2a2a32" />
      <ellipse cx="58" cy="118" rx="8" ry="12" fill="#c48462" />
      <ellipse cx="142" cy="118" rx="8" ry="12" fill="#c48462" />
      <ellipse cx="100" cy="116" rx="46" ry="52" fill="#d0936a" />
      <path d="M56 108c6-44 24-66 44-66s40 22 46 64c-12-20-26-30-46-30s-34 10-44 32z" fill="#3a2a24" />
      <ellipse cx="84" cy="114" rx="4" ry="4.8" fill="#2a211c" />
      <ellipse cx="118" cy="114" rx="4" ry="4.8" fill="#2a211c" />
      <path d="M74 104c7-4 14-3 18 1" stroke="#3a2a24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108 105c7-4 14-3 18 1" stroke="#3a2a24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M92 136c5 4 12 4 18 0" stroke="#b87460" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  cap: (
    <>
      <rect width="200" height="200" fill="#e7eef8" />
      <path d="M32 200c12-50 36-76 68-76s56 26 68 76" fill="#f4f1ea" />
      <ellipse cx="56" cy="122" rx="10" ry="13" fill="#e7bc9c" />
      <ellipse cx="148" cy="122" rx="10" ry="13" fill="#e7bc9c" />
      <ellipse cx="100" cy="124" rx="48" ry="52" fill="#f3c7a8" />
      <path d="M48 108c6-18 22-46 52-50 34 2 54 28 58 52-16-8-34-6-52 2-20 8-40 8-58-4z" fill="#2f3d73" />
      <path d="M46 112c18 10 40 14 70 8 16-4 30-4 42 2-8 10-24 8-40 4-28-8-52-8-72-14z" fill="#24325f" />
      <path d="M118 78c28 6 46 18 52 28-20 2-38-2-52-10-6-16-6-22 0-18z" fill="#3d4e86" />
      <ellipse cx="84" cy="124" rx="4.2" ry="5" fill="#2a211c" />
      <ellipse cx="120" cy="124" rx="4.2" ry="5" fill="#2a211c" />
      <path d="M72 114c8-4 16-3 20 1" stroke="#5a4638" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108 115c8-4 16-3 20 1" stroke="#5a4638" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M86 146c10 9 22 9 32 0" stroke="#d08b78" strokeWidth="2.3" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="136" rx="8" ry="4" fill="#eea090" opacity="0.4" />
      <ellipse cx="130" cy="136" rx="8" ry="4" fill="#eea090" opacity="0.4" />
    </>
  ),
  pink: (
    <>
      <rect width="200" height="200" fill="#fde8f1" />
      <path d="M34 200c10-48 34-74 66-74s56 26 66 74" fill="#fff8f4" />
      <ellipse cx="54" cy="122" rx="10" ry="13" fill="#e4b196" />
      <ellipse cx="146" cy="122" rx="10" ry="13" fill="#e4b196" />
      <ellipse cx="100" cy="122" rx="48" ry="54" fill="#f0c0a4" />
      <path d="M48 118c2-52 24-78 52-78s50 24 54 74c-8-28-28-44-54-44s-44 16-52 48z" fill="#e25d96" />
      <path d="M70 96c6-22 16-34 30-36-8 14-10 28-8 40-8-2-16-2-22-4z" fill="#c94380" />
      <path d="M128 92c8 2 16 10 18 22-10-6-20-8-28-4 2-8 6-14 10-18z" fill="#f08ab4" />
      <ellipse cx="84" cy="122" rx="4.2" ry="5" fill="#3a2430" />
      <ellipse cx="120" cy="122" rx="4.2" ry="5" fill="#3a2430" />
      <path d="M72 112c8-5 16-4 20 1" stroke="#6a3148" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M108 113c8-5 16-4 20 1" stroke="#6a3148" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M88 144c8 7 18 7 26 0" stroke="#d48978" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="72" cy="134" rx="8" ry="4" fill="#f0a0b0" opacity="0.55" />
      <ellipse cx="128" cy="134" rx="8" ry="4" fill="#f0a0b0" opacity="0.55" />
    </>
  ),
};
