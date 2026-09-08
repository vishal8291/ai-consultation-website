import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CustomeAI is a founder-led studio for small businesses. We start with the problem that's actually broken and build the custom website or AI system that fixes it, delivered in 7 to 21 days.",
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
