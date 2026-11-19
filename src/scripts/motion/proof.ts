/**
 * PROOF — Scene 3 (short version on Home).
 * As each concept tile scrolls into view, the finished site settles into its
 * frame (a screenshot). Tiles with an illustrated world raise its layers at
 * different speeds instead, and a grey "before" card, if any, peels off.
 */
import { gsap } from "gsap";
import { MOTION, layersOf } from "./common";

function panelTimeline(panel: HTMLElement) {
  const before = panel.querySelector<HTMLElement>("[data-before]");
  const frame = panel.querySelector<HTMLElement>("[data-world-frame]");
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  if (!frame) return tl;
  const shot = frame.querySelector("[data-shot]");
  if (shot) tl.fromTo(shot, { scale: 1.14, yPercent: 4 }, { scale: 1, yPercent: 0 }, 0);
  const L = layersOf(frame);
  if (L.bg) {
    tl.fromTo(L.bg, { scale: 1.12 }, { scale: 1 }, 0)
      .fromTo(L.far, { yPercent: 8 }, { yPercent: 0 }, 0)
      .fromTo(L.mid, { yPercent: 16 }, { yPercent: 0 }, 0)
      .fromTo(L.near, { yPercent: 28 }, { yPercent: 0 }, 0)
      .fromTo(L.fg, { yPercent: 40, scale: 1.4, opacity: 0 }, { yPercent: 0, scale: 1, opacity: 1 }, 0);
  }
  if (before) {
    // the old site peels away like a sticker
    tl.to(before, { rotate: -26, xPercent: -60, yPercent: -55, scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.in" }, 0.55);
  }
  return tl;
}

export function initProof(mm: gsap.MatchMedia) {
  const section = document.querySelector<HTMLElement>('[data-scene="proof"]');
  if (!section) return;

  mm.add(MOTION, () => {
    section.querySelectorAll<HTMLElement>("[data-proof-panel]").forEach((panel) => {
      gsap.timeline({
        scrollTrigger: { trigger: panel, start: "top 90%", end: "top 30%", scrub: true },
      }).add(panelTimeline(panel));
    });
  });
}
