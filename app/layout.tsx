import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import GanpatiGreeting from "@/components/GanpatiGreeting";
import ScrollRestoration from "@/components/ScrollRestoration";
import type { Metadata } from "next";

const GA_MEASUREMENT_ID = "G-EFQGVR8B6G";
const SITE_URL = "https://customeai.tech";

// Replaces a body font-stack that led with 'Aptos' — a Microsoft system font
// with no @font-face bundled, so it only ever rendered for visitors who
// already had it installed locally (effectively Windows + recent Office
// only). Everyone else silently fell through to Arial, which sits ahead of
// the site's own bundled Open Sans web font in the old fallback chain, so
// that web font rarely ever actually rendered either. Inter is loaded as a
// full variable font (one file, every weight) and is properly embeddable.
// Three roles, per the brand direction: Sora carries display headlines,
// Manrope the body copy, JetBrains Mono the code panel and the FAQ's
// terminal-style question prefixes.
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const SITE_DESCRIPTION =
  "CustomeAI is a Mumbai-based studio that builds websites, AI agents and automation tools for small businesses across India, working remote-first.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CustomeAI | Websites, AI agents & automation tools",
    template: "%s | CustomeAI",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "custom website development",
    "AI agents for small business",
    "automation tools for small business",
    "AI agent development India",
    "business automation India",
    "AI chatbot development",
    "small business website studio",
    "website design agency Mumbai",
    "AI automation Mumbai",
    "web development studio India",
  ],
  authors: [{ name: "CustomeAI" }],
  creator: "CustomeAI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CustomeAI",
    title: "CustomeAI | Websites, AI agents & automation tools",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CustomeAI: Websites, AI agents & automation tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CustomeAI | Websites, AI agents & automation tools",
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CustomeAI",
  url: SITE_URL,
  logo: `${SITE_URL}/images/reallogo-transparent.png`,
  image: `${SITE_URL}/images/reallogo-transparent.png`,
  description: SITE_DESCRIPTION,
  email: "customeai.tech@gmail.com",
  telephone: "+918291569470",
  priceRange: "₹12,000 - ₹1,20,000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Mumbai" },
  ],
  sameAs: ["https://www.instagram.com/vishal.buildss"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <ScrollRestoration />
        <Navbar />
        {children}
        <CookieConsent />
        <GanpatiGreeting />
      </body>
    </html>
  );
}
