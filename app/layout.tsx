import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vishal.buildss | Bespoke Premium Websites & AI Systems",
  description: "High-end bespoke websites, Small to Enterprise web platforms, and AI automation systems built by vishal.buildss.",
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
      </body>
    </html>
  );
}
