# Miriam Pimputkar – Massage & Polarity – website

Website for Miriam Pimputkar – Massage & Polarity (Winterthur). Mobile-first, static HTML (every word is in
the page source for Google and AI search), schema.org `HealthAndBeautyBusiness` + `FAQPage` data.

Pages (each its own title, description and canonical URL; listed in `sitemap.xml`):
`/` Start (incl. Kontakt & Anfahrt) · `/angebot/` Angebot & Preise (incl. Gutschein) · `/polarity/` ·
`/ueber-mich/` (incl. Erfahrungsberichte) · `/buchen/` booking + FAQ (the header button, not a menu item) · `/datenschutz/` Datenschutz & Impressum (footer).
The former pages `/preise/`, `/gutschein/`, `/erfahrungen/`, `/kontakt/` are redirect stubs to their new sections.

**Preview:** https://ggzhan.github.io/miri/

Content comes from the booking page (https://mirismassage.as.me/) and the draft Webador site (prices,
practice days, Polarity, training, reviews). Colours follow the Webador palette (sunflower amber `#f59e0b`,
burnt orange `#c46627`), with darker ambers for text so it stays readable.

## Prototype: compact one-page version

`kompakt/` is a separate design prototype, synced with the main site on 2026-10-18 (claim, prices, FAQ, map, fonts) (https://ggzhan.github.io/miri/kompakt/): everything a customer needs on one
page – treatments with the right price after «Erstes Mal hier?», the visit as a drawn sequence, location, about, and
a few fold-outs. Own generator: `node kompakt/build.mjs` (content copied from the root `build.mjs`, keep in sync by hand).

## Files

- `build.mjs` – all content (top of the file) and one template per page (`PAGES`); generates every `index.html`, `sitemap.xml` and `robots.txt`. Don't edit the generated files by hand.
- `styles.css` – the whole stylesheet; colour tokens at the top.
- `img/sketches/*.svg` – the stick-figure drawings as vectors (traced from the original drawings with potrace).
  They scale to any size, have transparent backgrounds and use `fill="currentColor"`, so inlined they take the text colour.
- `tools/sketches.mjs` – a stick-figure model of Miri (bun, hair strands, happy eyes, wide trousers, mitten hands),
  other people, props (chair, table, stool, plant) and the scenes drawn with them. `node tools/sketches.mjs`
  regenerates `gespraech`, `fuesse`, `hawaii`, `yoga`, `gutschein`, `termin`, `winken`, `kontakt` and the page-header scenes
  `besuch` (start page: your first visit), `angebot`, `polarity` and `fragen` (FAQ);
  to add a scene, pose the figures in a new function in `scenes`.
- `img/og-image.jpg` – link-preview image (social networks don't accept SVG there).

## Booking (Acuity)

The booking page (`/buchen/`) is our own treatment picker (sketch style). Choosing a treatment loads Acuity's calendar
for that appointment type in an iframe, only then (privacy + speed); without JavaScript every choice is a plain
link to Acuity. Treatment cards on other pages link to `/buchen/?typ=<id>`, which opens that calendar directly. Appointment-type ids, durations and prices live in `C.booking` in `build.mjs` and must match Acuity.
No Acuity API key is used or needed — never commit one.

Acuity settings to change (Miri's account, not code):
- **Scheduling page description:** Acuity shows the long business description above every calendar, also embedded.
  Shorten it to one line — the website now carries that content. Then delete `calHint` in `build.mjs` (the line above the calendar that
  says the free times follow below the welcome text).
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
- Miri to confirm: the FAQ answers «Was ziehe ich für die Massage aus?» and «Hilft eine Behandlung nach einem Unfall oder einer Verletzung?», the claim «Traumasensible Körpertherapie und Prozessbegleitung» (drafted, marked TODO in `build.mjs`) and the
  softened health wording (massage and stress, Polarity Selbstheilung, Ernährung, Reinigung) – the originals promised
  medical effects. No phone number is published; Kontakt says «per E-Mail». Parking info is still missing.
- `/datenschutz/` (Datenschutz & Impressum) is a draft, not legal advice: Miri to review it, especially the health-data
  paragraph, and update `C.hosting` if the real domain is not served by GitHub Pages. Fonts are self-hosted in `fonts/`
  (OFL), so the only third parties are Acuity (after a click) and the Google Maps embed on the start page.
