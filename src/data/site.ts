/** Single source of truth for copy that appears in more than one place. */

export const site = {
  name: "Orion Creators",
  tagline: "Where Brands & Creators Align",
  description:
    "Orion Creators is a brand-partnerships and influencer-marketing studio. We connect brands with creators who align with their goals, and run the campaigns end to end.",
  url: "https://orioncreators.gg",
} as const;

export const contact = {
  email: "aaron.cg.antonio@gmail.com",
  phone: "+63 954 310 0279",
  web: "orioncreators.gg",
} as const;

export const credit = {
  name: "Brian Espina",
  url: "https://brianespina.com/",
} as const;

/** Section anchors. Pages other than the home page prefix these with "/". */
export const navLinks = [
  { label: "About", hash: "#about" },
  { label: "What we do", hash: "#services" },
  { label: "Process", hash: "#process" },
] as const;
