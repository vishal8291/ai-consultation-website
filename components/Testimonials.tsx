"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, X, PenLine } from "lucide-react";
import Feedback from "@/components/Feedback";

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
 * Client testimonials. The "Write a review" trigger and header always render
 * (even with zero reviews — otherwise nobody could ever submit the first
 * one), but the card grid only renders once there's at least one, so an
 * empty state never shows a visibly-empty grid. Clicking "Write a review"
 * opens the <Feedback /> form in a modal; on success it closes itself and
 * the list refreshes to show the new entry immediately.
 */
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showModal, setShowModal] = useState(false);

  const loadTestimonials = useCallback(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        }
      })
      .catch(() => {
        /* list just stays as-is on failure — never break the page for this */
      });
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const single = testimonials.length === 1;
  const rated = testimonials.filter((t) => typeof t.rating === "number");
  const averageRating =
    rated.length > 0 ? rated.reduce((sum, t) => sum + (t.rating || 0), 0) / rated.length : null;

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-[var(--border-default)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              What clients say
            </p>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-[var(--accent)] transition-colors"
            >
              <PenLine className="w-4 h-4" style={{ color: "var(--accent)" }} />
              Write a review
            </button>
          </div>

          {averageRating !== null && (
            <div className="flex items-center gap-2 text-sm">
              <StarRow rating={Math.round(averageRating)} />
              <span className="text-slate-600 font-medium">
                {averageRating.toFixed(1)}/5 from {rated.length} review{rated.length === 1 ? "" : "s"}
              </span>
            </div>
          )}
        </div>

        {testimonials.length > 0 && (
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
        )}
      </div>

      {/* WRITE A REVIEW MODAL */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-slate-900 rounded-3xl max-w-md w-full border-2 border-black shadow-2xl p-6 sm:p-8 relative"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <Feedback
                onSuccess={() => {
                  setShowModal(false);
                  loadTestimonials();
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
