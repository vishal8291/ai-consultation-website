"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { initScrollProgress, destroyScrollProgress } from "./ScrollProgress";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => null,
});

type Mode = "hidden" | "low" | "high";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function computeMode(): Mode {
  if (typeof window === "undefined") return "hidden";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "hidden";
  if (!hasWebGL()) return "hidden";
  const width = window.innerWidth;
  if (width < 640) return "hidden";
  if (width < 1024) return "low";
  return "high";
}

export default function AmbientBackground() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(computeMode());

    const idle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback(() => setMounted(true))
        : setTimeout(() => setMounted(true), 200);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setMode(computeMode());
    reducedMotionQuery.addEventListener("change", handleChange);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => setMode(computeMode()), 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      reducedMotionQuery.removeEventListener("change", handleChange);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if ("cancelIdleCallback" in window && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as ReturnType<typeof setTimeout>);
      }
    };
  }, []);

  useEffect(() => {
    if (mode === "hidden") return;
    initScrollProgress();
    return () => destroyScrollProgress();
  }, [mode]);

  if (mode === "hidden" || !mounted) return null;

  return <SceneCanvas quality={mode === "high" ? "high" : "low"} />;
}
