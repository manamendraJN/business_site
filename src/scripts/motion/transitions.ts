/**
 * Page transitions in the same paper style: a torn sheet sweeps up over
 * the screen while the next page loads, then lifts away — turning the page.
 * Visitors who prefer reduced motion get an instant page change.
 */
import { gsap } from "gsap";
import type { TransitionBeforePreparationEvent } from "astro:transitions/client";
import { MOTION } from "./common";

let covered = false;

export function initPageTransitions() {
  const curtain = () => document.querySelector<HTMLElement>("[data-curtain]");
  const hidden = { y: 0, yPercent: 110, opacity: 0 };
  const c = curtain();
  if (c) gsap.set(c, hidden);

  document.addEventListener("astro:before-preparation", (event) => {
    const e = event as TransitionBeforePreparationEvent;
    const el = curtain();
    if (!el || !window.matchMedia(MOTION).matches) return;
    const load = e.loader;
    e.loader = async () => {
      gsap.set(el, { ...hidden, opacity: 1 });
      const cover = gsap.to(el, { yPercent: 0, duration: 0.6, ease: "power3.inOut" });
      await Promise.all([cover.then(), load()]);
      covered = true;
    };
  });

  document.addEventListener("astro:page-load", () => {
    const el = curtain();
    if (!el || !covered) return;
    covered = false;
    gsap.to(el, {
      yPercent: -115,
      duration: 0.75,
      delay: 0.05,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(el, hidden);
      },
    });
  });
}
