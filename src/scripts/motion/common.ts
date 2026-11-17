/**
 * Shared motion helpers used across pages.
 * Each one only runs when motion is allowed, and everything it creates is
 * reverted automatically by gsap.matchMedia().
 */
import { gsap } from "gsap";

export const MOTION = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Pop-up words: headlines fold up off the page like a pop-up book. */
export function initPopText(mm: gsap.MatchMedia) {
  mm.add(MOTION, () => {
    document.querySelectorAll<HTMLElement>('[data-pop="load"], [data-pop="scroll"]').forEach((el) => {
      const words = el.querySelectorAll(".pop-word");
      if (!words.length) return;
      gsap.set(el, { perspective: 800 });
      const onScroll = el.dataset.pop === "scroll";
      gsap.from(words, {
        rotateX: -88,
        yPercent: 30,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.06,
        delay: onScroll ? 0 : 0.35,
        scrollTrigger: onScroll ? { trigger: el, start: "top 88%", once: true } : undefined,
      });
    });
  });
}

/** Gentle rise for supporting blocks that follow a headline. */
export function initReveal(mm: gsap.MatchMedia) {
  mm.add(MOTION, () => {
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
  });
}

/**
 * Mouse parallax: inside a [data-parallax-root], every [data-depth] layer
 * follows the pointer by its depth — far layers barely move, near layers
 * move most. This is what makes the paper scenes feel truly 3D.
 */
export function initParallax(mm: gsap.MatchMedia) {
  mm.add(`${MOTION} and ${FINE_POINTER}`, () => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-root]"));
    if (!roots.length) return;

    const layers = roots.map((root) =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => {
        const depth = parseFloat(el.dataset.depth || "0");
        return {
          depth,
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        };
      }),
    );

    // Only move scenes that are on screen.
    const visible = new Set<number>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const i = roots.indexOf(e.target as HTMLElement);
        if (e.isIntersecting) visible.add(i);
        else visible.delete(i);
      });
    });
    roots.forEach((r) => io.observe(r));

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      visible.forEach((i) => {
        layers[i].forEach((l) => {
          l.x(-nx * l.depth * 46);
          l.y(-ny * l.depth * 28);
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  });
}

/** Magnetic call to action: it leans toward the visitor's cursor. */
export function initMagnetic(mm: gsap.MatchMedia) {
  mm.add(`${MOTION} and ${FINE_POINTER}`, () => {
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const strength = el.classList.contains("tab") ? 0.18 : 0.35;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * strength);
        y((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    });
    return () => cleanups.forEach((c) => c());
  });
}

/** Helper: get the outer scroll-driven element for each named depth layer. */
export function layersOf(root: Element) {
  const get = (name: string) => root.querySelector<HTMLElement>(`[data-layer="${name}"]`);
  return { bg: get("bg"), far: get("far"), mid: get("mid"), near: get("near"), fg: get("fg") };
}
