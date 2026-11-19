# Depthwyn — website

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
- About page story and beliefs
- contact form labels and the **form endpoint**

Words wrapped in `*asterisks*` are shown in the italic accent font.

## Connect the contact form

1. Create a form at [formspree.io](https://formspree.io).
2. Copy its endpoint (e.g. `https://formspree.io/f/abcdwxyz`).
3. Paste it into `form.endpoint` in `src/content/site.ts`.

To use your own backend instead, put its URL there. The form posts standard form data and expects a 2xx response (JSON accepted). Without JavaScript the form still posts normally.

## The chat helper

The "Ask a question" bubble in the corner of every page is a scripted helper. It uses no AI and no server, so it costs nothing to run. Its words live in `chatbot` in `src/content/site.ts`:

- `topics`: each one has a button label (`ask`), a reply (`answer`), an optional `list` and `links`, and the follow-up buttons (`next`). Most replies reuse your services, FAQ, steps and contact details, so editing those updates the chat too.
- `keywords`: when a visitor types a question, the helper picks the topic whose keywords match best. Add words your customers use.
- `start` and `menu`: the first buttons, and the ones behind "Show all topics".
- Anything it can't match gets a friendly reply with your WhatsApp link and the enquiry form.

The component is `src/components/ChatHelper.astro`. It keeps the conversation while visitors move between pages.

## The logo

The Depthwyn mark is a dark rounded tile holding a split "D": a cream bar and a marigold-to-clay curve.

- On the site it's `src/components/ui/Logo.astro`. Use `tone="paper"` on dark backgrounds.
- Ready-made files are in `public/`:
  - `logo.svg`: for light backgrounds
  - `logo-light.svg`: for dark backgrounds
  - `logo-square.svg` and `logo-512.png`: square versions for social media profile pictures and link previews
  - `apple-touch-icon.png`: the icon when someone adds the site to their phone's home screen
  - `favicon.svg`: the browser-tab icon

## Images and concept projects

- **Portrait (About page):** `src/assets/portrait.jpg`
- **Concept project screenshots (Work page):** `src/assets/projects/`, one per project. Each project in `projects` in `src/content/site.ts` also has a `url`: the live concept site that "Visit the live site" opens.

To change an image, drop the new one (JPG/PNG/WebP) into `src/assets/`, then update the matching `import` line at the top of `src/content/site.ts`. Astro resizes and optimises it automatically. Keep source images under about 2000px wide.

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
