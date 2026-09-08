import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import ScrollRestoration from "@/components/ScrollRestoration";
import type { Metadata } from "next";

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
      <body className={`${openSans.variable} font-sans`}>
        <ScrollRestoration />
        <Navbar />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
