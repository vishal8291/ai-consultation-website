"use client";
import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-black text-2xl">
            !
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black">Critical Application Fault</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              A root layout failure occurred. Click below to re-initialize the application session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="w-full px-6 py-3 rounded-xl bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors shadow-md"
          >
            Re-initialize Application
          </button>
        </div>
      </body>
    </html>
  );
}
