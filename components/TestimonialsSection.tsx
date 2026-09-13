"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, KeyRound, Tag, Headphones, CheckCircle2 } from "lucide-react";

/**
 * The four promises. Copy is taken from the supplied design, which happens to
 * state this studio's actual terms: 7 to 21 day delivery, full ownership, no
 * hidden fees, and 30 to 90 days of post-launch support.
 */
const PROMISES = [
  {
    icon: Rocket,
    title: "Fast, reliable delivery",
    desc: "Most projects are delivered within 7 to 21 days. We keep you updated at every step so deadlines are always on track.",
  },
  {
    icon: KeyRound,
    title: "You own everything",
    desc: "You get full ownership of the website, code, database, and all files. No lock-in, ever. Your project is 100% yours.",
  },
  {
    icon: Tag,
    title: "Transparent pricing",
    desc: "Quotes are clear and detailed, so you know exactly what you're paying for. Zero hidden fees, guaranteed.",
  },
  {
    icon: Headphones,
    title: "Free support period",
    desc: "Enjoy 30 to 90 days of free support after launch. We're here to help and make sure everything runs smoothly.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* Background is built in CSS rather than dropped in as the supplied
          image, because that image has the cards baked into it. Recreating it
          keeps every word real text for search engines and screen readers.
          Three stacked layers: the indigo base, the aurora flare sweeping in
          from the top right, and the violet wave rising from the bottom left. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #160d3a 0%, #2a1663 45%, #1a1046 100%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(62% 46% at 84% 16%, rgba(233,213,255,0.42) 0%, rgba(168,85,247,0.20) 34%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 42% at 16% 96%, rgba(139,92,246,0.34) 0%, transparent 66%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-white max-w-3xl mx-auto leading-snug">
          We stand by four promises to deliver clarity, value, and peace of mind.
        </h2>

        {/* Hairline with a bright centre point, as in the reference. */}
        <div
          aria-hidden="true"
          className="mx-auto mt-6 mb-12 h-px w-full max-w-2xl"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(216,180,254,0.85) 50%, transparent 100%)",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROMISES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                /* Light cards sit on a dark panel here, so their colours are
                   set locally rather than taken from the page tokens, which
                   are tuned for the dark ground. */
                className="rounded-[20px] p-6 sm:p-7 flex flex-col"
                style={{ background: "#f7f5fb" }}
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(145deg, #4c1d95 0%, #6d28d9 100%)",
                      boxShadow:
                        "0 0 0 6px rgba(255,255,255,0.8), 0 0 24px rgba(216,180,254,0.55)",
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                  </div>
                </div>

                <h3
                  className="text-center text-lg font-semibold mb-4"
                  style={{ color: "#1a1030" }}
                >
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: "#4b4459" }}>
                  {item.desc}
                </p>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full" style={{ background: "#e4dcf7" }} />
                  <div className="flex items-center gap-2.5 pt-4">
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0"
                      strokeWidth={1.75}
                      style={{ color: "#6d28d9" }}
                    />
                    <span className="text-sm" style={{ color: "#5c5378" }}>
                      Always included
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
