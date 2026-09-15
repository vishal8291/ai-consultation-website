"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

// Ganesh Chaturthi 2026 runs from 14 September to Anant Chaturdashi on
// 25 September. The greeting only appears inside that window (Mumbai time)
// and removes itself once the festival ends, so nobody has to remember to
// take it down.
const FESTIVAL_START = Date.parse("2026-09-14T00:00:00+05:30");
const FESTIVAL_END = Date.parse("2026-09-26T00:00:00+05:30");
const SEEN_KEY = "ganpati_greeting_2026";

// A string of marigolds along the top edge, alternating the two flower colours.
const MARIGOLDS = Array.from({ length: 22 }, (_, i) => (i % 2 === 0 ? "#f59e0b" : "#ea580c"));

export default function GanpatiGreeting() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const now = Date.now();
    if (now < FESTIVAL_START || now >= FESTIVAL_END) return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      // Storage blocked: still greet, it just may show again next visit.
    }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 ganpati-fade"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={close}
    >
      {/* Explicit colours for the same reason as CookieConsent: the site's
          utility classes are remapped by the dark-theme overrides. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ganpati-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[760px] max-h-[92vh] overflow-y-auto rounded-2xl ganpati-rise"
        style={{ backgroundColor: "#fffaf2", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}
      >
        <div className="flex justify-between px-3 pt-0" aria-hidden="true">
          {MARIGOLDS.map((c, i) => (
            <span key={i} className="flex flex-col items-center">
              <span className="block w-px h-2" style={{ backgroundColor: "#15803d" }} />
              <span className="block w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full" style={{ backgroundColor: c, boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.12)" }} />
            </span>
          ))}
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close greeting"
          className="absolute top-5 right-4 w-9 h-9 rounded-full flex items-center justify-center z-10"
          style={{ backgroundColor: "rgba(255,255,255,0.9)", color: "#1c1917", border: "1px solid #e7d8c3" }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid sm:grid-cols-[0.85fr_1fr] gap-0 p-4 sm:p-6 pt-3 sm:pt-4">
          <div className="relative aspect-[6/5] sm:aspect-auto sm:min-h-[380px] rounded-xl overflow-hidden" style={{ backgroundColor: "#f3e3cc" }}>
            <Image
              src="/images/festive/ganpati-bappa.webp"
              alt="Ganpati Bappa idol with a golden crown, raising a hand in blessing"
              fill
              sizes="(min-width: 640px) 320px, 90vw"
              className="object-cover object-[50%_25%]"
              priority
            />
          </div>

          <div className="flex flex-col justify-center px-1 sm:pl-7 sm:pr-8 pt-5 sm:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#c2410c" }}>
              Ganesh Chaturthi 2026 · Mumbai &amp; all of India
            </p>
            <p lang="mr" className="mt-3 text-2xl sm:text-[28px] leading-snug font-semibold" style={{ color: "#7c2d12" }}>
              गणपती बाप्पा मोरया!
            </p>
            <h2
              id="ganpati-title"
              className="mt-1 text-[26px] sm:text-[32px] leading-tight"
              style={{ color: "#1c1917", fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif", fontWeight: 600 }}
            >
              Happy Ganesh Chaturthi
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#44403c" }}>
              From every pandal in Mumbai to homes across India, we wish you and your family a joyful festival. May Bappa,
              the remover of obstacles, bless your home and every new beginning in your work.
            </p>
            <p className="mt-4 text-sm font-semibold" style={{ color: "#1c1917" }}>
              With warm wishes, Team CustomeAI
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-6 self-start rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
              style={{ backgroundColor: "#c2410c", color: "#ffffff" }}
            >
              Bappa Morya, thank you
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
