/**
 * METHOD — Scene 5.
 * Full version (Services page): the thread grows with the visitor's scroll
 * and each step's note folds open as it arrives.
 * Short version (Home): the five steps on one thread that grows as the
 * section passes, each number popping up as the thread reaches it.
 */
import { gsap } from "gsap";
import { MOTION } from "./common";

export function initMethod(mm: gsap.MatchMedia) {
  const list = document.querySelector<HTMLElement>("[data-method-steps]");
  const brief = document.querySelector<HTMLElement>("[data-method-brief]");
  if (!list && !brief) return;

  mm.add({ motion: MOTION, wide: "(min-width: 768px)" }, (ctx) => {
    const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };
    if (!motion) return;

    if (list) {
      const thread = list.querySelector("[data-method-thread]");
      if (thread) {
        gsap.fromTo(thread, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 70%", scrub: true },
        });
      }
      list.querySelectorAll<HTMLElement>("[data-step]").forEach((step) => {
        const note = step.querySelector("[data-step-note]");
        const num = step.querySelector(".step-num");
        gsap.set(step, { perspective: 900 });
        gsap.timeline({ scrollTrigger: { trigger: step, start: "top 80%", once: true } })
          .from(num, { scale: 0, duration: 0.4, ease: "back.out(2.2)" })
          .from(note, { rotateX: -75, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.2");
      });
    }

    if (brief) {
      const thread = brief.querySelector("[data-brief-thread]");
      const items = brief.querySelectorAll<HTMLElement>("[data-brief-step]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: brief, start: "top 95%", end: wide ? "top 55%" : "bottom 75%", scrub: true },
      });
      if (thread) tl.fromTo(thread, wide ? { scaleX: 0 } : { scaleY: 0 }, wide ? { scaleX: 1, duration: 1 } : { scaleY: 1, duration: 1 }, 0);
      items.forEach((item, i) => {
        const at = (i / Math.max(1, items.length - 1)) * 0.9;
        tl.fromTo(item.querySelector(".brief-num"), { scale: 0 }, { scale: 1, duration: 0.1, ease: "back.out(2.2)" }, at)
          .fromTo(item.querySelector("h3"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12 }, at + 0.03);
      });

    }
  });
}
