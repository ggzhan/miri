# Miri's Massage & Polarity – website prototypes

Throwaway design prototypes for a new website for Miri's Massage & Polarity (Winterthur).
Text and drawings are taken from the current booking page (https://mirismassage.as.me/) and the draft
Webador site (prices, practice days, Polarity, training, reviews). Colours follow the Webador palette
(sunflower amber `#f59e0b`, burnt orange `#c46627`), with darker ambers for text so it stays readable.

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
- Payment methods differ between sources: Acuity says bar/TWINT/Banküberweisung, Webador says TWINT/bar/Karte. The site uses Webador's.
- No prices are published for the Hawaiian massage or the 30-min Klassische Massage.
- The gift-voucher order is a pre-filled e-mail (no form backend).
