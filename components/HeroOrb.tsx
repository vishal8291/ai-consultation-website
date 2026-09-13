"use client";
import { useEffect, useRef } from "react";

type P3 = { x: number; y: number; z: number };

const POINTS = 360;
const NEIGHBOURS = 3;

/**
 * The hero's 3D graphic: a slowly turning sphere of linked nodes with two
 * orbit rings, reading as connected systems working together.
 *
 * Drawn on a plain canvas with a hand-rolled perspective projection rather
 * than three.js, which was removed from this repo; a decorative piece does
 * not justify bringing a renderer back. It pauses when off screen or in a
 * background tab, and draws a single still frame for reduced motion.
 */
export default function HeroOrb() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Evenly spread points on a unit sphere (Fibonacci lattice).
    const pts: P3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < POINTS; i++) {
      const y = 1 - (i / (POINTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
    }

    // Link each point to its nearest neighbours once, up front.
    const links: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < POINTS; i++) {
      const d = pts
        .map((p, j) => ({ j, d: (p.x - pts[i].x) ** 2 + (p.y - pts[i].y) ** 2 + (p.z - pts[i].z) ** 2 }))
        .sort((a, b) => a.d - b.d)
        .slice(1, NEIGHBOURS + 1);
      for (const { j } of d) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          links.push([i, j]);
        }
      }
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let angle = 0.6;
    let tiltX = 0;
    let tiltY = 0;
    let targetX = 0;
    let targetY = 0;
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
      // Sized so the outer ring, at its perspective-enlarged near side, stays
      // inside the canvas instead of being cropped at the edges.
      const R = Math.min(width, height) * 0.29;
      const focal = R * 3.2;

      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;
      const ay = angle + tiltY;
      const ax = 0.42 + tiltX;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);

      const project = (p: P3, scale = 1) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const s = focal / (focal + z2 * R * scale);
        return { x: cx + x1 * R * scale * s, y: cy + y2 * R * scale * s, z: z2, s };
      };

      // Soft bloom behind the sphere.
      const glow = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
      glow.addColorStop(0, "rgba(37, 99, 235, 0.30)");
      glow.addColorStop(0.45, "rgba(109, 40, 217, 0.12)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const proj = pts.map((p) => project(p));

      // Links, faded by depth so the back of the sphere recedes.
      ctx.lineWidth = 0.8;
      for (const [i, j] of links) {
        const a = proj[i], b = proj[j];
        const depth = (2 - (a.z + b.z)) / 4; // 1 = front, 0 = back
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.04 + depth * 0.32})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes.
      for (const p of proj) {
        const depth = (1 - p.z) / 2;
        ctx.fillStyle = depth > 0.5 ? `rgba(191, 219, 254, ${0.35 + depth * 0.6})` : `rgba(167, 139, 250, ${0.15 + depth * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (0.7 + depth * 1.5) * p.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // Two tilted orbit rings, each carrying a travelling node.
      const rings = [
        { scale: 1.26, tilt: 1.15, speed: 1, color: "96, 165, 250" },
        { scale: 1.44, tilt: -0.55, speed: -0.7, color: "167, 139, 250" },
      ];
      for (const ring of rings) {
        const ringPoint = (t: number): P3 => {
          const x = Math.cos(t), z = Math.sin(t);
          return { x, y: z * Math.sin(ring.tilt), z: z * Math.cos(ring.tilt) };
        };
        ctx.beginPath();
        for (let k = 0; k <= 96; k++) {
          const q = project(ringPoint((k / 96) * Math.PI * 2), ring.scale);
          if (k === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = `rgba(${ring.color}, 0.28)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const n = project(ringPoint(angle * 2.2 * ring.speed), ring.scale);
        ctx.fillStyle = `rgba(${ring.color}, 0.95)`;
        ctx.shadowColor = `rgba(${ring.color}, 0.9)`;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3.2 * n.s, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const tick = () => {
      angle += 0.0022;
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

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      targetY = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      targetX = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
    };

    resize();
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
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="block w-full h-full" />;
}
