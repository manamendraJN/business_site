/* ==========================================================================
   SITE CONTENT — edit everything here without touching the design.

   • Words wrapped in *asterisks* are shown in the italic accent font.
   • Anything in [square brackets] is a placeholder for you to replace.
   • To use a real image, drop it in src/assets/ and change the import path
     at the top of this file. Astro will resize and optimise it for you.
   ========================================================================== */

import shotKopi from "../assets/projects/kopi-corner.webp";
import shotPetal from "../assets/projects/petal-and-stem.webp";
import shotLoom from "../assets/projects/loom-and-linen.webp";

/* --------------------------------------------------------------------------
   Business basics
   -------------------------------------------------------------------------- */
export const business = {
  name: "Depthwyn",
  shortName: "Depthwyn",
  tagline: "Websites that make people want to visit.",
  location: "Malabe, Sri Lanka",
  // The year in the footer. The visitor's browser fills in the current year
  // (see Footer.astro); this is only the fallback written into the page. Some
  // hosts build with the clock at 0 (1 January 1970), so never go below 2026.
  year: Math.max(new Date().getFullYear(), 2026),
};

/* Contact details. Phone numbers use the international format
   (country code +94, then the number without its leading 0). */
export const contact = {
  email: "depthwyn@gmail.com",
  phone: "+94 76 439 0987",
  phoneHref: "tel:+94764390987",
  whatsapp: "+94 76 868 5811",
  // international format, digits only
  whatsappHref: "https://wa.me/94768685811",
};

/* The contact form posts here. Create a free form at https://formspree.io,
   then paste your endpoint (it looks like https://formspree.io/f/abcdwxyz).
   To use your own backend instead, put its URL here — the form sends
   standard form data and expects a JSON reply. */
export const form = {
  endpoint: "https://formspree.io/f/xgakybjv",
};

/* --------------------------------------------------------------------------
   Navigation
   -------------------------------------------------------------------------- */
export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

export const cta = {
  label: "Start a project",
  href: "/contact/",
};

/* --------------------------------------------------------------------------
   Page titles and descriptions (for Google and link previews)
   -------------------------------------------------------------------------- */
export const meta = {
  home: {
    title: "Depthwyn — Websites that make people want to visit",
    description:
      "Story-driven web design for every kind of business. We turn plain, forgettable websites into ones that make visitors want to visit you.",
  },
  work: {
    title: "Work — Concept projects | Depthwyn",
    description:
      "See how a plain website becomes a story: live concept sites for different kinds of businesses, each shown before and after.",
  },
  services: {
    title: "Services — Launch Page, Business Site, Motion Upgrade, Care Plan | Depthwyn",
    description:
      "Our website services, explained simply: what you get, who each one suits, and what happens next.",
  },
  about: {
    title: "About — Depthwyn",
    description:
      "Why we build story-driven websites for local businesses, and how we keep the whole process simple for busy owners.",
  },
  contact: {
    title: "Contact — Start your project | Depthwyn",
    description:
      "Tell us about your business and we'll reply with simple next steps. Email, phone, WhatsApp or the short form — whatever is easiest for you.",
  },
  notFound: {
    title: "Page not found | Depthwyn",
    description: "This page has folded away. Let's get you back to the story.",
  },
};

/* --------------------------------------------------------------------------
   HOME — the six-scene story
   -------------------------------------------------------------------------- */
export const home = {
  // Scene 1 — the hook
  hook: {
    eyebrow: "Today",
    headline: "This is what your customers see today.",
    punch: "They leave in seconds.",
    scrollHint: "Keep scrolling — watch it change",
    // Small hand-written label pointing at the grey example site (wide screens)
    pointer: "your website today",
    // The words inside the dull template site
    template: {
      // the red stamp across it, so nobody mistakes it for this studio's site
      stampSmall: "Example",
      stampBig: "A typical business website",
      url: "www.your-business.com",
      logo: "YOUR BUSINESS",
      links: ["Home", "About", "Services", "Contact"],
      title: "Welcome to Your Business",
      text: "We offer quality products and services. Contact us today to find out more.",
      button: "Learn more",
      cards: ["Our services", "About us", "Contact us"],
      cardText: "Click here to read more.",
    },
  },
  // Scene 2 — the turn
  turn: {
    eyebrow: "What if…",
    headline: "What if your website made people *want to visit?*",
    sub: "We don't build pages. We build a story that walks your customer from first look to “I want this.”",
    // Label that pops up when the van delivers the website to the house
    delivered: "Your new website — delivered",
  },
  // Scene 3 — the proof
  proof: {
    eyebrow: "Portfolio",
    headline: "Our *work*",
    intro:
      "Sample businesses, each a live site you can open and scroll through. These are concept projects we made to show the idea — they are not real clients.",
    beforeLabel: "Before", // used on the Work page
    // short version on the Home page
    more: "See all our work",
    tileLink: "See the concept",
    // label on each screenshot: the picture opens the live concept site
    visitLabel: "Visit site",
    // label on each row of the project list
    conceptLabel: "Concept",
  },
  // CTA repeated after the proof
  proofCta: {
    headline: "Want this change for *your* business?",
    text: "Tell us what you do. We'll show you what your website could become.",
    button: "Start a project",
  },
  // Scene 4 — the offer
  offer: {
    eyebrow: "Services",
    headline: "Our *services*",
    sub: "Choose the one that fits your business. Not sure? Ask us and we'll help you choose.",
    getsLabel: "What you get",
    forLabel: "Good for",
    // short version on the Home page
    more: "Compare all services in detail",
    sheetLink: "Learn more",
  },
  // Scene 5 — the method
  method: {
    eyebrow: "How we work",
    headline: "Simple from *first call* to launch.",
    sub: "You bring the business. We handle the rest, one clear step at a time, and you always know what happens next.",
    yourPartLabel: "Your part",
    // short version on the Home page
    more: "See every step in detail",
  },
  // Questions — after "How we work" (the questions themselves are servicesPage.faq)
  faq: {
    eyebrow: "Questions",
    sub: "The things owners ask most, answered in plain words.",
    more: "Ask your own question",
  },
};

/* --------------------------------------------------------------------------
   SERVICES
   -------------------------------------------------------------------------- */
export type Service = {
  slug: string;
  name: string;
  short: string;
  plain: string;
  goodFor: string;
  gets: string[];
  outcome: string;
  emblem: "launch" | "site" | "motion" | "care";
};

export const services: Service[] = [
  {
    slug: "launch-page",
    name: "Launch Page",
    short: "One story-driven page for a new business or product.",
    plain:
      "One beautiful scrolling page that introduces your business the way you would in person — and ends with a clear way to reach you.",
    goodFor: "A new business, a new product, an event, or a fresh start.",
    gets: [
      "One page that walks visitors from first look to “get in touch”",
      "Original illustrations and motion made just for you",
      "A clear button to call, message or book",
      "Looks great and loads fast on phones",
      "Set up on your own web address",
    ],
    outcome: "Open your doors online with a page people remember.",
    emblem: "launch",
  },
  {
    slug: "business-site",
    name: "Business Site",
    short: "A full multi-page site with enquiry or booking.",
    plain:
      "A complete website with all the pages your customers look for, plus an enquiry form or booking so they can take the next step on the spot.",
    goodFor: "Businesses that need the full picture, not just one page.",
    gets: [
      "Home, services, about, contact and any other pages you need",
      "An enquiry form or booking that lands in your inbox",
      "Your story carried through every page",
      "Built so search engines can read every page properly",
      "A simple guide for changing text and photos yourself",
    ],
    outcome: "A website that does the welcoming while you run the business.",
    emblem: "site",
  },
  {
    slug: "motion-upgrade",
    name: "Motion Upgrade",
    short: "We rebuild your existing site with story and animation.",
    plain:
      "You keep what works. We rebuild the rest so your site finally feels like your business — with story, depth and movement.",
    goodFor: "Businesses whose website works, but looks like everyone else's.",
    gets: [
      "A friendly review of what your current site says (and doesn't)",
      "Your words reshaped into a clear story",
      "A fresh design with colour, depth and motion",
      "Your web address and important pages kept safe in the move",
    ],
    outcome: "The same business, finally looking as good online as it is in person.",
    emblem: "motion",
  },
  {
    slug: "care-plan",
    name: "Care Plan",
    short: "Monthly updates, hosting and support.",
    plain:
      "We look after your website every month, so you never have to think about hosting, updates or “how do I change this?” again.",
    goodFor: "Anyone who would rather run their business than their website.",
    gets: [
      "Hosting, security updates and backups taken care of",
      "Small text and photo changes each month",
      "A real person to message when you need help",
      "Seasonal touches, like a new menu, offer or opening hours",
    ],
    outcome: "Your site stays fresh and safe. You stay focused on customers.",
    emblem: "care",
  },
];

/* --------------------------------------------------------------------------
   METHOD — how we work
   -------------------------------------------------------------------------- */
export const steps = [
  {
    title: "A friendly first call",
    text: "We talk about your business, your customers and what you want your website to do. No jargon, no pressure.",
    yourPart: "Just tell us about your business.",
  },
  {
    title: "Your story map",
    text: "We map out what your site will say: who your customer is, what they worry about, and what makes them say yes.",
    yourPart: "Read it and tell us if it sounds like you.",
  },
  {
    title: "A first look",
    text: "You see the design and the key moments of motion before anything is built, so there are no surprises.",
    yourPart: "Share your thoughts. Changes are welcome.",
  },
  {
    title: "Build and polish",
    text: "We build the site, test it on phones and computers, and make sure it loads quickly.",
    yourPart: "Send photos, menus or details when we ask.",
  },
  {
    title: "Launch day",
    text: "Your site goes live on your own web address. We show you how everything works, and the Care Plan can keep it fresh.",
    yourPart: "Celebrate, and share it with your customers.",
  },
];

/* --------------------------------------------------------------------------
   PROJECTS — three CONCEPT projects (samples, not real clients)
   -------------------------------------------------------------------------- */
export type Project = {
  slug: string;
  name: string;
  kind: string;
  world: "kopi" | "petal" | "loom";
  /** the live concept site */
  url: string;
  before: { title: string; text: string };
  after: { headline: string; line: string };
  plainProblem: string;
  story: string;
  moments: string[];
  screenshot: ImageMetadata;
  screenshotAlt: string;
};

export const projectsNote =
  "Concept project — a sample made to show the idea, not a real client.";

export const projects: Project[] = [
  {
    slug: "kopi-corner",
    name: "Kopi Corner",
    kind: "Neighbourhood cafe",
    world: "kopi",
    url: "https://kopi-corner.depthwyn.workers.dev/",
    before: { title: "Kopi Corner Cafe", text: "Coffee, tea and snacks. Open daily." },
    after: {
      headline: "The cafe *wakes up.*",
      line: "Steam rises from the cup, the wooden counter slides in, and the menu feels like walking through the door.",
    },
    plainProblem:
      "A grey page with opening hours and a blurry menu. Nothing about the smell of fresh coffee or the regulars who come every morning.",
    story:
      "The site opens on a quiet street at sunrise. As you scroll, the cafe wakes up: the cup fills, steam curls up, and the day's menu is chalked onto the board.",
    moments: [
      "The cup fills as you scroll down",
      "Steam carries you into the menu",
      "A warm “see you tomorrow” with the map and hours",
    ],
    screenshot: shotKopi,
    screenshotAlt: "The Kopi Corner concept site: a two-storey cafe on a sunrise street, a cup of kopi steaming on the wooden counter, and the headline \"The cafe wakes up.\"",
  },
  {
    slug: "petal-and-stem",
    name: "Petal & Stem",
    kind: "Florist",
    world: "petal",
    url: "https://petal-stem.depthwyn.workers.dev/",
    before: { title: "Petal & Stem Florist", text: "Flowers for all occasions." },
    after: {
      headline: "Flowers that *say it for you.*",
      line: "Petals drift in and stems grow tall, so every bouquet already feels like a gift.",
    },
    plainProblem:
      "A product grid that looks like a supermarket shelf. The care and craft behind every bouquet is invisible.",
    story:
      "The site starts with a feeling — thank you, sorry, congratulations — and grows the right bouquet in front of you, stem by stem.",
    moments: [
      "Choose a feeling, watch a bouquet grow",
      "Petals lead the way to same-day ordering",
      "A handwritten-style note to finish the order",
    ],
    screenshot: shotPetal,
    screenshotAlt: "The Petal & Stem concept site: a vase of white flowers on a florist's workbench, the headline \"Flowers that say it for you.\" and buttons to pick a feeling",
  },
  {
    slug: "loom-and-linen",
    name: "Loom & Linen",
    kind: "Clothing brand",
    world: "loom",
    url: "https://loom-and-linen.depthwyn.workers.dev/",
    before: { title: "Loom & Linen Clothing", text: "New arrivals. Shop now." },
    after: {
      headline: "Woven slowly. *Worn every day.*",
      line: "A single thread runs down the page and weaves itself into cloth, so every shirt already feels made by hand.",
    },
    plainProblem:
      "Rows of small product photos on white. It looks like every online store and hides the hands and the loom behind every piece.",
    story:
      "The site follows one thread: from the loom, to woven cloth, to the shirt you'll wear — then lets you pick its colour and order it in your size.",
    moments: [
      "A thread weaves the cloth as you scroll",
      "Tap a colour and the shirt changes in front of you",
      "Size help and ordering on WhatsApp in two taps",
    ],
    screenshot: shotLoom,
    screenshotAlt: "The Loom & Linen concept site: a wooden handloom beside a striped handwoven shirt on a hanger, and the headline \"Woven slowly. Worn every day.\"",
  },
];

/* --------------------------------------------------------------------------
   WORK page
   -------------------------------------------------------------------------- */
export const workPage = {
  eyebrow: "Work",
  headline: "Our *projects*",
  intro:
    "Every project on this page is a concept: a sample we designed and built to show how a plain website can become a story. Each one is live, so open it and scroll through. Real client work will appear here soon.",
  problemLabel: "The plain version",
  storyLabel: "The story",
  momentsLabel: "Key moments",
  screenshotLabel: "The live concept site",
  visitLabel: "Visit the live site",
  nextHeadline: "Your business could be *next.*",
  nextText: "Every story here started with a short, friendly chat. Yours can too.",
};

/* --------------------------------------------------------------------------
   SERVICES page
   -------------------------------------------------------------------------- */
export const servicesPage = {
  eyebrow: "Services",
  headline: "Our *services*",
  intro:
    "Every service is built around one idea: your website should show what makes you different and make it easy for customers to choose you. Here is what each one includes.",
  askLabel: "Ask about",
  howLink: "How we work, step by step",
  needHeadline: "What we'll need from you",
  needs: [
    "A short call to talk about your business",
    "Your logo, if you have one (if not, we can talk about it)",
    "Photos of your place, products or team — or we plan a simple shoot",
    "Feedback at each step, in your own words",
  ],
  faqHeadline: "Questions owners often ask",
  faq: [
    {
      q: "Do I need to know anything about websites?",
      a: "Not at all. You know your business — that's the important part. We explain everything in plain words and handle all the technical work.",
    },
    {
      q: "How much does it cost?",
      a: "Every business is different, so after our first call we send you a clear quote. You will know the price before any work starts.",
    },
    {
      q: "How long does it take?",
      a: "It depends on the size of your site. Your quote includes a simple timeline, and we keep you updated at every step.",
    },
    {
      q: "Will all this motion make my site slow?",
      a: "No. The animation is built to stay light and smooth on phones. Visitors who prefer less movement automatically see a calm, still version.",
    },
    {
      q: "Can I change things myself later?",
      a: "Yes. We can set up simple editing for text and photos, or the Care Plan can take care of changes for you.",
    },
    {
      q: "I already have a website. Do I start again?",
      a: "Not necessarily. The Motion Upgrade keeps what works — your web address, your important pages — and rebuilds the rest with story and motion.",
    },
  ],
};

/* --------------------------------------------------------------------------
   ABOUT page — edit this so it sounds like you
   -------------------------------------------------------------------------- */
export const aboutPage = {
  eyebrow: "About",
  headline: "We're *Depthwyn.*",
  lead: "We build websites that feel like walking into your business.",
  story: [
    "Depthwyn designs and builds websites for businesses, whether you need your first website or a better version of the one you have.",
    "Most websites follow the same template: a logo, a photo and a button. We plan each page around the questions your customers ask, in the order they ask them, so that by the end of the page they are ready to visit, call or book.",
    "Our process is clear and simple, because your time is valuable. At every stage you will know what we are working on, what we need from you, and what happens next.",
  ],
  beliefsHeadline: "What we believe",
  beliefs: [
    { title: "Story first", text: "Before colours or code, we decide what your customer should feel." },
    { title: "Plain words", text: "No jargon. If we can't explain it simply, we haven't understood it yet." },
    { title: "Motion with meaning", text: "Every animation has a job. If it doesn't help your story, it goes." },
    { title: "Fast on phones", text: "Most of your visitors are on a phone. The site has to feel great there first." },
  ],
  basedLabel: "Based in",
};

/* --------------------------------------------------------------------------
   CONTACT page
   -------------------------------------------------------------------------- */
export const contactPage = {
  eyebrow: "Contact",
  headline: "Start your *project.*",
  intro: "Tell us a little about your business. We'll reply with simple next steps.",
  directHeadline: "Rather talk directly?",
  nextHeadline: "What happens next",
  next: [
    "We read your message and think about what your website should do.",
    "We reply with a few questions and a time to talk.",
    "We have a friendly call and plan your first step.",
  ],
  fields: {
    name: "Your name",
    business: "Business name",
    businessType: "What kind of business?",
    businessTypes: ["Food and drink", "Health and wellness", "Beauty", "Travel and stays", "Retail", "Services", "Something else"],
    service: "What are you interested in?",
    notSure: "Not sure yet",
    website: "Current website (if you have one)",
    message: "Tell us about your business and your customers",
    messagePlaceholder: "What do you do, who are your customers, and what would you like your website to do for you?",
    email: "Email",
    phone: "Phone or WhatsApp",
    phoneHint: "Please enter a phone number we can call or message, e.g. +94 77 123 4567",
    // shown under a field when it is empty (missing) or not in the right format (invalid)
    errors: {
      name: { missing: "Please enter your name." },
      email: { missing: "Please enter your email address.", invalid: "Please check your email address, e.g. name@example.com." },
      phone: { missing: "Please enter a phone number we can call or message.", invalid: "Please check the number, e.g. +94 77 123 4567." },
      website: { invalid: "Please enter the full address, starting with https://" },
      message: { missing: "Please tell us a little about your business." },
    },
    submit: "Send my enquiry",
    sending: "Sending…",
  },
  success: {
    title: "Thank you — your message is on its way.",
    text: "We'll read it carefully and reply with simple next steps soon.",
  },
  error:
    "Sorry, something went wrong sending your message. Please try again, or email us directly.",
  privacy: "We'll only use your details to reply to your enquiry.",
};

/* --------------------------------------------------------------------------
   CHAT HELPER — the "Ask a question" bubble in the corner of every page.
   It is a scripted helper (no AI, no server, no cost): visitors tap a topic
   or type a question, and the helper picks the closest topic by its
   keywords. Anything it can't answer goes to WhatsApp or email.

   • Each topic: `ask` is the button label, `answer` the reply, `list` and
     `links` are optional, `next` are the follow-up buttons (topic ids).
   • `keywords` are matched against what the visitor types (lowercase).
   -------------------------------------------------------------------------- */
export type ChatLink = { label: string; href: string; external?: boolean };
export type ChatTopic = {
  id: string;
  ask: string;
  keywords: string[];
  answer: string;
  list?: { label: string; note?: string; href?: string }[];
  links?: ChatLink[];
  next?: string[];
};

const faqAnswer = (start: string) =>
  servicesPage.faq.find((f) => f.q.startsWith(start))?.a ?? "";
const whatsappWith = (text: string) => `${contact.whatsappHref}?text=${encodeURIComponent(text)}`;
const talkLinks: ChatLink[] = [
  { label: "Message on WhatsApp", href: whatsappWith("Hi Depthwyn, I found your website and have a question."), external: true },
  { label: "Send an enquiry", href: "/contact/" },
];

export const chatbot = {
  launcher: "Ask a question",
  title: "Ask Depthwyn",
  status: "Quick answers, any time",
  close: "Close chat",
  greeting: `Hi! Welcome to ${business.name}. Pick a topic below or type your question for a quick answer.`,
  inputLabel: "Type your question",
  inputPlaceholder: "Type your question…",
  send: "Send",
  menuLabel: "Show all topics",
  notSure: "We don't have a quick answer for that one — send us a message and you'll get a real reply.",
  // the first buttons a visitor sees
  start: ["services", "price", "time", "process", "work", "human"],
  // the buttons behind "Show all topics"
  menu: ["services", "price", "time", "process", "nontech", "existing", "edit", "speed", "work", "about", "human"],
  topics: [
    {
      id: "services",
      ask: "What do you offer?",
      keywords: ["offer", "service", "services", "package", "packages", "do you do", "build", "make", "website", "site", "help"],
      answer: "Here are our services. Tap one to learn more:",
      list: services.map((s) => ({ label: s.name, note: s.short, href: `/services/#${s.slug}` })),
      next: services.map((s) => s.slug),
    },
    ...services.map((s) => ({
      id: s.slug,
      ask: s.name,
      keywords: [s.name.toLowerCase(), ...s.name.toLowerCase().split(" ")],
      answer: `${s.plain} Good for: ${s.goodFor}`,
      links: [{ label: `Read more about ${s.name}`, href: `/services/#${s.slug}` }],
      next: ["price", "time", "services"],
    })),
    {
      id: "price",
      ask: "How much does it cost?",
      keywords: ["cost", "price", "pricing", "how much", "budget", "quote", "rate", "fee", "charge", "expensive", "cheap", "lkr", "rs", "$"],
      answer: faqAnswer("How much"),
      links: talkLinks,
      next: ["time", "process"],
    },
    {
      id: "time",
      ask: "How long does it take?",
      keywords: ["how long", "time", "timeline", "weeks", "days", "deadline", "fast", "quick", "when", "ready"],
      answer: faqAnswer("How long"),
      next: ["process", "price"],
    },
    {
      id: "process",
      ask: "How do you work?",
      keywords: ["process", "how do you work", "steps", "step", "start", "begin", "work together", "method"],
      answer: "Five simple steps, and you always know what comes next:",
      list: steps.map((s, i) => ({ label: `${i + 1}. ${s.title}`, note: s.yourPart })),
      links: [{ label: "See every step", href: "/services/#how-we-work" }],
      next: ["nontech", "price", "human"],
    },
    {
      id: "nontech",
      ask: "I'm not technical — is that OK?",
      keywords: ["technical", "tech", "know anything", "beginner", "computer", "jargon", "understand"],
      answer: faqAnswer("Do I need"),
      next: ["edit", "process"],
    },
    {
      id: "existing",
      ask: "I already have a website",
      keywords: ["already have", "existing", "current site", "current website", "redesign", "rebuild", "old site", "upgrade"],
      answer: faqAnswer("I already have"),
      links: [{ label: "About the Motion Upgrade", href: "/services/#motion-upgrade" }],
      next: ["price", "time"],
    },
    {
      id: "edit",
      ask: "Can I change things later?",
      keywords: ["change", "edit", "update", "myself", "later", "maintain", "maintenance", "hosting", "support", "care"],
      answer: faqAnswer("Can I change"),
      links: [{ label: "About the Care Plan", href: "/services/#care-plan" }],
      next: ["price", "services"],
    },
    {
      id: "speed",
      ask: "Will animation slow my site?",
      keywords: ["slow", "speed", "animation", "motion", "phone", "mobile", "load", "performance"],
      answer: faqAnswer("Will all this"),
      next: ["services", "work"],
    },
    {
      id: "work",
      ask: "Can I see examples?",
      keywords: ["example", "examples", "portfolio", "work", "projects", "samples", "previous", "clients", "show me"],
      answer: `${projectsNote} Each one is a live site you can open and scroll through:`,
      list: projects.map((p) => ({ label: p.name, note: p.kind, href: p.url })),
      links: [{ label: "See the concept projects", href: "/work/" }],
      next: ["services", "about"],
    },
    {
      id: "about",
      ask: "Who is Depthwyn?",
      keywords: ["who", "about", "owner", "founder", "team", "studio", "where", "location", "based", "sri lanka", "malabe"],
      answer: `${business.name} is a web design studio based in ${business.location}. ${aboutPage.lead}`,
      links: [{ label: "Read the story", href: "/about/" }],
      next: ["process", "human"],
    },
    {
      id: "human",
      ask: "Talk to a person",
      keywords: ["contact", "talk", "call", "phone", "email", "whatsapp", "message", "person", "human", "reach", "hello", "hi", "number", "hours"],
      answer: "You can reach us directly:",
      list: [
        { label: "WhatsApp", note: contact.whatsapp, href: whatsappWith("Hi Depthwyn, I found your website and have a question.") },
        { label: "Phone", note: contact.phone, href: contact.phoneHref },
        { label: "Email", note: contact.email, href: `mailto:${contact.email}` },
      ],
      links: [{ label: "Send an enquiry", href: "/contact/" }],
      next: ["price", "process"],
    },
  ] satisfies ChatTopic[],
  fallbackLinks: talkLinks,
};

/* --------------------------------------------------------------------------
   FOOTER & misc
   -------------------------------------------------------------------------- */
export const footer = {
  line: "Story-driven websites for every business with a story worth telling.",
  conceptNote: "Projects shown are concept samples, not real clients.",
  pagesLabel: "Pages",
  contactLabel: "Say hello",
};

export const notFoundPage = {
  headline: "This page has *folded away.*",
  text: "The page you were looking for isn't here. Let's get you back to the story.",
  button: "Back to the start",
};
