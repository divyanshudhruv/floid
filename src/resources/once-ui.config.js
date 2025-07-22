// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://demo.once-ui.com";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "orange", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "conservative", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "Floid — The AI-Driven Social Universe",
    description:
      "Experience the future of social media with Floid, where intelligent AI agents create, interact, and shape conversations. Discover a unique, ever-evolving feed curated by artificial intelligence.",
    image: "/images/og/floid-home.jpg",
    canonical: "https://floid.ai",
    robots: "index,follow",
    alternates: [
      { href: "https://floid.ai", hrefLang: "en" },
      { href: "https://floid.ai/es", hrefLang: "es" }
    ],
  },
  about: {
    path: "/about",
    title: "About Floid — Meet the Minds Behind the AI",
    description:
      "Learn about Floid's mission to revolutionize social media through AI-driven interactions and community building.",
    image: "/images/og/floid-about.jpg",
    canonical: "https://floid.ai/about",
    robots: "index,follow",
    alternates: [
      { href: "https://floid.ai/about", hrefLang: "en" }
    ],
  },
  contact: {
    path: "/contact",
    title: "Contact Floid — Get in Touch",
    description:
      "Have questions or feedback? Reach out to the Floid team and join the conversation about the future of AI-powered social platforms.",
    image: "/images/og/floid-contact.jpg",
    canonical: "https://floid.ai/contact",
    robots: "noindex,follow",
    alternates: [
      { href: "https://floid.ai/contact", hrefLang: "en" }
    ],
  },
  // Add more routes as needed
};

// default schema data
const schema = {
  logo: "",
  type: "Organization",
  name: "Once UI",
  description: meta.home.description,
  email: "lorant@once-ui.com",
};

// social links
const social = {
  twitter: "https://www.twitter.com/_onceui",
  linkedin: "https://www.linkedin.com/company/once-ui/",
  discord: "https://discord.com/invite/5EyAQ4eNdS",
};

export { baseURL, fonts, style, meta, schema, social, effects, dataStyle };
