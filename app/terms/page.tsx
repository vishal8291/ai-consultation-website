import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions for CustomeAI's websites, AI agents and automation tools.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return <TermsPageClient />;
}
