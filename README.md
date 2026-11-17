# Deepframe Studio — website

A story-driven studio site built with Astro, Tailwind CSS, GSAP (ScrollTrigger) and Lenis.

**Concept — "Paper to pop-up":** every plain website is a flat grey sheet of paper; the studio folds it into a living, layered pop-up world. The home page opens on a dull grey template site, tears it open, and becomes the kind of site the studio builds.

## Start it

Requires a current Node.js (22 LTS or newer; built and tested with Node 24).

```bash
npm install
npm run dev       # local development at http://localhost:4321
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Edit the words, services and projects

Everything you'd want to change is in **`src/content/site.ts`**:

- business name, location, phone, email, WhatsApp (placeholders are marked `[like this]` or `example.com`)
- page titles and meta descriptions
- all home-page story copy, services, process steps, concept projects
- About page story, beliefs and testimonial placeholders
- contact form labels and the **form endpoint**

Words wrapped in `*asterisks*` are shown in the italic accent font.

## Connect the contact form

1. Create a form at [formspree.io](https://formspree.io).
2. Copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
3. Paste it into `form.endpoint` in `src/content/site.ts`.

To use your own backend instead, put its URL there. The form posts standard form data and expects a 2xx response (JSON accepted). Without JavaScript the form still posts normally.

## Replace the image placeholders

Placeholders live in `src/assets/placeholders/`:

| File | Size | Used on |
| --- | --- | --- |
| `portrait.svg` | 800 × 1000 | About |
| `screenshot-*.svg` | 1600 × 1000 | Work (one per project) |

Drop your real image (JPG/PNG/WebP) into `src/assets/`, then change the matching `import` line at the top of `src/content/site.ts`. Astro resizes and optimises it automatically.

## Change colours, fonts or spacing

All design tokens are in one place: the `@theme` block at the top of `src/styles/global.css`. Tailwind's default colours are switched off, so only these tokens exist. The SVG illustrations read the same variables, so changing a colour there recolours the artwork too. Fonts are loaded and self-hosted by Astro's font API (`astro.config.mjs`).

## Where things live

```
src/
  content/site.ts          all text and data
  styles/global.css        design tokens + shared styles
  layouts/BaseLayout.astro header, footer, page transitions, meta
  components/home/         one component per story scene
    HeroStage.astro          scenes 1 + 2 in one pinned stage
    SceneHook.astro          1 · the dull template
    SceneTurn.astro          2 · the page breaks open
    SceneProof.astro         3 · four concept worlds (horizontal)
    SceneOffer.astro         4 · services as stacking sheets
    SceneMethod.astro        5 · the process thread
    SceneInvitation.astro    6 · the call to action
  components/art/          the paper illustrations (separate depth layers)
  scripts/motion/          GSAP + Lenis, one file per scene
```

## Motion and accessibility

- Animations run on the client only and are set up on every page load and fully reverted before each page change.
- Only `transform` and `opacity` are animated.
- Visitors with **reduced motion** turned on (and anyone without JavaScript) get a still version: every scene is a normal, readable section in the same story order.
- All text is in the HTML and readable without scrolling or scripts.
