"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, X, Trash2, Eye, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  _id: string;
  quote: string;
  author: string;
  role: string;
  sourceUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const STATUS_ORDER: Record<string, number> = { pending: 0, approved: 1, rejected: 2 };

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials?all=true");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      const sorted = (Array.isArray(data.testimonials) ? data.testimonials : []).sort(
        (a: Testimonial, b: Testimonial) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
      );
      setTestimonials(sorted);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === id ? { ...t, status } : t)).sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
        );
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial permanently?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete testimonial:", error);
    } finally {
      setBusyId(null);
    }
  };

  const pendingCount = testimonials.filter((t) => t.status === "pending").length;

  return (
    <div className="min-h-screen bg-white p-8 antialiased">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black bg-linear-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-2">
              Testimonials
            </h1>
            <p className="text-slate-600 text-lg">
              {pendingCount > 0 ? (
                <span className="font-semibold text-orange-600">{pendingCount} awaiting review</span>
              ) : (
                <span className="text-slate-500">Nothing waiting on you right now</span>
              )}
              {" "}• Approved ones appear on the homepage automatically.
            </p>
          </div>
          <Link
            href="/review"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View submission form
          </Link>
        </div>

        {loading ? (
          <div className="grid place-items-center min-h-100">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
            />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100">
            <Eye className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-2">No submissions yet</h3>
            <p className="text-gray-400">Share the review link with a client to get your first one.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {testimonials.map((t) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border p-6 ${
                    t.status === "pending" ? "border-orange-200" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          t.status === "pending"
                            ? "bg-orange-100 text-orange-800"
                            : t.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {t.status}
                      </span>
                      <span className="text-xs text-slate-400 ml-3">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-slate-900 text-base leading-relaxed mb-3">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="text-sm text-slate-600 mb-4">
                    <strong className="text-slate-900">{t.author}</strong> — {t.role}
                    {t.sourceUrl && (
                      <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:underline">
                        {t.sourceUrl}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {t.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(t._id, "approved")}
                        disabled={busyId === t._id}
                        className="inline-flex items-center px-4 py-2 text-emerald-700 hover:text-emerald-900 font-medium text-sm bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-200 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </button>
                    )}
                    {t.status !== "rejected" && (
                      <button
                        onClick={() => updateStatus(t._id, "rejected")}
                        disabled={busyId === t._id}
                        className="inline-flex items-center px-4 py-2 text-slate-600 hover:text-slate-900 font-medium text-sm bg-slate-100 hover:bg-slate-200 rounded-xl transition-all duration-200 disabled:opacity-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(t._id)}
                      disabled={busyId === t._id}
                      className="inline-flex items-center px-4 py-2 text-red-600 hover:text-red-900 font-medium text-sm bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 disabled:opacity-50 ml-auto"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
