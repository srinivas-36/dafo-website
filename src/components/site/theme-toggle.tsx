"use client";

const THEME_KEY = "dafotalk-theme";

function setTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* Storage can be blocked. The class still updates this visit. */
  }
}

const buttonClass =
  "grid place-items-center w-9 h-9 rounded-full border border-brand-line text-brand-ink/70 hover:text-brand-indigo hover:border-brand-indigo/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo/40 transition-colors";

export function ThemeToggle() {
  return (
    <>
      <button
        type="button"
        className={`${buttonClass} dark:hidden`}
        aria-label="Switch to dark mode"
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
      </button>
      <button
        type="button"
        className={`${buttonClass} hidden dark:grid`}
        aria-label="Switch to light mode"
        onClick={() => setTheme("light")}
      >
        <SunIcon />
      </button>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const themeBootScript = `(function(){try{document.documentElement.classList.add("dark");localStorage.setItem("${THEME_KEY}","dark");}catch(e){document.documentElement.classList.add("dark");}})();`;
