import React from "react";

/**
 * The single place the CustomeAI mark is defined. Navbar and footer both render
 * through this file, so changing the logo is one edit here.
 *
 * The artwork is a square, stacked lockup: the robot-head mark sits above a
 * "CUSTOMEAI" wordmark and an "Intelligence" tagline. Dropped whole into a 64px
 * navbar that lockup is unreadable, so the <Mark> below shows only the head, by
 * scaling the image up inside a fixed square and offsetting it. The percentages
 * are tuned to the artwork; if the logo file is replaced, they need retuning.
 *
 * Points at the alpha-channel cutout, not the original. reallogo.png shipped
 * with a light grey (#f9f9fb) ground baked in, which needed a
 * mix-blend-multiply workaround to vanish against white and only worked on
 * white. The transparent version sits correctly on any surface, so the blend
 * mode is gone.
 */

const MARK_SRC = "/images/reallogo-transparent.png";

// Framing for the head within the square artwork.
const MARK_SCALE = "240%";
const MARK_LEFT = "-70%";
const MARK_TOP = "-43%";

function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-block overflow-hidden shrink-0 ${className}`}
    >
      <img
        src={MARK_SRC}
        alt=""
        className="absolute max-w-none"
        style={{
          width: MARK_SCALE,
          height: MARK_SCALE,
          left: MARK_LEFT,
          top: MARK_TOP,
        }}
      />
    </span>
  );
}

export default function Logo({
  showMark = true,
  className = "",
  markSize = "w-8 h-8",
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
