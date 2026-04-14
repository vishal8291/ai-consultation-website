import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // ✅ File will exist after Step 1
import type { Metadata } from "next"; // ✅ Proper Metadata type

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { // ✅ FIXED: Proper Metadata type
  title: "AI Consultation",
  description: "Professional AI consulting services",
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
