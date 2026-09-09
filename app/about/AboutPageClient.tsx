"use client";
import React from "react";
import Footer from "@/components/Footer";

const PRINCIPLES = [
  {
    title: "The problem comes before the proposal",
    body: "We do not open with a package. Every engagement starts by establishing what is actually costing the business time or revenue, and we say so plainly when the answer is that the work is not worth doing yet.",
  },
  {
    title: "One price, agreed before work begins",
    body: "Every quote is itemised and fixed at the point of agreement. There are no hourly rates, no change-order surprises, and no charge for scope we did not agree with you in writing.",
  },
  {
    title: "The client owns the result",
    body: "Source code, designs, content, and infrastructure accounts transfer to the client on completion. Nothing is held on a proprietary platform, and nothing requires an ongoing licence from us to keep running.",
  },
  {
    title: "We only claim what we have built",
    body: "Capabilities described on this site reflect systems we have actually delivered. Where a requirement falls outside our experience, we say so and, where appropriate, decline the work.",
  },
];

const FACTS = [
  { label: "Headquarters", value: "Mumbai, Maharashtra, India" },
  { label: "Operating model", value: "Remote, across India and overseas" },
  { label: "Focus", value: "Small and mid-sized businesses" },
  { label: "Delivery", value: "7 to 21 days per engagement" },
  { label: "Commercial terms", value: "50% advance, 50% on delivery" },
  { label: "Post-launch support", value: "30 to 90 days included" },
];

const CAPABILITIES = [
  {
    title: "Web design and development",
    body: "Corporate sites, booking and registration platforms, and e-commerce, built for speed and search visibility rather than adapted from templates.",
  },
  {
    title: "AI systems and automation",
    body: "Assistants that answer from a business's own material, document and data extraction pipelines, and workflows that connect existing tools.",
  },
  {
    title: "Custom software",
    body: "Internal dashboards, customer portals, and operational tools built around an organisation's existing process rather than replacing it.",
  },
  {
    title: "Advisory and review",
    body: "Assessment of an existing site or process, identifying where revenue or working hours are being lost, and a written plan of what to address first.",
  },
];

export default function AboutPageClient() {
  return (
    <main className="min-h-screen bg-white text-slate-900 antialiased selection:bg-black selection:text-white">

      {/* HERO */}
      <section className="pt-32 pb-14 sm:pt-40 sm:pb-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-4">
              About CustomeAI
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] text-slate-900 mb-6">
              We start with the problem, not the services list.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              CustomeAI is a web and AI studio based in Mumbai. We design, build,
              and support websites, automation, and custom software for small and
              mid-sized businesses, working to fixed prices and short delivery
              windows.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                Who we are
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-6">
                Built for businesses that were sold a package and got a template
              </h2>

              <div className="space-y-5 text-base text-slate-600 leading-relaxed">
                <p>
                  Most agencies present a small business with a menu: three tiers,
                  pick one. But an owner losing customers to a poor search listing
                  has a fundamentally different problem from one spending two hours
                  a day answering the same questions, and neither fits a tier
                  cleanly. What the client receives is whatever the tier contained.
                </p>
                <p>
                  CustomeAI was established to operate the other way round. An
                  engagement begins with the problem the business is actually
                  experiencing, and the website, AI system, or software we propose
                  follows from that assessment. The scope is written down, the
                  price is fixed before work starts, and the client owns everything
                  produced.
                </p>
                <p>
                  We are deliberately a small practice. Work is delivered by a
                  senior engineer end to end rather than scoped by one person and
                  handed to another, which is what makes a 7 to 21 day delivery
                  window possible. We take on a limited number of engagements at a
                  time, and we would rather decline work than staff it thinly.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-t-2 border-slate-900 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-5">
                  At a glance
                </p>
                <dl className="space-y-4">
                  {FACTS.map((f) => (
                    <div
                      key={f.label}
                      className="pb-4 border-b border-[var(--border-default)] last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-slate-500 mb-1">{f.label}</dt>
                      <dd className="text-base font-semibold text-slate-900">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Four areas of practice
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="border-t border-[var(--border-default)] pt-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              How we work
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
              Four commitments we hold to on every engagement
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              These are the terms we work under, not aspirations. Each one is
              stated in writing before an engagement begins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-9">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="border-t border-[var(--border-default)] pt-5">
                <p
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              Leadership
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
              Who you will be working with
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-4">
              <div className="border-t-2 border-slate-900 pt-6">
                <h3 className="text-2xl font-semibold text-slate-900 mb-1">
                  Vishal Tiwari
                </h3>
                <p className="text-base text-slate-600 mb-4">
                  Founder and Principal Engineer
                </p>
                <a
                  href="https://vishal-tiwari.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold underline underline-offset-2"
                  style={{ color: "var(--accent)" }}
                >
                  Professional profile
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-base text-slate-600 leading-relaxed lg:pt-6">
              <p>
                Vishal leads every engagement at CustomeAI, from the initial
                assessment through to delivery and post-launch support. He works
                across the full stack, covering interface design, application and
                API development, database design, and the integration of AI models
                into production systems.
              </p>
              <p>
                Recent work includes a bilingual training and registration platform
                with integrated payments for an agricultural business in
                Maharashtra, an AI system that reviews commercial documents for
                small enterprises, and an automated outreach and proposal engine
                built on retrieval over a client&apos;s own material.
              </p>
              <p>
                Clients deal with him directly. There is no account manager between
                the person specifying the work and the person building it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
                Contact
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
                Tell us what is going wrong
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-7 max-w-xl">
                Describe the problem in your own words. We reply within 24 hours
                with an assessment of what it would take to fix, and a price.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/#contact" className="btn-yellow-solid px-6 py-3 text-sm text-center">
                  Start a conversation
                </a>
                <a
                  href="mailto:vishal.buildss@gmail.com"
                  className="btn-white-solid px-6 py-3 text-sm text-center"
                >
                  Email us
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-t-2 border-slate-900 pt-6 space-y-4 text-base">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <a
                    href="mailto:vishal.buildss@gmail.com"
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    vishal.buildss@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Office hours</p>
                  <p className="font-semibold text-slate-900">
                    Monday to Saturday, 10:00 to 19:00 IST
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Location</p>
                  <p className="font-semibold text-slate-900">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
