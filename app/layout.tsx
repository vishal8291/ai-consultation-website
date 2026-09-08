import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import ScrollRestoration from "@/components/ScrollRestoration";
import type { Metadata } from "next";

const GA_MEASUREMENT_ID = "G-EFQGVR8B6G";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "CustomeAI | Tell us the problem, we build the fix",
  description: "CustomeAI is a small-business-focused studio that builds custom websites and AI systems around your actual problem, not a fixed menu of services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
