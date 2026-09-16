"use client";
import React, { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getCookie(CONSENT_COOKIE);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie(CONSENT_COOKIE, "accepted", CONSENT_MAX_AGE);
    setVisible(false);
  };

  const handleDecline = () => {
    // Records the choice itself so we don't keep re-prompting; only
    // strictly necessary (login session) cookies are used regardless.
    setCookie(CONSENT_COOKIE, "declined", CONSENT_MAX_AGE);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside aria-label="Cookie notice" className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6">
      {/* Explicit black-on-white rather than the site's bg-white / text-slate-900
          utilities: both are remapped by the dark-theme token overrides in
          globals.css (bg-white -> surface-card, text-slate-900 -> white), which
          would have rendered this on a dark ground with white text. */}
      <div
        className="max-w-3xl mx-auto rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5", boxShadow: "0 4px 16px rgba(15,17,17,0.12)" }}
      >
        <div
          className="w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#f5f5f5", borderColor: "#e5e5e5", color: "#000000" }}
        >
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold" style={{ color: "#000000" }}>We use cookies</p>
          <p className="text-xs leading-relaxed" style={{ color: "#333333" }}>
            We use essential cookies to keep you signed in and remember your preferences. See our{" "}
            <a href="/privacy" className="underline transition-colors" style={{ color: "#000000" }}>
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="btn-hero flex-1 sm:flex-none px-5 py-2.5 text-sm"
          >
            Decline Cookies
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="btn-hero flex-1 sm:flex-none px-5 py-2.5 text-sm"
          >
            Accept Cookies
          </button>
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Dismiss"
            className="hidden sm:flex p-2 rounded-full transition-colors hover:bg-[#f5f5f5]"
            style={{ color: "#666666" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
