"use client";
import { useEffect } from "react";

// Chrome (and other browsers) remember the scroll position a page was at and
// restore it on the next load of that same URL — so once a visitor happened
// to be scrolled down to a section (e.g. the FAQ) and reloaded or reopened
// the tab, the browser kept snapping back there instead of starting at the
// top. Opt out of that restoration and always start fresh at the top, unless
// the URL itself points at a specific section (e.g. "/#pricing").
export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
