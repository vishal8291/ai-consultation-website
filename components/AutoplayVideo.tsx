"use client";
import { useEffect, useRef } from "react";

/**
 * Muted, looping video that plays only while on screen. The autoplay
 * attribute alone proved unreliable on this site (the homepage showreel sat
 * buffered but paused), so playback is requested explicitly and a refusal is
 * swallowed. Pausing offscreen saves decoding work on low-powered phones, and
 * reduced-motion visitors get the first frame.
 */
export default function AutoplayVideo({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const attempt = () => {
      const played = video.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? attempt() : video.pause()),
      { threshold: 0.25 }
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={`block w-full h-auto ${className}`}
    />
  );
}
