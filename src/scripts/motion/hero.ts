/**
 * HERO — Scenes 1 & 2, the signature moment.
 *
 * Beat 1 (load):   a ghost visitor drifts over the grey site and leaves.
 * Beat 2 (scroll): a crack runs down the page → the two halves swing open
 *                  toward the viewer → the grey room fades → the paper
 *                  landscape rises out of the page.
 * Beat 3 (scroll): the headline appears line by line on the left while the
 *                  studio van drives the road on the right, carrying the new
 *                  website. It arrives as the last line appears: the website
 *                  goes into the house and the windows light up.
 * Pinned and scrubbed, so the visitor controls the moment.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MOTION, layersOf } from "./common";

gsap.registerPlugin(MotionPathPlugin);

export function initHero(mm: gsap.MatchMedia) {
  const hero = document.querySelector<HTMLElement>('[data-scene="hero"]');
  if (!hero) return;

  mm.add({ motion: MOTION, mobile: "(max-width: 767px)" }, (ctx) => {
    const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
    if (!motion) return;

    const q = <T extends Element = HTMLElement>(sel: string) => hero.querySelector<T>(sel)!;
    const stage = q("[data-hero-stage]");
    const win = q("[data-hook-window]");
    const halfL = q('[data-half="left"]');
    const halfR = q('[data-half="right"]');
    const crack = q("[data-hook-crack]");
    const backdrop = q("[data-hook-backdrop]");
    const veil = q("[data-hook-veil]");
    const sharpStamp = q("[data-hook-stamp]");
    const halfStamps = hero.querySelectorAll(".hook-half .tpl-stamp");
    const note = q("[data-hook-note]");
    const hint = q("[data-hook-hint]");
    const ghost = q("[data-ghost]");
    const bubble = q("[data-ghost-bubble]");
    const world = q("[data-turn-world]");
    const L = layersOf(world);
    const words = hero.querySelectorAll(".turn-title .pop-word");
    const eyebrow = q("[data-turn-eyebrow]");
    const sub = q("[data-turn-sub]");

    /* ---- Beat 1: the visitor who leaves ------------------------------ */
    const rel = (el: Element | null, fx: number, fy: number) => {
      const w = win.getBoundingClientRect();
      if (!el) return { x: w.width * 0.6, y: w.height * 0.5 };
      const r = el.getBoundingClientRect();
      return { x: r.left - w.left + r.width * fx, y: r.top - w.top + r.height * fy };
    };
    const btn = () => rel(halfL.querySelector("[data-tpl-button]"), 0.55, 0.6);
    const close = () => rel(halfL.querySelector("[data-tpl-close]"), 0.5, 0.5);

    const ghostTl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: 0.9 });
    ghostTl
      .set(ghost, { x: () => win.clientWidth * 0.72, y: () => win.clientHeight * 0.9, opacity: 0, scale: 1 })
      .set(bubble, { opacity: 0 })
      .to(ghost, { opacity: 1, duration: 0.3 })
      .to(ghost, { x: () => btn().x, y: () => btn().y, duration: 1.2, ease: "power2.inOut" })
      .to(ghost, { x: () => btn().x + 16, y: () => btn().y - 6, duration: 0.7, ease: "sine.inOut" })
      .to(ghost, { x: () => close().x, y: () => close().y, duration: 0.9, ease: "power2.inOut" })
      .to(ghost, { scale: 0.78, duration: 0.09, yoyo: true, repeat: 1 })
      .set(bubble, { x: () => close().x + 14, y: () => close().y + 16 })
      .to(bubble, { opacity: 1, duration: 0.2 })
      .to(ghost, { opacity: 0, duration: 0.3 }, "<0.25")
      .to(bubble, { opacity: 0, duration: 0.3 }, "+=1.2");
    const onRefresh = () => ghostTl.invalidate();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    /* ---- Beat 2: the page breaks open -------------------------------- */
    gsap.set(words, { transformOrigin: "50% 100%" });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        // the stage is CSS-sticky; the story plays over the hero's height
        // minus the screen it starts on and the screen the proof rises over
        end: () => `+=${Math.max(1, hero.offsetHeight - 2 * stage.offsetHeight)}`,
        scrub: 0.8,
        // no invalidateOnRefresh: it would reset the headline words that have
        // not been reached yet back to visible on every refresh
        onUpdate(self) {
          const away = self.progress > 0.01;
          if (away && !ghostTl.paused()) {
            ghostTl.pause();
            gsap.to([ghost, bubble], { opacity: 0, duration: 0.2, overwrite: true });
          } else if (!away && ghostTl.paused()) {
            ghostTl.restart(true);
          }
        },
      },
    });

    const pointer = hero.querySelector("[data-hook-pointer]");
    if (pointer) tl.to(pointer, { opacity: 0, x: -12, duration: 0.05 }, 0);
    tl.to(hint, { opacity: 0, y: 10, duration: 0.05 }, 0)
      // the note is pushed aside as the page starts to crack
      .to(note, { y: -14, rotate: mobile ? -3 : -5, duration: 0.1 }, 0.02)
      .fromTo(crack, { scaleY: 0 }, { scaleY: 1, duration: 0.12 }, 0.03)
      // the frosted veil clears so the tear is sharp (autoAlpha also hides it
      // once faded, so the browser stops computing the blur behind it)
      .fromTo([veil, sharpStamp], { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.08 }, 0.07)
      .fromTo(halfStamps, { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.07)
      // the two halves swing open toward the viewer like doors
      .to(halfL, { rotateY: -96, xPercent: -14, duration: 0.26, ease: "power2.in" }, 0.15)
      .to(halfR, { rotateY: 96, xPercent: 14, duration: 0.26, ease: "power2.in" }, 0.15)
      .to([halfL, halfR], { opacity: 0, duration: 0.07 }, 0.34)
      .to(crack, { opacity: 0, duration: 0.03 }, 0.15)
      // the note flies past the viewer
      .to(note, { scale: 1.45, yPercent: 60, rotate: 8, opacity: 0, duration: 0.22, ease: "power1.in" }, 0.13)
      // the grey room disappears
      .to(backdrop, { opacity: 0, duration: 0.22 }, 0.17)
      // the landscape rises out of the page, every layer at its own distance
      .fromTo(world, { scale: 0.82 }, { scale: 1, duration: 0.28, ease: "power2.out" }, 0.15)
      .fromTo(L.bg, { scale: 1.12 }, { scale: 1, duration: 0.28 }, 0.17)
      .fromTo(L.far, { yPercent: 8 }, { yPercent: 0, duration: 0.26, ease: "power2.out" }, 0.17)
      .fromTo(L.mid, { yPercent: 18 }, { yPercent: 0, duration: 0.26, ease: "power2.out" }, 0.19)
      .fromTo(L.fg, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.24 }, 0.22);

    /* ---- Beat 3: the delivery, in step with the headline ------------- */
    // The drive and the text share one stretch of the scroll: the van sets
    // off as "What if…" appears and arrives at the house as the last line
    // appears — the website is delivered and the house lights up.
    const DRIVE_START = 0.47;
    const ARRIVE = 0.9;
    const DELIVERED = 0.98;
    const driveTime = ARRIVE - DRIVE_START;

    // fromTo (not from) so the start and end states stay exact when the
    // page is resized or the scroll positions are measured again
    tl.fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.05 }, DRIVE_START)
      .fromTo(words, { rotateX: -96, opacity: 0 }, { rotateX: 0, opacity: 1, duration: 0.08, stagger: driveTime * 0.085, ease: "back.out(1.6)" }, DRIVE_START + 0.04)
      .fromTo(sub, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.08 }, ARRIVE);

    const vehicle = world.querySelector<HTMLElement>('[data-layer="vehicle"]');
    const vanHome = world.querySelector<SVGGElement>("[data-van-home]");
    const van = world.querySelector<SVGGElement>("[data-van]");
    const body = world.querySelector<SVGGElement>("[data-van-body]");
    const parcel = world.querySelector<SVGGElement>("[data-parcel]");
    const road = world.querySelector<SVGPathElement>("#story-drive-line");
    const glow = world.querySelectorAll<SVGElement>("[data-house-glow]");
    const label = world.querySelector<SVGGElement>("[data-delivered]");

    if (vehicle && vanHome && van && road) {
      // Without motion the van is already parked at the house; with motion
      // it starts at the near end of the road.
      gsap.set(vanHome, { attr: { transform: "translate(0 0)" } });
      tl.fromTo(vehicle, { opacity: 0 }, { opacity: 1, duration: 0.04 }, DRIVE_START - 0.05).fromTo(
        van,
        { scale: 1, transformOrigin: "50% 100%" },
        {
          scale: 0.2, // smaller as it drives into the distance
          transformOrigin: "50% 100%",
          motionPath: { path: road, align: road, alignOrigin: [0.5, 1], start: 0.05, end: 1 },
          immediateRender: true,
          duration: driveTime,
          ease: "power1.inOut",
        },
        DRIVE_START,
      );
      // a gentle bounce on the road while it drives (stops when scrolling stops)
      if (body) {
        const bumps = 14;
        tl.fromTo(body, { y: 0 }, { y: -4, duration: driveTime / bumps, repeat: bumps - 1, yoyo: true, ease: "sine.inOut" }, DRIVE_START);
      }
    }

    // Delivery: the website lifts off the roof and into the house,
    // the windows light up, and the label confirms it.
    if (parcel) tl.to(parcel, { y: -90, scale: 0.4, opacity: 0, transformOrigin: "50% 50%", duration: 0.06, ease: "power2.in" }, ARRIVE);
    // the halo glows softly (0.5); the lit windows turn fully on (1)
    if (glow.length) tl.fromTo(glow, { opacity: 0 }, { opacity: (_i: number, el: Element) => (el.tagName === "circle" ? 0.5 : 1), duration: 0.05 }, ARRIVE + 0.04);
    if (label) tl.fromTo(label, { opacity: 0, scale: 0.6, transformOrigin: "50% 100%" }, { opacity: 1, scale: 1, duration: 0.05, ease: "back.out(2)" }, ARRIVE + 0.05);

    // a short pause at the house before the page moves on
    tl.to({}, { duration: 0.08 }, DELIVERED);

    /* ---- Handover: the proof rises over the hero ---------------------- */
    // Scroll-driven: as the next section slides up over the stuck stage,
    // the hero sinks back and darkens.
    const next = document.querySelector<HTMLElement>('[data-scene="proof"]');
    const shade = q("[data-hero-shade]");
    if (next) {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
      })
        // no scaling: shrinking would show the stage's straight edges as a box
        .fromTo(stage, { y: 0 }, { y: 60 }, 0)
        .fromTo(shade, { opacity: 0 }, { opacity: 0.6 }, 0);
    }
    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ghostTl.kill();
    };
  });
}
