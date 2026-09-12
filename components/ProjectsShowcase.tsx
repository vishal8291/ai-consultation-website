"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA, Project } from "@/lib/projectsData";
import { ProjectGraphicSVG, ProjectIconSVG } from "@/components/AiSvgGraphics";
import { ExternalLink, CheckCircle2, ArrowRight, X, Sparkles, Cpu, Layers, Github, Globe, Globe2, Bot, LayoutGrid } from "lucide-react";

interface ProjectsShowcaseProps {
  limit?: number;
  showFilters?: boolean;
  isHomepage?: boolean;
  hideHeader?: boolean;
}

const CATEGORIES = [
  { label: "All work", key: "All", icon: LayoutGrid },
  { label: "Websites", key: "Websites", icon: Globe2 },
  { label: "AI Agents", key: "AI Agents", icon: Bot },
  { label: "Apps & SaaS", key: "Apps & SaaS", icon: Layers },
] as const;

/** The three case studies featured on the homepage, in render order. */
const HOMEPAGE_PROJECT_IDS = [
  "lex-agent-legal-auditor",
  "mahagro-india-training-platform",
  "freelance-ai-sales-agent",
];

export default function ProjectsShowcase({ limit, showFilters = true, isHomepage = false, hideHeader = false }: ProjectsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  let projectsToDisplay: Project[] = [];

  if (isHomepage || limit === 3) {
    // The homepage shortlist is named explicitly rather than derived (it used to
    // take the first project of each category, which meant the lineup changed
    // silently whenever PROJECTS_DATA was reordered). Edit this list to change
    // which three appear; order here is the order rendered.
    projectsToDisplay = HOMEPAGE_PROJECT_IDS.map((id) =>
      PROJECTS_DATA.find((p) => p.id === id)
    ).filter((p): p is Project => Boolean(p));
  } else {
    projectsToDisplay = PROJECTS_DATA.filter((project) => {
      if (selectedCategory === "All") return true;
      return project.category === selectedCategory;
    }).slice(0, limit || PROJECTS_DATA.length);
  }

  const renderCard = (project: Project, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white overflow-hidden flex flex-col justify-between relative group rounded-2xl border border-[var(--border-default)] hover:border-[var(--accent-strong)] transition-colors"
            >
              {/* Preview Banner Top */}
              <div className="h-64 sm:h-72 lg:h-80 bg-slate-900 relative overflow-hidden flex items-center justify-center">
                {project.previewImage ? (
                  <img
                    src={project.previewImage}
                    alt={`${project.title} live preview`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="p-4 w-full h-full flex items-center justify-center">
                    <ProjectGraphicSVG type={project.svgType} />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
                  <span className="px-3 py-1 rounded-md bg-slate-900/90 text-white text-[11px] font-semibold tracking-wide backdrop-blur-md">
                    {project.category}
                  </span>
                  {project.engagement === "client" ? (
                    <span className="px-3 py-1 rounded-md text-white text-[11px] font-semibold tracking-wide backdrop-blur-md" style={{ background: "var(--accent)" }}>
                      Real client project
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md bg-white/85 text-slate-700 text-[11px] font-semibold tracking-wide backdrop-blur-md">
                      Independent build
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.results?.primary && (
                    <p className="text-sm text-slate-600 mt-1.5">
                      {project.results.primary}
                    </p>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-bold text-slate-900 hover:text-black transition-colors inline-flex items-center space-x-1"
                  >
                    <span>View case study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-900 text-white hover:bg-white hover:text-black transition-colors"
                      title="View Live Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
  );

  return (
    <section id="projects" className="relative py-20 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="mb-10">
            <div className="rule-hairline mb-8" />
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-slate-900 mb-3 tracking-[-0.03em] leading-[1.0]"
            >
              {isHomepage || limit === 3 ? (
                <>Our <span className="headline-accent">work</span></>
              ) : (
                <>Case <span className="headline-accent">studies</span></>
              )}
            </motion.h2>

            {!(isHomepage || limit === 3) && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-medium"
              >
                Our client work, alongside the systems we've built independently to prove out what we can deliver.
              </motion.p>
            )}
          </div>
        )}

        {/* Category Tabs (Shown on Portfolio page or when showFilters is enabled) */}
        {showFilters && !isHomepage && limit !== 3 && (
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.key;
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition-all ${
                    isActive
                      ? "bg-slate-900 text-white border-2 border-slate-900"
                      : "bg-white hover:bg-slate-50 text-slate-700 border border-[var(--border-default)]"
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Grouped rendering: on the full projects page, client work and
            independent builds are shown as separate, labelled sections so a real
            client result is never diluted by self-initiated demos. The homepage
            shortlist stays a single grid. */}
        {isHomepage || limit === 3 ? (
          /* Two across rather than three: the screenshots are the evidence on
             this page, so they get the width to actually be legible. */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectsToDisplay.map((project, index) => renderCard(project, index))}
          </div>
        ) : (
          (() => {
            const clientWork = projectsToDisplay.filter((p) => p.engagement === "client");
            const independent = projectsToDisplay.filter((p) => p.engagement === "independent");
            return (
              <div className="space-y-16">
                {clientWork.length > 0 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Client work</h3>
                      <p className="text-sm text-slate-500 mt-1">Paid engagements delivered for real businesses.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {clientWork.map((project, index) => renderCard(project, index))}
                    </div>
                  </div>
                )}
                {independent.length > 0 && (
                  <div>
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Independent builds</h3>
                      <p className="text-sm text-slate-500 mt-1">Systems we designed and built ourselves to prove out what we can deliver.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                      {independent.map((project, index) => renderCard(project, index))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        )}

        {/* SEE ALL PROJECTS CTA BUTTON (For Homepage View) */}
        {(isHomepage || limit === 3) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center space-x-3 px-10 py-4.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105 border-2 border-slate-900 group"
            >
              <span>See all projects</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
            </Link>
          </motion.div>
        )}

      </div>

      {/* Project Case Study Details Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-black shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold border border-[var(--border-default)]">
                    {activeModalProject.category}
                  </span>
                  <h3 className="text-2xl font-semibold text-slate-900 mt-2">{activeModalProject.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">Industry: {activeModalProject.clientIndustry}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
                  <p className="font-bold text-slate-900 mb-1">Executive Summary:</p>
                  <p>{activeModalProject.description}</p>
                </div>

                {activeModalProject.results && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[activeModalProject.results.primary, activeModalProject.results.secondary, activeModalProject.results.roi]
                      .filter(Boolean)
                      .map((stat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-black text-white text-center">
                          <p className="text-xs sm:text-sm font-semibold leading-tight">{stat}</p>
                        </div>
                      ))}
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Key Features Delivered</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {activeModalProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200">
                  {activeModalProject.demoUrl && (
                    <a
                      href={activeModalProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-black text-white font-semibold text-sm inline-flex items-center space-x-2 hover:bg-slate-800 transition-colors"
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm inline-flex items-center space-x-2 hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
