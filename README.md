# Miri's Massage & Polarity – website

One-page website for Miri's Massage & Polarity (Winterthur). Mobile-first, static HTML (every word is in
the page source for Google and AI search), schema.org `HealthAndBeautyBusiness` + `FAQPage` data.

**Preview:** https://ggzhan.github.io/miri/

Content comes from the booking page (https://mirismassage.as.me/) and the draft Webador site (prices,
practice days, Polarity, training, reviews). Colours follow the Webador palette (sunflower amber `#f59e0b`,
burnt orange `#c46627`), with darker ambers for text so it stays readable.

## Files

- `build.mjs` – all content (top of the file) and the page template; generates `index.html`. Don't edit `index.html` by hand.
- `styles.css` – the whole stylesheet; colour tokens at the top.
- `img/sketches/*.svg` – the stick-figure drawings as vectors (traced from the original drawings with potrace).
  They scale to any size, have transparent backgrounds and use `fill="currentColor"`, so inlined they take the text colour.
- `tools/sketches.mjs` – a stick-figure model of Miri (bun, hair strands, happy eyes, wide trousers, mitten hands),
  other people, props (chair, table, stool, plant) and the scenes drawn with them. `node tools/sketches.mjs`
  regenerates `gespraech`, `polarity`, `fuesse`, `hawaii`, `yoga`, `gutschein`, `termin` and `kontakt`.svg;
  to add a scene, pose the figures in a new function in `scenes`.
- `img/og-image.jpg` – link-preview image (social networks don't accept SVG there).

## Booking (Acuity)

The `#buchen` section is our own treatment picker (sketch style). Choosing a treatment loads Acuity's calendar
for that appointment type in an iframe, only then (privacy + speed); without JavaScript every choice is a plain
link to Acuity. Appointment-type ids, durations and prices live in `C.booking` in `build.mjs` and must match Acuity.
No Acuity API key is used or needed — never commit one.

Acuity settings to change (Miri's account, not code):
- **Scheduling page description:** Acuity shows the long business description above every calendar, also embedded.
  Shorten it to one line — the website now carries that content.
- **Colours:** set the scheduling page colour to the site amber (`#c57f08`) so the calendar matches.

## Build

```sh
node build.mjs            # preview build: noindex (what GitHub Pages serves)
LAUNCH=1 node build.mjs   # launch build: indexable
```

## Before launch

- Set `SITE` in `build.mjs` to the real domain (canonical URL, og:image, JSON-LD), then build with `LAUNCH=1`.
- Payment methods differ between sources: Acuity says bar/TWINT/Banküberweisung, Webador says TWINT/bar/Karte. The site uses Webador's.
- The gift-voucher order is a pre-filled e-mail (no form backend).
