// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // The live address (used for canonical URLs and link previews).
  site: "https://business-site.depthwyn.workers.dev",
  vite: {
    plugins: [tailwindcss()],
  },
  // Astro's built-in font optimisation: fonts are downloaded at build time,
  // self-hosted, subset and given metric-matched fallbacks.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Bricolage Grotesque",
      cssVariable: "--font-bricolage",
      weights: ["400 800"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument",
      weights: ["400"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
  ],
});
