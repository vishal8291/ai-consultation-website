import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import ScrollRestoration from "@/components/ScrollRestoration";
import type { Metadata } from "next";

const GA_MEASUREMENT_ID = "G-EFQGVR8B6G";
const SITE_URL = "https://customeai.tech";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-open-sans",
});

const SITE_DESCRIPTION =
  "CustomeAI is a small-business-focused studio that builds custom websites and AI systems around your actual problem, not a fixed menu of services. Launched in 7 to 21 days.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "CustomeAI | Tell us the problem, we build the fix",
    template: "%s | CustomeAI",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "custom website development",
    "AI systems for small business",
    "AI consultation",
    "custom software development India",
    "AI chatbot development",
    "small business website studio",
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
    title: "CustomeAI | Tell us the problem, we build the fix",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CustomeAI — Tell us the problem, we build the fix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CustomeAI | Tell us the problem, we build the fix",
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
  "@type": "Organization",
  name: "CustomeAI",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-clean.png`,
  description: SITE_DESCRIPTION,
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
      <body className={`${openSans.variable} font-sans`}>
        <ScrollRestoration />
        <Navbar />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
