# Orion Creators — website

One-page marketing site for Orion Creators, built with [Astro](https://astro.build).
Static output, no UI framework, no CSS framework.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to ./dist
npm run preview  # serve ./dist
```

## Styling rules

**There are no inline styles anywhere.** Every rule lives in a stylesheet or in a
component's `<style>` block, including the starfield: its per-star values are
emitted as real CSS rules at build time, and pointer parallax is applied by
mutating a constructed `CSSStyleSheet` rather than element style attributes.

| Where | What belongs there |
| --- | --- |
| `src/styles/tokens.css` | every colour, radius, shadow, size, easing — the design handoff's authoritative values |
| `src/styles/base.css` | `@font-face`, reset, element defaults, keyframes, reduced-motion |
| `src/styles/ui.css` | primitives used by more than one section (`.btn*`, `.eyebrow`, `.shell`, `.icon*`) |
| `src/components/*.astro` `<style>` | anything used by exactly one section |

Reach for a token before writing a literal value. If a new primitive is needed in
two or more sections, promote it to `ui.css`.

## Structure

```
src/
  assets/       images processed by astro:assets (hashed, responsive, webp)
  components/   one component per section, plus Starfield and ContactModal
    icons/      the hand-drawn line icons (24x24 viewBox, stroke only)
  data/site.ts  copy and contact details shared across components
  layouts/      BaseLayout — head, header, footer, contact modal
  pages/        index.astro, 404.astro
public/
  fonts/        self-hosted Poppins + Neue Plak Wide (woff2)
```

## Motion

`src/styles/motion.css` holds the whole system.

- `data-intro` — above-the-fold entrances (hero, 404 header). Pure CSS, runs on
  load, no JS involved, so first paint is never blocked on a script.
- `data-reveal` — everything below the fold. An IntersectionObserver in
  `BaseLayout.astro` adds `is-revealed`, then `is-settled` once the animation
  finishes so the animation stops overriding declared values (the card hover
  lifts depend on that). `data-reveal="soft"` opts into the blur-in variant.
- `data-reveal-group` on a container staggers its direct children via
  `--reveal-delay`.

Reveals are gated behind a `js-reveal` class set on `<html>` before first paint,
and only when the visitor has not asked for reduced motion — so nothing is ever
hidden if JS fails or is off, and reduced motion means no hiding at all. A 3s
timer un-gates the page if the observer never boots.

Two effects use scroll-driven animations, both wrapped in
`@supports (animation-timeline: …)` inside a `prefers-reduced-motion:
no-preference` query, so they simply do not run where unsupported: the reading
progress hairline under the header, and the slow drift of the About photo
inside its frame.

## Contact form

The design specifies the form but not a backend. Set `PUBLIC_CONTACT_ENDPOINT`
(see `.env.example`) to the URL that should receive the submission — the form
POSTs JSON (`firstName`, `lastName`, `email`, `company`, `message`) and shows the
"Request sent" panel on a 2xx, or an inline error with a mailto fallback otherwise.

With no endpoint configured the form composes the message in the visitor's own
mail client instead and shows an "Almost there" panel. That handoff copy is the
one piece of text on the site that is not from the client-approved handoff — it
covers a state the design didn't specify.

## Fonts

Poppins is OFL. **Neue Plak is a licensed face** — confirm the client's web
licence covers production use before deploying.

## Accessibility notes beyond the prototype

Focus trap and focus return in the modal, `role="dialog"` + `aria-modal`, body
scroll lock, a skip link, visible focus rings, a mobile menu below 900px, and
`prefers-reduced-motion` handling (which also disables the starfield parallax).
