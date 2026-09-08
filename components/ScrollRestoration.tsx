"use client";
import { useEffect } from "react";

// Browsers remember and restore the scroll position a page was at, in ways
// that fight a fresh-looking page load:
//
// 1. Normal reloads / revisits to the same URL — controlled by
//    history.scrollRestoration, which we set to "manual" below.
// 2. Mobile Chrome's back-forward cache (bfcache): reopening a tab that was
//    frozen rather than fully closed revives the exact page state, including
//    scroll position, WITHOUT remounting React or rerunning a mount effect —
//    it fires a "pageshow" event instead.
// 3. The address bar itself: tapping an autocomplete suggestion (rather than
//    typing the full URL and hitting Enter) can load a previously-visited
//    full URL from history, hash fragment included, even when the visible
//    typed text was just the bare domain.
// 4. When the URL does carry a hash, the BROWSER's own native "jump to
//    anchor" behavior runs on its own schedule — often re-triggered as
//    images/fonts finish loading and shift the page's layout — so a single
//    scrollTo(0, 0) call can win the race and still get overridden a moment
//    later. Stripping the hash from the URL removes the target the browser
//    keeps trying to scroll back to, and re-asserting the top position for
//    a short window after mount outlasts those late layout-shift rescrolls.
export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const settle = () => {
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
    };

    settle();

    // Keep re-asserting for ~1s to outlast late native anchor-scroll attempts
    // triggered by images/fonts/animations shifting layout after mount.
    const start = Date.now();
    let frame: number;
    const tick = () => {
      settle();
      if (Date.now() - start < 1000) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        settle();
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}
