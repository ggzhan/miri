// PROTOTYPE — throwaway. Renders five design variants of Miri's Massage & Polarity
// to static HTML (variant-a.html … variant-e.html) so every word is in the HTML
// source for Google and AI crawlers, not injected by JavaScript.
// Run: node build.mjs   (index.html redirects ?variant=X to the matching file)
import { writeFileSync } from 'node:fs';

/* ---------------- content, taken from the Acuity page ---------------- */
const C = {
  name: "Miri's Massage & Polarity",
  person: 'Miriam Pimputkar',
  book: 'https://mirismassage.as.me/',
  email: 'mirismassage@gmail.com',
  address: ['Münzgasse 2', '4. Stock, Lift vorhanden', '8400 Winterthur'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Miri%27s+Klassische+Massage+M%C3%BCnzgasse+2+8400+Winterthur',
  welcome: 'Herzlich Willkommen! Schön, dass du hier bist!',
  hook: 'Bist du körperlich angespannt? Schränkt dich dein Körper im Alltag ein? Hast du Muskelschmerzen? Oder möchtest du dich einfach mal genüsslich entspannen und dir so etwas Gutes tun? Dann bist du bei mir genau richtig.',
  why: [
    'Mit der Massage wird durch manuellen Druck und Zug auf deine Muskeln die Durchblutung gefördert. Dein Stoffwechsel wird angeregt. Deine Muskeln entspannen sich und schmerzhafte Verhärtungen lösen sich auf.',
    'Die Massage reduziert Stress im gesamten Organismus. So können nicht nur körperliche Beschwerden wie z.B. Kopfschmerzen, sondern auch psychische Leiden wie Depressionen und Angstzustände gelindert werden. Ein ganzheitliches Wohlbefinden entsteht.',
  ],
  offerIntro: 'Als Dipl. Klassische Masseurin und Polaritytherapeutin in Ausbildung biete ich dir folgendes an:',
  services: [
    { n: 'Ganzheitliche Massage', t: '60 min', d: 'Massage für Körper und Seele, individuell auf dich abgestimmt.' },
    { n: 'Klassische Ölmassage', t: '30 / 60 min', d: 'Löst Verspannungen und schmerzhafte Verhärtungen, fördert die Durchblutung.' },
    { n: 'Polaritybehandlung', t: '60–90 min', d: 'Ganzheitliche Körperarbeit nach der Polarity-Methode.' },
    { n: 'Lomi Lomi', t: '90 min', d: 'Ganzkörper-Wellnessmassage nach der hawaiianischen Massagemethode Lomi Lomi.' },
  ],
  extras: ['Myofasziale Triggerpunktbehandlung', 'Schröpfmassage (mit Schröpfgläsern)', 'Reflexologie (z.B. Füsse, Hände, Ohren)'],
  gift: {
    title: 'Geschenkgutschein – Zeit für dich',
    versions: ['als Faltkarte per Post (A6)', 'digital zum Verschicken', 'digital zum selber Ausdrucken (A6/A5)'],
    note: 'Schreib mir gerne per E-Mail, welche Version du möchtest.',
  },
  values: [
    { k: 'Achtsam', v: 'Aufgrund meiner Feinfühligkeit arbeite ich sehr achtsam mit meinen Händen. So erhältst du eine individuell auf dich abgestimmte Massage.' },
    { k: 'Wohltuend', v: 'Während der Massage arbeite ich in der Stille oder zu sanfter Musik, voll und ganz auf dich fokussiert. Durch das Nichtsprechen nimmst du deinen Körper und die wohltuenden Berührungen intensiver wahr.' },
    { k: 'Ganzheitlich', v: 'Du profitierst von meinen reichhaltigen Erfahrungen und Wissen aus der Physio- und Ergotherapie, TCM und Kinesiologie. Bei Interesse zeige ich dir Übungen, die dir im Alltag helfen, selber Stress, Anspannung und Schmerzen zu reduzieren.' },
    { k: 'Sozial', v: 'Falls du nicht- oder wenigverdienend bist, bin ich gerne bereit, dir finanziell entgegenzukommen. Melde dich ungeniert per E-Mail bei mir.' },
  ],
  about: [
    'Das bin ich: ein fröhliches, bewegungsfreudiges Wesen mit einer grossen Faszination für den menschlichen Körper. Ich liebe es, mit meinen Händen zu arbeiten und mit Menschen in Kontakt zu sein.',
    'Gesund und körperlich frei zu sein, ist keine Selbstverständlichkeit. So praktiziere ich regelmässig eine Mischung aus Pilates, Yoga, Faszientraining, Qi Gong, Meditation und vieles mehr. Was meinem Körper und meiner Seele nicht fehlen darf, ist das Tanzen zu den 5 Rhythmen.',
  ],
  curious: ['Neugierig geworden?', 'Dann melde dich jetzt für eine Kennenlernmassage an!'],
  bye: 'Ich freue mich auf dich! Bis bald!',
  quotes: [
    { a: 'Tamara R.', q: 'Miriam hat mir eine wohltuende Massageerfahrung geschenkt und dabei nicht nur meine Verspannungen erfolgreich gelöst, sondern auch meiner Psyche etwas Gutes getan. Ich kann einen Besuch in der Praxis auf’s Wärmste empfehlen.' },
    { a: 'Raphael E.', q: 'Miriam ist eine wundervolle Masseurin! Sie schöpft aus einer breiten Palette an Techniken, gepaart mit viel anatomischem und medizinischem Wissen. Das hat mir sehr geholfen.' },
    { a: 'Peter A.', q: 'Ich habe mich bei Miriam gleich wohl gefühlt. Sie gestaltet eine Atmosphäre, in der man sich entspannen kann und einen neuen Zugang zum eigenen Körper findet. Miriam hat eine grosse Begabung.' },
  ],
  pay: 'Bar, TWINT oder Banküberweisung',
  recs: ['Alexander-Technik bei Peter', 'Bewegungs-Workshops bei Steffen', '5Rhythmen bei Monika', 'Musiktherapie bei Nicole', 'Bewegte Meditation bei Jacqueline'],
};

// Descriptive alt text: crawlers and screen readers read these.
const IMG = {
  massage: ['logo-massage.jpg', 'Strichmännchen-Zeichnung: Masseurin massiert eine entspannte Person auf der Massageliege', 289, 200],
  stressed: ['stressed.jpg', 'Strichmännchen mit Verspannungen und Kopfschmerzen hält sich den Kopf', 156, 197],
  stretch: ['stretch.jpg', 'Entspanntes Strichmännchen streckt sich nach der Massage', 128, 188],
  jump: ['jump.jpg', 'Fröhliches Strichmännchen springt vor Freude', 378, 336],
  jumpArms: ['jump-arms.png', 'Strichmännchen springt mit erhobenen Armen', 118, 105],
  run: ['run.png', 'Strichmännchen tanzt und bewegt sich frei', 184, 194],
  miriam: ['miriam.png', 'Miriam Pimputkar, dipl. Masseurin in Winterthur', 336, 448],
  praxis: ['praxis.jpg', 'Massagepraxis an der Münzgasse 2 in Winterthur mit Massageliege', 320, 242],
  gift: ['gutschein.png', 'Geschenkgutschein «Zeit für dich» von Miri’s Massage', 1549, 547],
  map: ['map.png', 'Karte: Massagepraxis an der Münzgasse 2, Winterthur Altstadt', 871, 592],
};
// img(key, {cls, style, deco}) — deco=true marks a purely decorative repeat of a drawing.
const img = (k, o = {}) => {
  const [f, alt, w, h] = IMG[k];
  return `<img src="img/${f}" alt="${o.deco ? '' : alt}" width="${w}" height="${h}" loading="${o.eager ? 'eager' : 'lazy'}"${o.cls ? ` class="${o.cls}"` : ''}${o.style ? ` style="${o.style}"` : ''}>`;
};
const mail = `<a href="mailto:${C.email}">${C.email}</a>`;
const squiggle = c => `<svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9 C 30 2, 50 13, 80 7 S 140 3, 198 8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`;
const arrowDown = c => `<svg viewBox="0 0 44 28" aria-hidden="true"><path d="M3 6 C 14 2, 26 20, 38 16 M30 8 L39 16 L29 22" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// One menu for every variant; each variant only restyles it.
const NAV = [
  ['angebot', 'Angebot'], ['arbeit', 'Meine Arbeit'], ['ueber-mich', 'Über mich'],
  ['erfahrungen', 'Erfahrungen'], ['gutschein', 'Gutschein'], ['kontakt', 'Kontakt'],
];
const navList = () => `<ul class="navlist" id="menu">${NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul>`;
const label = id => NAV.find(n => n[0] === id)[1];

/* ---------------- SEO head ---------------- */
// TODO before launch: set SITE to the real domain so canonical / og:image / JSON-LD get absolute URLs.
const SITE = 'https://www.example.ch/';
// Preview builds (the default) are hidden from search engines and show the variant switcher,
// so the shared GitHub Pages copy never competes with the real site. Launch build: LAUNCH=1 node build.mjs
const PREVIEW = process.env.LAUNCH !== '1';
const TITLE = "Massage in Winterthur – Klassische Massage, Lomi Lomi & Polarity | Miri's Massage";
const DESC = 'Ganzheitliche und klassische Massage, Lomi Lomi, Polaritybehandlung und Schröpfmassage in Winterthur (Münzgasse 2). Dipl. Masseurin Miriam Pimputkar – Termin online buchen.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': `${SITE}#praxis`,
  name: C.name,
  description: DESC,
  url: SITE,
  image: [`${SITE}img/miriam.png`, `${SITE}img/praxis.jpg`, `${SITE}img/logo-massage.jpg`],
  email: C.email,
  address: { '@type': 'PostalAddress', streetAddress: 'Münzgasse 2', postalCode: '8400', addressLocality: 'Winterthur', addressRegion: 'ZH', addressCountry: 'CH' },
  areaServed: { '@type': 'City', name: 'Winterthur' },
  paymentAccepted: 'Bargeld, TWINT, Banküberweisung',
  currenciesAccepted: 'CHF',
  knowsLanguage: 'de',
  employee: { '@type': 'Person', name: C.person, jobTitle: 'Dipl. Klassische Masseurin, Polaritytherapeutin in Ausbildung' },
  potentialAction: { '@type': 'ReserveAction', target: C.book, name: 'Massage-Termin online buchen' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Massagen & Behandlungen',
    itemListElement: [...C.services.map(s => ({ n: s.n, d: `${s.d} Dauer: ${s.t}.` })), ...C.extras.map(e => ({ n: e, d: 'Ergänzende Behandlung' }))]
      .map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.n, description: s.d } })),
  },
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Kalam:wght@300;400;700&family=Patrick+Hand&family=Gaegu:wght@400;700&family=Shadows+Into+Light&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap';

const VARIANTS = [
  { key: 'A', name: 'Notizheft', file: 'variant-a.html', render: A },
  { key: 'B', name: 'Comic-Strip', file: 'variant-b.html', render: B },
  { key: 'C', name: 'Pinnwand', file: 'variant-c.html', render: C_ },
  { key: 'D', name: 'Skizzenbuch', file: 'variant-d.html', render: D },
  { key: 'E', name: 'Standard + Skizzen', file: 'variant-e.html', render: E },
];

function page(v, body, extraScript = '') {
  const i = VARIANTS.indexOf(v), n = VARIANTS.length;
  const prev = VARIANTS[(i - 1 + n) % n], next = VARIANTS[(i + 1) % n];
  return `<!doctype html>
<!-- PROTOTYPE — throwaway, generated by build.mjs. Variant ${v.key}: ${v.name}. Do not edit by hand. -->
<html lang="de-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<meta name="description" content="${DESC}">${PREVIEW ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="canonical" href="${SITE}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_CH">
<meta property="og:site_name" content="${C.name}">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="${SITE}img/logo-massage.jpg">
<meta name="geo.region" content="CH-ZH">
<meta name="geo.placename" content="Winterthur">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link href="styles.css" rel="stylesheet">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
${body}
${PREVIEW ? `<!-- prototype switcher: not part of any design -->
<div id="proto-bar" role="toolbar" aria-label="Prototyp-Varianten">
  <a href="${prev.file}" id="prev" aria-label="Vorherige Variante">←</a>
  <span>${v.key} (${v.name})<small>${i + 1}/${n}</small></span>
  <a href="${next.file}" id="next" aria-label="Nächste Variante">→</a>
</div>` : ''}
<script>
${PREVIEW ? `addEventListener('keydown', e => {
  if (e.target.closest('input, textarea, [contenteditable]')) return;
  if (e.key === 'ArrowLeft') location.href = '${prev.file}';
  if (e.key === 'ArrowRight') location.href = '${next.file}';
});` : ''}
// mobile menu toggle
document.querySelectorAll('.menu-toggle').forEach(b => b.addEventListener('click', () => {
  const box = b.closest('.has-toggle'); const open = box.classList.toggle('open'); b.setAttribute('aria-expanded', open);
}));
document.querySelectorAll('.has-toggle .navlist a').forEach(a => a.addEventListener('click', () => a.closest('.has-toggle').classList.remove('open')));
// highlight the menu entry of the section in view
const links = [...document.querySelectorAll('.navlist a[href^="#"]')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) io.observe(s); });
${extraScript}
</script>
</body>
</html>
`;
}

/* ---------------- A: Notizheft ---------------- */
function A() {
  const next = id => `<a class="next" href="#${id}">weiter: ${label(id)} ${arrowDown('#1f4fd1')}</a>`;
  return `<div class="vA">
  <header class="nb-top has-toggle">
    <a class="nb-brand" href="#willkommen">Miri's Massage</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü"><span aria-hidden="true">☰</span><span class="tlabel"> Menü</span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="nb-book" href="${C.book}">Termin buchen</a>
  </header>
  <main class="sheet" id="inhalt">
    <span class="date">Winterthur ✎</span>
    <section id="willkommen">
      <div class="row">
        <div class="margin-note">${img('jump', { cls: 'ink', deco: true, eager: true })}hallo!</div>
        <h1>${C.name}<span class="sr"> – Massage in Winterthur</span></h1>
        <p class="welcome">${C.welcome}</p>
      </div>
      <div class="row">
        <div class="margin-note" style="top:0">${img('stressed', { cls: 'ink', style: 'width:60px', eager: true })}aua…</div>
        <p><b>${C.hook}</b></p>
      </div>
      ${C.why.map(p => `<p>${p}</p>`).join('')}
      <p><b>Inhalt dieser Seite:</b></p>
      <ol class="toc">${NAV.map(([id, l], i) => `<li><a href="#${id}">${l}<span>${i + 2}</span></a></li>`).join('')}</ol>
    </section>

    <section id="angebot">
      <h2>Mein Angebot ${squiggle('#d23a2a')}</h2>
      <div class="row">
        ${img('massage', { cls: 'ink doodle-right', style: 'top:0;width:190px;right:-40px' })}
        <p>${C.offerIntro}</p>
        <ul class="todo">${C.services.map(s => `<li><h3 style="display:inline;font:inherit"><span class="hl">${s.n}</span></h3> – ${s.d} <span class="dur">(${s.t})</span></li>`).join('')}</ul>
      </div>
      <h3 style="font:700 19px/32px Kalam;margin:0">Ergänzende Behandlungen:</h3>
      <ul class="extra">${C.extras.map(e => `<li>${e}</li>`).join('')}</ul>
      <a class="cta" href="${C.book}">Termin buchen →</a><br>
      ${next('arbeit')}
    </section>

    <section id="arbeit">
      <h2>Was meine Arbeit ausmacht ${squiggle('#1f4fd1')}</h2>
      ${C.values.map(v => `<p><span class="circled">${v.k}</span> ${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p>`).join('')}
      ${next('ueber-mich')}
    </section>

    <section id="ueber-mich">
      <h2>Das bin ich ${squiggle('#d23a2a')}</h2>
      <figure class="tape-photo">${img('miriam')}<figcaption>Miriam :)</figcaption></figure>
      ${C.about.map(p => `<p>${p}</p>`).join('')}
      <div class="row">
        <div class="margin-note">${img('run', { cls: 'ink' })}5 Rhythmen!</div>
        <p style="clear:both"><b>${C.curious[0]}</b> ${C.curious[1]}</p>
      </div>
      ${next('erfahrungen')}
    </section>

    <section id="erfahrungen">
      <h2>Erfahrungsberichte ${squiggle('#1f4fd1')}</h2>
      ${C.quotes.map(q => `<blockquote>«${q.q}»<cite>– ${q.a}</cite></blockquote>`).join('')}
      ${next('gutschein')}
    </section>

    <section id="gutschein">
      <h2>${C.gift.title} ${squiggle('#d23a2a')}</h2>
      <p>In 3 Versionen erhältlich: ${C.gift.versions.join(' · ')}. ${C.gift.note} ${mail}</p>
      ${img('gift', { style: 'margin:0 0 32px;transform:rotate(-1deg);box-shadow:0 6px 14px -6px rgba(0,0,0,.4)' })}
      ${next('kontakt')}
    </section>

    <section id="kontakt">
      <div class="two">
        <address style="font-style:normal">
          <h2 style="font-size:36px;margin-top:0">Praxis & Kontakt</h2>
          <p><b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}</p>
          <p>Zahlung: ${C.pay}<br>Fragen? ${mail}</p>
        </address>
        <a href="${C.maps}">${img('praxis', { style: 'border:8px solid #fff;transform:rotate(-2deg);box-shadow:0 6px 14px -6px rgba(0,0,0,.4)' })}</a>
      </div>
      <p><b>Körperbasierte Empfehlungen in Winterthur:</b> ${C.recs.join(', ')}.</p>
      <div class="row" style="text-align:center"><a class="cta" href="${C.book}">${C.bye}</a></div>
      <a class="next" href="#willkommen">zurück nach oben ↑</a>
    </section>
  </main>
</div>`;
}

/* ---------------- B: Comic ---------------- */
function B() {
  const next = id => `<a class="next" href="#${id}">Fortsetzung: ${label(id)} →</a>`;
  return `<div class="vB">
  <header class="cb-top"><div class="in has-toggle">
    <a class="cb-brand" href="#willkommen">Miri's <em>Massage</em></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü"><span aria-hidden="true">☰</span><span class="tlabel"> Menü</span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="cb-book" href="${C.book}">Termin buchen!</a>
  </div></header>
  <main class="wrap" id="inhalt">
    <section id="willkommen">
      <div class="masthead">
        <h1>Miri's <em>Massage</em><br>& Polarity<span class="sr"> in Winterthur</span></h1>
        <span class="issue">Massage in Winterthur · Münzgasse 2</span>
      </div>
      <div class="strip">
        <div class="panel"><span class="caption">Bist du körperlich angespannt?</span>
          <div class="bubble">Mein Nacken!!</div>${img('stressed', { cls: 'ink', eager: true })}</div>
        <div class="panel"><span class="caption">…dann komm vorbei.</span>
          ${img('massage', { cls: 'ink', style: 'max-height:240px;width:auto', eager: true })}</div>
        <div class="panel"><span class="caption">Danach:</span>
          <div class="bubble">Juhuu!</div>${img('jumpArms', { cls: 'ink', eager: true })}</div>
      </div>
      <p class="swipe-hint" aria-hidden="true">← wischen →</p>
      <div style="display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center" class="intro">
        <p style="font-size:22px;margin:0">${C.welcome} ${C.hook}</p>
        <a class="burst" href="${C.book}">Termin buchen!</a>
      </div>
      <h2>Warum Massage?</h2>
      <div class="grid">${C.why.map(p => `<div class="panel">${p}</div>`).join('')}</div>
      ${next('angebot')}
    </section>

    <section id="angebot">
      <h2>Mein Angebot</h2>
      <p style="margin-top:-8px">${C.offerIntro}</p>
      <div class="grid">${C.services.map(s => `<article class="panel svc"><h3>${s.n}</h3><p style="margin:0 0 10px">${s.d}</p><span class="time">⏱ ${s.t}</span></article>`).join('')}</div>
      <div class="extras"><h3 style="margin:0;font:700 20px Gaegu">+ Ergänzend:</h3><ul style="display:contents;list-style:none">${C.extras.map(e => `<li class="chip">${e}</li>`).join('')}</ul></div>
      ${next('arbeit')}
    </section>

    <section id="arbeit">
      <h2>Was meine Arbeit ausmacht</h2>
      <div class="grid values">${C.values.map((v, i) => `<div class="panel"><span class="caption">#${i + 1}</span><h3 class="big" style="margin:0">${v.k}</h3>${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</div>`).join('')}</div>
      ${next('ueber-mich')}
    </section>

    <section id="ueber-mich">
      <h2>Das bin ich</h2>
      <div class="about">
        <figure class="panel photo" style="margin:0">${img('miriam')}<figcaption style="text-align:center;font:700 22px Gaegu;margin-top:6px">${C.person}</figcaption></figure>
        <div>
          ${C.about.map(p => `<p style="margin-top:0">${p}</p>`).join('')}
          <div class="panel" style="display:flex;gap:16px;align-items:center;margin-top:18px">
            ${img('stretch', { cls: 'ink', style: 'width:70px' })}
            <div><b style="font:700 26px Gaegu">${C.curious[0]}</b><br>${C.curious[1]}</div>
          </div>
        </div>
      </div>
      ${next('erfahrungen')}
    </section>

    <section id="erfahrungen">
      <h2>Erfahrungsberichte</h2>
      <div class="quotes">${C.quotes.map((q, i) => `<figure class="quote" style="margin:0"><blockquote class="bubble" style="margin:0 0 14px">«${q.q}»</blockquote><figcaption class="who">${img(['jump', 'run', 'stretch'][i], { cls: 'ink', deco: true })}${q.a}</figcaption></figure>`).join('')}</div>
      ${next('gutschein')}
    </section>

    <section class="finale">
      <div class="panel gift" id="gutschein"><h2 class="caption" style="margin:0;font:700 17px Gaegu">${C.gift.title}</h2>
        In 3 Versionen erhältlich:<ul>${C.gift.versions.map(v => `<li>${v}</li>`).join('')}</ul>${C.gift.note} ${mail}
        ${img('gift')}</div>
      <address class="panel" id="kontakt" style="font-style:normal"><h2 class="caption" style="margin:0;font:700 17px Gaegu">Kontakt: hier findest du mich</h2>
        <b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}
        <a href="${C.maps}">${img('map', { style: 'border:2px solid #111;margin:12px 0' })}</a>
        Zahlung: ${C.pay}
        <p style="margin-bottom:0"><b>Empfehlungen in Winterthur:</b></p><ul>${C.recs.map(r => `<li>${r}</li>`).join('')}</ul>
      </address>
    </section>
    <p style="text-align:center;margin-top:48px"><a class="burst" href="${C.book}">${C.bye}</a></p>
    <a class="next" href="#willkommen" style="margin:20px auto 0">↑ Zurück zum Anfang</a>
  </main>
</div>`;
}

/* ---------------- C: Pinnwand ---------------- */
function C_() {
  const col = (c, r) => `grid-column:${c};${r ? `grid-row:${r};` : ''}`;
  const tilts = ['-2deg', '1.5deg', '-1deg', '2.5deg'];
  const next = id => `<a class="next" href="#${id}">→ weiter zu ${label(id)}</a>`;
  return `<div class="vC">
  <header class="tp-top"><div class="in has-toggle">
    <a class="tp-brand" href="#willkommen">Miri's Massage</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü"><span aria-hidden="true">☰</span><span class="tlabel"> Menü</span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="tp-book" href="${C.book}">Termin buchen</a>
  </div></header>
  <main class="board" id="inhalt">
    <section class="scrap torn tape" id="willkommen" style="${col('1 / 8')}--r:-1.5deg;padding:40px 36px">
      <h1 class="title">${C.name}<span class="sr"> – Massage in Winterthur</span></h1>
      <p class="sub">${C.welcome}</p>
      <p>${C.hook}</p>
      <a class="book" href="${C.book}">Termin buchen</a> &nbsp; ${next('angebot')}
    </section>
    <figure class="scrap polaroid tape" style="${col('8 / 11')}--r:4deg;--tr:6deg;margin:20px 0 0">
      ${img('miriam', { eager: true })}<figcaption>Miriam</figcaption>
    </figure>
    <div style="${col('11 / 13')}padding-top:40px">${img('jump', { cls: 'doodle', deco: true, style: 'background:#fffef8;padding:10px;transform:rotate(-6deg);box-shadow:0 8px 16px -8px rgba(0,0,0,.5)' })}</div>

    <div style="${col('1 / -1')}" id="angebot"><h2 class="label">MEIN ANGEBOT</h2> <span style="font:400 22px Caveat;color:#3d2f1d">${C.offerIntro}</span></div>
    ${C.services.map((s, i) => `<article class="scrap card pin grid-paper" style="${col(`${1 + i * 3} / ${4 + i * 3}`)}--r:${tilts[i]}">
      <h3 style="margin-top:14px">${s.n}</h3><div style="font-size:16px;line-height:1.35">${s.d}</div><div class="time">${s.t}</div></article>`).join('')}

    <div class="scrap lined tape" style="${col('1 / 6')}--r:1deg">
      <h3 style="font:700 38px/1 Caveat;margin:0 0 12px">Ergänzend</h3><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul>
      ${next('arbeit')}
    </div>
    <div class="scrap torn" style="${col('6 / 13')}--r:-.8deg;display:grid;grid-template-columns:1fr 150px;gap:16px;align-items:center">
      <div><h3 style="font:700 30px Caveat;margin:0 0 6px">Warum Massage?</h3>${C.why.map(p => `<p style="margin:0 0 10px">${p}</p>`).join('')}</div>
      ${img('massage', { cls: 'ink' })}
    </div>

    <div style="${col('1 / -1')}" id="arbeit"><h2 class="label">WAS MEINE ARBEIT AUSMACHT</h2></div>
    ${C.values.map((v, i) => `<div class="scrap tape" style="${col(`${1 + i * 3} / ${4 + i * 3}`)}--r:${tilts[(i + 1) % 4]};--tr:${i % 2 ? 4 : -6}deg">
      <h3 style="font:700 30px Caveat;margin:6px 0">${v.k}</h3><div style="font-size:17px">${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</div></div>`).join('')}

    <section class="scrap lined torn" id="ueber-mich" style="${col('1 / 8')}--r:-1deg">
      <h2>Das bin ich</h2>${C.about.map(p => `<p style="margin:0 0 30px">${p}</p>`).join('')}
      ${next('erfahrungen')}
    </section>
    <figure class="scrap polaroid pin" style="${col('8 / 13')}--r:3deg;margin:0">
      ${img('praxis')}<figcaption>meine Praxis, 4. Stock</figcaption>
    </figure>

    <div style="${col('1 / -1')}" id="erfahrungen"><h2 class="label">ERFAHRUNGSBERICHTE</h2></div>
    ${C.quotes.map((q, i) => `<blockquote class="scrap sticky ${['', 'pink', 'green'][i]}" style="${col(`${1 + i * 4} / ${5 + i * 4}`)}--r:${tilts[i]};margin:0">«${q.q}»<cite>${q.a}</cite></blockquote>`).join('')}

    <section class="scrap tape" id="gutschein" style="${col('1 / 7')}--r:1.5deg;padding:30px 20px 20px">
      <h2>${C.gift.title}</h2>
      ${img('gift', { style: 'margin-bottom:10px' })}
      <ul>${C.gift.versions.map(v => `<li>${v}</li>`).join('')}</ul>
      <p style="margin:8px 0 0">${C.gift.note} ${mail}</p>
      ${next('kontakt')}
    </section>
    <figure class="scrap polaroid pin" style="${col('7 / 10')}--r:-2.5deg;margin:0">
      <a href="${C.maps}">${img('map')}</a><figcaption>${C.address[0]}, Winterthur</figcaption>
    </figure>
    <address class="scrap grid-paper torn" id="kontakt" style="${col('10 / 13')}--r:2deg;font-style:normal">
      <h2 style="font-size:32px">Kontakt</h2>
      <b>${C.person}</b><br>${C.address.join('<br>')}<br>${mail}<br><br>Zahlung: ${C.pay}
      <p style="margin:12px 0 4px"><b>Tipps in Winterthur:</b></p><ul style="font-size:16px">${C.recs.map(r => `<li>${r}</li>`).join('')}</ul>
    </address>

    <div class="scrap torn tape" style="${col('3 / 11')}--r:-1deg;text-align:center;padding:40px">
      ${img('jumpArms', { cls: 'ink', deco: true, style: 'width:110px;margin:0 auto' })}
      <h2 style="font-size:48px">${C.curious[0]}</h2><p style="margin:0">${C.curious[1]}</p>
      <a class="book" href="${C.book}">${C.bye}</a><br>
      <a class="next" href="#willkommen">↑ nach oben</a>
    </div>
  </main>
</div>`;
}

/* ---------------- D: Skizzenbuch ---------------- */
function D() {
  const h = s => `<h3 style="font:700 28px Caveat;display:inline;margin:0">${s}.</h3>`;
  const spreads = [
    { id: 'willkommen', tab: 'Hallo', c: '#ffe08a',
      L: `<h1>Miri's Massage<br>& Polarity<span class="sr"> in Winterthur</span></h1><p class="lead">${C.welcome}</p><p>${C.hook}</p><a class="go" href="${C.book}">Termin buchen →</a>`,
      R: `<div class="art">${img('massage', { cls: 'ink boil', eager: true, style: 'max-height:240px;width:auto' })}</div>
          <nav aria-label="Inhaltsverzeichnis" style="align-self:center"><b style="font:700 26px Caveat">Inhalt</b>
          <ol class="contents">${[['warum', 'Warum Massage?'], ...NAV].map(([id, l], i) => `<li><a href="#${id}">${l}<span>${i * 2 + 3}</span></a></li>`).join('')}</ol></nav>` },
    { id: 'warum', tab: 'Warum', c: '#ffc6c6',
      L: `<div class="art">${img('stressed', { cls: 'ink boil', style: 'max-height:300px;width:auto' })}</div><p class="small" style="text-align:center">vorher</p>`,
      R: `<h2>Warum Massage?</h2>${C.why.map(p => `<p>${p}</p>`).join('')}<div style="display:flex;align-items:center;gap:12px">${img('stretch', { cls: 'ink boil', style: 'width:60px' })}<span class="small">nachher</span></div>` },
    { id: 'angebot', tab: 'Angebot', c: '#c9e8ff',
      L: `<h2>Mein Angebot</h2><p class="small">${C.offerIntro}</p><ul class="pencil-list">${C.services.map(s => `<li><span><h3 style="font:inherit;margin:0;display:inline">${s.n}</h3><br><span class="small">${s.d}</span></span><span>${s.t}</span></li>`).join('')}</ul>`,
      R: `<h3 style="font:700 40px Caveat;margin:0 0 12px">Ergänzend</h3><ul class="pencil-list">${C.extras.map(e => `<li><span>${e}</span><span>+</span></li>`).join('')}</ul><a class="go" href="${C.book}">Termin buchen →</a>` },
    { id: 'arbeit', tab: 'Meine Arbeit', c: '#d6f5c4',
      L: `<h2>Was meine Arbeit ausmacht</h2>${C.values.slice(0, 2).map(v => `<p>${h(v.k)} ${v.v}</p>`).join('')}`,
      R: `${C.values.slice(2).map(v => `<p>${h(v.k)} ${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p>`).join('')}${img('run', { cls: 'ink boil', style: 'width:120px;align-self:flex-end' })}` },
    { id: 'ueber-mich', tab: 'Über mich', c: '#e8d4ff',
      L: `<div class="art">${img('miriam', { cls: 'photo-sketch' })}</div>`,
      R: `<h2>Das bin ich</h2>${C.about.map(p => `<p>${p}</p>`).join('')}<p class="lead">${C.curious[0]} ${C.curious[1]}</p>` },
    { id: 'erfahrungen', tab: 'Erfahrungen', c: '#ffd9b3',
      L: `<h2>Erfahrungsberichte</h2>${C.quotes.slice(0, 2).map(q => `<blockquote>«${q.q}»<cite>${q.a}</cite></blockquote>`).join('')}`,
      R: `${C.quotes.slice(2).map(q => `<blockquote>«${q.q}»<cite>${q.a}</cite></blockquote>`).join('')}<div class="art">${img('jumpArms', { cls: 'ink boil', deco: true, style: 'max-height:200px;width:auto' })}</div>` },
    { id: 'gutschein', tab: 'Gutschein', c: '#fff3a8',
      L: `<h2>${C.gift.title}</h2>${img('gift', { style: 'margin-bottom:12px' })}<p class="small">${C.gift.versions.join(' · ')}<br>${C.gift.note} ${mail}</p>`,
      R: `<div class="art">${img('praxis', { cls: 'photo-sketch', style: 'width:300px' })}</div><p class="small" style="text-align:center">die Praxis, 4. Stock</p>` },
    { id: 'kontakt', tab: 'Kontakt', c: '#cdeee8',
      L: `<h2>Kontakt</h2><address style="font-style:normal"><p><b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}</p><p class="small">Zahlung: ${C.pay}<br>${mail}</p></address><a href="${C.maps}">${img('map', { style: 'filter:grayscale(1);max-height:170px;width:auto' })}</a>`,
      R: `<h2>Bis bald!</h2><p>${C.bye}</p><p class="small">Körperbasierte Empfehlungen in Winterthur: ${C.recs.join(', ')}.</p><a class="go" href="${C.book}">Termin buchen →</a>` },
  ];
  const n = spreads.length;
  return `<div class="vD">
  <header class="booktop"><a href="#willkommen">Miri's Massage & Polarity</a><a class="bt-book" href="${C.book}">Termin buchen</a></header>
  <main class="book" id="inhalt">
    <nav class="tabs" aria-label="Hauptmenü"><ul class="navlist" style="display:contents">${spreads.map(s => `<li style="display:contents"><a style="--c:${s.c}" href="#${s.id}">${s.tab}</a></li>`).join('')}<li style="display:contents"><a class="tab-book" href="${C.book}">Termin buchen</a></li></ul></nav>
    ${spreads.map((s, i) => `<section class="spread" id="${s.id}"><div class="pg">${s.L}<span class="num">${i * 2 + 1}</span></div><div class="pg">${s.R}<span class="num">${i * 2 + 2}</span></div></section>`).join('')}
    <nav class="pager" aria-label="Blättern"><a href="#${spreads[n - 1].id}" data-d="-1">‹ zurück</a><a href="#${spreads[1].id}" data-d="1">weiter ›</a></nav>
  </main>
</div>`;
}
// D flips one spread at a time on desktop; hash links keep every chapter addressable.
const D_SCRIPT = `
(() => {
  const spreads = [...document.querySelectorAll('.vD .spread')], tabs = [...document.querySelectorAll('.vD .tabs a')];
  const pager = [...document.querySelectorAll('.vD .pager a')];
  const desktop = matchMedia('(min-width: 861px)');
  const show = id => {
    let i = Math.max(0, spreads.findIndex(s => s.id === id));
    spreads.forEach((s, j) => s.classList.toggle('on', j === i));
    tabs.forEach((t, j) => t.toggleAttribute('aria-current', j === i));
    pager[0].href = '#' + spreads[(i - 1 + spreads.length) % spreads.length].id;
    pager[1].href = '#' + spreads[(i + 1) % spreads.length].id;
  };
  document.querySelector('.vD').addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a || !desktop.matches) return;
    e.preventDefault(); const id = a.getAttribute('href').slice(1);
    history.replaceState(null, '', '#' + id); show(id);
  });
  show(location.hash.slice(1));
  let f = 0;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
    setInterval(() => { f = (f + 1) % 3; document.querySelectorAll('.vD .boil').forEach(el => el.style.filter = 'url(#boil' + f + ')'); }, 140);
})();`;
const BOIL_SVG = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  ${[1, 7, 13].map((s, i) => `<filter id="boil${i}"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${s}"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>`).join('')}
</svg>`;

/* ---------------- E: Standard website, sketches as section illustrations ---------------- */
function E() {
  return `<div class="vE">
  <header class="site-header has-toggle"><div class="container" style="flex-wrap:wrap">
    <a class="brand" href="#willkommen">${img('massage', { deco: true, eager: true })}<span>Miri's Massage <small>& Polarity</small></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü öffnen"><span></span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="btn btn-primary" href="${C.book}">Termin buchen</a>
  </div></header>

  <main id="inhalt">
    <section class="hero" id="willkommen"><div class="container">
      <div>
        <h1><small>Massage in Winterthur</small>Massage & Polarity – Zeit für dich</h1>
        <p class="lead">${C.welcome} ${C.hook}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${C.book}">Termin online buchen</a>
          <a class="btn btn-ghost" href="#angebot">Angebot ansehen</a>
        </div>
        <ul class="facts">
          <li>Dipl. Klassische Masseurin</li><li>Münzgasse 2, Winterthur</li><li>Lift vorhanden</li><li>Bar, TWINT oder Überweisung</li>
        </ul>
      </div>
      <div class="hero-media">
        ${img('miriam', { cls: 'photo', eager: true })}
        ${img('jump', { cls: 'doodle', deco: true, eager: true })}
      </div>
    </div></section>

    <section class="alt" id="warum"><div class="container twocol" style="align-items:center">
      <div class="why-art" aria-hidden="true">${img('stressed', { deco: true })}<span>→</span>${img('stretch', { deco: true })}</div>
      <div><h2>Warum eine Massage gut tut</h2>${C.why.map(p => `<p>${p}</p>`).join('')}</div>
    </div></section>

    <section id="angebot"><div class="container">
      <div class="center">
        ${img('massage', { cls: 'sketch' })}
        <h2>Mein Angebot</h2>
        <p class="lead">${C.offerIntro}</p>
      </div>
      <div class="cards">${C.services.map(s => `<article class="card"><span class="dur">${s.t}</span><h3>${s.n}</h3><p>${s.d}</p><a href="${C.book}">${s.n} buchen →</a></article>`).join('')}</div>
      <div class="extras"><h3>Ergänzende Behandlungen</h3><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul></div>
    </div></section>

    <section class="alt" id="arbeit"><div class="container">
      <div class="center">${img('run', { cls: 'sketch' })}<h2>Was meine Arbeit ausmacht</h2></div>
      <div class="values">${C.values.map(v => `<div><h3>${v.k}</h3><p>${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p></div>`).join('')}</div>
    </div></section>

    <section id="ueber-mich"><div class="container twocol" style="align-items:center">
      ${img('praxis', { cls: 'about-img' })}
      <div>
        ${img('stretch', { cls: 'sketch', deco: true })}
        <h2>Über mich – Miriam Pimputkar</h2>
        ${C.about.map(p => `<p>${p}</p>`).join('')}
        <p><b>${C.curious[0]}</b> ${C.curious[1]}</p>
        <a class="btn btn-primary" href="${C.book}">Kennenlernmassage buchen</a>
      </div>
    </div></section>

    <section class="alt" id="erfahrungen"><div class="container">
      <div class="center">${img('jumpArms', { cls: 'sketch', deco: true })}<h2>Erfahrungsberichte</h2>
        <p class="lead">Weitere Bewertungen meiner Kundinnen und Kunden findest du auf <a href="${C.maps}">Google Maps</a>.</p></div>
      <div class="quotes">${C.quotes.map(q => `<blockquote><div class="stars" aria-hidden="true">★★★★★</div><p>«${q.q}»</p><footer>${q.a}</footer></blockquote>`).join('')}</div>
    </div></section>

    <section id="gutschein"><div class="container gift">
      <div>
        <h2>${C.gift.title}</h2>
        <p>Verschenke eine Massage in Winterthur. Der Gutschein ist in 3 Versionen erhältlich:</p>
        <ul>${C.gift.versions.map(v => `<li>${v}</li>`).join('')}</ul>
        <p>${C.gift.note}</p>
        <a class="btn btn-ghost" href="mailto:${C.email}?subject=Geschenkgutschein">Gutschein per E-Mail bestellen</a>
      </div>
      ${img('gift')}
    </div></section>

    <section class="alt" id="kontakt"><div class="container twocol">
      <div>
        <h2>Kontakt & Anfahrt</h2>
        <dl class="glance">
          <dt>Praxis</dt><dd>Massage & Polarity, ${C.person}</dd>
          <dt>Adresse</dt><dd>${C.address[0]}, ${C.address[2]}</dd>
          <dt>Zugang</dt><dd>${C.address[1]}</dd>
          <dt>Termine</dt><dd><a href="${C.book}">online buchen</a></dd>
          <dt>E-Mail</dt><dd>${mail}</dd>
          <dt>Zahlung</dt><dd>${C.pay}</dd>
        </dl>
        <h3>Körperbasierte Empfehlungen in Winterthur</h3>
        <ul>${C.recs.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
      <a href="${C.maps}">${img('map', { cls: 'map' })}</a>
    </div></section>

    <section class="cta-band"><div class="container center">
      ${img('jump', { cls: 'sketch', deco: true })}
      <h2>${C.curious[0]}</h2>
      <p class="lead" style="color:#dbe6fb">${C.curious[1]} ${C.bye}</p>
      <a class="btn" href="${C.book}">Termin buchen</a>
    </div></section>
  </main>

  <footer class="site-footer"><div class="container">
    <div><h3>${C.name}</h3><address style="font-style:normal">${C.person}<br>${C.address.join('<br>')}<br>${mail}</address></div>
    <nav aria-label="Fussmenü"><h3>Seiten</h3><ul>${NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul></nav>
    <div><h3>Angebot</h3><ul>${C.services.map(s => `<li>${s.n}</li>`).join('')}</ul></div>
  </div></footer>
</div>`;
}

/* ---------------- write ---------------- */
for (const v of VARIANTS) {
  const body = v.key === 'D' ? BOIL_SVG + v.render() : v.render();
  writeFileSync(new URL(v.file, import.meta.url), page(v, body, v.key === 'D' ? D_SCRIPT : ''));
}
writeFileSync(new URL('index.html', import.meta.url), `<!doctype html>
<!-- PROTOTYPE — throwaway overview of the design variants. ?variant=A…E jumps straight to one. -->
<html lang="de-CH"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Miri's Massage – Designvorschläge</title>
<link href="${FONTS}" rel="stylesheet">
<script>
const f = ${JSON.stringify(Object.fromEntries(VARIANTS.map(v => [v.key, v.file])))};
const k = new URLSearchParams(location.search).get('variant'); if (k && f[k.toUpperCase()]) location.replace(f[k.toUpperCase()]);
</script>
<style>
  body { margin: 0; background: #fdfcf7 repeating-linear-gradient(#fdfcf7 0 31px, #d6e2f1 31px 32px); color: #23262e; font: 18px/1.5 "Kalam", cursive; }
  main { max-width: 640px; margin: 0 auto; padding: 40px 18px 60px; }
  h1 { font: 700 44px/1.05 "Caveat"; color: #1f4fd1; margin: 0 0 8px; }
  img { width: 120px; mix-blend-mode: multiply; }
  ol { list-style: none; padding: 0; margin: 24px 0; display: grid; gap: 12px; }
  a { display: flex; gap: 14px; align-items: center; min-height: 64px; padding: 10px 16px; background: #fff; border: 2.5px solid #23262e;
      border-radius: 14px 6px 12px 5px / 6px 12px 5px 14px; color: inherit; text-decoration: none; box-shadow: 4px 4px 0 #23262e; }
  a:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #23262e; }
  b { font: 700 30px "Caveat"; min-width: 28px; color: #d23a2a; }
  span { display: block; font-size: 15px; color: #5b6170; }
</style></head><body><main>
<img src="img/jump.jpg" alt="" width="378" height="336">
<h1>Miri's Massage &amp; Polarity – Designvorschläge</h1>
<p>Fünf Entwürfe mit denselben Texten und Zeichnungen. Am besten auf dem Handy anschauen; mit der Leiste unten wechselst du zwischen den Varianten.</p>
<ol>
${VARIANTS.map(v => `<li><a href="${v.file}"><b>${v.key}</b><div>${v.name}<span>${({ A: 'Liniertes Schulheft mit Randnotizen', B: 'Die Geschichte als Comic auf Karopapier', C: 'Papierschnipsel, Polaroids und Klebeband', D: 'Skizzenbuch mit Registerreitern zum Blättern', E: 'Klassische Praxis-Website, Zeichnungen als Illustration' })[v.key]}</span></div></a></li>`).join('\n')}
</ol>
</main></body></html>
`);
console.log('wrote', VARIANTS.map(v => v.file).join(', '), '+ index.html');
