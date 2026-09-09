"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ConsultationForm from "@/components/ConsultationForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import PrakritiChatbot from "@/components/PrakritiChatbot";
import { ArrowRight, Globe, Bot, CheckCircle2, Cpu, Layers } from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Custom website design",
    desc: "A website built for your business rather than adapted from a template. Fast on every connection, readable on every screen, and structured so search engines can index it properly.",
    points: [
      "Loads in under a second",
      "Clean layout that is simple to read and navigate",
      "Built so search engines can find you",
    ],
  },
  {
    icon: Cpu,
    title: "Business and website review",
    desc: "We examine how your business runs today, identify where time and revenue are being lost, and set out the specific fix worth building first.",
    points: [
      "Find what is slowing you down",
      "See how quickly the work pays for itself",
      "Get a written plan of what to build",
    ],
  },
  {
    icon: Bot,
    title: "AI assistants and automation",
    desc: "Support that answers around the clock, tools that read and sort documents automatically, and systems that connect the applications you already use.",
    points: [
      "AI that answers from your own files",
      "Works with WhatsApp and your support tools",
      "A person reviews anything that matters",
    ],
  },
  {
    icon: Layers,
    title: "Custom apps and dashboards",
    desc: "Login portals, internal dashboards, and operational software built to match how your business actually works, instead of forcing your process into a product that was never designed for it.",
    points: [
      "Stays responsive as your data grows",
      "Each person sees only what they should",
      "Built to stay online and reliable",
    ],
  },
];

const FACTS = [
  { label: "Delivery", value: "7 to 21 days" },
  { label: "Ownership", value: "100% yours" },
  { label: "Post-launch support", value: "30 to 90 days" },
  { label: "Based in", value: "Mumbai, India" },
];

/**
 * Automation capability list. This is deliberately broad rather than a set of
 * fixed packages: the point is for a visitor to find their own problem in it and
 * conclude we can take on whatever they have. Worded as what we build, not as
 * work already delivered, since only some of these have shipped for a client.
 */
const AUTOMATION_AREAS = [
  {
    area: "Sales and leads",
    items: [
      "Capture leads from your site, Instagram, or ads into one place",
      "Score and sort enquiries so the good ones surface first",
      "Automatic follow-up until someone replies",
      "Quotations and proposals generated from a template",
      "Appointment booking, confirmation, and reminders",
    ],
  },
  {
    area: "Customer communication",
    items: [
      "WhatsApp replies, order updates, and notifications",
      "AI chat support on your website, around the clock",
      "Email replies, campaigns, and follow-up sequences",
      "Support tickets raised and routed automatically",
      "Anything complicated handed to a real person",
    ],
  },
  {
    area: "Documents and data",
    items: [
      "Read PDFs, scans, and photos, and pull the fields out",
      "Form submissions straight into your database or CRM",
      "Invoices, contracts, and certificates generated on demand",
      "Records filed, renamed, and routed without anyone touching them",
      "Data moved between systems that were never built to talk",
    ],
  },
  {
    area: "Money and admin",
    items: [
      "Invoices raised and chased automatically",
      "Payment links sent, confirmations logged",
      "Payments matched against orders",
      "Expenses sorted into categories",
      "Daily, weekly, or monthly reports in your inbox",
    ],
  },
  {
    area: "Operations and stock",
    items: [
      "Low stock alerts and automatic purchase triggers",
      "Orders processed and customers notified at each stage",
      "Delivery tracking updates sent without being asked",
      "Staff attendance, leave, and shift notifications",
      "Alerts when something breaks, before a customer notices",
    ],
  },
  {
    area: "Marketing and content",
    items: [
      "Social posts drafted, scheduled, and published",
      "Ad creative and variations generated in bulk",
      "Audience lists built and segmented from your own data",
      "Blog and product copy drafted from a brief",
      "Performance pulled into one report you actually read",
    ],
  },
];

const NEXT_STEPS = [
  {
    title: "You describe the problem",
    desc: "In your own words. No brief, no spec, no technical vocabulary needed.",
  },
  {
    title: "We reply within 24 hours",
    desc: "With an honest read on whether it is a website fix, an AI system, or something else, plus a real price.",
  },
  {
    title: "Work starts once you agree",
    desc: "50% to begin, 50% on delivery. You own everything at the end of it.",
  },
];

const PROCESS = [
  { step: "01", title: "Understand", desc: "We learn about your goals and write down exactly what needs to be built." },
  { step: "02", title: "Design", desc: "We design how it will look and feel, and show you before building it." },
  { step: "03", title: "Build", desc: "We build it to be fast, clean, and reliable from day one." },
  { step: "04", title: "Launch and support", desc: "We put it live, then stay on for 30 to 90 days to fix anything and help you settle in." },
];

export default function Home() {
  return (
    <main className="min-h-screen text-slate-900 antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

      {/* HERO
          Asymmetric and left-aligned rather than a centered marketing block:
          large firms lead with the message on the left and something concrete
          beside it, instead of centering everything and filling the right with
          decoration. The panel on the right is real content (what actually
          happens after someone gets in touch), not an illustration. */}
      <section
        id="hero"
        className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 bg-white border-b border-[var(--border-default)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Message */}
            <div className="lg:col-span-7">
              <p
                className="hero-fade-in-up text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5"
                style={{ animationDelay: "0.05s" }}
              >
                Web and AI studio
                <span className="mx-2 text-slate-300">/</span>
                Mumbai, India
              </p>

              {/* Exact 3-Line Headline Format Requested by User — pure CSS entrance so it
                  paints on first frame instead of waiting on React hydration */}
              <h1
                className="hero-fade-in-up text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-tight leading-[1.1] text-[var(--foreground)] font-sans"
                style={{ animationDelay: "0.1s" }}
              >
                Tell us the problem. <br />
                <span style={{ color: "var(--accent)" }}>We build the fix.</span> <br />
                Built for small businesses.
              </h1>

              <p
                className="hero-fade-in-up mt-6 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed"
                style={{ animationDelay: "0.2s" }}
              >
                CustomeAI is a studio, not a menu of packages. Describe the problem in your business: a website that isn&apos;t converting, a process eating up your week, a task you wish ran itself. We design, build, and support the specific system that fixes it, in <strong className="text-[var(--foreground)] font-semibold">7 to 21 days</strong>, with itemized pricing.
              </p>

              <div
                className="hero-fade-in-up mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href="#contact"
                  className="btn-yellow-solid px-6 py-3 text-sm flex items-center justify-center gap-2"
                >
                  <span>Start a conversation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/projects"
                  className="btn-white-solid px-6 py-3 text-sm text-center"
                >
                  See our work
                </a>
              </div>

            </div>

            {/* What happens next */}
            <div
              className="hero-fade-in-up lg:col-span-5 w-full"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="glass-card-pro p-6 sm:p-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5">
                  What happens next
                </h2>

                <ol className="space-y-5">
                  {NEXT_STEPS.map((s, i) => (
                    <li key={s.title} className="flex gap-4">
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full border border-[var(--border-default)] flex items-center justify-center text-xs font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1">
                          {s.title}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 pt-5 border-t border-[var(--border-default)] text-sm text-slate-600">
                  Prefer to talk first?{" "}
                  <a
                    href="mailto:customeai.tech@gmail.com"
                    className="font-semibold underline underline-offset-2"
                    style={{ color: "var(--accent)" }}
                  >
                    Email us directly
                  </a>
                  .
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FACTS + CLIENTS */}
      <section className="bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  {f.label}
                </dt>
                <dd className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 pt-8 border-t border-[var(--border-default)] flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
              Clients
            </p>
            <a
              href="https://mahagroindia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 group"
            >
              <img
                src="/images/mahagro-logo.png"
                alt="MAHAGRO INDIA logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-sm font-semibold text-slate-900 group-hover:text-[var(--accent)] transition-colors">
                MAHAGRO INDIA
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="services" className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              Website design and AI automation, built to fit
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Most small-business problems fall into one of four areas. Tell us yours and we will tell you honestly which one it is, including when the answer is that you do not need us yet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card-pro p-7 sm:p-8 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center mb-5">
                    <Icon style={{ color: "var(--accent)" }} className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {s.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5 font-medium">
                    {s.desc}
                  </p>

                  <ul className="space-y-2.5 mt-auto">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 mr-2.5 mt-0.5 flex-shrink-0 text-slate-400" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10">
            <a
              href="#contact"
              className="btn-yellow-solid inline-flex items-center justify-center px-6 py-3 text-sm space-x-2"
            >
              <span>Request a proposal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* WHAT WE CAN AUTOMATE
          A capability list, not a package menu. Plain columns rather than cards,
          so it reads as a reference list and stays visually distinct from the
          four service cards above it. */}
      <section id="automation" className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              What we can automate
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              If your team does it the same way every week, it can probably run itself
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Most repetitive business work falls into the areas below. This is a
              reference list rather than a set of packages: we build the specific
              combination your business needs. If what you do isn&apos;t here, it is
              usually a variation of something that is, so ask.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {AUTOMATION_AREAS.map((group) => (
              <div key={group.area} className="border-t border-[var(--border-default)] pt-5">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  {group.area}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 leading-relaxed pl-4 relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.6em] w-1.5 h-px"
                        style={{ background: "var(--accent)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-12 pt-8 border-t border-[var(--border-default)] text-base text-slate-600 max-w-3xl">
            Not sure which of these your problem is, or whether it is worth
            automating at all?{" "}
            <a
              href="#contact"
              className="font-semibold underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              Describe it to us
            </a>{" "}
            and we will tell you honestly, including when the answer is that it
            is cheaper to leave it as it is.
          </p>
        </div>
      </section>

      {/* OUR WORK */}
      <ProjectsShowcase limit={3} isHomepage={true} />

      {/* HOW WE WORK */}
      <section id="process" className="py-14 sm:py-16 bg-white border-y border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mb-10 sm:mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              How we work
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              From first conversation to launch in 7 to 21 days
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Four stages, with a checkpoint at the end of each one, so you always know what has been done and what comes next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card-pro p-5 sm:p-6"
              >
                <div style={{ color: "var(--accent)" }} className="text-sm font-bold mb-3">
                  {p.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENTS */}
      <TestimonialsSection />

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <FaqSection />

      {/* CONTACT */}
      <ConsultationForm />

      <PrakritiChatbot />

      <Footer />
    </main>
  );
}
