/**
 * Motion entry point. Runs on the client only.
 *
 * Lifecycle with Astro's ClientRouter:
 *   astro:page-load   → start(): smooth scroll + every scene on this page
 *   astro:before-swap → stop():  revert every animation, kill triggers,
 *                                destroy smooth scroll, remove listeners
 * Everything is created inside one gsap.matchMedia(), so reverting it
 * restores every element to its original (readable) state.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import { initHero } from "./hero";
import { initProof } from "./proof";
import { initOffer } from "./offer";
import { initMethod } from "./method";
import { initFooterHandover } from "./footer";
import { MOTION, initPopText, initParallax, initMagnetic, initReveal } from "./common";
import { initPageTransitions } from "./transitions";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let mm: gsap.MatchMedia | null = null;
const raf = (time: number) => lenis?.raf(time * 1000);

function start() {
  stop();
  const allowMotion = window.matchMedia(MOTION).matches;

  if (allowMotion) {
    // anchors are handled by jumpToHash() below, not by Lenis
    lenis = new Lenis({ autoRaf: false, lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
  }

  mm = gsap.matchMedia();
  initHero(mm);
  initProof(mm);
  initOffer(mm);
  initMethod(mm);
  initFooterHandover(mm);
  initPopText(mm);
  initReveal(mm);
  initParallax(mm);
  initMagnetic(mm);

  // Fonts can change line heights; measure again once they are ready, then
  // land on the section named in the address (e.g. /services/#care-plan).
  const ready = document.fonts?.ready ?? Promise.resolve();
  ready.then(() => {
    ScrollTrigger.refresh();
    if (location.hash) jumpToHash(location.hash, true);
  });
}

/* ---- In-page links (#section) ------------------------------------------
   One handler does the jump, so Astro's router and the smooth scroller
   never fight over the scroll position. */
const HEADER_GAP = 88; // keep the section title clear of the header tabs

function jumpToHash(hash: string, instant = false) {
  let target: HTMLElement | null = null;
  try {
    target = document.querySelector<HTMLElement>(decodeURIComponent(hash));
  } catch {
    return false;
  }
  if (!target) return false;
  // Work out the exact position ourselves (passing the element to Lenis
  // would also add the section's CSS scroll-margin and land too low).
  const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - HEADER_GAP);
  if (lenis) {
    lenis.scrollTo(y, { immediate: instant, force: true });
  } else {
    window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
  }
  return true;
}

document.addEventListener(
  "click",
  (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link || link.target === "_blank") return;
    const url = new URL(link.href, location.href);
    const samePage = url.origin === location.origin && url.pathname === location.pathname;
    if (!samePage || !url.hash) return;
    if (!jumpToHash(url.hash)) return;
    e.preventDefault();
    e.stopImmediatePropagation(); // the router must not handle it as well
    history.pushState(history.state, "", url.hash);
  },
  { capture: true },
);

function stop() {
  mm?.revert();
  mm = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  if (lenis) {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenis = null;
  }
}

initPageTransitions();
document.addEventListener("astro:page-load", start);
document.addEventListener("astro:before-swap", stop);
