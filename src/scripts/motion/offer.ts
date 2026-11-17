/**
 * OFFER — the four services as stacking sheets.
 *
 * Home ("The offer"): each sheet sticks near the top (CSS sticky) and the
 * next one rises over it; the covered sheet shrinks and darkens. Each
 * emblem lifts off its sheet as the sheet arrives.
 *
 * Services page: the detailed service sections are taller than the screen,
 * so each one is held still once its bottom reaches the bottom of the
 * screen, and the next section rises over it with its torn edge. The
 * covered section sinks back and darkens (no shrinking: these sheets are
 * full width, and shrinking would show their straight side edges).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION } from "./common";

export function initOffer(mm: gsap.MatchMedia) {
  initHomeSheets(mm);
  initServiceSheets(mm);
}

function initHomeSheets(mm: gsap.MatchMedia) {
  const sheets = Array.from(document.querySelectorAll<HTMLElement>("[data-offer-sheet]"));
  if (!sheets.length) return;

  // stack on portrait phones and on tablets/computers with enough height
  const STACK = "(max-width: 767px) and (min-height: 560px), (min-width: 768px) and (min-height: 640px)";
  mm.add({ motion: MOTION, stack: STACK }, (ctx) => {
    const { motion, stack } = ctx.conditions as { motion: boolean; stack: boolean };
    if (!motion) return;

    sheets.forEach((sheet, i) => {
      const emblem = sheet.querySelector(".sheet-emblem");
      if (emblem) {
        gsap.from(emblem, {
          y: 50,
          rotate: -12,
          scale: 0.7,
          opacity: 0,
          duration: 0.9,
          delay: stack ? 0 : i * 0.08,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: sheet, start: "top 85%", once: true },
        });
      }

      const next = sheets[i + 1];
      if (!stack || !next) return;
      const shade = sheet.querySelector("[data-sheet-shade]");
      const stickyTop = () => parseFloat(getComputedStyle(next).top) || 0;
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: () => `top ${stickyTop()}px`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(sheet, { scale: 1 }, { scale: 0.92 }, 0)
        .fromTo(shade, { opacity: 0 }, { opacity: 0.5 }, 0);
    });
  });
}

function initServiceSheets(mm: gsap.MatchMedia) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-service-sheet]"));
  if (sections.length < 2) return;

  mm.add(MOTION, () => {
    sections.forEach((section, i) => {
      const next = sections[i + 1];
      if (!next) return;
      // Hold the section once all of it has been read (its bottom reaches the
      // bottom of the screen) — or at the top if it is shorter than the screen.
      const start = () => (section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top");
      const covering = {
        trigger: section,
        start,
        endTrigger: next,
        end: "top top",
        invalidateOnRefresh: true,
      };
      ScrollTrigger.create({ ...covering, pin: true, pinSpacing: false });
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { ...covering, scrub: true } })
        .fromTo(section.querySelector("[data-service-body]"), { y: 0 }, { y: 60 }, 0)
        .fromTo(section.querySelectorAll(".service-shade"), { opacity: 0 }, { opacity: 0.55 }, 0);
    });
  });
}
