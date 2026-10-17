// PROTOTYPE — compact alternative to the 9-page site
//
// One page instead of nine: what Miri offers, how it feels, what it costs, when and where,
// and booking — in one or two thumb-scrolls. Everything else sits behind <details>.
// Run from the project root:  node kompakt/build.mjs   → writes kompakt/index.html + kompakt/img/*.svg
//
// Content is copied from the root build.mjs (objects C, FAQ, IMG) — that file writes the main
// site when imported, so it is not imported here. Keep the two in sync by hand while this is a prototype.
// Left out on purpose: the Polarity health claims (Schlacken, Allergien, Depressionen) are under
// review with the owner, the long "why massage" text, the recommendations list.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';

const here = p => new URL(p, import.meta.url);

/* =====================================================================
   CONTENT (from ../build.mjs)
   ===================================================================== */
const C = {
  name: 'Miriam Pimputkar – Massage & Polarity',
  formerNames: ["Miri's Massage & Polarity", "Miri's Klassische Massage"],
  person: 'Miriam Pimputkar',
  book: 'https://mirismassage.as.me/',
  email: 'mirismassage@gmail.com',
  maps: 'https://www.google.com/maps/search/?api=1&query=Miri%27s+Klassische+Massage+M%C3%BCnzgasse+2+8400+Winterthur',
  acuityOwner: '28010488',
  rating: { score: '5,0', count: 22 },
  intro: 'Finde zurück in dein natürliches Gleichgewicht. In meiner Praxis in Winterthur begleite ich dich mit achtsamer Berührung, gezielten Massagen und stärkender Energiearbeit zu mehr Entspannung und Vitalität.',
  motto: 'Der Körper weiss, was der nächste Schritt ist.',
  difference: 'Die Klassische Massage löst gezielt Verspannungen in Rücken, Nacken und Beinen. Die Ganzheitliche Massage ergänzt sie mit sanften Polarity-Griffen, Dehnungen und Arbeit mit Reflexzonen – für Körper und Nervensystem.',
  extras: ['Myofasziale Triggerpunktbehandlung', 'Schröpfmassage (mit Schröpfgläsern)', 'Reflexologie (z.B. Füsse, Hände, Ohren)'],
  polarityNote: '*Polarity-Preis während meines letzten Ausbildungsjahrs. Er wird an meinen Ausbildungsstand angepasst: mit Diplom 110 CHF / Std., mit Krankenkassenanerkennung 132 CHF / Std.',
  social: 'Falls du nicht- oder wenigverdienend bist, komme ich dir gerne finanziell entgegen. Melde dich ungeniert vorab per E-Mail.',
  aboutLead: 'Mein Name ist Miriam Pimputkar. In meiner Praxis in Winterthur schaffe ich einen geschützten Raum für Entspannung und Gesundheit. Mit Achtsamkeit, Fachwissen und Leidenschaft begleite ich dich auf deinem Weg zu mehr Wohlbefinden und Vitalität.',
  about: 'Das bin ich: ein fröhliches, bewegungsfreudiges Wesen mit einer grossen Faszination für den menschlichen Körper. Ich liebe es, mit meinen Händen zu arbeiten und mit Menschen in Kontakt zu sein.',
  title: 'Dipl. Klassische Masseurin, Polaritytherapeutin in Ausbildung',
  training: [
    ['Polaritytherapeutin i. A.', ['Authentische Kommunikation', 'Prozessbegleitung', 'Embryologie', 'Reflexologie', 'Cranio', 'Lymphbehandlung', 'Yoga-/Körperübungen', 'Ernährungslehre']],
    ['Berufsmasseurin', ['Klassische Massage', 'Bindegewebsmassage', 'Myofasziale Triggerpunktbehandlung', 'Schröpfkopfmassage', 'Hawaiianische Wellnessmassage']],
    ['Ergotherapie', ['Grundjahr', 'Praktikum (Suchtklinik)']],
    ['Kurse', ['Formatives Embodiment', 'IBP-Workshops (Achtsamkeit, Selbstfürsorge, Mein Raum – Dein Raum: Grenzen setzen)', 'Geburtsworkshops', 'Impact (Selbstverteidigung)', 'Continuum', 'Energetisches Heilen', 'Meridian Scanning (TCM)']],
    ['Beruflicher Hintergrund', ['Primar- und Schwimmlehrerin', 'Lerncoach für Kinder und Erwachsene', 'Coach für verhaltensauffällige Kinder']],
  ],
  quotes: [
    { a: 'Géraldine', age: 48, q: 'Auf der Suche nach einer Polarity-Therapeutin in Winterthur bin ich auf Miriam Pimputkar gestossen. Ich bin durch und durch zufrieden. Sie spürt meine Blockaden sowohl auf der seelischen als auch auf der körperlichen Ebene und geht ausserordentlich sensibel & wirkungsvoll darauf ein. Für mich, die beste Körpertherapeutin, die ich schon jemals hatte.' },
    { a: 'Peter', age: 64, q: 'Ich habe mich bei Miriam gleich wohl gefühlt. Sie gestaltet eine Atmosphäre, in der man sich entspannen kann und einen neuen Zugang zum eigenen Körper findet. Man spürt, dass sie ihr Handwerk versteht. Nach allen Sitzungen bin ich nicht nur entspannter in den Alltag gegangen, sondern die Entspannung war über die Stunden hinaus spürbar. Miriam hat eine grosse Begabung.' },
    { a: 'Ursula', age: 70, q: 'Anfangs 2026 war ich auf der Suche nach einer mir entsprechenden Körpertherapie. Bei Miriam habe ich mit ihrer Ganzheitlichen Massage eine wunderbare Möglichkeit gefunden. Inzwischen erlebe ich alle 2 bis 3 Wochen ihre wohltuende Behandlung. Miriams kompetente und äusserst liebenswürdige Art schätze ich überaus.' },
    { a: 'Tamara', age: 27, q: 'Miriam hat mir eine wohltuende Massageerfahrung geschenkt und dabei nicht nur meine Verspannungen erfolgreich gelöst, sondern auch meiner Psyche etwas Gutes getan. Miriam, ich danke dir für deine Zeit und freue mich auf ein nächstes Mal. Ich kann einen Besuch in der Praxis auf’s Wärmste empfehlen.' },
    { a: 'Raphael', age: 35, q: 'Miriam ist eine wundervolle Masseurin! Sie schöpft aus einer breiten Palette an Techniken, gepaart mit viel anatomischem und medizinischem Wissen. Ich bin mit einem spezifischen Anliegen zu Miriam gekommen, welches sie mit gezielten Massagen, Tipps und Übungen adressiert hat. Das hat mir sehr geholfen.' },
  ],
  polarity: {
    quote: 'Ich halte mich an das, was die Natur mir bestätigt.',
    quoteBy: 'Dr. Randolph Stone, Begründer der Polarity Therapie',
    intro: 'Die erste Polaritybehandlung beinhaltet ein ausführliches Vorgespräch, bei Bedarf eine Haltungsanalyse sowie eine manuelle Behandlung auf der Liege. Du darfst am Ende selber entscheiden, wie viel dir diese erste Polarityerfahrung finanziell wert ist.',
    // facts and topics without the wording under review (Selbstheilung/Abwehr, Schlacken, Reinigung)
    facts: [
      'Ist eine Synthese von östlicher und westlicher Medizin, wobei die Ganzheit von Körper, Geist und Seele im Vordergrund steht.',
      'Wurde vom Naturheilarzt, Osteopathen und Chiropraktiker Dr. Randolph Stone (1890–1981) gegründet.',
      'Beinhaltet Körperarbeit, Körperübungen, Ernährung sowie die Auseinandersetzung mit Lebensstil, Denk- und Verhaltensmustern im begleitenden Gespräch.',
      'Wird von den meisten Krankenkassen als Komplementärtherapie anerkannt.',
    ],
    topics: [
      ['Körperarbeit', 'Polarity ist die Arbeit am bekleideten Körper mit sanften, schaukelnden/bewegenden oder tief ins Gewebe gehenden Berührungen.'],
      ['Begleitendes Gespräch', 'Das begleitende Gespräch unterstützt und orientiert die Prozesse, welche sich während der Körperarbeit zeigen können.'],
      ['Yoga', 'Eine individuelle und gezielte Auswahl an Yogaübungen vertieft die Wirkung der Behandlung und kann als Selbsthilfe angewendet werden.'],
      ['Ernährung', 'Die Polarity-Ernährung hat zum Ziel, das Ernährungsbewusstsein zu fördern, indem Zusammenhänge zwischen Verhalten, Befinden und Essgewohnheiten ergründet werden.'],
      ['Haltung der Therapeutin', 'Achtsamkeit, Empathie und Respekt sind die Basis, um eine wohlwollende und sichere Umgebung im Therapieraum zu schaffen.'],
    ],
  },
  gift: {
    kinds: ['Ganzheitliche Massage', 'Klassische Massage', 'Hawaiianische Ganzkörpermassage', 'Polaritybehandlung', 'Massage nach Wahl', 'Behandlung nach Wahl'],
    versions: ['als Faltkarte per Post (A6)', 'digital zum Verschicken', 'digital zum selber Ausdrucken (A6 oder A5)'],
    note: 'Schreib mir per E-Mail, welche Behandlung und welche Version du möchtest – bei Postversand mit Adresse.',
  },
};

// The menu: four treatments. "first" = the Kennenlern price shown when the visitor says it is their
// first visit; "regular" = the normal appointment type(s). ids are Acuity appointment types.
const MENU = [
  { id: 'klassisch', n: 'Klassische Massage', art: 'massage',
    d: 'Löst gezielt muskuläre Verspannungen, regt die Durchblutung an und fördert die spürbare Regeneration von Körper und Muskulatur nach körperlicher Belastung oder stressigen Tagen.',
    more: ['<b>30 min:</b> Ideal für die gezielte Behandlung akuter Verspannungen im Nacken-, Schulter- oder Lendenbereich. Schnelle Entlastung für zwischendurch.',
      '<b>60 min:</b> Ausführliche Bearbeitung von Rücken, Nacken und Beinen. Löst tiefsitzende Muskelverspannungen nachhaltig und fördert die Durchblutung.'],
    first: { id: '39957629', n: 'Kennenlernmassage – klassisch oder ganzheitlich', t: '60 min', p: '80 CHF', was: '100 CHF' },
    regular: [{ id: '39957699', t: '30 min', p: '50 CHF' }, { id: '39957683', t: '60 min', p: '100 CHF' }] },
  { id: 'ganzheitlich', n: 'Ganzheitliche Massage', art: 'fuesse',
    d: 'Verbindet wirkungsvolle manuelle Techniken mit feinfühliger Körperwahrnehmung. Eine tiefgreifende Auszeit, die das gesamte Nervensystem beruhigt und neue Kraft schenkt.',
    more: ['Die Klassische Massage wird individuell ergänzt mit der Polaritymethode: sanfte, craniosacrale Berührungen, Schaukelbewegungen, welche das Gewebe lockern, bis tiefere, kräftigere Drucktechniken, osteopathische Griffe, Dehnungen, Mobilisierung der Gelenke und Arbeit mit Reflexzonen.'],
    first: { id: '39957629', n: 'Kennenlernmassage – klassisch oder ganzheitlich', t: '60 min', p: '80 CHF', was: '110 CHF' },
    regular: [{ id: '79868943', t: '60 min', p: '110 CHF' }] },
  { id: 'hawaiianisch', n: 'Hawaiianische Ganzkörpermassage', alt: 'Lomi Lomi', art: 'hawaii',
    d: 'Ganzheitliches Wellness-Erlebnis mit fliessenden Unterarmstrichen und viel warmem Öl. Bringt Körper, Geist und Nervensystem in tiefe Harmonie.',
    more: ['Tauche ein in eine tief entspannende Körperreise, bei welcher du von Kopf bis Fuss, vorne und hinten massiert wirst. Die fliessenden, langen Streichungen nebst sanften Dehnungen und Lockerung von Gelenken erinnern an die Wellen des Ozeans.',
      'In einem kurzen Vorgespräch kläre ich mit dir ab, was bei deinem Körper zu beachten ist und ob Berührung/Massage im Gesicht und/oder Bauch erwünscht ist. Am Schluss gebe ich dir 2–3 Minuten Zeit, um die Massage nachwirken zu lassen.'],
    first: { id: '92472809', n: 'Kennenlernen: Hawaiianische Ganzkörpermassage', t: '90 min', p: '140 CHF', was: '180 CHF' },
    regular: [{ id: '92469297', t: '90 min', p: '180 CHF' }] },
  { id: 'polarity', n: 'Polaritybehandlung', art: 'gespraech',
    d: 'Unterstützt den freien Fluss der Lebensenergie durch sanfte Berührungen, Energiearbeit und gezielte Impulse – am bekleideten Körper.',
    more: [C.polarity.intro, '<a href="#polarity">Was ist Polarity?</a>'],
    first: { id: '78873137', n: 'Kennenlernen: Polaritybehandlung', t: '90 min', p: 'nach deinem Ermessen', pShort: 'Du bestimmst den Preis' },
    regular: [{ id: '86048501', t: '60 min', p: '88 CHF / Std.*' }] },
];

const IMG = {
  massage: ['../img/sketches/massage.svg', 'Strichmännchen-Zeichnung: Masseurin massiert eine entspannte Person auf der Massageliege', 1717, 1114],
  stressed: ['../img/sketches/stressed.svg', 'Strichmännchen mit Verspannungen und Kopfschmerzen hält sich den Kopf', 1148, 2183],
  stretch: ['../img/sketches/stretch.svg', 'Entspanntes Strichmännchen streckt sich', 1625, 2413],
  jump: ['../img/sketches/jump.svg', 'Fröhliches Strichmännchen springt vor Freude', 1700, 1502],
  feelgood: ['img/feelgood.svg', 'Strichmännchen fühlt sich grossartig: Arme in die Höhe, breites Lächeln', 360, 460],
  winken: ['img/winken.svg', 'Miri winkt zum Abschied, eine Hand auf dem Herzen', 320, 420],
  run: ['../img/sketches/run.svg', 'Strichmännchen tanzt und bewegt sich frei', 1495, 1721],
  // stroke drawings: copied into kompakt/img with a heavier pen so they match the traced ones
  gespraech: ['img/gespraech.svg', 'Miri im begleitenden Gespräch mit einer Klientin, beide sitzen auf Stühlen', 640, 400],
  fuesse: ['img/fuesse.svg', 'Miri massiert die Füsse einer liegenden Person (Reflexzonen)', 640, 400],
  hawaii: ['img/hawaii.svg', 'Miri gibt eine hawaiianische Ganzkörpermassage mit langen, fliessenden Streichungen', 640, 400],
  yoga: ['img/yoga.svg', 'Miri macht Yoga in der Baumhaltung', 360, 420],
  gutschein: ['img/gutschein.svg', 'Miri hält ein Geschenk – einen Gutschein für eine Massage', 360, 420],
  termin: ['img/termin.svg', 'Miri zeigt auf einen Kalender mit einem eingetragenen Termin', 460, 420],
  kontakt: ['img/kontakt.svg', 'Miri winkt und hält einen Brief in der Hand', 360, 420],
  miriam: ['../img/miriam.jpg', 'Miriam Pimputkar, dipl. Masseurin und Polaritytherapeutin in Winterthur', 336, 448],
  praxis: ['../img/praxis.jpg', 'Massagepraxis an der Münzgasse 2 in Winterthur mit Massageliege', 320, 242],
  giftFront: ['../img/gutschein-vorne.jpg', 'Geschenkgutschein «Zeit für dich», Vorderseite mit Massage-Zeichnung', 900, 639],
  map: ['../img/map.jpg', 'Karte: Massagepraxis an der Münzgasse 2, Winterthur Altstadt', 871, 592],
};

// heavier pen for the generated stroke drawings (5 → 9 units in a 360–640 wide viewBox)
mkdirSync(here('img/'), { recursive: true });
for (const k of ['gespraech', 'fuesse', 'hawaii', 'yoga', 'gutschein', 'termin', 'kontakt', 'feelgood', 'winken']) {
  const svg = readFileSync(here(`../img/sketches/${k}.svg`), 'utf8').replace(/stroke-width="5"/g, 'stroke-width="8.5"');
  writeFileSync(here(`img/${k}.svg`), svg);
}

/* =====================================================================
   HELPERS
   ===================================================================== */
const img = (k, o = {}) => {
  const [src, alt, w, h] = IMG[k];
  return `<img src="${src}" alt="${o.deco ? '' : alt}" width="${w}" height="${h}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${o.cls ? ` class="${o.cls}"` : ''}>`;
};
const acuity = (id, embed) => `https://app.acuityscheduling.com/schedule.php?owner=${C.acuityOwner}${id ? `&appointmentType=${id}` : ''}${embed ? '&ref=embedded_csp' : ''}`;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');
const mail = `<a href="mailto:${C.email}">${C.email}</a>`;
const giftMail = `mailto:${C.email}?subject=${encodeURIComponent('Gutscheinbestellung')}&body=${encodeURIComponent('Hallo Miriam\n\nIch möchte gerne einen Gutschein bestellen:\n\nBehandlung: \nVersion (Post / digital verschicken / selber ausdrucken A6 oder A5): \nName: \nAdresse (bei Postversand): \n\nLiebe Grüsse')}`;
// without JS a plain link to Acuity; with JS the calendar opens inline (see script)
const pick = (id, label, html, cls = 'pick') => `<a class="${cls}" href="${acuity(id)}" data-type="${id}" data-label="${esc(label)}">${html}</a>`;

/* ---- hand-drawn line work: seeded wobble so every build draws the same lines ---- */
let seed = 23;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const J = a => (rnd() - 0.5) * 2 * a;
const f = n => Math.round(n * 100) / 100;
function spline(pts) {
  const p = [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${f(p[1][0])} ${f(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}
const along = (a, b, n, j) => Array.from({ length: n + 1 }, (_, k) => [a[0] + (b[0] - a[0]) * k / n + J(j), a[1] + (b[1] - a[1]) * k / n + J(j)]);
// the sheet's pen outline: a border-image whose middle tiles repeat seamlessly (equal tangents at both
// ends), corners overshoot like a hand-drawn box — scales to any card height without stretching the wobble
const frameSvg = () => `<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'><g fill='none' stroke='#0d0d0d' stroke-opacity='.78' stroke-width='2.3' stroke-linecap='round'>`
  + `<path d='M2.5 6.6C12 5.7 22 5.4 30 5C38 4 52 6 60 5C68 4.4 78 4.9 87.6 5.9'/>`
  + `<path d='M84.3 2.4C85.2 12 85.3 22 85 30C86 38 84 52 85 60C85.6 68 85.2 78 85.7 87.8'/>`
  + `<path d='M88 84.6C78 85.4 68 85.4 60 85C52 86 38 84 30 85C22 85.5 12 85.2 2.8 86'/>`
  + `<path d='M5.6 88C4.8 78 4.7 68 5 60C4 52 6 38 5 30C4.5 22 4.9 12 4.2 2.6'/></g></svg>`;
const marker = () => { const pts = along([3, 13], [197, 10], 7, 2.2); return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 24' preserveAspectRatio='none'><path d='${spline(pts)}' fill='none' stroke='%23f59e0b' stroke-opacity='.6' stroke-width='15' stroke-linecap='round'/></svg>`; };
const strike = () => `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'><path d='${spline(along([2, 14], [98, 7], 4, 1.2))}' fill='none' stroke='%23c46627' stroke-width='2.4' stroke-linecap='round' vector-effect='non-scaling-stroke'/></svg>`;
const squiggle = () => { const pts = Array.from({ length: 13 }, (_, k) => [k * 25, 6 + (k % 2 ? -4 : 4) + J(0.8)]); return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 12' preserveAspectRatio='none'><path d='${spline(pts)}' fill='none' stroke='%23c57f08' stroke-width='2' stroke-linecap='round' vector-effect='non-scaling-stroke'/></svg>`; };
// hand-drawn arrow (curved shaft + two-stroke head), used between drawings
const arrow = (cls = 'arrow') => `<svg class="${cls}" viewBox="0 0 120 60" aria-hidden="true"><path d="M6 40C30 12 70 8 106 30"/><path d="M90 18L107 31 87 38"/></svg>`;
const STAR = '<svg viewBox="0 0 20 20"><path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"/></svg>';
const stars = () => `<span class="stars" aria-hidden="true">${STAR.repeat(5)}</span>`;
const check = '<svg class="ck" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10.8C5.4 12.2 6.8 13.8 8 15.6 10.6 10.4 13.4 6.9 17 3.6"/></svg>';
const svgUrl = s => `url("data:image/svg+xml,${s.replace(/"/g, "'").replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E')}")`;

/* =====================================================================
   SECTIONS
   ===================================================================== */
const menuItem = m => {
  const fl = `${m.first.n} · ${m.first.t} · ${m.first.p.startsWith('nach') ? 'Preis ' + m.first.p : m.first.p}`;
  const firstPrice = m.first.was
    ? `<s><span class="sr">statt </span>${m.first.was}</s> ${m.first.p}`
    : `<span class="small">${m.first.pShort}</span>`;
  const regPrice = m.regular.length > 1 ? `${m.regular.map(r => r.p.replace(' CHF', '')).join(' / ')} CHF` : m.regular[0].p;
  return `
        <li class="dish" id="${m.id}">
          ${img(m.art, { cls: 'dish-art' })}
          <div class="dish-body">
            <div class="dish-head">
              <h3>${m.n}</h3>
              <span class="leader" aria-hidden="true"></span>
              <p class="price"><span class="if-first">${firstPrice}</span><span class="if-reg">${regPrice}</span></p>
            </div>
            ${m.alt ? `<p class="alt">${m.alt}</p>` : ''}
            <p class="dur"><span class="if-first">${m.first.t}${m.first.was ? ', Kennenlernpreis' : ', Kennenlernen'}</span><span class="if-reg">${m.regular.map(r => r.t).join(' oder ')}</span></p>
            <p class="feel">${m.d}</p>
            <details class="more"><summary>Mehr erfahren</summary>${m.more.map(p => `<p>${p}</p>`).join('')}</details>
            <p class="go if-first">${pick(m.first.id, fl, `Termine ansehen <span class="sr">für ${esc(m.first.n)}, ${m.first.t}</span>`, 'btn pick')}</p>
            <p class="go if-reg">${m.regular.map(r => pick(r.id, `${m.n} · ${r.t} · ${r.p}`, m.regular.length > 1 ? `${r.t} · ${r.p}` : `Termine ansehen <span class="sr">für ${m.n}, ${r.t}</span>`, 'btn pick')).join('')}</p>
          </div>
        </li>`;
};

const STEPS = [
  ['termin', 'Termin wählen', 'Alle freien Termine siehst du online in Echtzeit. Die Bestätigung kommt per E-Mail.'],
  ['kontakt', 'Ankommen', 'Plane genug Zeit ein, komm gerne in bequemer Kleidung. Beim ersten Termin beginnen wir mit einem kurzen Vorgespräch.'],
  ['stretch', 'Loslassen', 'Ich arbeite in der Stille oder zu sanfter Musik, voll und ganz auf dich fokussiert.'],
  ['yoga', 'Mitnehmen', 'Bei Interesse zeige ich dir Übungen für den Alltag. Bezahlt wird vor Ort mit TWINT, bar oder Karte.'],
];

const body = () => `
<header class="top">
  <div class="wrap">
    <a class="brand" href="#start"><img src="../img/sketches/massage.svg" alt="" width="1717" height="1114"><span>Miriam Pimputkar<small>Massage &amp; Polarity</small></span></a>
    <a class="btn btn-sm" href="#karte">Buchen<span class="wide"> – Termin wählen</span></a>
  </div>
</header>

<main id="start">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <h1>Massage &amp; Polarity <span class="hl">in Winterthur</span></h1>
        <p class="lead">${C.intro}</p>
        <ul class="notes">
          <li>${check}<span><b>Mi &amp; Fr</b>, 10–20 Uhr</span></li>
          <li>${check}<span><b>Münzgasse 2</b>, 4. Stock, Lift</span></li>
          <li><a class="rating" href="${C.maps}" rel="noopener">${stars()}<span><b>${C.rating.score}</b> aus ${C.rating.count} Google-Bewertungen</span></a></li>
        </ul>
        <p class="hero-cta"><a class="btn" href="#karte">Behandlung wählen</a> <span class="hand">erstes Mal? ab 80 CHF</span></p>
      </div>
      <figure class="hero-art" aria-label="Zeichnung: vom verspannten zum fröhlich springenden Strichmännchen">
        ${img('stressed', { deco: true, eager: true, cls: 'a1' })}
        ${arrow('arrow a2')}
        ${img('feelgood', { deco: true, eager: true, cls: 'a3' })}
        <figcaption class="hand">${C.motto}</figcaption>
      </figure>
    </div>
  </section>

  <section class="karte" id="karte" aria-labelledby="karte-h">
    <div class="wrap">
      <div class="sheet">
        <span class="tape t1" aria-hidden="true"></span><span class="tape t2" aria-hidden="true"></span>
        <input type="radio" name="besuch" id="erst-ja" checked>
        <input type="radio" name="besuch" id="erst-nein">
        <div class="sheet-head">
          <h2 id="karte-h">Behandlungen &amp; Preise</h2>
          <fieldset class="toggle">
            <legend>Erstes Mal hier?</legend>
            <label for="erst-ja">Ja, zum ersten Mal</label>
            <label for="erst-nein">Nein, schon mal da</label>
          </fieldset>
          <p class="hint if-first">Zum Kennenlernen gelten besondere Preise.</p>
          <p class="hint if-reg">Schön, dass du wieder kommst.</p>
        </div>
        <ul class="menu" id="menu">${MENU.map(menuItem).join('')}
        </ul>
        <div class="cal" id="cal" hidden>
          <div class="cal-bar">
            <button type="button" class="back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5L8 12l7 7"/></svg>andere Behandlung</button>
            <p class="chosen" tabindex="-1"></p>
          </div>
          <div class="cal-frame"></div>
          <p class="cal-help">Kalender klemmt? <a class="cal-direct" href="${acuity()}" rel="noopener">Im neuen Fenster öffnen</a> oder schreib mir: ${mail}</p>
        </div>
        <div class="sheet-foot">
          <details class="diff"><summary>Klassisch oder ganzheitlich?</summary><p>${C.difference}</p></details>
          <ul class="terms">
            <li>${check}<span>Bezahlung vor Ort: TWINT, bar oder Karte</span></li>
            <li>${check}<span>Absage bis 24&nbsp;h vorher kostenfrei – bitte schriftlich</span></li>
            <li>${check}<span>Krankenkasse: derzeit noch Selbstzahler (ich bin noch in Ausbildung)</span></li>
            <li>${check}<span>${C.social} ${mail}</span></li>
          </ul>
          <p class="note if-reg">${C.polarityNote}</p>
          <p class="note">Die Buchung läuft über Acuity Scheduling. Der Kalender wird erst geladen, wenn du eine Behandlung wählst.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="besuch" aria-labelledby="besuch-h">
    <div class="wrap">
      <h2 id="besuch-h">So läuft dein Besuch</h2>
      <ol class="steps">${STEPS.map(([art, h, p], i) => `
        <li class="step">
          ${img(art, { deco: true, cls: 'step-art' })}
          <div><h3>${h}</h3><p>${p}</p></div>
          ${i < STEPS.length - 1 ? arrow('arrow step-arrow') : ''}
        </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="ort" aria-labelledby="ort-h">
    <div class="wrap ort-grid">
      <div class="ort-text">
        <h2 id="ort-h">Münzgasse 2, Winterthur</h2>
        <dl class="facts">
          <div><dt>Adresse</dt><dd>Münzgasse 2, 8400 Winterthur</dd></div>
          <div><dt>Zugang</dt><dd>4. Stock, Lift vorhanden</dd></div>
          <div><dt>Praxistage</dt><dd>Mittwoch und Freitag, 10–20 Uhr</dd></div>
          <div><dt>E-Mail</dt><dd>${mail}</dd></div>
        </dl>
        <p><a class="btn btn-ghost" href="${C.maps}" rel="noopener">In Google Maps öffnen</a></p>
      </div>
      <div class="pinboard">
        <a class="photo map" href="${C.maps}" rel="noopener" aria-label="Karte in Google Maps öffnen">${img('map')}<span class="tape" aria-hidden="true"></span></a>
        <figure class="photo room">${img('praxis')}<figcaption class="hand">meine Praxis</figcaption><span class="tape" aria-hidden="true"></span></figure>
      </div>
    </div>
  </section>

  <section class="ich" aria-labelledby="ich-h">
    <div class="wrap">
      <div class="ich-text">
        <figure class="photo portrait">${img('miriam')}<span class="tape" aria-hidden="true"></span></figure>
        <h2 id="ich-h">Das bin ich</h2>
        <p class="role">${C.title}</p>
        <p>${C.aboutLead}</p>
        <p>${C.about}</p>
        <blockquote class="quote">
          ${stars()}
          <p>«${C.quotes[0].q}»</p>
          <footer>${C.quotes[0].a}, ${C.quotes[0].age} J.</footer>
        </blockquote>
        <details class="more"><summary>Weitere Stimmen</summary>${C.quotes.slice(1).map(q => `<blockquote class="quote small-q"><p>«${q.q}»</p><footer>${q.a}, ${q.age} J.</footer></blockquote>`).join('')}<p><a href="${C.maps}" rel="noopener">Alle ${C.rating.count} Bewertungen auf Google</a></p></details>
        <details class="more"><summary>Ausbildung &amp; Erfahrung</summary>${C.training.map(([g, items]) => `<p class="group">${g}</p><p class="items">${items.join(' · ')}</p>`).join('')}</details>
      </div>
    </div>
  </section>

  <section class="wissen" aria-labelledby="wissen-h">
    <div class="wrap narrow">
      <h2 id="wissen-h">Gut zu wissen</h2>
      <details class="faq" id="polarity"><summary><h3>Was ist Polarity?</h3></summary>
        <blockquote class="pull"><p>«${C.polarity.quote}»</p><footer>${C.polarity.quoteBy}</footer></blockquote>
        <p>Polarity …</p>
        <ul class="dots">${C.polarity.facts.map(x => `<li>${x}</li>`).join('')}</ul>
        <dl class="topics">${C.polarity.topics.map(([h, p]) => `<div><dt>${h}</dt><dd>${p}</dd></div>`).join('')}</dl>
      </details>
      <details class="faq" id="gutschein"><summary><h3>Geschenkgutschein «Zeit für dich»</h3></summary>
        <div class="gift">
          ${img('gutschein', { cls: 'gift-art', deco: true })}
          <div>
            <p>Verschenke eine Auszeit in Winterthur – für eine dieser Behandlungen:</p>
            <p class="items">${C.gift.kinds.join(' · ')}</p>
            <p><b>Erhältlich</b> ${C.gift.versions.join(', ')}.</p>
            <p>${C.gift.note}</p>
            <p><a class="btn" href="${giftMail}">Gutschein per E-Mail bestellen</a></p>
          </div>
        </div>
        ${img('giftFront', { cls: 'gift-photo' })}
      </details>
      <details class="faq"><summary><h3>Ergänzende Behandlungen</h3></summary>
        <ul class="dots">${C.extras.map(e => `<li>${e}</li>`).join('')}</ul>
        <p>Frag mich beim Termin oder per E-Mail: ${mail}</p>
      </details>
    </div>
  </section>
</main>

<footer class="end">
  <div class="wrap end-grid">
    ${img('winken', { deco: true, cls: 'end-art' })}
    <div>
      <p class="bye">Ich freue mich auf dich! Bis bald!</p>
      <p><a class="btn" href="#karte">Termin buchen</a></p>
      <address>${C.person} · Massage &amp; Polarity<br>Münzgasse 2, 4. Stock, 8400 Winterthur<br>${mail}</address>
      <p class="proto">Prototyp einer kompakten Website. <a href="../">Zur ausführlichen Website</a></p>
    </div>
  </div>
</footer>`;

/* =====================================================================
   STYLE
   ===================================================================== */
const CSS = `
:root{
  --ink:#0d0d0d; --ink-2:#3b3226; --paper:#f9f9f9; --sheet:#fffdf8; --cream:#fbf3e2;
  --amber:#f59e0b; --amber-2:#c57f08; --amber-3:#945f06; --orange:#c46627;
  --line:rgba(13,13,13,.14);
  --hand:'Caveat',cursive; --serif:'Young Serif',Georgia,serif; --sans:'Figtree',system-ui,sans-serif;
  --gut:16px; --ease:cubic-bezier(.16,1,.3,1);
  color-scheme:light;
}
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:72px;-webkit-text-size-adjust:100%;scrollbar-color:var(--amber-2) var(--cream)}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation:none!important;transition:none!important}}
body{margin:0;background:var(--paper);color:var(--ink);font:400 1.0625rem/1.6 var(--sans);caret-color:var(--amber-3);
  background-image:radial-gradient(rgba(148,95,6,.13) 1px,transparent 1.2px);background-size:22px 22px;overflow-x:clip}
::selection{background:rgba(245,158,11,.45);color:var(--ink)}
::-webkit-scrollbar{width:11px;height:11px}::-webkit-scrollbar-track{background:var(--cream)}
::-webkit-scrollbar-thumb{background:var(--amber-2);border-radius:8px;border:3px solid var(--cream)}
img,svg{display:block;max-width:100%;height:auto}
a{color:var(--amber-3);text-decoration-thickness:1.5px;text-underline-offset:.18em}
a:hover{color:var(--ink);text-decoration-color:var(--amber)}
:focus-visible{outline:3px solid var(--amber-3);outline-offset:3px;border-radius:6px}
h1,h2,h3{font-family:var(--serif);font-weight:400;line-height:1.12;letter-spacing:-.01em;text-wrap:balance;margin:0}
h1{font-size:clamp(2.35rem,5vw + 1rem,4.6rem);letter-spacing:-.025em}
h2{font-size:clamp(1.85rem,2.6vw + 1rem,2.9rem);margin-bottom:.6em}
h3{font-size:1.3rem}
p{margin:0 0 .9em}
b{font-weight:650}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.skip{position:fixed;left:12px;top:-80px;z-index:50;background:var(--ink);color:#fff;padding:.7rem 1rem;border-radius:8px}.skip:focus{top:12px;color:#fff}
.wrap{width:min(1140px,100% - 2*var(--gut));margin-inline:auto}
.hand{font-family:var(--hand);font-weight:600;font-size:1.5rem;line-height:1.15;color:var(--amber-3)}
section{padding-block:clamp(3rem,7vw,6rem)}

/* buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.4em;min-height:48px;padding:.65em 1.3em;border-radius:999px 999px 999px 999px / 60% 70% 60% 70%;
  background:var(--amber);color:var(--ink);font:650 1rem/1.2 var(--sans);text-decoration:none;border:2px solid var(--ink);
  box-shadow:0 1px 1px rgba(13,13,13,.12),0 8px 18px -10px rgba(148,95,6,.7);transition:transform .25s var(--ease),box-shadow .25s var(--ease),background-color .2s}
.btn:hover{color:var(--ink);background:#ffb22e;transform:translateY(-1px);box-shadow:0 2px 3px rgba(13,13,13,.12),0 12px 22px -10px rgba(148,95,6,.8)}
.btn:active{transform:translateY(1px)}
.btn-sm{min-height:44px;padding:.5em 1em;font-size:.95rem}
.btn-ghost{background:transparent;box-shadow:none}
.btn-ghost:hover{background:var(--cream)}

/* header */
.top{position:sticky;top:0;z-index:20;background:rgba(249,249,249,.92);backdrop-filter:saturate(1.2) blur(8px);border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:60px}
.brand{display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none;font:400 1.08rem/1.1 var(--serif);min-height:44px}
.brand img{width:46px}
.brand span{white-space:nowrap}.wide{display:none}
.brand small{display:block;font:500 .8rem/1.3 var(--sans);color:var(--amber-3);letter-spacing:.01em}

/* hero */
.hero{padding-block:2rem 1.5rem}
.hero-grid{display:grid;gap:1.5rem}
.hl{white-space:nowrap;background:${svgUrl(marker())} no-repeat 0 88% / 100% .5em;padding-inline:.05em;animation:mark 1.1s .35s var(--ease) both}
@keyframes mark{from{background-size:0% .5em}}
.lead{font-size:1.125rem;max-width:36em;margin-top:1rem;color:var(--ink-2)}
.notes{list-style:none;padding:0;margin:1.2rem 0;display:grid;gap:.35rem}
.notes li{display:flex;gap:.55rem;align-items:center}
.ck{width:22px;flex:none;fill:none;stroke:var(--orange);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.rating{display:inline-flex;align-items:center;gap:.55rem;color:var(--ink);text-decoration-color:var(--line);min-height:44px}
.stars{display:inline-flex;gap:1px;flex:none}.stars svg{width:17px;fill:var(--amber);stroke:var(--amber-3);stroke-width:1;stroke-linejoin:round}
.hero-cta{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem 1rem;margin:1.4rem 0 0}
.hero-cta .hand{font-size:1.45rem;transform:rotate(-3deg)}
.hero-art{margin:0;display:grid;grid-template-columns:1fr auto 1.3fr;align-items:end;gap:.3rem;max-width:400px;justify-self:center;width:100%}
.hero-art .a1{height:140px;width:auto;justify-self:end}
.hero-art .a3{width:100%;max-height:150px;object-fit:contain}
.arrow{fill:none;stroke:var(--orange);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.hero-art .a2{width:64px;align-self:center}
.hero-art figcaption{grid-column:1/-1;text-align:center;margin-top:.6rem;transform:rotate(-1.5deg)}

/* the menu card */
.karte{padding-top:1rem}
.sheet{position:relative;background:var(--sheet);padding:2rem 1.15rem 1.5rem;border-radius:4px;
  box-shadow:0 1px 2px rgba(13,13,13,.06),0 22px 40px -24px rgba(148,95,6,.45)}
.sheet::before{content:"";position:absolute;inset:4px;border:20px solid transparent;border-image:${svgUrl(frameSvg())} 30 / 20px round;pointer-events:none}
.tape{position:absolute;width:92px;height:26px;background:rgba(245,158,11,.38);box-shadow:0 1px 2px rgba(13,13,13,.08);
  mask:linear-gradient(90deg,transparent 0 2px,#000 2px calc(100% - 2px),transparent 0)}
.sheet .t1{top:-12px;left:14%;transform:rotate(-4deg)}
.sheet .t2{top:-10px;right:12%;transform:rotate(3deg)}
.sheet>input{position:absolute;opacity:0;width:1px;height:1px;pointer-events:none}
.sheet-head{text-align:center;margin-bottom:1.25rem}
.sheet-head h2{margin-bottom:.4em}
.toggle{border:0;margin:0 auto;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:6px;max-width:420px}
.toggle legend{grid-column:1/-1;font:600 1.75rem/1.1 var(--hand);color:var(--ink);margin:0 auto .45rem;padding:0}
.toggle label{display:flex;align-items:center;justify-content:center;text-align:center;min-height:48px;padding:.45rem .6rem;border:2px solid var(--ink);
  border-radius:14px 10px 14px 10px;font-weight:600;line-height:1.2;cursor:pointer;background:var(--sheet);transition:background-color .2s,color .2s}
.toggle label:hover{background:var(--cream)}
#erst-ja:checked~.sheet-head label[for=erst-ja],#erst-nein:checked~.sheet-head label[for=erst-nein]{background:var(--ink);color:#fff}
#erst-ja:focus-visible~.sheet-head label[for=erst-ja],#erst-nein:focus-visible~.sheet-head label[for=erst-nein]{outline:3px solid var(--amber-3);outline-offset:3px}
.hint{margin:.7rem 0 0;color:var(--ink-2)}
#erst-ja:checked~* .if-reg,#erst-ja:checked~.if-reg,#erst-nein:checked~* .if-first,#erst-nein:checked~.if-first{display:none!important}

.menu{list-style:none;margin:0;padding:0}
.dish{display:grid;grid-template-columns:76px 1fr;gap:.25rem .9rem;padding:1.35rem 0;border-top:2px dashed var(--line)}
.dish:first-child{border-top:0}
.dish-art{width:76px;margin-top:.2rem}
.dish-head{display:flex;align-items:baseline;flex-wrap:wrap;gap:0 .4rem}
.dish h3{font-size:1.28rem;flex:1 1 auto}
.dish .alt{font:500 1rem/1.3 var(--sans);color:var(--amber-3);margin:.15rem 0 0}
.leader{display:none}
.price{margin:0;font:700 1.85rem/1 var(--hand);color:var(--amber-3);white-space:nowrap}
.price .small{font-size:1.45rem}
.price s{font-size:1.3rem;color:var(--ink-2);text-decoration:none;padding:0 .1em;margin-right:.1em;background:${svgUrl(strike())} no-repeat center / 100% 70%}
.dur{margin:.25rem 0 .5rem;font-weight:600;font-size:1rem;color:var(--ink-2)}
.feel{margin-bottom:.4rem}
.dish-body{min-width:0}
.dish>.dish-body{grid-column:2}
.go{display:flex;flex-wrap:wrap;gap:.5rem;margin:.75rem 0 0}
.go .btn{min-height:46px}
details>summary{cursor:pointer;list-style:none}
details>summary::-webkit-details-marker{display:none}
.more>summary,.diff>summary{display:inline-flex;align-items:center;gap:.35rem;min-height:44px;font-weight:600;color:var(--amber-3);text-decoration:underline;text-decoration-thickness:1.5px;text-underline-offset:.2em}
.more>summary::after,.diff>summary::after,.faq>summary::after{content:"";width:9px;height:9px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .25s var(--ease);flex:none}
details[open]>summary::after{transform:translateY(2px) rotate(-135deg)}
.more>p{margin:.3rem 0 .7rem;color:var(--ink-2)}
.sheet-foot{border-top:2px dashed var(--line);margin-top:.5rem;padding-top:1rem}
.terms{list-style:none;padding:0;margin:.6rem 0 1rem;display:grid;gap:.55rem}
.terms li{display:flex;gap:.55rem;align-items:flex-start;overflow-wrap:anywhere}
.terms .ck{margin-top:.15rem}
.note{font-size:1rem;color:var(--ink-2);max-width:62ch}
.diff p{max-width:62ch;margin:.2rem 0 .6rem}

/* booking calendar, replaces the menu once a treatment is picked */
.sheet.is-cal .menu,.sheet.is-cal .sheet-head .toggle,.sheet.is-cal .hint,.sheet.is-cal .diff{display:none!important}
.cal-bar{display:flex;flex-wrap:wrap;align-items:center;gap:.4rem 1rem;margin-bottom:.8rem}
.back{display:inline-flex;align-items:center;gap:.3rem;min-height:44px;padding:.4rem .9rem .4rem .5rem;border:2px solid var(--ink);border-radius:999px;background:var(--sheet);color:var(--ink);font:600 .98rem/1 var(--sans);cursor:pointer}
.back:hover{background:var(--cream)}
.back svg{width:20px;fill:none;stroke:currentColor;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
.chosen{margin:0;font:600 1.6rem/1.15 var(--hand);color:var(--ink);outline:none}
.cal-frame{position:relative;min-height:540px;margin-inline:calc(-1.15rem - var(--gut));background:#fff;border-block:1px solid var(--line)}
.cal-frame iframe{display:block;width:100%;min-height:800px;border:0}
.cal-loading{position:absolute;inset:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:.8rem;padding:4rem 1.2rem;text-align:center;background:#fff;font-size:1.05rem}
.cal-loading img{width:150px;animation:bob 1.6s ease-in-out infinite alternate}
@keyframes bob{to{transform:translateY(-6px) rotate(-2deg)}}
.cal-loading.failed img{animation:none}
.cal-help{margin:.8rem 0 0;font-size:.95rem}

/* visit */
.besuch h2{text-align:center}
.steps{list-style:none;margin:2rem 0 0;padding:0;display:grid;gap:.4rem}
.step{position:relative;display:grid;grid-template-columns:110px 1fr;gap:1rem;align-items:center;padding-bottom:2.6rem}
.step-art{width:110px;max-height:130px;object-fit:contain}
.step h3{font:600 1.85rem/1.05 var(--hand);color:var(--ink);margin-bottom:.2rem}
.step p{margin:0;color:var(--ink-2)}
.step-arrow{position:absolute;width:62px;left:44px;bottom:-.2rem;transform:rotate(100deg)}
.step:nth-child(even){grid-template-columns:1fr 110px}
.step:nth-child(even) .step-art{order:2}
.step:nth-child(even) .step-arrow{left:auto;right:44px;transform:rotate(80deg) scaleY(-1)}
.step:nth-child(odd) .step-arrow{left:calc(50% - 31px);transform:rotate(35deg)}
.step:nth-child(even) .step-arrow{right:calc(50% - 31px);transform:rotate(145deg) scaleY(-1)}

/* place */
.ort{background:var(--cream);background-image:radial-gradient(rgba(148,95,6,.16) 1px,transparent 1.2px);background-size:22px 22px}
.ort-grid{display:grid;gap:2.2rem;align-items:center}
.facts{margin:0 0 1.4rem;display:grid;gap:.7rem}
.facts div{display:grid;gap:0}
.facts dt{font:600 1.4rem/1.1 var(--hand);color:var(--amber-3)}
.facts dd{margin:0;font-size:1.1rem}
.pinboard{position:relative;display:grid;grid-template-columns:1fr;gap:1.4rem;justify-items:center}
.photo{position:relative;display:block;margin:0;background:#fff;padding:9px 9px 12px;box-shadow:0 1px 2px rgba(13,13,13,.1),0 14px 26px -16px rgba(13,13,13,.45)}
.photo img{width:100%}
.photo .tape{top:-11px;left:50%;margin-left:-46px;transform:rotate(-3deg)}
.photo.map{transform:rotate(-1.2deg);max-width:440px;width:100%}
.photo.room{transform:rotate(2deg);max-width:280px;width:60%;justify-self:end;margin-top:-3rem}
.photo figcaption{text-align:center;margin-top:.3rem;font-size:1.35rem}
a.photo:hover{transform:rotate(-.4deg) translateY(-2px)}
a.photo{transition:transform .3s var(--ease)}

/* about */
.portrait{float:right;width:42%;max-width:330px;margin:.3rem 0 1rem 1rem;transform:rotate(2.5deg);padding:6px 6px 9px}
.portrait .tape{width:64px;margin-left:-32px}
.role{font:600 1.45rem/1.2 var(--hand);color:var(--amber-3)}
.ich-text{max-width:62rem;margin-inline:auto}
.ich-text>p,.ich-text>details,.ich-text>blockquote{max-width:40em}
.ich-text::after{content:"";display:block;clear:both}
.quote{margin:1.6rem 0 .6rem;padding:1.1rem 1.2rem;background:var(--sheet);border-radius:3px;box-shadow:0 1px 2px rgba(13,13,13,.06),0 12px 24px -18px rgba(148,95,6,.6)}
.quote p{font:400 1.12rem/1.5 var(--serif);margin:.5rem 0}
.quote footer{font-weight:600;color:var(--amber-3)}
.small-q{margin:.6rem 0;box-shadow:none;background:transparent;padding:.3rem 0 .6rem;border-bottom:2px dashed var(--line);border-radius:0}
.small-q p{font-size:1rem}
.group{font-weight:650;margin:.6rem 0 .1rem}
.items{color:var(--ink-2);margin:0 0 .4rem}

/* depth */
.narrow{max-width:760px}
.faq{border-top:2px dashed var(--line)}
.faq:last-child{border-bottom:2px dashed var(--line)}
.faq>summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;min-height:60px;padding:.6rem 0}
.faq>summary h3{font-size:1.3rem}
.faq>summary::after{width:11px;height:11px;color:var(--amber-3)}
.faq[open]{padding-bottom:1.2rem}
.pull{margin:.4rem 0 1rem;padding:0}
.pull p{font:600 1.75rem/1.15 var(--hand);color:var(--ink);margin:0}
.pull footer{font-size:1rem;color:var(--ink-2)}
.dots{padding-left:1.2rem;margin:.4rem 0 1rem}
.dots li{margin-bottom:.35rem}
.dots li::marker{color:var(--orange)}
.topics{margin:0;display:grid;gap:.7rem}
.topics dt{font-weight:650}
.topics dd{margin:0;color:var(--ink-2)}
.gift{display:grid;grid-template-columns:90px 1fr;gap:1rem;align-items:start}
.gift-art{width:90px}
.gift-photo{width:min(420px,100%);margin-top:.6rem;border-radius:4px;box-shadow:0 10px 22px -14px rgba(13,13,13,.5)}

/* end */
.end{padding:3rem 0 2.5rem;border-top:1px solid var(--line)}
.end-grid{display:grid;grid-template-columns:120px 1fr;gap:1.2rem;align-items:center}
.end-art{width:120px}
.bye{font:600 2rem/1.1 var(--hand);margin-bottom:.8rem}
address{font-style:normal;overflow-wrap:anywhere;margin-top:1.2rem;color:var(--ink-2)}
.proto{margin-top:1.4rem;font-size:1rem;color:var(--ink-2)}

@media (max-width:359px){
  :root{--gut:14px}
  .sheet{padding-inline:.9rem}
  .cal-frame{margin-inline:calc(-.9rem - var(--gut))}
  .dish{grid-template-columns:56px 1fr;gap:.2rem .7rem}.dish-art{width:56px}
  .brand img{width:38px}.brand{font-size:1rem}
  .step{grid-template-columns:84px 1fr}.step:nth-child(even){grid-template-columns:1fr 84px}.step-art{width:84px}
  .price{font-size:1.65rem}
}
@media (min-width:720px){
  .sheet{padding:3rem 3rem 2.2rem}
  .cal-frame{margin-inline:0;border:1px solid var(--line)}
  .dish{grid-template-columns:150px 1fr;gap:.2rem 1.8rem;padding:1.8rem 0}
  .dish-art{width:150px}
  .leader{display:block;flex:1 1 2rem;align-self:flex-end;height:12px;margin-bottom:.45rem;background:${svgUrl(squiggle())} repeat-x 0 50% / 90px 10px;opacity:.75}
  .dish-head{flex-wrap:nowrap}
  .dish h3{flex:0 1 auto;min-width:0;font-size:1.5rem}
  .price{font-size:2.1rem}
  .sheet-foot{display:grid;grid-template-columns:1fr 1fr;gap:0 2.5rem}
  .sheet-foot .diff{grid-column:1/-1}
  .sheet-foot .note{grid-column:2}
  .terms{grid-row:span 3}
  .wide{display:inline}
  .ort-grid{grid-template-columns:1fr 1fr;gap:3rem}
  .pinboard{justify-items:end}
  .photo.room{margin-top:-3.5rem;justify-self:start;width:56%}
  .portrait{width:36%;margin-left:2.5rem}
  .gift{grid-template-columns:120px 1fr}.gift-art{width:120px}
  .end-grid{grid-template-columns:210px 1fr}.end-art{width:210px}
}
@media (min-width:1000px){
  .hero{padding-block:3.5rem 2rem}
  .hero-grid{grid-template-columns:1.15fr .85fr;align-items:center;gap:3rem}
  .hero-art{max-width:none}
  .hero-art .a1{height:300px}
  .hero-art .a3{max-height:300px}
  .hero-art .a2{width:96px}
  .hero-art figcaption{font-size:1.8rem}
  .sheet{max-width:980px;margin-inline:auto}
  .steps{grid-template-columns:repeat(4,1fr);gap:1.5rem}
  .step,.step:nth-child(even){grid-template-columns:1fr;text-align:center;padding-bottom:0;align-items:start}
  .step:nth-child(even) .step-art{order:0}
  .step-art{width:100%;height:150px;max-height:none;object-fit:contain}
  .step .step-arrow,.step:nth-child(even) .step-arrow,.step:nth-child(odd) .step-arrow{left:auto;right:-3.2rem;bottom:auto;top:52px;width:70px;transform:rotate(8deg)}
  .step:nth-child(even) .step-arrow{transform:rotate(-8deg) scaleY(-1);top:40px}
}
`;

/* =====================================================================
   SCRIPT — the calendar loads only after a pick (privacy + speed)
   ===================================================================== */
const JS = `
(() => {
  const sheet = document.querySelector('.sheet'), cal = document.getElementById('cal'), frame = cal.querySelector('.cal-frame');
  const chosen = cal.querySelector('.chosen'), direct = cal.querySelector('.cal-direct');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const go = el => el.scrollIntoView({ behavior: still.matches ? 'auto' : 'smooth', block: 'start' });
  let embedJs = false, slow, lastPick = null;
  function open(id, label) {
    clearTimeout(slow);
    const src = '${acuity('')}' + '&appointmentType=' + id;
    frame.innerHTML = '<div class="cal-loading" role="status"><img src="img/termin.svg" alt="" width="460" height="420"><span>Kalender wird geladen …</span></div>'
      + '<iframe src="' + src + '&ref=embedded_csp" title="Termin vereinbaren: ' + label.replace(/"/g, '&quot;') + '" width="100%" height="800" allow="payment"></iframe>';
    direct.href = src;
    const loading = frame.querySelector('.cal-loading');
    frame.querySelector('iframe').addEventListener('load', () => { clearTimeout(slow); loading.remove(); });
    slow = setTimeout(() => {
      loading.classList.add('failed');
      loading.querySelector('span').innerHTML = 'Der Kalender lädt nicht? <a href="' + src + '" rel="noopener">Direkt bei Acuity buchen</a> oder schreib mir: <a href="mailto:${C.email}">${C.email}</a>';
    }, 8000);
    if (!embedJs) { const s = document.createElement('script'); s.src = 'https://embed.acuityscheduling.com/js/embed.js'; s.async = true; document.body.append(s); embedJs = true; }
    chosen.textContent = label;
    cal.hidden = false; sheet.classList.add('is-cal');
  }
  function close() {
    clearTimeout(slow); frame.innerHTML = ''; cal.hidden = true; sheet.classList.remove('is-cal');
    history.replaceState(null, '', location.pathname + '#karte');
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-type]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
    e.preventDefault(); lastPick = a;
    open(a.dataset.type, a.dataset.label);
    history.replaceState(null, '', '?typ=' + a.dataset.type + '#karte');
    go(cal); chosen.focus({ preventScroll: true });
  });
  cal.querySelector('.back').addEventListener('click', () => {
    close();
    const back = lastPick && lastPick.closest('.dish');
    if (back) { go(back); lastPick.focus({ preventScroll: true }); } else go(sheet);
  });
  // a shared link (?typ=<id>) opens that calendar straight away
  const pre = document.querySelector('a[data-type="' + new URLSearchParams(location.search).get('typ') + '"]');
  if (pre) {
    if (pre.closest('.if-reg')) document.getElementById('erst-nein').checked = true;
    open(pre.dataset.type, pre.dataset.label);
  }
})();`;

/* =====================================================================
   HEAD + WRITE
   ===================================================================== */
const SITE = 'https://ggzhan.github.io/miri/';   // prototype lives at SITE + 'kompakt/'
const DESC = 'Klassische, Ganzheitliche und Hawaiianische Massage und Polarity in Winterthur, Münzgasse 2. Mi & Fr 10–20 Uhr. Kennenlernmassage 80 CHF. Termin direkt online buchen.';
const business = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: C.name,
  alternateName: C.formerNames,
  description: `Massage & Polarity für Körper und Geist. ${C.intro}`,
  url: SITE + 'kompakt/',
  image: [`${SITE}img/miriam.jpg`, `${SITE}img/praxis.jpg`],
  email: C.email,
  address: { '@type': 'PostalAddress', streetAddress: 'Münzgasse 2', postalCode: '8400', addressLocality: 'Winterthur', addressRegion: 'ZH', addressCountry: 'CH' },
  areaServed: { '@type': 'City', name: 'Winterthur' },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Wednesday', 'https://schema.org/Friday'], opens: '10:00', closes: '20:00' }],
  priceRange: 'CHF 50–180',
  paymentAccepted: 'TWINT, Bargeld, Karte',
  currenciesAccepted: 'CHF',
  employee: { '@type': 'Person', name: C.person, jobTitle: C.title },
  potentialAction: { '@type': 'ReserveAction', target: C.book, name: 'Termin online buchen' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Massagen & Behandlungen',
    itemListElement: [
      ...MENU.flatMap(m => m.regular.map(r => ({ '@type': 'Offer', price: r.p.match(/\d+/)[0], priceCurrency: 'CHF', itemOffered: { '@type': 'Service', name: `${m.n} (${r.t})`, description: strip(m.d) } }))),
      { '@type': 'Offer', price: '80', priceCurrency: 'CHF', itemOffered: { '@type': 'Service', name: 'Kennenlernmassage, klassisch oder ganzheitlich (60 min)' } },
      { '@type': 'Offer', price: '140', priceCurrency: 'CHF', itemOffered: { '@type': 'Service', name: 'Kennenlernen: Hawaiianische Ganzkörpermassage (90 min)' } },
    ],
  },
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Figtree:wght@400;500;600;650;700&family=Young+Serif&display=swap';

const html = `<!doctype html>
<!-- Generated by kompakt/build.mjs — PROTOTYPE, edit that file, not this one. -->
<html lang="de-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Massage & Polarity in Winterthur | Miriam Pimputkar</title>
<meta name="description" content="${DESC}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#f9f9f9">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_CH">
<meta property="og:title" content="Massage & Polarity in Winterthur | Miriam Pimputkar">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="${SITE}img/og-image.jpg">
<link rel="icon" href="../img/sketches/massage.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>${CSS.replace(/\n\s*/g, '\n').trim()}</style>
<script type="application/ld+json">${JSON.stringify(business)}</script>
</head>
<body>
<a class="skip" href="#karte">Zu Behandlungen und Buchung springen</a>
${body()}
<script>${JS}</script>
</body>
</html>
`;
writeFileSync(here('index.html'), html);
console.log(`wrote kompakt/index.html (${(html.length / 1024).toFixed(1)} kB) + kompakt/img/*.svg`);
