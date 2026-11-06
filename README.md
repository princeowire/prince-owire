# Prince Owire — Portfolio

A responsive, motion-led developer portfolio built with Next.js App Router, JavaScript/JSX, Tailwind CSS, Framer Motion, and Lucide React. The visual direction translates the supplied reference into a developer-focused identity: a near-white editorial opening, oversized condensed typography, restrained cyan accents, dark technical sections, an animated contour field, a learning timeline, and editorial project previews.

## Requirements

- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Personalize before publishing

Edit `lib/site-data.js`:

- Set `profile.email` to the email address you want public.
- Set `profile.linkedin` to your real LinkedIn profile URL.
- Update project details, repository URLs, and skills as needed.

Project artwork is built with CSS and HTML rather than fake screenshots, so the page works without external image assets. Replace those visual components with optimized real screenshots when available. The Euphoria description explicitly notes that the current order flow uses local storage rather than claiming server-backed persistence.

## Structure

```text
app/
  globals.css
  layout.jsx
  page.jsx
components/
  ContactFooter.jsx
  ContourField.jsx
  Hero.jsx
  JourneyTimeline.jsx
  Navigation.jsx
  Portfolio.jsx
  ProjectCard.jsx
  Reveal.jsx
  SelectedWork.jsx
  TechnicalCapabilities.jsx
lib/
  site-data.js
```

## Notes

- The mobile navigation supports Escape-to-close, body scroll locking, and automatic closure when the viewport returns to desktop width.
- Motion respects `prefers-reduced-motion` and the canvas effect is lightweight, capped for high-DPI screens, and pauses outside the viewport.
- Social/profile URLs are not invented. Add missing public links in `lib/site-data.js` before launch.
