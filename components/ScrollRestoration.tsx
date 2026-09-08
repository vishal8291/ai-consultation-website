"use client";
import { useEffect } from "react";

function resetScrollIfNoHash() {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
}

// Browsers remember and restore the scroll position a page was at, in two
// different ways that both needed handling here:
//
// 1. Normal reloads / new navigations to the same URL — controlled by
//    history.scrollRestoration, which we set to "manual" below.
// 2. Mobile Chrome's back-forward cache (bfcache): reopening a tab that was
//    frozen rather than fully closed revives the exact page state, including
//    scroll position, WITHOUT remounting React or rerunning this effect's
//    mount logic — it fires a "pageshow" event instead. That's why a mount-
//    only effect wasn't enough and the FAQ section kept reappearing on
//    mobile even after the first fix.
export default function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    resetScrollIfNoHash();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetScrollIfNoHash();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
