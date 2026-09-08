import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Real websites and AI systems CustomeAI has built for real businesses, from AI sales agents to full e-commerce platforms.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Our Work | CustomeAI",
    description:
      "Real websites and AI systems CustomeAI has built for real businesses.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
