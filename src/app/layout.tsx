import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Newsreader } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JsonLd } from "@/components/site/json-ld";
import { themeBootScript } from "@/components/site/theme-toggle";
import {
  homeDescription,
  homeTitle,
  organizationGraph,
  site,
  titleTemplate,
} from "@/lib/seo";
import "./globals.css";

const stayAtTopOnLoadScript = `(function(){try{var path=location.pathname;if(path!=="/"&&path!=="")return;if(!location.hash)return;history.scrollRestoration="manual";history.replaceState(null,"",path+location.search);var allow=true;var pin=function(){if(allow)scrollTo(0,0)};pin();document.addEventListener("DOMContentLoaded",pin);addEventListener("pointerdown",function(){allow=false},{capture:true,once:true});addEventListener("load",function(){pin();history.scrollRestoration="auto"});}catch(e){}})();`;

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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: titleTemplate,
  },
  description: homeDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "social",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
  },
  icons: {
    icon: [{ url: "/logo-mark.webp", type: "image/webp" }],
    apple: [{ url: "/logo-mark.webp", type: "image/webp" }],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
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
        <script dangerouslySetInnerHTML={{ __html: stayAtTopOnLoadScript }} />
        <div className="flex min-h-screen flex-col bg-brand-cream font-sans text-brand-ink antialiased">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-brand-cream focus:px-4 focus:py-2 focus:text-sm focus:text-brand-ink"
          >
            Skip to content
          </a>
          <JsonLd data={organizationGraph()} />
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
