"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ConsultationForm from "@/components/ConsultationForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import Testimonials from "@/components/Testimonials";
import PrakritiChatbot from "@/components/PrakritiChatbot";
import HeroRings from "@/components/HeroRings";
import AutoplayVideo from "@/components/AutoplayVideo";
import { ArrowRight } from "lucide-react";

const FACTS = [
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

const PROCESS = [
  { step: "01", title: "Understand", desc: "We learn about your goals and write down exactly what needs to be built." },
  { step: "02", title: "Design", desc: "We design how it will look and feel, and show you before building it." },
  { step: "03", title: "Build", desc: "We build it to be fast, clean, and reliable from day one." },
  { step: "04", title: "Launch and support", desc: "We put it live, then stay on for 30 to 90 days to fix anything and help you settle in." },
];

export default function Home() {
  const [showAllAutomation, setShowAllAutomation] = React.useState(false);

  return (
    <main className="min-h-screen text-slate-900 antialiased selection:bg-black selection:text-white relative overflow-x-hidden">

      {/* HERO
          Modelled on a large-consultancy split hero: solid black ground,
          a light humanist headline with generous line spacing, a readable
          paragraph, one blue pill CTA, and a 3D graphic on the right. */}
      <section
        id="hero"
        className="relative overflow-hidden"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 lg:pt-20 pb-12 lg:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 lg:min-h-[640px]">

            {/* Message */}
            <div className="lg:w-[55%] relative z-10">
              {/* Pure CSS entrance so the headline paints on the first frame
                  instead of waiting on React hydration. The body face is used
                  at 300 because its humanist shapes match the reference. */}
              <h1
                className="hero-fade-in-up text-[38px] sm:text-5xl xl:text-[56px] leading-[1.3] tracking-[-0.01em] text-balance"
                style={{ animationDelay: "0.1s", color: "#ffffff", fontWeight: 300, fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif" }}
              >
                We build websites, AI agents &amp; automation tools.
              </h1>

              <p
                className="hero-fade-in-up mt-6 text-lg sm:text-[20px] leading-[1.75] max-w-[600px]"
                style={{ animationDelay: "0.2s", color: "#ffffff", fontWeight: 400 }}
              >
                Custom websites and AI systems for small businesses. Describe what&apos;s
                broken in your own words, and we&apos;ll reply within 24 hours with an
                honest read and a real price.
              </p>

              <div className="hero-fade-in-up mt-10" style={{ animationDelay: "0.3s" }}>
                <a
                  href="#contact"
                  className="btn-hero inline-flex items-center justify-center px-12 py-3.5 text-lg"
                >
                  Start a conversation
                </a>
              </div>
            </div>

            {/* 3D graphic */}
            <div
              className="hero-fade-in-up lg:w-[45%] w-full h-[340px] sm:h-[460px] lg:h-[560px]"
              style={{ animationDelay: "0.25s" }}
            >
              <HeroRings />
            </div>

          </div>
        </div>
      </section>

      {/* From here down the page alternates black and white bands (tone-black
          and tone-white in globals.css), starting white after the black hero. */}

      {/* FACTS + CLIENTS */}
      <section className="tone-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <dl className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
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
              <span className="text-sm font-semibold text-slate-900 group-hover:underline underline-offset-4">
                MAHAGRO INDIA
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* WHAT WE DO
          The services video, edge to edge, between the heading and the call
          to action. */}
      <section id="services" className="tone-black py-14 sm:py-16 border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
            What we do
          </h2>
        </div>

        <AutoplayVideo src="/OUR%20SERVICES.mp4" label="Video of our services" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <a
            href="#contact"
            className="btn-hero inline-flex items-center justify-center px-6 py-3 text-sm space-x-2"
          >
            <span>Request a proposal</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* WHAT WE CAN AUTOMATE
          A capability list, not a package menu. Plain columns rather than cards,
          so it reads as a reference list and stays visually distinct from the
          four service cards above it. */}
      <section id="automation" className="tone-white py-14 sm:py-16 border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rule-hairline mb-8" />
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                What we can automate
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-slate-900 tracking-[-0.03em] leading-[1.0]">
                If you do it every week, <span className="headline-accent">it can run itself</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg text-slate-600 leading-relaxed">
              A reference list, not a package menu. Not seeing yours? Ask.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {(showAllAutomation ? AUTOMATION_AREAS : AUTOMATION_AREAS.slice(0, 3)).map((group) => (
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

          {!showAllAutomation && (
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setShowAllAutomation(true)}
                className="btn-white-solid px-6 py-3 text-sm"
              >
                See all {AUTOMATION_AREAS.length} areas
              </button>
            </div>
          )}

          <p className="mt-12 pt-8 border-t border-[var(--border-default)] text-base text-slate-600 max-w-3xl">
            Not sure it is worth automating at all?{" "}
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

      {/* CLIENT SPOTLIGHT — the one real, delivered client engagement, with the
          concrete engineering details that signal "we understand your business
          risk, not just design." All factual and drawn from the full case study. */}
      <section className="tone-black py-14 sm:py-16 border-y border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Client spotlight
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
                A booking site MAHAGRO INDIA can trust with real money
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                A training institute running since 1995 needed online registrations
                and payments without ever losing a booking. It runs in production today.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://mahagroindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  Visit the live site
                </a>
                <a
                  href="/projects"
                  className="btn-hero inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  Read the case study
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <dl className="grid sm:grid-cols-2 gap-4">
                {[
                  { k: "Payments that never block a booking", v: "Razorpay checkout with a WhatsApp + UPI fallback, so a registration still completes even if the card gateway hiccups." },
                  { k: "Built for a bilingual audience", v: "Full English / Marathi switching, because many students are more comfortable registering in Marathi." },
                  { k: "Secured like it handles real data", v: "CSP, HSTS, and prepared statements against SQL injection, verified against the live site." },
                  { k: "The owner is never in the dark", v: "Instant WhatsApp and email the moment someone registers, plus a password-protected admin dashboard." },
                ].map((item) => (
                  <div key={item.k} className="bg-white border border-[var(--border-default)] rounded-lg p-5">
                    <dt className="text-sm font-semibold text-slate-900 mb-1.5">{item.k}</dt>
                    <dd className="text-sm text-slate-600 leading-relaxed">{item.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CLIENTS SAY — "Write a review" opens the Feedback form in a
          modal (see Testimonials.tsx); the card grid only renders once
          there's at least one review. */}
      <div className="tone-white">
        <Testimonials />
      </div>

      {/* OUR WORK */}
      <div className="tone-black">
        <ProjectsShowcase limit={3} isHomepage={true} />
      </div>

      {/* HOW WE WORK */}
      <section id="process" className="tone-white py-14 sm:py-16 border-y border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rule-hairline mb-8" />
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                How we work
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-slate-900 tracking-[-0.03em] leading-[1.0]">
                From first call to <span className="headline-accent">launch</span>
              </h2>
            </div>
            <p className="lg:col-span-5 text-lg text-slate-600 leading-relaxed">
              Four stages, each ending in a checkpoint.
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
      <div className="tone-black">
        <TestimonialsSection />
      </div>

      {/* PRICING */}
      <div className="tone-white">
        <PricingSection />
      </div>

      {/* FAQ */}
      <div className="tone-black">
        <FaqSection />
      </div>

      {/* CONTACT */}
      <div className="tone-white">
        <ConsultationForm />
      </div>

      <PrakritiChatbot />

      <Footer />
    </main>
  );
}
