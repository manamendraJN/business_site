/**
 * FOOTER HANDOVER — at the end of a page, the last section (marked
 * [data-footer-pin]) holds still and the footer rises over it (scroll-driven);
 * the section sinks back and darkens beneath it.
 * (No scaling: shrinking would show the sheet's straight side edges.)
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION } from "./common";

export function initFooterHandover(mm: gsap.MatchMedia) {
  const pin = document.querySelector<HTMLElement>("[data-footer-pin]");
  const sheet = document.querySelector<HTMLElement>("[data-footer-sheet]");
  const footer = document.querySelector<HTMLElement>("[data-site-footer]");
  if (!pin || !sheet || !footer) return;

  mm.add(MOTION, () => {
    const covering = {
      trigger: pin,
      start: "bottom bottom",
      end: () => `+=${footer.offsetHeight}`,
    };
    ScrollTrigger.create({ ...covering, pin: true, pinSpacing: false });
    gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { ...covering, scrub: true } })
      .fromTo(sheet, { y: 0 }, { y: 60 }, 0)
      .fromTo(pin.querySelectorAll("[data-footer-shade]"), { opacity: 0 }, { opacity: 0.55 }, 0);

    // opening or closing an answer changes the section's height: measure again
    const details = Array.from(pin.querySelectorAll("details"));
    const remeasure = () => ScrollTrigger.refresh();
    details.forEach((d) => d.addEventListener("toggle", remeasure));
    return () => details.forEach((d) => d.removeEventListener("toggle", remeasure));
  });
}
