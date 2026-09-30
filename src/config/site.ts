/**
 * Central theme configuration.
 *
 * Everything a new site normally needs to change lives here: the name,
 * navigation, footer, contact details, and which projects are promoted on
 * the homepage and in the mobile menu. Components read from this file
 * rather than hardcoding copy, so renaming or re-scoping the site does not
 * mean editing markup.
 *
 * The canonical domain is NOT here — it is `site` in astro.config.mjs, so
 * there is only ever one source of truth for it.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}

export const siteConfig = {
  /** Display name. Used in the wordmark, metadata, JSON-LD and the footer. */
  name: "Vayasa",

  /** One-line positioning statement. Emitted as the Person "jobTitle"/slogan. */
  tagline: "Photographer & Videographer",

  /** Default meta description for pages that do not set their own. */
  description:
    "Vayasa is a photographer and videographer working across photo editing, video production and post-production — turning moments into images and films that last.",

  /** Default <title> for pages that do not set their own. */
  defaultTitle: "Vayasa — Photographer & Videographer",

  /** Contact address, linked in the footer, header and contact page. */
  email: "hello@example.com",

  /** Social links. Add or remove freely — components only render what's set. */
  social: {
    instagram: "https://www.instagram.com/",
  },

  /** Browser theme colour. Keep in step with `--canvas` in src/styles.css. */
  themeColor: "#f4f4f2",

  /** Browser theme colour in dark mode. Keep in step with the dark `--canvas` in src/styles.css. */
  themeColorDark: "#111110",

  /**
   * Fallback social share card, served from public/. Used by any page that
   * does not pass its own `image` — project pages pass their photography, so
   * this covers the homepage, portfolio, about, contact and 404.
   */
  socialImage: {
    src: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Vayasa — photographer and videographer",
  },

  /** Primary navigation, in order. Also drives the mobile menu. */
  navigation: [
    { label: "Index", href: "/" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  /** Short paragraph in the first footer column. */
  footerBlurb: "Photography and videography — from the shoot to the final edit, shaped by hand, frame by frame.",

  /** Footer link columns. Add or remove columns freely. */
  footerColumns: [
    {
      heading: "Portfolio",
      links: [
        { label: "All work", href: "/portfolio" },
        { label: "About Me", href: "/about" },
        { label: "Get in touch", href: "/contact" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Photography", href: "/about#services" },
        { label: "Videography", href: "/about#services" },
        { label: "Editing & post-production", href: "/about#services" },
      ],
    },
    {
      heading: "Elsewhere",
      links: [{ label: "Instagram", href: "https://www.instagram.com/" }],
    },
  ] satisfies FooterColumn[],

  /**
   * Which projects the theme promotes. Each value is a filename in
   * src/content/projects without the .md extension. A slug that does not
   * resolve fails the build rather than rendering an empty section.
   */
  featured: {
    /** Three cards in the homepage "selected work" grid. */
    homepageGrid: ["still-light-portrait-series", "wedding-film-highlights", "quiet-hours-photo-story"],
    /** The single large project given its own homepage section. */
    homepageSolo: "brand-story-short-film",
    /** The project shown at the foot of the mobile menu. */
    mobileMenu: "music-video-visual-edit",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Builds a page <title> in the house format: "Page — Name".
 * Change the separator here to restyle every title at once.
 */
export function pageTitle(page: string): string {
  return `${page} — ${siteConfig.name}`;
}
