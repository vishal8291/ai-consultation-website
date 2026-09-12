"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  sourceUrl?: string;
  rating?: number;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-3" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="w-4 h-4"
          style={{
            color: n <= rating ? "var(--accent)" : "var(--border-strong)",
            fill: n <= rating ? "var(--accent)" : "transparent",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Approved client testimonials, fetched live. Renders nothing while there are
 * none, so an unpopulated "what clients say" section never ships (an empty
 * one reads as "no clients"). Submissions come in via /review or the compact
 * <Feedback /> widget and publish instantly.
 */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {
        /* section just stays hidden on failure — never break the page for this */
      });
  }, []);

  if (testimonials.length === 0) return null;

  const single = testimonials.length === 1;
  const rated = testimonials.filter((t) => typeof t.rating === "number");
  const averageRating =
    rated.length > 0 ? rated.reduce((sum, t) => sum + (t.rating || 0), 0) / rated.length : null;

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            What clients say
          </p>
          {averageRating !== null && (
            <div className="flex items-center gap-2 text-sm">
              <StarRow rating={Math.round(averageRating)} />
              <span className="text-slate-600 font-medium">
                {averageRating.toFixed(1)}/5 from {rated.length} review{rated.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>

        <div className={single ? "max-w-3xl" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={t._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[var(--surface-alt)] border border-[var(--border-default)] rounded-lg p-6 sm:p-8 flex flex-col"
            >
              {typeof t.rating === "number" ? (
                <StarRow rating={t.rating} />
              ) : (
                <Quote className="w-6 h-6 mb-4 flex-shrink-0" style={{ color: "var(--accent)" }} aria-hidden />
              )}
              <blockquote className={`text-slate-900 leading-relaxed ${single ? "text-xl sm:text-2xl font-medium" : "text-base"}`}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
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
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
