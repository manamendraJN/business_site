/**
 * PROOF — Scene 3 (short version on Home): the project index.
 */
import { gsap } from "gsap";
import { MOTION, FINE_POINTER } from "./common";

/**
 * Project index: hovering a row shows that project's screenshot floating
 * beside the cursor. It glides after the pointer and leans a little in the
 * direction of travel. Computers only (a fine pointer that can hover).
 */
function initIndexPreview(mm: gsap.MatchMedia, section: HTMLElement) {
  const list = section.querySelector<HTMLElement>("[data-proof-index] ul");
  const preview = section.querySelector<HTMLElement>("[data-index-preview]");
  if (!list || !preview) return;
  mm.add(`${MOTION} and ${FINE_POINTER}`, () => {
    const shots = Array.from(preview.querySelectorAll<HTMLElement>("[data-index-shot]"));
    gsap.set(preview, { yPercent: -50, scale: 0.86, rotate: 0, autoAlpha: 0 });
    // beside the cursor: to its right, or to its left near the right edge
    const besideX = (cx: number) => {
      const w = preview.offsetWidth;
      return cx + 28 + w > window.innerWidth ? cx - w - 28 : cx + 28;
    };
    const x = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3.out" });
    const y = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3.out" });
    const lean = gsap.quickTo(preview, "rotate", { duration: 0.5, ease: "power3.out" });
    let active = false;
    let lastX = 0;

    const show = (i: number) => {
      shots.forEach((s, j) => s.classList.toggle("is-on", i === j));
      if (!active) {
        active = true;
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
      }
    };
    const hide = () => {
      if (!active) return;
      active = false;
      lean(0);
      gsap.to(preview, { autoAlpha: 0, scale: 0.86, duration: 0.25, ease: "power2.in", overwrite: "auto" });
    };
    const move = (e: PointerEvent) => {
      x(besideX(e.clientX));
      y(e.clientY);
      lean(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.35));
      lastX = e.clientX;
    };
    const onEnter = (e: PointerEvent) => {
      const row = (e.target as Element).closest<HTMLElement>("[data-index-row]");
      if (!row) return;
      // start right at the cursor the first time, then glide from there
      if (!active) gsap.set(preview, { x: besideX(e.clientX), y: e.clientY });
      show(Number(row.dataset.indexRow));
    };

    list.addEventListener("pointerover", onEnter);
    list.addEventListener("pointerleave", hide);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      list.removeEventListener("pointerover", onEnter);
      list.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", hide);
      shots.forEach((s) => s.classList.remove("is-on"));
    };
  });
}

export function initProof(mm: gsap.MatchMedia) {
  const section = document.querySelector<HTMLElement>('[data-scene="proof"]');
  if (!section) return;
  initIndexPreview(mm, section);
}
