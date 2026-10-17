# Miri's Massage & Polarity – website prototypes

Throwaway design prototypes for a new website for Miri's Massage & Polarity (Winterthur).
Text and drawings are taken from the current booking page (https://mirismassage.as.me/).

**Preview:** https://ggzhan.github.io/miri/ (best viewed on a phone)

| | Variant | Idea |
|---|---|---|
| A | Notizheft | Ruled school notebook, doodles in the margin |
| B | Comic-Strip | The story told as comic panels on graph paper |
| C | Pinnwand | Paper scraps, polaroids and tape on a kraft board |
| D | Skizzenbuch | Spiral sketchbook, flip through chapters with tabs |
| E | Standard + Skizzen | Conventional practice website, drawings as section illustrations |

All variants are generated as static HTML (every word is in the page source, for Google and AI search),
with schema.org `HealthAndBeautyBusiness` data, one shared menu, and a mobile-first layout.

## Build

```sh
node build.mjs            # preview build: noindex + variant switcher (what GitHub Pages serves)
LAUNCH=1 node build.mjs   # launch build: indexable, no switcher
```

Content lives at the top of `build.mjs`; styles in `styles.css`. Don't edit the generated `variant-*.html` by hand.

## Before launch

- Set `SITE` in `build.mjs` to the real domain (canonical URL, og:image, JSON-LD).
- The short one-line descriptions of the four main treatments are drafts – the original page only listed durations.
- Variant E shows ★★★★★ on testimonials; the original reviews carry no star rating.
