import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { themeBootScript } from "@/components/site/theme-toggle";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif-display",
});

export const metadata: Metadata = {
  title: {
    default: "DafoTalk",
    template: "%s · DafoTalk",
  },
  description:
    "DafoTalk helps you find someone who understands where you're coming from — based on who you are, what matters to you, and what you want to talk about.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${display.variable} dark h-full antialiased`}>
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <div className="flex min-h-screen flex-col bg-brand-cream font-sans text-brand-ink antialiased">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand-cream focus:px-4 focus:py-2 focus:text-sm focus:text-brand-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
