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
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-black text-white rounded-2xl border border-slate-800 shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-white">We use cookies</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            We use essential cookies to keep you signed in and remember your preferences. See our{" "}
            <a href="/privacy" className="text-white underline hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>{" "}
            for details.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Decline Cookies
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Accept Cookies
          </button>
          <button
            type="button"
            onClick={handleDecline}
            aria-label="Dismiss"
            className="hidden sm:flex p-2 rounded-full text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
