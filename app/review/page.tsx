"use client";
import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ReviewPage() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    role: "",
    sourceUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try submitting again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white antialiased">
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 mb-3">
              Leave a review
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">
              Worked with us? Tell us how it went.
            </h1>
            <p className="text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              We read every submission before it goes on the site — nothing publishes automatically.
            </p>
          </div>

          <div className="glass-card-pro bg-white p-6 sm:p-10">
            {success ? (
              <div className="py-10 text-center space-y-5">
                <div style={{ color: "var(--accent)" }} className="w-16 h-16 rounded-full bg-[var(--surface-alt)] border border-[var(--border-default)] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Thank you.</h3>
                <p className="text-slate-600 max-w-sm mx-auto text-sm leading-relaxed">
                  We'll take a look and it'll appear on the site once approved.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    rows={5}
                    required
                    maxLength={800}
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="What did we build for you, and how has it worked out?"
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-medium"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                      Your Role / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Founder, Acme Systems"
                      className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Your Website (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    placeholder="https://yourbusiness.com"
                    className="w-full bg-white border border-[var(--border-default)] rounded-lg p-3 text-slate-900 placeholder-slate-400 focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[var(--accent)]/15 outline-none transition-all text-sm font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-yellow-solid w-full py-3.5 text-sm disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
