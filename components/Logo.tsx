import React from "react";

/**
 * The single place the CustomeAI mark is defined.
 *
 * Currently a pure type wordmark: no image asset, so it stays sharp at every
 * size, costs nothing to load, and inherits the current text color. The
 * previous gold PNG was a beveled 3D "W" that read as the wrong letter, muddied
 * at navbar size, and disappeared entirely at favicon size.
 *
 * TO DROP IN A REAL LOGO LATER: replace the contents of <Mark /> below with an
 * <img>/<svg> and leave everything else alone. Every surface that shows the
 * logo (navbar, footer, and any future use) renders through this file, so the
 * swap is one edit in one place.
 */

function Mark({ className = "" }: { className?: string }) {
  // Placeholder mark: a plain ink square with the C knocked out. Deliberately
  // simple, since a commissioned mark is coming.
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[4px] bg-[var(--foreground)] text-white font-semibold leading-none ${className}`}
    >
      C
    </span>
  );
}

export default function Logo({
  showMark = true,
  className = "",
  markSize = "w-7 h-7 text-sm",
  textSize = "text-lg",
}: {
  showMark?: boolean;
  className?: string;
  markSize?: string;
  textSize?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {showMark && <Mark className={markSize} />}
      <span
        className={`${textSize} font-semibold tracking-tight text-[var(--foreground)]`}
      >
        Custome<span style={{ color: "var(--accent)" }}>AI</span>
      </span>
    </span>
  );
}
