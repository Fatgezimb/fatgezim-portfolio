"use client";

import { useEffect } from "react";
import styles from "./DocumentRevealRegistry.module.css";

type RevealState = "before" | "visible" | "after";

export type DocumentRevealRegistryProps = {
  /** IntersectionObserver root margin. Negative block margins keep reveals intentional. */
  rootMargin?: string;
  /** Fraction of an element that should enter the viewport before it is visible. */
  threshold?: number;
};

const revealSelector = "[data-reveal]";

function positionState(element: HTMLElement): RevealState {
  const bounds = element.getBoundingClientRect();

  if (bounds.bottom <= 0) return "after";
  if (bounds.top >= window.innerHeight) return "before";
  return "visible";
}

function setRevealState(element: HTMLElement, state: RevealState) {
  element.dataset.revealState = state;
}

/**
 * Registers every `[data-reveal]` element in the document.
 *
 * The accompanying CSS is deliberately inert until this component adds its
 * registry class to `<html>`, so server-rendered and no-JavaScript content is
 * always visible. Add `data-reveal="up|fade|scale"` to an element and,
 * optionally, `data-reveal-exit="recede"` for a restrained exit state.
 */
export function DocumentRevealRegistry({
  rootMargin = "-6% 0px -12% 0px",
  threshold = 0.16,
}: DocumentRevealRegistryProps) {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const supportsObserver = "IntersectionObserver" in window;
    const observerThreshold = Number.isFinite(threshold)
      ? Math.min(1, Math.max(0, threshold))
      : 0.16;
    const observerThresholds =
      observerThreshold === 0 ? [0] : [0, observerThreshold];

    const observer = supportsObserver
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              const element = entry.target as HTMLElement;
              const rootHeight = entry.rootBounds?.height ?? window.innerHeight;
              const thresholdCanBeReached =
                entry.boundingClientRect.height * observerThreshold <= rootHeight;
              const isAlreadyVisible = element.dataset.revealState === "visible";

              if (
                entry.isIntersecting &&
                (isAlreadyVisible ||
                  entry.intersectionRatio >= observerThreshold ||
                  !thresholdCanBeReached)
              ) {
                setRevealState(element, "visible");
              } else if (entry.boundingClientRect.bottom <= 0) {
                setRevealState(element, "after");
              } else {
                setRevealState(element, "before");
              }
            }
          },
          { rootMargin, threshold: observerThresholds },
        )
      : null;

    function register(element: HTMLElement) {
      if (elements.has(element)) return;

      elements.add(element);
      setRevealState(
        element,
        reducedMotion.matches || !observer ? "visible" : positionState(element),
      );

      if (!reducedMotion.matches) observer?.observe(element);
    }

    function registerTree(node: Node) {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches(revealSelector)) register(node);
      node.querySelectorAll<HTMLElement>(revealSelector).forEach(register);
    }

    function unregister(element: HTMLElement) {
      observer?.unobserve(element);
      elements.delete(element);
      delete element.dataset.revealState;
    }

    function unregisterTree(node: Node) {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches(revealSelector)) unregister(node);
      node.querySelectorAll<HTMLElement>(revealSelector).forEach(unregister);
    }

    function revealFocusedElement(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;
      const revealRoot = event.target.closest<HTMLElement>(revealSelector);
      if (revealRoot && elements.has(revealRoot)) {
        setRevealState(revealRoot, "visible");
      }
    }

    function syncMotionPreference() {
      observer?.disconnect();

      if (reducedMotion.matches || !observer) {
        root.classList.remove(styles.registry);
        root.dataset.documentReveal = "static";
        elements.forEach((element) => setRevealState(element, "visible"));
        return;
      }

      elements.forEach((element) => {
        setRevealState(element, positionState(element));
        observer.observe(element);
      });
      root.dataset.documentReveal = "ready";
      root.classList.add(styles.registry);
    }

    document.querySelectorAll<HTMLElement>(revealSelector).forEach(register);

    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.removedNodes.forEach(unregisterTree);
        record.addedNodes.forEach(registerTree);
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    syncMotionPreference();
    document.addEventListener("focusin", revealFocusedElement);
    reducedMotion.addEventListener("change", syncMotionPreference);

    return () => {
      observer?.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("focusin", revealFocusedElement);
      reducedMotion.removeEventListener("change", syncMotionPreference);
      root.classList.remove(styles.registry);
      delete root.dataset.documentReveal;
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, [rootMargin, threshold]);

  return null;
}
