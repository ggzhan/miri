// Renders the Miri's Massage & Polarity one-page site to static HTML (index.html),
// so every word is in the HTML source for Google and AI crawlers.
// Run: node build.mjs            preview build (noindex) — what GitHub Pages serves
//      LAUNCH=1 node build.mjs   launch build (indexable)
import { writeFileSync } from 'node:fs';

/* =====================================================================
   CONTENT
   Sources: the Acuity booking page (mirismassage.as.me) and the draft Webador
   site (temp-hllkqxtelkpliqksexao.webadorsite.com). Webador text is switched
   from "Sie" to "du" to match the rest, and obvious typos are fixed.
   ===================================================================== */
const C = {
  name: "Miri's Massage & Polarity",
  person: 'Miriam Pimputkar',
  book: 'https://mirismassage.as.me/',
  email: 'mirismassage@gmail.com',
  address: ['Münzgasse 2', '4. Stock, Lift vorhanden', '8400 Winterthur'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Miri%27s+Klassische+Massage+M%C3%BCnzgasse+2+8400+Winterthur',
  hours: { days: 'Mittwoch und Freitag', short: 'Mi & Fr', time: '10–20 Uhr' },
  rating: { score: '5,0', count: 22 },

  tagline: 'Massage & Polarity für Körper und Geist',
  claim: 'Achtsame Körperarbeit und Prozessbegleitung',
  intro: 'Finde zurück in dein natürliches Gleichgewicht. In meiner Praxis in Winterthur begleite ich dich mit achtsamer Berührung, gezielten Massagen und stärkender Energiearbeit zu mehr Entspannung und Vitalität.',
  motto: ['Der Körper weiss, was der nächste Schritt ist.', 'Der Verstand ist oft mehrere Schritte zu weit.'],
  welcome: 'Herzlich Willkommen! Schön, dass du hier bist!',
  hook: 'Bist du körperlich angespannt? Schränkt dich dein Körper im Alltag ein? Hast du Muskelschmerzen? Oder möchtest du dich einfach mal genüsslich entspannen und dir so etwas Gutes tun? Dann bist du bei mir genau richtig.',
  why: [
    'Mit der Massage wird durch manuellen Druck und Zug auf deine Muskeln die Durchblutung gefördert. Dein Stoffwechsel wird angeregt. Deine Muskeln entspannen sich und schmerzhafte Verhärtungen lösen sich auf.',
    'Die Massage reduziert Stress im gesamten Organismus. So können nicht nur körperliche Beschwerden wie z.B. Kopfschmerzen, sondern auch psychische Leiden wie Depressionen und Angstzustände gelindert werden. Ein ganzheitliches Wohlbefinden entsteht.',
  ],
  relief: 'Sitzende Tätigkeiten, Stress und einseitige Belastungen hinterlassen Spuren in der Muskulatur. In meiner Praxis in Winterthur verbinde ich anatomisches Feingefühl mit hochwertigen Ölen, um Verhärtungen sanft zu lösen und dein Wohlbefinden wiederherzustellen.',

  offerIntro: 'Ob gezielte Linderung körperlicher Verspannungen oder energetische Harmonisierung: Ich begleite dich mit fundierter Erfahrung und achtsamen Behandlungsmethoden. Als Dipl. Klassische Masseurin und Polaritytherapeutin in Ausbildung biete ich dir folgendes an:',
  services: [
    { id: 'klassisch', n: 'Klassische Massage', alt: 'Klassische Ölmassage', t: '30 / 60 min', p: '100 CHF',
      d: 'Löst gezielt muskuläre Verspannungen, regt die Durchblutung an und fördert die spürbare Regeneration von Körper und Muskulatur nach körperlicher Belastung oder stressigen Tagen.',
      more: [
        '<b>Klassisch fokussiert (30 min):</b> Ideal für die gezielte Behandlung akuter Verspannungen im Nacken-, Schulter- oder Lendenbereich. Schnelle Entlastung für zwischendurch.',
        '<b>Klassische Massage (60 min):</b> Ausführliche Bearbeitung von Rücken, Nacken und Beinen. Löst tiefsitzende Muskelverspannungen nachhaltig und fördert die Durchblutung.',
      ] },
    { id: 'ganzheitlich', n: 'Ganzheitliche Massage', t: '60 min', p: '110 CHF',
      d: 'Verbindet wirkungsvolle manuelle Techniken mit feinfühliger Körperwahrnehmung. Eine tiefgreifende Auszeit, die das gesamte Nervensystem beruhigt und neue Kraft schenkt.',
      more: ['Die Klassische Massage wird individuell ergänzt mit der Polaritymethode. Dies beinhaltet sanfte, craniosacrale Berührungen, sanfte Schaukelbewegungen, welche das Gewebe lockern, bis tiefere, kräftigere Drucktechniken, osteopathische Griffe, Dehnungen, Mobilisierung der Gelenke und Arbeit mit Reflexzonen, um Blockaden im Körper zu lösen und so die Gesundheit zu unterstützen.'] },
    { id: 'polarity-behandlung', n: 'Polaritybehandlung', t: '60–90 min', p: '88 CHF / Std.*',
      d: 'Unterstützt den freien Fluss der Lebensenergie durch sanfte Berührungen, Energiearbeit und gezielte Impulse. Hilft bei innerer Unruhe und aktiviert deine natürlichen Selbstheilungskräfte.',
      more: ['Die erste Polaritybehandlung beinhaltet ein ausführliches Vorgespräch, bei Bedarf eine Haltungsanalyse sowie eine manuelle Behandlung auf der Liege. Mehr dazu weiter unten unter «Polarity».'] },
    { id: 'hawaiianisch', n: 'Hawaiianische Ganzkörpermassage', alt: 'Lomi Lomi', t: 'ab 90 min', p: null,
      d: 'Ganzheitliches Wellness-Erlebnis mit fliessenden Unterarmstrichen und viel warmem Öl. Bringt Körper, Geist und Nervensystem in tiefe Harmonie.',
      more: [
        'Tauche ein in eine tief entspannende Körperreise, bei welcher du von Kopf bis Fuss, vorne und hinten massiert wirst. Die fliessenden, langen Streichungen nebst sanften Dehnungen und Lockerung von Gelenken erinnern an die Wellen des Ozeans und machen diese Massage einzigartig.',
        'In einem kurzen Vorgespräch kläre ich mit dir ab, was bei deinem Körper zu beachten ist und ob Berührung/Massage im Gesicht und/oder Bauch erwünscht ist. Am Schluss gebe ich dir 2–3 Minuten Zeit, um die Massage nachwirken zu lassen.',
      ] },
  ],
  extras: ['Myofasziale Triggerpunktbehandlung', 'Schröpfmassage (mit Schröpfgläsern)', 'Reflexologie (z.B. Füsse, Hände, Ohren)'],

  polarity: {
    quote: 'Ich halte mich an das, was die Natur mir bestätigt.',
    quoteBy: 'Dr. Randolph Stone, Begründer der Polarity Therapie',
    intro: [
      'Die erste Polaritybehandlung beinhaltet ein ausführliches Vorgespräch, bei Bedarf eine Haltungsanalyse sowie eine manuelle Behandlung auf der Liege.',
      'Eine Polaritybehandlung ist eine Investition in deine Gesundheit sowie persönliche Weiterentwicklung. Du darfst am Ende selber entscheiden, wie viel dir diese erste Polarityerfahrung finanziell wert ist.',
    ],
    facts: [
      'Ist eine Synthese von östlicher und westlicher Medizin, wobei die Ganzheit von Körper, Geist und Seele im Vordergrund steht.',
      'Wurde vom Naturheilarzt, Osteopathen und Chiropraktiker Dr. Randolph Stone (1890–1981) gegründet.',
      'Geht der Frage nach, was hinter den Erscheinungen (Symptomen) steckt: Wo liegen die tieferen Ursachen und Hintergründe von Gesundheit und Krankheit? Um was geht es wirklich?',
      'Aktiviert die Selbstheilungskräfte und stärkt die körpereigene Abwehr.',
      'Beinhaltet Körperarbeit, Körperübungen, Ernährung sowie die Auseinandersetzung mit Lebensstil, Denk- und Verhaltensmustern im begleitenden Gespräch.',
      'Wird von den meisten Krankenkassen als Komplementärtherapie anerkannt.',
    ],
    topics: [
      { h: 'Körperarbeit', p: ['Polarity ist die Arbeit am bekleideten Körper mit sanften, schaukelnden/bewegenden oder tief ins Gewebe gehenden Berührungen.'] },
      { h: 'Begleitendes Gespräch', p: [
        'Das begleitende Gespräch unterstützt und orientiert die Prozesse, welche sich während der Körperarbeit zeigen können. Dadurch können sich tieferliegende Muster und/oder Traumata lösen.',
        'Durch sprachliche Reflexion lernen wir uns besser kennen, spüren unsere Bedürfnisse klarer und finden Worte für innere Zustände und Empfindungen. Dadurch übernehmen wir stetig mehr Eigenverantwortung. Dies führt zu Selbstvertrauen und Akzeptanz unserer eigenen Individualität. Mit der Sprache begleiten wir, und Worte führen zu mehr Bewusstsein.'] },
      { h: 'Yoga', p: ['Eine individuelle und gezielte Auswahl an Yogaübungen vertieft die Wirkung der Behandlung und hat den Vorteil, dass sie als Selbsthilfe angewendet werden kann.'] },
      { h: 'Ernährung', p: [
        'Falsche Ess- und Lebensgewohnheiten führen zu Einlagerungen von Schlacken in Gefässen, Geweben und Gelenken. Dies führt zu Übersäuerung und schafft den Nährboden für Beschwerden und Krankheiten.',
        'Mit der Ernährung beeinflussen wir in direkter Weise unser Befinden. Die Polarity-Ernährung hat zum Ziel, das Ernährungsbewusstsein zu fördern, indem Zusammenhänge zwischen Verhalten, Befinden und Essgewohnheiten ergründet werden. Das Ziel ist somit eine Ernährungsweise zu finden, die den Gesundheitsprozess unterstützt.'] },
      { h: 'Polarity Reinigung', p: [
        'Die Polarity Reinigung entschlackt, entsäuert, schafft Giftstoffe aus dem Körper und entlastet Leber, Nieren, die Verdauungsorgane, die Haut und das Bindegewebe. Müdigkeit, Antriebsmangel oder Allergien – die Warnzeichen für Beschwerden oder Krankheiten – können verschwinden. Ganzheitliches Wohlbefinden und eine innere Ruhe stellen sich ein.',
        'Die Reinigung im Rahmen einer Ernährungsdiät kann als Kur fern vom Alltag oder auch zuhause durchgeführt werden.'] },
      { h: 'Haltung der Therapeutin', p: ['Achtsamkeit, Empathie und Respekt sind die Basis, um eine wohlwollende und sichere Umgebung im Therapieraum zu schaffen.'] },
    ],
  },

  prices: {
    intro: 'Transparente Konditionen für deine Auszeit und Regeneration in Winterthur. Profitiere von einem Kennenlernrabatt auf deine erste Massage: Für nur 80 CHF schenke ich dir 30 CHF bei deinem ersten Besuch.',
    rows: [
      ['Kennenlern-Angebot (erste Massage)', '80 CHF'],
      ['Klassische Massage', '100 CHF'],
      ['Ganzheitliche Massage', '110 CHF'],
      ['Polaritybehandlung', '88 CHF / Std.*'],
    ],
    polarityNote: '*Die Preise für die Polaritybehandlung werden stets an meinen Ausbildungsstand angepasst:',
    polaritySteps: [['letztes Ausbildungsjahr', '88 CHF / Std.'], ['mit Diplom', '110 CHF / Std.'], ['mit Krankenkassenanerkennung', '132 CHF']],
    terms: [
      ['Zahlungsarten vor Ort', 'TWINT, bar oder Karte'],
      ['Geschenkgutscheine', 'Auf Anfrage erhältlich'],
      ['Krankenkasse', 'Derzeit noch Selbstzahler'],
      ['Terminabsage (mind. 24 h vorher)', 'Kostenfrei'],
    ],
    social: 'Massagen und Behandlungen sollten für jeden Menschen zugänglich sein. Falls du nicht- oder wenigverdienend bist, bin ich gerne bereit, dir finanziell entgegenzukommen. Melde dich bitte ungeniert vorab per E-Mail bei mir, damit wir gemeinsam eine individuelle Lösung finden können.',
    cancel: 'Falls du deinen Termin einmal nicht einhalten kannst, melde dich bitte mindestens 24 Stunden vorher schriftlich ab, um dessen Berechnung zu vermeiden.',
  },
  pay: 'TWINT, bar oder Karte',

  values: [
    { k: 'Achtsam', v: 'Aufgrund meiner Feinfühligkeit arbeite ich sehr achtsam mit meinen Händen. So erhältst du eine individuell auf dich abgestimmte Massage.' },
    { k: 'Wohltuend', v: 'Während der Massage arbeite ich in der Stille oder zu sanfter Musik, voll und ganz auf dich fokussiert. Durch das Nichtsprechen nimmst du deinen Körper und die wohltuenden Berührungen intensiver wahr.' },
    { k: 'Ganzheitlich', v: 'Du profitierst von meinen reichhaltigen Erfahrungen und Wissen aus der Physio- und Ergotherapie, TCM und Kinesiologie. Bei Interesse zeige ich dir Übungen, die dir im Alltag helfen, selber Stress, Anspannung und Schmerzen zu reduzieren.' },
    { k: 'Sozial', v: 'Falls du nicht- oder wenigverdienend bist, bin ich gerne bereit, dir finanziell entgegenzukommen. Melde dich ungeniert per E-Mail bei mir.' },
  ],

  aboutLead: 'Mein Name ist Miriam Pimputkar. In meiner Praxis in Winterthur schaffe ich einen geschützten Raum für Entspannung und Gesundheit. Mit Achtsamkeit, Fachwissen und Leidenschaft begleite ich dich auf deinem Weg zu mehr Wohlbefinden und Vitalität.',
  about: [
    'Das bin ich: ein fröhliches, bewegungsfreudiges Wesen mit einer grossen Faszination für den menschlichen Körper. Ich liebe es, mit meinen Händen zu arbeiten und mit Menschen in Kontakt zu sein.',
    'Gesund und körperlich frei zu sein, ist keine Selbstverständlichkeit. So praktiziere ich regelmässig eine Mischung aus Pilates, Yoga, Faszientraining, Qi Gong, Meditation und vieles mehr. Was meinem Körper und meiner Seele nicht fehlen darf, ist das Tanzen zu den 5 Rhythmen.',
    'Meine Lebenserfahrungen haben zu einem grossen Interesse an der Heilung des menschlichen Körpers und somit zu einem reichhaltigen therapeutischen Erfahrungsschatz geführt – und dies wiederum zu meiner jetzigen Herzensarbeit als Masseurin und Körpertherapeutin. Es bereichert mich sehr, Menschen etwas Gutes zu tun, sei es im Rahmen einer Massagebehandlung oder im gemeinsamen Erforschen und zur Verfügung stellen, was es braucht, damit der Körper sich mit seinen Leiden beruhigen kann.',
  ],
  training: [
    { h: 'Therapeutische Ausbildung', groups: [
      ['Polaritytherapeutin i. A.', ['Authentische Kommunikation', 'Prozessbegleitung', 'Embryologie', 'Reflexologie', 'Cranio', 'Lymphbehandlung', 'Yoga-/Körperübungen', 'Ernährungslehre']],
      ['Berufsmasseurin', ['Klassische Massage', 'Bindegewebsmassage', 'Myofasziale Triggerpunktbehandlung', 'Schröpfkopfmassage', 'Hawaiianische Wellnessmassage']],
      ['Ergotherapie', ['Grundjahr', 'Praktikum (Suchtklinik)']],
      ['Kurse', ['Formatives Embodiment', 'IBP-Workshops (Achtsamkeit, Selbstfürsorge, Mein Raum – Dein Raum: Grenzen setzen)', 'Geburtsworkshops', 'Impact (Selbstverteidigung)', 'Continuum', 'Energetisches Heilen', 'Meridian Scanning (TCM)']],
    ] },
    { h: 'Erlebte Therapien', groups: [
      ['Körperpsychotherapie (IBP), Traumatherapie', ['SE (Somatic Experiencing)', 'EMI (Eye-Movement-Integration)', 'Lifespan-Integration', 'Prä- und Perinatale (Geburts-)Therapie']],
      ['Physiotherapie', ['Klassische Körperübungen (Kraft, Stabilisierung)', 'Medizinische Trainingstherapie (MTT)', 'Faszienbehandlung', 'Myoreflextherapie', 'Elektrotherapie', 'Dry Needling', 'Orthopädie', 'FOI (Funktionelle Orthonomie & Integration)', 'Spiraldynamik', 'Ergotherapie']],
      ['Komplementärtherapien', ['Bewegungstherapie', 'Kinesiologie', 'Craniosacraltherapie', 'TCM', 'Watsu', 'Alexandertechnik', 'Trager', 'Musiktherapie', 'Mal- und Gestaltungstherapie', 'Polarity']],
    ] },
    { h: 'Beruflicher Hintergrund', groups: [[null, ['Primar- und Schwimmlehrerin', 'Lerncoach für Kinder und Erwachsene', 'Coach für verhaltensauffällige Kinder']]] },
  ],
  curious: ['Neugierig geworden?', 'Dann melde dich jetzt für eine Kennenlernmassage an!'],
  bye: 'Ich freue mich auf dich! Bis bald!',

  quotes: [
    { a: 'Géraldine', age: 48, short: 'Für mich, die beste Körpertherapeutin, die ich schon jemals hatte.',
      q: 'Auf der Suche nach einer Polarity-Therapeutin in Winterthur bin ich auf Miriam Pimputkar gestossen. Ich bin durch und durch zufrieden. Sie spürt meine Blockaden sowohl auf der seelischen als auch auf der körperlichen Ebene und geht ausserordentlich sensibel & wirkungsvoll darauf ein. Für mich, die beste Körpertherapeutin, die ich schon jemals hatte.' },
    { a: 'Ursula', age: 70, short: 'Inzwischen erlebe ich alle 2 bis 3 Wochen ihre wohltuende Behandlung.',
      q: 'Anfangs 2026 war ich auf der Suche nach einer mir entsprechenden Körpertherapie. Bei Miriam habe ich mit ihrer Ganzheitlichen Massage eine wunderbare Möglichkeit gefunden. Inzwischen erlebe ich alle 2 bis 3 Wochen ihre wohltuende Behandlung. Miriams kompetente und äusserst liebenswürdige Art schätze ich überaus.' },
    { a: 'Tamara', age: 27, short: 'Ich kann einen Besuch in der Praxis auf’s Wärmste empfehlen.',
      q: 'Miriam hat mir eine wohltuende Massageerfahrung geschenkt und dabei nicht nur meine Verspannungen erfolgreich gelöst, sondern auch meiner Psyche etwas Gutes getan. Miriam, ich danke dir für deine Zeit und freue mich auf ein nächstes Mal. Ich kann einen Besuch in der Praxis auf’s Wärmste empfehlen.' },
    { a: 'Peter', age: 64, short: 'Miriam hat eine grosse Begabung.',
      q: 'Ich habe mich bei Miriam gleich wohl gefühlt. Sie gestaltet eine Atmosphäre, in der man sich entspannen kann und einen neuen Zugang zum eigenen Körper findet. Man spürt, dass sie ihr Handwerk versteht. Nach allen Sitzungen bin ich nicht nur entspannter in den Alltag gegangen, sondern die Entspannung war über die Stunden hinaus spürbar. Miriam hat eine grosse Begabung.' },
    { a: 'Raphael', age: 35, short: 'Miriam ist eine wundervolle Masseurin!',
      q: 'Miriam ist eine wundervolle Masseurin! Sie schöpft aus einer breiten Palette an Techniken, gepaart mit viel anatomischem und medizinischem Wissen. Ich bin mit einem spezifischen Anliegen zu Miriam gekommen, welches sie mit gezielten Massagen, Tipps und Übungen adressiert hat. Das hat mir sehr geholfen.' },
  ],

  gift: {
    title: 'Geschenkgutschein – Zeit für dich',
    lead: 'Verschenke eine Auszeit in Winterthur. Der Gutschein kann für eine dieser Behandlungen ausgestellt werden:',
    kinds: ['Ganzheitliche Massage', 'Klassische Massage', 'Hawaiianische Massage', 'Polaritybehandlung', 'Massage nach Wahl', 'Behandlung nach Wahl'],
    versions: ['als Faltkarte per Post (A6)', 'digital zum Verschicken', 'digital zum selber Ausdrucken (A6 oder A5)'],
    note: 'Schreib mir per E-Mail, welche Behandlung und welche Version du möchtest – bei Postversand mit Adresse.',
  },
  visit: {
    room: 'In meiner Praxis in Winterthur steht dein Wohlbefinden im Mittelpunkt. Gönn dir eine bewusste Auszeit und tanke neue Kraft für den Alltag.',
    tips: [
      'Plane für deine Behandlung ausreichend Zeit ein, damit du in Ruhe ankommen kannst.',
      'Bei einem Ersttermin beginnen wir mit einem kurzen Vorgespräch, um auf deine aktuellen Bedürfnisse und Beschwerden optimal einzugehen.',
      'Komm gerne in bequemer Kleidung.',
      'Im Online-Buchungssystem siehst du alle freien Termine in Echtzeit. Hast du Fragen zu den Methoden oder findest keinen passenden Termin, melde dich gerne bei mir.',
    ],
  },
  recs: [
    ['Alexander-Technik bei Peter', 'https://alexandertechnik-zh.ch/alexandertechnik/'],
    ['Bewegungs-Workshops bei Steffen', 'https://www.koerperdialog.ch/'],
    ['5Rhythmen bei Monika', 'https://www.5rhythmentanz.ch/'],
    ['Musiktherapie bei Nicole', 'https://www.wurzelklang.ch/'],
    ['Bewegte Meditation bei Jacqueline', 'https://www.sacred-spaces.online/'],
  ],
};

// Questions people (and AI search) actually ask — every answer is a fact from the sources above.
const FAQ = [
  ['Was kostet eine Massage in Winterthur bei Miri’s Massage?', `Eine Klassische Massage kostet 100 CHF, eine Ganzheitliche Massage 110 CHF und eine Polaritybehandlung 88 CHF pro Stunde. Deine erste Massage bekommst du als Kennenlern-Angebot für 80 CHF.`],
  ['Wann ist die Praxis geöffnet?', `Praxistage sind ${C.hours.days}, jeweils ${C.hours.time}. Termine buchst du bequem online.`],
  ['Wo befindet sich die Praxis?', `An der Münzgasse 2 in 8400 Winterthur, im 4. Stock. Ein Lift ist vorhanden.`],
  ['Wie kann ich bezahlen?', `Vor Ort mit ${C.pay}.`],
  ['Übernimmt die Krankenkasse die Kosten?', `Polarity wird von den meisten Krankenkassen als Komplementärtherapie anerkannt. Da ich mich noch in Ausbildung befinde, sind meine Behandlungen derzeit noch selbst zu bezahlen.`],
  ['Kann ich einen Termin absagen?', `Ja. Eine Absage mindestens 24 Stunden vorher ist kostenfrei. Bitte melde dich schriftlich ab, sonst wird der Termin verrechnet.`],
  ['Was muss ich zum ersten Termin mitbringen?', `Nur etwas Zeit und bequeme Kleidung. Beim Ersttermin beginnen wir mit einem kurzen Vorgespräch. Polarity findet am bekleideten Körper statt.`],
  ['Gibt es Geschenkgutscheine?', `Ja – für eine bestimmte Behandlung oder nach Wahl, als Faltkarte per Post, digital zum Verschicken oder zum selber Ausdrucken. Bestellung per E-Mail.`],
  ['Gibt es vergünstigte Behandlungen?', `Ja. Falls du nicht- oder wenigverdienend bist, komme ich dir gerne finanziell entgegen. Melde dich vorab per E-Mail.`],
];

/* =====================================================================
   IMAGES — descriptive alt text: crawlers and screen readers read these
   ===================================================================== */
const IMG = {
  massage: ['sketches/massage.svg', 'Strichmännchen-Zeichnung: Masseurin massiert eine entspannte Person auf der Massageliege', 1717, 1114],
  stressed: ['sketches/stressed.svg', 'Strichmännchen mit Verspannungen und Kopfschmerzen hält sich den Kopf', 1148, 2183],
  stretch: ['sketches/stretch.svg', 'Entspanntes Strichmännchen streckt sich nach der Massage', 1625, 2413],
  jump: ['sketches/jump.svg', 'Fröhliches Strichmännchen springt vor Freude', 1700, 1502],
  run: ['sketches/run.svg', 'Strichmännchen tanzt und bewegt sich frei', 1495, 1721],
  miriam: ['miriam.png', 'Miriam Pimputkar, dipl. Masseurin und Polaritytherapeutin in Winterthur', 336, 448],
  praxis: ['praxis.jpg', 'Massagepraxis an der Münzgasse 2 in Winterthur mit Massageliege', 320, 242],
  giftFront: ['gutschein-vorne.jpg', 'Geschenkgutschein «Zeit für dich», Vorderseite mit Massage-Zeichnung', 900, 639],
  giftBack: ['gutschein-hinten.jpg', 'Geschenkgutschein, Rückseite mit Platz für Namen und Wert', 900, 639],
  map: ['map.png', 'Karte: Massagepraxis an der Münzgasse 2, Winterthur Altstadt', 871, 592],
};
const img = (k, o = {}) => {
  const [f, alt, w, h] = IMG[k];
  return `<img src="img/${f}" alt="${o.deco ? '' : alt}" width="${w}" height="${h}" loading="${o.eager ? 'eager' : 'lazy'}"${o.cls ? ` class="${o.cls}"` : ''}${o.style ? ` style="${o.style}"` : ''}>`;
};
const mail = `<a href="mailto:${C.email}">${C.email}</a>`;
const giftMail = `mailto:${C.email}?subject=${encodeURIComponent('Gutscheinbestellung')}&body=${encodeURIComponent('Hallo Miriam\n\nIch möchte gerne einen Gutschein bestellen:\n\nBehandlung: \nVersion (Post / digital verschicken / selber ausdrucken A6 oder A5): \nName: \nAdresse (bei Postversand): \n\nLiebe Grüsse')}`;

/* =====================================================================
   CONTENT FRAGMENTS
   ===================================================================== */
const NAV = [
  ['angebot', 'Angebot'], ['polarity', 'Polarity'], ['preise', 'Preise'], ['ueber-mich', 'Über mich'],
  ['erfahrungen', 'Erfahrungen'], ['gutschein', 'Gutschein'], ['kontakt', 'Kontakt'],
];
const navList = () => `<ul class="navlist" id="menu">${NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ul>`;

const F = {
  // expandable details for a service: real text, collapsed so phones aren't flooded
  more: (s, summary = 'Mehr erfahren') => `<details class="more"><summary>${summary}</summary>${s.more.map(p => `<p>${p}</p>`).join('')}</details>`,
  priceRows: () => `<dl class="prices">${C.prices.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`,
  polarityNote: () => `<p class="note">${C.prices.polarityNote}</p><dl class="prices small">${C.prices.polaritySteps.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`,
  terms: () => `<dl class="prices terms">${C.prices.terms.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`,
  facts: () => `<ul class="facts-list">${C.polarity.facts.map(f => `<li>${f}</li>`).join('')}</ul>`,
  topics: (h = 'h3') => C.polarity.topics.map(t => `<details class="topic"><summary><${h}>${t.h}</${h}></summary>${t.p.map(p => `<p>${p}</p>`).join('')}</details>`).join(''),
  training: (h = 'h3') => C.training.map(t => `<details class="training"><summary><${h}>${t.h}</${h}></summary>${t.groups.map(([g, items]) =>
    `${g ? `<p class="group">${g}</p>` : ''}<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`).join('')}</details>`).join(''),
  faq: (h = 'h3') => FAQ.map(([q, a]) => `<details class="faq"><summary><${h}>${q}</${h}></summary><p>${a}</p></details>`).join(''),
  tips: () => `<ul class="tips">${C.visit.tips.map(t => `<li>${t}</li>`).join('')}</ul>`,
  gift: () => `<p>${C.gift.lead}</p><ul class="kinds">${C.gift.kinds.map(k => `<li>${k}</li>`).join('')}</ul><p><b>Erhältlich</b> ${C.gift.versions.join(' · ')}.</p><p>${C.gift.note}</p>`,
  recs: () => `<ul class="recs">${C.recs.map(([n, u]) => `<li><a href="${u}" rel="noopener">${n}</a></li>`).join('')}</ul>`,
  hours: () => `Praxistage: ${C.hours.days}, ${C.hours.time}`,
  rating: () => `<a class="rating" href="${C.maps}" rel="noopener"><span class="stars" aria-hidden="true">★★★★★</span> <b>${C.rating.score}</b> aus ${C.rating.count} Google-Bewertungen</a>`,
  who: q => `${q.a}, ${q.age} J.`,
};

/* =====================================================================
   SEO HEAD
   ===================================================================== */
// TODO before launch: set SITE to the real domain so canonical / og:image / JSON-LD get absolute URLs.
const SITE = 'https://www.example.ch/';
// Preview builds (the default) are hidden from search engines,
// so the shared GitHub Pages copy never competes with the real site. Launch build: LAUNCH=1 node build.mjs
const PREVIEW = process.env.LAUNCH !== '1';
const TITLE = "Massage & Polarity in Winterthur – Klassische, Ganzheitliche & Hawaiianische Massage | Miri's Massage";
const DESC = 'Klassische Massage (100 CHF), Ganzheitliche Massage, Hawaiianische Ganzkörpermassage und Polarity in Winterthur, Münzgasse 2. Mi & Fr 10–20 Uhr. Erste Massage 80 CHF. Termin online buchen.';
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${SITE}#praxis`,
    name: C.name,
    description: `${C.tagline}. ${C.claim}. ${C.intro}`,
    slogan: C.claim,
    url: SITE,
    image: [`${SITE}img/miriam.png`, `${SITE}img/praxis.jpg`, `${SITE}img/og-image.jpg`],
    email: C.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Münzgasse 2', postalCode: '8400', addressLocality: 'Winterthur', addressRegion: 'ZH', addressCountry: 'CH' },
    areaServed: { '@type': 'City', name: 'Winterthur' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Wednesday', 'https://schema.org/Friday'], opens: '10:00', closes: '20:00' }],
    priceRange: 'CHF 80–110',
    paymentAccepted: 'TWINT, Bargeld, Karte',
    currenciesAccepted: 'CHF',
    knowsLanguage: 'de',
    employee: { '@type': 'Person', name: C.person, jobTitle: 'Dipl. Klassische Masseurin, Polaritytherapeutin in Ausbildung' },
    potentialAction: { '@type': 'ReserveAction', target: C.book, name: 'Massage-Termin online buchen' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Massagen & Behandlungen',
      itemListElement: [
        ...C.services.map(s => {
          const price = { klassisch: '100', ganzheitlich: '110', 'polarity-behandlung': '88' }[s.id];
          return { '@type': 'Offer', ...(price && { price, priceCurrency: 'CHF' }), itemOffered: { '@type': 'Service', name: s.n, ...(s.alt && { alternateName: s.alt }), description: `${s.d} Dauer: ${s.t}.` } };
        }),
        { '@type': 'Offer', price: '80', priceCurrency: 'CHF', itemOffered: { '@type': 'Service', name: 'Kennenlern-Angebot (erste Massage)' } },
        ...C.extras.map(e => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: e, description: 'Ergänzende Behandlung' } })),
      ],
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  },
];

const FONTS = 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Kalam:wght@300;400;700&family=Patrick+Hand&family=Gaegu:wght@400;700&family=Shadows+Into+Light&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap';

function page(body) {
  return `<!doctype html>
<!-- Generated by build.mjs — edit that file, not this one. -->
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
<meta property="og:image" content="${SITE}img/og-image.jpg">
<meta name="geo.region" content="CH-ZH">
<meta name="geo.placename" content="Winterthur">
<link rel="icon" href="img/sketches/massage.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link href="styles.css" rel="stylesheet">
${jsonLd.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
${body}
<script>
// mobile menu toggle
const header = document.querySelector('.site-header'), toggle = header.querySelector('.menu-toggle');
toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', header.classList.toggle('open')));
header.querySelectorAll('.navlist a').forEach(a => a.addEventListener('click', () => { header.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }));
// highlight the menu entry of the section in view
const links = [...header.querySelectorAll('.navlist a[href^="#"]')];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(l => l.toggleAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-40% 0px -55% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) io.observe(s); });
</script>
</body>
</html>
`;
}

/* =====================================================================
   PAGE — sketches illustrate the sections
   ===================================================================== */
function site() {
  return `
  <header class="site-header has-toggle"><div class="container">
    <a class="brand" href="#willkommen">${img('massage', { deco: true, eager: true })}<span>Miri's Massage <small>& Polarity</small></span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü öffnen"><span></span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="btn btn-primary" href="${C.book}">Termin buchen</a>
  </div></header>

  <main id="inhalt">
    <section class="hero" id="willkommen"><div class="container">
      <div>
        <h1><small>${C.claim} in Winterthur</small>${C.tagline}</h1>
        <p class="lead">${C.intro}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${C.book}">Termin online buchen</a>
          <a class="btn btn-ghost" href="#angebot">Angebot entdecken</a>
        </div>
        <ul class="facts">
          <li>Erste Massage 80 CHF</li><li>${C.hours.short}, ${C.hours.time}</li><li>Münzgasse 2, Winterthur</li><li>Lift vorhanden</li>
        </ul>
        <p style="margin-top:18px">${F.rating()}</p>
      </div>
      <div class="hero-media">
        ${img('miriam', { cls: 'photo', eager: true })}
        ${img('jump', { cls: 'doodle', deco: true, eager: true })}
      </div>
    </div></section>

    <section class="alt" id="warum"><div class="container twocol" style="align-items:center">
      <div class="why-art" aria-hidden="true">${img('stressed', { deco: true })}<span>→</span>${img('stretch', { deco: true })}</div>
      <div><h2>Der Körper weiss, was der nächste Schritt ist.</h2><p><b>${C.welcome}</b> ${C.hook}</p>${C.why.map(p => `<p>${p}</p>`).join('')}</div>
    </div></section>

    <section id="angebot"><div class="container">
      <div class="center">
        ${img('massage', { cls: 'sketch' })}
        <h2>Mein Angebot</h2>
        <p class="lead">${C.offerIntro}</p>
      </div>
      <div class="cards">${C.services.map(s => `<article class="card" id="${s.id}"><div class="card-top"><span class="dur">${s.t}</span>${s.p ? `<span class="price">${s.p}</span>` : ''}</div><h3>${s.n}</h3>${s.alt ? `<p class="alt">${s.alt}</p>` : ''}<p>${s.d}</p>${F.more(s)}<a href="${C.book}">${s.n} buchen →</a></article>`).join('')}</div>
      <div class="extras"><h3>Ergänzende Behandlungen</h3><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul></div>
      <p class="center" style="margin-top:28px;color:var(--muted)">${C.relief}</p>
    </div></section>

    <section class="alt" id="polarity"><div class="container twocol">
      <div>
        ${img('jump', { cls: 'sketch', deco: true })}
        <h2>Polarity</h2>
        <blockquote class="pull">«${C.polarity.quote}»<footer>${C.polarity.quoteBy}</footer></blockquote>
        ${C.polarity.intro.map(p => `<p>${p}</p>`).join('')}
        ${F.facts()}
      </div>
      <div class="accordion">${F.topics()}</div>
    </div></section>

    <section id="preise"><div class="container twocol">
      <div>
        <h2>Preise</h2>
        <p class="lead">${C.prices.intro}</p>
        ${F.priceRows()}
        ${F.polarityNote()}
      </div>
      <div>
        <h3>Zahlung und Konditionen</h3>
        ${F.terms()}
        <p>${C.prices.cancel}</p>
        <div class="social-box"><h3>Soziales Entgegenkommen</h3><p>${C.prices.social} ${mail}</p></div>
        <a class="btn btn-primary" href="${C.book}" style="margin-top:20px">Jetzt online buchen</a>
      </div>
    </div></section>

    <section class="alt" id="arbeit"><div class="container">
      <div class="center">${img('run', { cls: 'sketch' })}<h2>Was meine Arbeit ausmacht</h2></div>
      <div class="values">${C.values.map(v => `<div><h3>${v.k}</h3><p>${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p></div>`).join('')}</div>
    </div></section>

    <section id="ueber-mich"><div class="container twocol">
      <div>${img('praxis', { cls: 'about-img' })}<div class="accordion" style="margin-top:28px">${F.training()}</div></div>
      <div>
        ${img('stretch', { cls: 'sketch', deco: true })}
        <h2>Über mich – Miriam Pimputkar</h2>
        <p class="lead">${C.aboutLead}</p>
        ${C.about.map(p => `<p>${p}</p>`).join('')}
        <p><b>${C.curious[0]}</b> ${C.curious[1]}</p>
        <a class="btn btn-primary" href="${C.book}">Kennenlernmassage buchen</a>
      </div>
    </div></section>

    <section class="alt" id="erfahrungen"><div class="container">
      <div class="center">${img('jump', { cls: 'sketch', deco: true })}<h2>Erfahrungsberichte</h2>
        <p class="lead">${F.rating()}</p></div>
      <div class="quotes">${C.quotes.map(q => `<blockquote><div class="stars" aria-hidden="true">★★★★★</div><p>«${q.q}»</p><footer>${F.who(q)}</footer></blockquote>`).join('')}</div>
    </div></section>

    <section id="gutschein"><div class="container gift">
      <div>
        <h2>${C.gift.title}</h2>
        ${F.gift()}
        <a class="btn btn-ghost" href="${giftMail}">Gutschein per E-Mail bestellen</a>
      </div>
      <div class="gift-imgs">${img('giftFront')}${img('giftBack')}</div>
    </div></section>

    <section class="alt" id="fragen"><div class="container twocol">
      <div>
        <h2>Hinweise für deinen Termin</h2>
        <p class="lead">${C.visit.room}</p>
        ${F.tips()}
      </div>
      <div><h2>Häufige Fragen</h2><div class="accordion">${F.faq()}</div></div>
    </div></section>

    <section id="kontakt"><div class="container twocol">
      <div>
        <h2>Kontakt & Anfahrt</h2>
        <dl class="glance">
          <dt>Praxis</dt><dd>Massage & Polarity, ${C.person}</dd>
          <dt>Adresse</dt><dd>${C.address[0]}, ${C.address[2]}</dd>
          <dt>Zugang</dt><dd>${C.address[1]}</dd>
          <dt>Praxistage</dt><dd>${C.hours.days}, ${C.hours.time}</dd>
          <dt>Termine</dt><dd><a href="${C.book}">online buchen</a></dd>
          <dt>E-Mail</dt><dd>${mail}</dd>
          <dt>Zahlung</dt><dd>${C.pay}</dd>
        </dl>
        <h3>Meine Empfehlungen in Winterthur</h3>
        ${F.recs()}
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
    <div><h3>${C.name}</h3><address style="font-style:normal">${C.person}<br>${C.address.join('<br>')}<br>${F.hours()}<br>${mail}</address></div>
    <nav aria-label="Fussmenü"><h3>Seiten</h3><ul>${NAV.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}<li><a href="#fragen">Häufige Fragen</a></li></ul></nav>
    <div><h3>Angebot</h3><ul>${C.services.map(s => `<li><a href="#${s.id}">${s.n}</a></li>`).join('')}</ul></div>
  </div></footer>`;
}

/* =====================================================================
   WRITE
   ===================================================================== */
writeFileSync(new URL('index.html', import.meta.url), page(site()));
console.log(`wrote index.html (${PREVIEW ? 'preview, noindex' : 'launch'})`);
