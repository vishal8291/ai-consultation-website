"use client";
import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

/**
 * Compact "Rate us" widget — a lower-friction alternative to the full /review
 * page. Star rating + name + a short comment, nothing else required. Posts to
 * the same /api/testimonials endpoint used by /review, so it publishes
 * instantly and shows up in the same "What clients say" section and the same
 * /admin/testimonials management list.
 */
export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (rating === 0) {
      setErrorMsg("Pick a star rating first.");
      return;
    }
    if (!name.trim() || !comment.trim()) {
      setErrorMsg("Your name and a short comment are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote: comment,
          author: name,
          rating,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card-pro bg-white p-6 sm:p-8 max-w-md mx-auto text-center space-y-3">
        <div style={{ color: "var(--accent)" }} className="w-12 h-12 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Thanks for rating us.</h3>
        <p className="text-slate-600 text-sm">It's live on the site now.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card-pro bg-white p-6 sm:p-8 max-w-md mx-auto space-y-4">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Rate us
        </p>
        <h3 className="text-lg font-semibold text-slate-900">How was your experience?</h3>
      </div>

      <div className="flex justify-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={rating === star}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1"
          >
            <Star
              className="w-8 h-8 transition-colors"
              style={{
                color: star <= (hoverRating || rating) ? "var(--accent)" : "var(--border-strong)",
                fill: star <= (hoverRating || rating) ? "var(--accent)" : "transparent",
              }}
            />
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
          {errorMsg}
        </div>
      )}

      <div>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
        />
      </div>

      <div>
        <textarea
          rows={3}
          required
          maxLength={800}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What was your experience like?"
          className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-medium"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-yellow-solid w-full py-3 text-sm disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
}
