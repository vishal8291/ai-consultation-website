"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonialsData";

/**
 * Curated client testimonials. Renders nothing while TESTIMONIALS is empty, so
 * an unpopulated "what clients say" section never ships (an empty one reads as
 * "no clients"). Add real, permissioned quotes in lib/testimonialsData.ts and
 * this section appears automatically.
 */
export default function Testimonials() {
  if (!TESTIMONIALS || TESTIMONIALS.length === 0) return null;

  const single = TESTIMONIALS.length === 1;

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-8">
          What clients say
        </p>

        <div className={single ? "max-w-3xl" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={`${t.author}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[var(--surface-alt)] border border-[var(--border-default)] rounded-lg p-6 sm:p-8 flex flex-col"
            >
              <Quote className="w-6 h-6 mb-4 flex-shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
              <blockquote className={`text-slate-900 leading-relaxed ${single ? "text-xl sm:text-2xl font-medium" : "text-base"}`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {t.avatar && (
                  <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                )}
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">
                    {t.sourceUrl ? (
                      <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                        {t.role}
                      </a>
                    ) : (
                      t.role
                    )}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
