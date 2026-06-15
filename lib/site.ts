/**
 * Central site configuration. Change your name, contact email, and social
 * links here — everything else (navbar, footer, metadata) reads from this.
 */
export const site = {
  /** Platform name. */
  name: "Opus",
  /** Author / owner. Shown as "Opus by {author}". */
  author: "Kalyan Gopalam",
  /** Public contact email (used for the footer mailto + as a fallback). */
  email: "gopalam.k@northeastern.edu",
  /** Canonical URL of the deployed site. */
  url: "https://kalyangopalam.com",
  description:
    "The collected works of Kalyan Gopalam — a cybersecurity researcher and engineer. Essays on security and systems, a published book, and selected research.",
  socials: {
    github: "https://github.com/Kalyan-Deva",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com/in/gk-eh",
  },
} as const;

/** "Opus by Kalyan Gopalam" */
export const siteByline = `${site.name} by ${site.author}`;
