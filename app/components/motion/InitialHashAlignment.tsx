"use client";

import { useEffect } from "react";

const ALIGNMENT_WINDOW_MS = 3200;

/**
 * Re-aligns an initial deep link while responsive project demos finish hydrating.
 * The short correction window stops as soon as the visitor interacts, so ordinary
 * document scrolling remains entirely under user control.
 */
export function InitialHashAlignment() {
  useEffect(() => {
    const rawTargetId = window.location.hash.slice(1);
    let targetId = rawTargetId;
    try {
      targetId = decodeURIComponent(rawTargetId);
    } catch {
      // A malformed URL escape should not interrupt hydration or ordinary navigation.
    }
    if (!targetId) return;

    const target = document.getElementById(targetId);
    const main = document.querySelector("main");
    if (!target || !main) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let cancelled = false;
    let frame = 0;
    let alignmentInterval = 0;

    const align = () => {
      if (cancelled) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (cancelled) return;
        const headerHeight =
          document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          behavior: "instant" as ScrollBehavior,
          top: Math.max(0, targetTop - headerHeight - 10),
        });
      });
    };

    const stop = () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      window.clearInterval(alignmentInterval);
      observer?.disconnect();
      root.style.scrollBehavior = previousScrollBehavior;
    };

    const observer =
      "ResizeObserver" in window ? new ResizeObserver(align) : null;
    observer?.observe(main);

    const timers = [80, 160, 260, 380, 520, 800, 1200, 1800, 2600].map((delay) =>
      window.setTimeout(align, delay),
    );
    alignmentInterval = window.setInterval(align, 100);
    const stopTimer = window.setTimeout(stop, ALIGNMENT_WINDOW_MS);

    void document.fonts?.ready.then(align);
    align();

    const userEvents = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    userEvents.forEach((eventName) =>
      window.addEventListener(eventName, stop, { passive: true, once: true }),
    );

    return () => {
      stop();
      timers.forEach(window.clearTimeout);
      window.clearTimeout(stopTimer);
      userEvents.forEach((eventName) => window.removeEventListener(eventName, stop));
    };
  }, []);

  return null;
}
