# Butler — Landing Page

Marketing site for **mybutler.pro**. Next.js 14 (App Router) + Tailwind + GSAP.

## Run locally

```bash
cd landing
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Deploy to Vercel (mybutler.pro)

1. Push this `landing/` folder to a Git repo (GitHub/GitLab/Bitbucket).
2. In Vercel → **Add New Project** → import the repo. Set the **Root Directory** to `landing` if the repo contains more than just this folder.
3. Vercel auto-detects Next.js. Click **Deploy**.
4. Once deployed, go to **Project → Settings → Domains** and add `mybutler.pro` (and `www.mybutler.pro`). Follow Vercel's DNS instructions — you'll either set an A record or point nameservers.
5. The primary CTA (`Open Butler`) currently points to `https://app.mybutler.pro` — update that link once the web app lives somewhere else.

Alternatively, from this folder:

```bash
npx vercel       # first run links the project
npx vercel --prod
```

## Design notes

- Visual language matches the "hand-drawn, soft lavender, chunky black headlines, pastel cards" Dribbble reference (Anastasia Golovko's Health App).
- Color palette lives in `tailwind.config.ts` — lavender as primary bg, mint/cream/blush as card accents, near-black `ink` for type, `sun` gold for highlights.
- Fonts: Space Grotesk (chunky sans display), Instrument Serif (editorial italic accents), Inter (body). Loaded from Google Fonts in `app/layout.tsx`.
- SVG squiggles, stars, icons, and the Tato portrait are all hand-authored inline SVG in `app/page.tsx`. No external images.
- Paper-grain overlay applied globally via CSS in `app/globals.css` to fight the "AI slick" look.

## GSAP animations

All animations live inside the `useEffect` in `app/page.tsx`. Every major one is numbered in the comments:

1. Hero word-by-word reveal (`expo.out`, staggered)
2. Hero sub + CTA rise
3. SVG squiggle draw-in (stroke-dashoffset, triggered on scroll)
4. Phone mockup float loops
5. Hero phone parallax on scroll
6. Section reveal on scroll (shared `.reveal` class)
7. Feature-card staggered entrance with slight rotation
8. Tato portrait rotation/parallax on scroll
9. Pricing card lift
10. Nav shrink on scroll
11. Magnetic buttons (follow the cursor, elastic release)
12. Big CTA wordmark scale-in
13. Idle star twinkles

## File layout

```
landing/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # The whole landing — all sections + components + GSAP
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── tsconfig.json
└── package.json
```
