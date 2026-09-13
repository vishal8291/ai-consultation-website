"use client";
import { useEffect, useRef } from "react";

type V3 = [number, number, number];

const SEGMENTS = 160;
const CORE_LOOPS = 40;

// Rotate a point by X then Y then Z angles.
function rotate([x, y, z]: V3, ax: number, ay: number, az: number): V3 {
  let c = Math.cos(ax), s = Math.sin(ax);
  [y, z] = [y * c - z * s, y * s + z * c];
  c = Math.cos(ay); s = Math.sin(ay);
  [x, z] = [x * c + z * s, -x * s + z * c];
  c = Math.cos(az); s = Math.sin(az);
  [x, y] = [x * c - y * s, x * s + y * c];
  return [x, y, z];
}

/**
 * The hero's 3D graphic: a chrome outer ring framing a gyroscope of two
 * turning inner rings (one chrome, one iridescent glass) around a colourful
 * woven core, reading as separate systems moving in step.
 *
 * Plain canvas with a small hand-written projection instead of three.js,
 * which was removed from this repo. Inner rings are drawn in two passes,
 * back half before the core and front half after it, so they pass behind
 * and in front of it like real 3D objects. Pauses when off screen or in a
 * background tab; reduced motion gets one still frame.
 */
export default function HeroRings() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sparkles = Array.from({ length: 70 }, () => ({ t: Math.random() * Math.PI * 2, o: (Math.random() - 0.5) * 0.8, a: Math.random() }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;
    let running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height) * 0.43;
      const focal = R * 4;
      const project = ([x, y, z]: V3) => {
        const s = focal / (focal + z);
        return { x: cx + x * s, y: cy + y * s, z, s };
      };

      // ---- Outer chrome ring: faces the viewer, with a slow wobble.
      const wobble = Math.sin(time * 0.35) * 0.22;
      const tube = R * 0.085;
      const rx = R * Math.cos(wobble);
      const chrome = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      chrome.addColorStop(0, "#9a9a9a");
      chrome.addColorStop(0.18, "#f4f4f4");
      chrome.addColorStop(0.36, "#3a3a3a");
      chrome.addColorStop(0.55, "#0d0d0d");
      chrome.addColorStop(0.72, "#8c8c8c");
      chrome.addColorStop(0.86, "#efe7c8");
      chrome.addColorStop(1, "#6f6f6f");
      ctx.lineWidth = tube;
      ctx.strokeStyle = chrome;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Thin inner and outer edge highlights give the tube its rounded look.
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx + tube * 0.42, R + tube * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, Math.max(1, rx - tube * 0.42), R - tube * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();

      // ---- Inner rings, split into back and front halves.
      type Seg = { a: ReturnType<typeof project>; b: ReturnType<typeof project>; t: number };
      const ring = (radius: number, ax: number, ay: number, az: number) => {
        const pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => {
          const t = (i / SEGMENTS) * Math.PI * 2;
          return project(rotate([Math.cos(t) * radius, Math.sin(t) * radius, 0], ax, ay, az));
        });
        const back: Seg[] = [], front: Seg[] = [];
        for (let i = 0; i < SEGMENTS; i++) {
          const seg = { a: pts[i], b: pts[i + 1], t: (i / SEGMENTS) * Math.PI * 2 };
          (pts[i].z + pts[i + 1].z > 0 ? back : front).push(seg);
        }
        return { back, front };
      };

      // Tilts stay between roughly 45 and 65 degrees so neither ring ever
      // turns edge-on and flattens into a line; the motion comes from the
      // rings rolling around the view axis and a gentle rocking.
      // Both rings roll together but sit about 80 degrees apart, so their
      // outlines always cross like a gyroscope instead of nesting.
      const roll = -0.6 - time * 0.16;
      const chromeRing = ring(R * 0.54, 0.98 + Math.sin(time * 0.5) * 0.14, 0.3 * Math.sin(time * 0.33), roll + 1.4);
      const glassRing = ring(R * 0.68, 0.88 + Math.cos(time * 0.42) * 0.14, -0.28 * Math.cos(time * 0.27), roll);

      const drawChrome = (segs: Seg[]) => {
        ctx.lineCap = "round";
        for (const { a, b, t } of segs) {
          const band = 0.5 + 0.5 * Math.cos(t * 2 + time * 0.8);
          const v = Math.round(40 + band * 215);
          ctx.strokeStyle = `rgb(${v}, ${v}, ${v})`;
          ctx.lineWidth = R * 0.055 * a.s;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      };

      const drawGlass = (segs: Seg[]) => {
        ctx.lineCap = "round";
        for (const { a, b, t } of segs) {
          const hue = ((t / (Math.PI * 2)) * 360 + time * 25) % 360;
          ctx.strokeStyle = `hsla(${hue}, 85%, 70%, 0.55)`;
          ctx.lineWidth = R * 0.1 * a.s;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          // A bright core line down the middle reads as light inside glass.
          ctx.strokeStyle = `hsla(${hue}, 100%, 90%, 0.5)`;
          ctx.lineWidth = R * 0.018 * a.s;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      };

      const drawSparkles = (segs: Seg[]) => {
        if (!segs.length) return;
        ctx.fillStyle = "rgba(255, 236, 160, 0.9)";
        for (const sp of sparkles) {
          const seg = segs[Math.floor(((sp.t / (Math.PI * 2)) * segs.length)) % segs.length];
          const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * 2 + sp.a * 10));
          ctx.globalAlpha = twinkle * 0.8;
          const nx = seg.a.x + (seg.b.y - seg.a.y) * sp.o;
          const ny = seg.a.y - (seg.b.x - seg.a.x) * sp.o;
          ctx.fillRect(nx, ny, 1.6, 1.6);
        }
        ctx.globalAlpha = 1;
      };

      drawChrome(chromeRing.back);
      drawGlass(glassRing.back);

      // ---- Woven colourful core.
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 1.1;
      const core = R * 0.25;
      for (let k = 0; k < CORE_LOOPS; k++) {
        ctx.beginPath();
        // Loops spread over a sphere of orientations weave into a ball.
        const phi = (k / CORE_LOOPS) * Math.PI;
        for (let i = 0; i <= 90; i++) {
          const t = (i / 90) * Math.PI * 2;
          const r = core * (0.78 + 0.12 * Math.sin(2 * t + time * 0.8 + k * 0.4) + 0.05 * Math.cos(3 * t - time * 0.6 + k));
          const p = rotate([Math.cos(t) * r, Math.sin(t) * r, 0], phi + time * 0.15, time * 0.25 + k * 0.08, phi * 0.5);
          const q = project(p);
          if (i === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        const hue = (k / CORE_LOOPS) * 300 + time * 30;
        ctx.strokeStyle = `hsla(${hue % 360}, 90%, 58%, 0.42)`;
        ctx.stroke();
      }
      ctx.restore();

      drawGlass(glassRing.front);
      drawSparkles(glassRing.front);
      drawChrome(chromeRing.front);
    };

    const tick = () => {
      time += 1 / 60;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    resize();
    time = 2;
    draw();

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      draw();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block w-full h-full" />;
}
