import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const scrollState = { progress: 0 };

let trigger: ScrollTrigger | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
let registered = false;

function scheduleRefresh() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
}

export function initScrollProgress() {
  if (typeof window === "undefined" || trigger) return;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  trigger = ScrollTrigger.create({
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3,
    onUpdate: (self) => {
      scrollState.progress = self.progress;
    },
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());

  resizeObserver = new ResizeObserver(scheduleRefresh);
  resizeObserver.observe(document.body);
}

export function destroyScrollProgress() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeObserver?.disconnect();
  resizeObserver = null;
  trigger?.kill();
  trigger = null;
}
