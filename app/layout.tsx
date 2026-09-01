import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vishal.buildss | Websites & AI Systems",
  description: "Custom websites and AI automation systems for small businesses to enterprise, built by vishal.buildss.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
