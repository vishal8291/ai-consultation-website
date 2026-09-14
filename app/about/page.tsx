import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CustomeAI is a founder-led studio for small businesses. We build websites, AI agents and automation tools, starting with the problem that's actually broken.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About CustomeAI",
    description:
      "We start with your problem, not our services list. Meet the studio behind CustomeAI.",
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
