// PROTOTYPE — throwaway. Renders five design variants of Miri's Massage & Polarity
// to static HTML (variant-a.html … variant-e.html) so every word is in the HTML
// source for Google and AI crawlers, not injected by JavaScript.
// Run: node build.mjs   (index.html lists the variants; ?variant=X jumps to one)
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
  massage: ['logo-massage.jpg', 'Strichmännchen-Zeichnung: Masseurin massiert eine entspannte Person auf der Massageliege', 289, 200],
  massageHd: ['massage-hd.jpg', 'Strichmännchen-Zeichnung: Masseurin massiert eine entspannte Person auf der Massageliege', 1000, 690],
  stressed: ['stressed.jpg', 'Strichmännchen mit Verspannungen und Kopfschmerzen hält sich den Kopf', 156, 197],
  stretch: ['stretch.jpg', 'Entspanntes Strichmännchen streckt sich nach der Massage', 128, 188],
  jump: ['jump.jpg', 'Fröhliches Strichmännchen springt vor Freude', 378, 336],
  jumpArms: ['jump-arms.png', 'Strichmännchen springt mit erhobenen Armen', 118, 105],
  run: ['run.png', 'Strichmännchen tanzt und bewegt sich frei', 184, 194],
  miriam: ['miriam.png', 'Miriam Pimputkar, dipl. Masseurin und Polaritytherapeutin in Winterthur', 336, 448],
  praxis: ['praxis.jpg', 'Massagepraxis an der Münzgasse 2 in Winterthur mit Massageliege', 320, 242],
  gift: ['gutschein.png', 'Geschenkgutschein «Zeit für dich» von Miri’s Massage', 1549, 547],
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
const squiggle = c => `<svg viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 9 C 30 2, 50 13, 80 7 S 140 3, 198 8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`;
const arrowDown = c => `<svg viewBox="0 0 44 28" aria-hidden="true"><path d="M3 6 C 14 2, 26 20, 38 16 M30 8 L39 16 L29 22" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* =====================================================================
   SHARED CONTENT FRAGMENTS — semantic HTML only; each variant styles them
   ===================================================================== */
// One menu for every variant; each variant only restyles it.
const NAV = [
  ['angebot', 'Angebot'], ['polarity', 'Polarity'], ['preise', 'Preise'], ['ueber-mich', 'Über mich'],
  ['erfahrungen', 'Erfahrungen'], ['gutschein', 'Gutschein'], ['kontakt', 'Kontakt'],
];
// every section, for "next" buttons — includes sections not in the menu
const SECTIONS = Object.fromEntries([...NAV, ['willkommen', 'Start'], ['warum', 'Warum Massage?'], ['arbeit', 'Meine Arbeit'], ['fragen', 'Häufige Fragen']]);
const label = id => SECTIONS[id];
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
// Preview builds (the default) are hidden from search engines and show the variant switcher,
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
    image: [`${SITE}img/miriam.png`, `${SITE}img/praxis.jpg`, `${SITE}img/massage-hd.jpg`],
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
<meta property="og:image" content="${SITE}img/massage-hd.jpg">
<meta name="geo.region" content="CH-ZH">
<meta name="geo.placename" content="Winterthur">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link href="styles.css" rel="stylesheet">
${jsonLd.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
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
  if (e.target.closest('input, textarea, [contenteditable], summary')) return;
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

/* =====================================================================
   A — Notizheft
   ===================================================================== */
function A() {
  const next = id => `<a class="next" href="#${id}">weiter: ${label(id)} ${arrowDown('#945f06')}</a>`;
  return `<div class="vA">
  <header class="nb-top has-toggle">
    <a class="nb-brand" href="#willkommen">Miri's Massage</a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü"><span aria-hidden="true">☰</span><span class="tlabel"> Menü</span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList()}</nav>
    <a class="nb-book" href="${C.book}">Termin buchen</a>
  </header>
  <main class="sheet" id="inhalt">
    <span class="date">Winterthur ✎ ${C.hours.short} ${C.hours.time}</span>
    <section id="willkommen">
      <div class="row">
        <div class="margin-note">${img('jump', { cls: 'ink', deco: true, eager: true })}hallo!</div>
        <h1>${C.name}<span class="sub-h1">${C.tagline} – in Winterthur</span><span class="claim">${C.claim}</span></h1>
        <p class="welcome">${C.welcome}</p>
      </div>
      <p><b>${C.intro}</b></p>
      <blockquote class="motto">«${C.motto[0]}<br>${C.motto[1]}»</blockquote>
      <a class="cta" href="${C.book}">Termin buchen →</a>
      <p class="nb-hint">Deine erste Massage: <span class="hl">80 CHF</span> statt 110 CHF.</p>
      <p><b>Inhalt dieser Seite:</b></p>
      <ol class="toc">${[['warum', 'Warum Massage?'], ...NAV.slice(0, 4), ['arbeit', 'Meine Arbeit'], ...NAV.slice(4, 6), ['fragen', 'Häufige Fragen'], NAV[6]].map(([id, l], i) => `<li><a href="#${id}">${l}<span>${i + 2}</span></a></li>`).join('')}</ol>
    </section>

    <section id="warum">
      <h2>Warum Massage? ${squiggle('#945f06')}</h2>
      <div class="row">
        <div class="margin-note" style="top:0">${img('stressed', { cls: 'ink', style: 'width:60px' })}aua…</div>
        <p><b>${C.hook}</b></p>
      </div>
      ${C.why.map(p => `<p>${p}</p>`).join('')}
      <p>${C.relief}</p>
      ${next('angebot')}
    </section>

    <section id="angebot">
      <h2>Mein Angebot ${squiggle('#c46627')}</h2>
      <div class="row">
        ${img('massage', { cls: 'ink doodle-right', style: 'top:0;width:190px;right:-40px' })}
        <p>${C.offerIntro}</p>
      </div>
      <ul class="todo">${C.services.map(s => `<li id="${s.id}"><h3 class="svc-h"><span class="hl">${s.n}</span>${s.alt ? ` <span class="dur">(${s.alt})</span>` : ''}</h3>
        <span class="dur">${s.t}${s.p ? ` · <b class="pen">${s.p}</b>` : ''}</span><br>${s.d}${F.more(s, 'mehr lesen ↓')}</li>`).join('')}</ul>
      <h3 class="nb-h3">Ergänzende Behandlungen:</h3>
      <ul class="extra">${C.extras.map(e => `<li>${e}</li>`).join('')}</ul>
      <a class="cta" href="${C.book}">Termin buchen →</a><br>
      ${next('polarity')}
    </section>

    <section id="polarity">
      <h2>Polarity ${squiggle('#945f06')}</h2>
      <blockquote class="motto">«${C.polarity.quote}»<cite>– ${C.polarity.quoteBy}</cite></blockquote>
      ${C.polarity.intro.map(p => `<p>${p}</p>`).join('')}
      <p><b>Polarity …</b></p>
      ${F.facts()}
      <div class="nb-details">${F.topics()}</div>
      ${next('preise')}
    </section>

    <section id="preise">
      <h2>Preise ${squiggle('#c46627')}</h2>
      <p>${C.prices.intro}</p>
      ${F.priceRows()}
      ${F.polarityNote()}
      <h3 class="nb-h3">Zahlung und Konditionen</h3>
      ${F.terms()}
      <p><span class="circled">Sozial</span> ${C.prices.social} ${mail}</p>
      <p>${C.prices.cancel}</p>
      ${next('arbeit')}
    </section>

    <section id="arbeit">
      <h2>Was meine Arbeit ausmacht ${squiggle('#945f06')}</h2>
      ${C.values.map(v => `<p><span class="circled">${v.k}</span> ${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p>`).join('')}
      ${next('ueber-mich')}
    </section>

    <section id="ueber-mich">
      <h2>Über mich ${squiggle('#c46627')}</h2>
      <figure class="tape-photo">${img('miriam')}<figcaption>Miriam :)</figcaption></figure>
      <p><b>${C.aboutLead}</b></p>
      ${C.about.map(p => `<p>${p}</p>`).join('')}
      <div class="nb-details" style="clear:both">${F.training()}</div>
      <div class="row">
        <div class="margin-note">${img('run', { cls: 'ink' })}5 Rhythmen!</div>
        <p><b>${C.curious[0]}</b> ${C.curious[1]}</p>
      </div>
      ${next('erfahrungen')}
    </section>

    <section id="erfahrungen">
      <h2>Erfahrungsberichte ${squiggle('#945f06')}</h2>
      <p>${F.rating()}</p>
      ${C.quotes.map(q => `<blockquote>«${q.q}»<cite>– ${F.who(q)}</cite></blockquote>`).join('')}
      ${next('gutschein')}
    </section>

    <section id="gutschein">
      <h2>${C.gift.title} ${squiggle('#c46627')}</h2>
      ${F.gift()}
      <div class="nb-gift">${img('giftFront')}${img('giftBack')}</div>
      <a class="cta" href="${giftMail}">Gutschein bestellen ✉</a><br>
      ${next('fragen')}
    </section>

    <section id="fragen">
      <h2>Dein Termin & häufige Fragen ${squiggle('#945f06')}</h2>
      <p>${C.visit.room}</p>
      ${F.tips()}
      <div class="nb-details">${F.faq()}</div>
      ${next('kontakt')}
    </section>

    <section id="kontakt">
      <div class="two">
        <address style="font-style:normal">
          <h2 style="font-size:36px;margin-top:0">Praxis & Kontakt</h2>
          <p><b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}</p>
          <p>${F.hours()}<br>Zahlung: ${C.pay}<br>${mail}</p>
        </address>
        <a href="${C.maps}">${img('praxis', { style: 'border:8px solid #fff;transform:rotate(-2deg);box-shadow:0 6px 14px -6px rgba(0,0,0,.4)' })}</a>
      </div>
      <p><b>Meine Empfehlungen in Winterthur:</b></p>
      ${F.recs()}
      <div class="row" style="text-align:center"><a class="cta" href="${C.book}">${C.bye}</a></div>
      <a class="next" href="#willkommen">zurück nach oben ↑</a>
    </section>
  </main>
</div>`;
}

/* =====================================================================
   B — Comic-Strip
   ===================================================================== */
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
        <h1>Miri's <em>Massage</em><br>& Polarity<span class="sr"> – ${C.tagline} in Winterthur</span></h1>
        <span class="issue">${C.claim} · Winterthur · ${C.hours.short} ${C.hours.time}</span>
      </div>
      <div class="strip">
        <div class="panel"><span class="caption">Bist du körperlich angespannt?</span>
          <div class="bubble">Mein Nacken!!</div>${img('stressed', { cls: 'ink', eager: true })}</div>
        <div class="panel"><span class="caption">…dann komm vorbei.</span>
          ${img('massageHd', { cls: 'ink', style: 'max-height:240px;width:auto', eager: true })}</div>
        <div class="panel"><span class="caption">Danach:</span>
          <div class="bubble">Juhuu!</div>${img('jumpArms', { cls: 'ink', eager: true })}</div>
      </div>
      <p class="swipe-hint" aria-hidden="true">← wischen →</p>
      <div style="display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center" class="intro">
        <div>
          <p style="font-size:22px;margin:0 0 10px"><b>${C.tagline}.</b> ${C.intro}</p>
          <p style="margin:0">${C.welcome} ${C.hook}</p>
        </div>
        <a class="burst" href="${C.book}">Termin buchen!</a>
      </div>
      <div class="panel cb-motto"><span class="caption">Merksatz</span><p>«${C.motto[0]} ${C.motto[1]}»</p></div>
    </section>

    <section id="warum">
      <h2>Warum Massage?</h2>
      <div class="grid">${[...C.why, C.relief].map(p => `<div class="panel">${p}</div>`).join('')}</div>
      ${next('angebot')}
    </section>

    <section id="angebot">
      <h2>Mein Angebot</h2>
      <p style="margin-top:-8px">${C.offerIntro}</p>
      <div class="grid">${C.services.map(s => `<article class="panel svc" id="${s.id}"><h3>${s.n}</h3>${s.alt ? `<p class="alt">auch: ${s.alt}</p>` : ''}<p style="margin:0 0 10px">${s.d}</p>
        <span class="time">⏱ ${s.t}</span>${s.p ? ` <span class="price-badge">${s.p}</span>` : ''}${F.more(s, 'Mehr ▸')}</article>`).join('')}</div>
      <div class="extras"><h3 style="margin:0;font:700 20px Gaegu">+ Ergänzend:</h3><ul style="display:contents;list-style:none">${C.extras.map(e => `<li class="chip">${e}</li>`).join('')}</ul></div>
      ${next('polarity')}
    </section>

    <section id="polarity">
      <h2>Polarity</h2>
      <div class="cb-polarity">
        <div class="panel"><span class="caption">Dr. Randolph Stone sagt:</span><div class="bubble" style="margin-top:20px">«${C.polarity.quote}»</div>
          <p class="small-print">${C.polarity.quoteBy}</p>${C.polarity.intro.map(p => `<p>${p}</p>`).join('')}</div>
        <div class="panel"><span class="caption">Polarity …</span><div style="height:24px"></div>${F.facts()}</div>
      </div>
      <div class="cb-details">${F.topics()}</div>
      ${next('preise')}
    </section>

    <section id="preise">
      <h2>Preise</h2>
      <p style="margin-top:-8px">${C.prices.intro}</p>
      <div class="cb-prices">
        <div class="panel"><span class="caption">Preisliste</span><div style="height:22px"></div>${F.priceRows()}${F.polarityNote()}</div>
        <div class="panel"><span class="caption">Zahlung & Konditionen</span><div style="height:22px"></div>${F.terms()}<p>${C.prices.cancel}</p></div>
      </div>
      <div class="panel" style="margin-top:22px"><span class="caption">Soziales Entgegenkommen</span><p style="margin:26px 0 0">${C.prices.social} ${mail}</p></div>
      ${next('arbeit')}
    </section>

    <section id="arbeit">
      <h2>Was meine Arbeit ausmacht</h2>
      <div class="grid values">${C.values.map((v, i) => `<div class="panel"><span class="caption">#${i + 1}</span><h3 class="big" style="margin:0">${v.k}</h3>${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</div>`).join('')}</div>
      ${next('ueber-mich')}
    </section>

    <section id="ueber-mich">
      <h2>Über mich</h2>
      <div class="about">
        <figure class="panel photo" style="margin:0">${img('miriam')}<figcaption style="text-align:center;font:700 22px Gaegu;margin-top:6px">${C.person}</figcaption></figure>
        <div>
          <p style="margin-top:0;font-size:21px"><b>${C.aboutLead}</b></p>
          ${C.about.map(p => `<p>${p}</p>`).join('')}
          <div class="cb-details">${F.training()}</div>
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
      <p style="margin-top:-8px">${F.rating()}</p>
      <div class="quotes">${C.quotes.map((q, i) => `<figure class="quote" style="margin:0"><blockquote class="bubble" style="margin:0 0 14px">«${q.q}»</blockquote><figcaption class="who">${img(['jump', 'run', 'stretch', 'jumpArms', 'run'][i], { cls: 'ink', deco: true })}${F.who(q)}</figcaption></figure>`).join('')}</div>
      ${next('gutschein')}
    </section>

    <section id="gutschein">
      <h2>Gutschein</h2>
      <div class="cb-prices">
        <div class="panel gift"><span class="caption">${C.gift.title}</span><div style="height:22px"></div>${F.gift()}
          <a class="next" href="${giftMail}" style="margin:14px 0 0">Gutschein bestellen ✉</a></div>
        <div class="panel">${img('giftFront')}${img('giftBack', { style: 'margin-top:10px' })}</div>
      </div>
      ${next('fragen')}
    </section>

    <section id="fragen">
      <h2>Dein Termin & Fragen</h2>
      <div class="panel"><span class="caption">So läuft dein Termin</span><div style="height:22px"></div><p>${C.visit.room}</p>${F.tips()}</div>
      <div class="cb-details" style="margin-top:22px">${F.faq()}</div>
      ${next('kontakt')}
    </section>

    <section class="finale" id="kontakt">
      <address class="panel" style="font-style:normal"><h2 class="caption" style="margin:0;font:700 17px Gaegu">Kontakt: hier findest du mich</h2>
        <div style="height:22px"></div>
        <b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}<br><br>${F.hours()}<br>${mail}
        <a href="${C.maps}">${img('map', { style: 'border:2px solid #111;margin:12px 0' })}</a>
        Zahlung: ${C.pay}
      </address>
      <div class="panel"><h3 class="caption" style="margin:0;font:700 17px Gaegu">Meine Empfehlungen in Winterthur</h3><div style="height:22px"></div>${F.recs()}</div>
    </section>
    <p style="text-align:center;margin-top:48px"><a class="burst" href="${C.book}">${C.bye}</a></p>
    <a class="next" href="#willkommen" style="margin:20px auto 0">↑ Zurück zum Anfang</a>
  </main>
</div>`;
}

/* =====================================================================
   C — Pinnwand
   ===================================================================== */
function C_() {
  const col = c => `grid-column:${c};`;
  const tilts = ['-2deg', '1.5deg', '-1deg', '2.5deg', '-1.5deg'];
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
      <h1 class="title">${C.name}<span class="sr"> – ${C.tagline} in Winterthur</span></h1>
      <p class="sub">${C.tagline} · ${C.claim}</p>
      <p>${C.intro}</p>
      <p>${C.welcome} ${C.hook}</p>
      <a class="book" href="${C.book}">Termin buchen</a> &nbsp; ${next('angebot')}
    </section>
    <figure class="scrap polaroid tape" style="${col('8 / 11')}--r:4deg;--tr:6deg;margin:20px 0 0">
      ${img('miriam', { eager: true })}<figcaption>Miriam</figcaption>
    </figure>
    <div class="scrap sticky" style="${col('11 / 13')}--r:-4deg;margin-top:40px">
      <b style="font:700 24px Caveat">Praxistage</b><br>${C.hours.days}<br>${C.hours.time}<br><br><b style="font:700 22px Caveat">1. Massage: 80 CHF</b>
    </div>

    <blockquote class="scrap torn" style="${col('2 / 12')}--r:.8deg;text-align:center;font:400 30px/1.2 Caveat;margin:0">«${C.motto[0]}<br>${C.motto[1]}»</blockquote>

    <div style="${col('1 / -1')}" id="angebot"><h2 class="label">MEIN ANGEBOT</h2> <span style="font:400 22px Caveat;color:#3d2f1d">${C.offerIntro}</span></div>
    ${C.services.map((s, i) => `<article class="scrap card pin grid-paper" id="${s.id}" style="${col(i % 2 ? '7 / 13' : '1 / 7')}--r:${tilts[i]}">
      ${s.p ? `<span class="tag">${s.p}</span>` : ''}<h3 style="margin-top:14px">${s.n}</h3>${s.alt ? `<div class="time" style="color:#6a5d4c">auch: ${s.alt}</div>` : ''}<div class="time">${s.t}</div>
      <p style="font-size:17px;line-height:1.4;margin:6px 0 0">${s.d}</p>${F.more(s, 'mehr lesen ↓')}</article>`).join('')}

    <div class="scrap lined tape" style="${col('1 / 6')}--r:1deg">
      <h3 style="font:700 38px/1 Caveat;margin:0 0 12px">Ergänzend</h3><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul>
      ${next('polarity')}
    </div>
    <div class="scrap torn why" id="warum" style="${col('6 / 13')}--r:-.8deg">
      <div><h3 style="font:700 30px Caveat;margin:0 0 6px">Warum Massage?</h3>${[...C.why, C.relief].map(p => `<p style="margin:0 0 10px">${p}</p>`).join('')}</div>
      ${img('massageHd', { cls: 'ink' })}
    </div>

    <section class="scrap lined torn" id="polarity" style="${col('1 / 8')}--r:-.6deg">
      <h2>Polarity</h2>
      <p style="font:400 24px/1.3 Caveat;margin:0 0 10px">«${C.polarity.quote}» <span style="font-size:18px">– ${C.polarity.quoteBy}</span></p>
      ${C.polarity.intro.map(p => `<p style="margin:0 0 30px">${p}</p>`).join('')}
      ${F.facts()}
    </section>
    <div class="c-topics" style="${col('8 / 13')}">${C.polarity.topics.map((t, i) => `<details class="scrap sticky topic ${['', 'pink', 'green', '', 'pink', 'green'][i]}" style="--r:${tilts[i % 5]}"><summary><h3>${t.h}</h3></summary>${t.p.map(p => `<p>${p}</p>`).join('')}</details>`).join('')}</div>

    <section class="scrap receipt" id="preise" style="${col('1 / 6')}--r:1.2deg">
      <h2>Preise</h2>
      <p style="font-size:16px">${C.prices.intro}</p>
      ${F.priceRows()}${F.polarityNote()}
      <p class="cut">- - - - - - - - - - - - - - - -</p>
      ${F.terms()}
      <p style="font-size:16px">${C.prices.cancel}</p>
    </section>
    <div class="scrap tape" style="${col('6 / 13')}--r:-1deg">
      <h3 style="font:700 32px Caveat;margin:0 0 8px">Was meine Arbeit ausmacht</h3>
      <div class="values-c">${C.values.map(v => `<div id="${v.k === 'Achtsam' ? 'arbeit' : ''}"><h4 style="font:700 26px Caveat;margin:0">${v.k}</h4><p style="font-size:17px;margin:0 0 12px">${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p></div>`).join('')}</div>
      <p style="font-size:17px;margin:0">${C.prices.social}</p>
      ${next('ueber-mich')}
    </div>

    <section class="scrap lined torn" id="ueber-mich" style="${col('1 / 8')}--r:-1deg">
      <h2>Über mich</h2>
      <p style="margin:0 0 30px"><b>${C.aboutLead}</b></p>
      ${C.about.map(p => `<p style="margin:0 0 30px">${p}</p>`).join('')}
      ${F.training()}
      ${next('erfahrungen')}
    </section>
    <figure class="scrap polaroid pin" style="${col('8 / 13')}--r:3deg;margin:0">
      ${img('praxis')}<figcaption>meine Praxis, 4. Stock</figcaption>
    </figure>

    <div style="${col('1 / -1')}" id="erfahrungen"><h2 class="label">ERFAHRUNGSBERICHTE</h2> &nbsp; ${F.rating()}</div>
    ${C.quotes.map((q, i) => `<blockquote class="scrap sticky ${['', 'pink', 'green', 'pink', ''][i]}" style="${col(['1 / 5', '5 / 9', '9 / 13', '1 / 7', '7 / 13'][i])}--r:${tilts[i]};margin:0">«${q.q}»<cite>${F.who(q)}</cite></blockquote>`).join('')}

    <section class="scrap tape" id="gutschein" style="${col('1 / 8')}--r:1.5deg;padding:30px 20px 20px">
      <h2>${C.gift.title}</h2>
      <div class="c-gift">${img('giftFront')}${img('giftBack')}</div>
      ${F.gift()}
      <a class="book" href="${giftMail}" style="font-size:24px">Gutschein bestellen</a>
    </section>
    <section class="scrap grid-paper torn" id="fragen" style="${col('8 / 13')}--r:-1deg">
      <h2 style="font-size:32px">Dein Termin</h2>
      ${F.tips()}
      <h3 style="font:700 28px Caveat;margin:14px 0 4px">Häufige Fragen</h3>
      ${F.faq('h4')}
    </section>

    <figure class="scrap polaroid pin" style="${col('1 / 5')}--r:-2.5deg;margin:0">
      <a href="${C.maps}">${img('map')}</a><figcaption>${C.address[0]}, Winterthur</figcaption>
    </figure>
    <address class="scrap grid-paper torn" id="kontakt" style="${col('5 / 9')}--r:2deg;font-style:normal">
      <h2 style="font-size:32px">Kontakt</h2>
      <b>${C.person}</b><br>${C.address.join('<br>')}<br>${mail}<br><br>${F.hours()}<br>Zahlung: ${C.pay}
    </address>
    <div class="scrap lined" style="${col('9 / 13')}--r:-1.5deg">
      <h3 style="font:700 26px Caveat;margin:0">Meine Empfehlungen in Winterthur</h3>${F.recs()}
    </div>

    <div class="scrap torn tape" style="${col('3 / 11')}--r:-1deg;text-align:center;padding:40px">
      ${img('jumpArms', { cls: 'ink', deco: true, style: 'width:110px;margin:0 auto' })}
      <h2 style="font-size:48px">${C.curious[0]}</h2><p style="margin:0">${C.curious[1]}</p>
      <a class="book" href="${C.book}">${C.bye}</a><br>
      <a class="next" href="#willkommen">↑ nach oben</a>
    </div>
  </main>
</div>`;
}

/* =====================================================================
   D — Skizzenbuch
   ===================================================================== */
function D() {
  const h = s => `<h3 style="font:700 28px Caveat;display:inline;margin:0">${s}.</h3>`;
  const svc = s => `<li id="${s.id}"><span><h3 style="font:inherit;margin:0;display:inline">${s.n}</h3>${s.alt ? ` <span class="small">(${s.alt})</span>` : ''}<br><span class="small">${s.d}</span>${F.more(s, 'mehr lesen')}</span><span>${s.t}${s.p ? `<br>${s.p}` : ''}</span></li>`;
  const spreads = [
    { id: 'willkommen', tab: 'Hallo', c: '#fcd57a',
      L: `<h1>Miri's Massage<br>& Polarity<span class="sr"> – ${C.tagline} in Winterthur</span></h1><p class="lead">${C.tagline}</p><p class="small">${C.claim}</p><p>${C.intro}</p><p class="small">${F.hours()} · Erste Massage 80 CHF</p><a class="go" href="${C.book}">Termin buchen →</a>`,
      R: `<div class="art">${img('massageHd', { cls: 'ink boil', eager: true, style: 'max-height:220px;width:auto' })}</div>
          <nav aria-label="Inhaltsverzeichnis" style="align-self:center"><b style="font:700 26px Caveat">Inhalt</b>
          <ol class="contents">${[['warum', 'Warum Massage?'], ['angebot', 'Angebot'], ['polarity', 'Polarity'], ['preise', 'Preise'], ['arbeit', 'Meine Arbeit'], ['ueber-mich', 'Über mich'], ['erfahrungen', 'Erfahrungen'], ['gutschein', 'Gutschein'], ['fragen', 'Fragen'], ['kontakt', 'Kontakt']].map(([id, l], i) => `<li><a href="#${id}">${l}<span>${i * 2 + 3}</span></a></li>`).join('')}</ol></nav>` },
    { id: 'warum', tab: 'Warum', c: '#f8cfb0',
      L: `<p class="lead">${C.welcome}</p><p>${C.hook}</p><div class="art">${img('stressed', { cls: 'ink boil', style: 'max-height:220px;width:auto' })}</div><p class="small" style="text-align:center">vorher</p>`,
      R: `<h2>Warum Massage?</h2>${C.why.map(p => `<p>${p}</p>`).join('')}<p>${C.relief}</p><div style="display:flex;align-items:center;gap:12px">${img('stretch', { cls: 'ink boil', style: 'width:60px' })}<span class="small">nachher</span></div>` },
    { id: 'angebot', tab: 'Angebot', c: '#fde1a1',
      L: `<h2>Mein Angebot</h2><p class="small">${C.offerIntro}</p><ul class="pencil-list">${C.services.slice(0, 2).map(svc).join('')}</ul>`,
      R: `<ul class="pencil-list">${C.services.slice(2).map(svc).join('')}</ul><h3 style="font:700 34px Caveat;margin:18px 0 6px">Ergänzend</h3><ul class="pencil-list">${C.extras.map(e => `<li><span>${e}</span><span>+</span></li>`).join('')}</ul><a class="go" href="${C.book}">Termin buchen →</a>` },
    { id: 'polarity', tab: 'Polarity', c: '#f6c48a',
      L: `<h2>Polarity</h2><p class="lead">«${C.polarity.quote}»</p><p class="small">– ${C.polarity.quoteBy}</p>${C.polarity.intro.map(p => `<p>${p}</p>`).join('')}`,
      R: `<p><b>Polarity …</b></p>${F.facts()}<div class="d-details">${F.topics()}</div>` },
    { id: 'preise', tab: 'Preise', c: '#fbe9c9',
      L: `<h2>Preise</h2><p>${C.prices.intro}</p>${F.priceRows()}${F.polarityNote()}`,
      R: `<h3 style="font:700 34px Caveat;margin:0 0 8px">Zahlung & Konditionen</h3>${F.terms()}<p class="small">${C.prices.cancel}</p><p>${C.prices.social} ${mail}</p>` },
    { id: 'arbeit', tab: 'Meine Arbeit', c: '#f3e3c3',
      L: `<h2>Was meine Arbeit ausmacht</h2>${C.values.slice(0, 2).map(v => `<p>${h(v.k)} ${v.v}</p>`).join('')}`,
      R: `${C.values.slice(2).map(v => `<p>${h(v.k)} ${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p>`).join('')}${img('run', { cls: 'ink boil', style: 'width:120px;align-self:flex-end' })}` },
    { id: 'ueber-mich', tab: 'Über mich', c: '#f8cfb0',
      L: `<div class="art">${img('miriam', { cls: 'photo-sketch' })}</div><p class="lead" style="margin-top:18px">${C.aboutLead}</p>`,
      R: `<h2>Über mich</h2>${C.about.map(p => `<p>${p}</p>`).join('')}<div class="d-details">${F.training()}</div>` },
    { id: 'erfahrungen', tab: 'Erfahrungen', c: '#fcd57a',
      L: `<h2>Erfahrungsberichte</h2><p>${F.rating()}</p>${C.quotes.slice(0, 2).map(q => `<blockquote>«${q.q}»<cite>${F.who(q)}</cite></blockquote>`).join('')}`,
      R: `${C.quotes.slice(2).map(q => `<blockquote>«${q.q}»<cite>${F.who(q)}</cite></blockquote>`).join('')}` },
    { id: 'gutschein', tab: 'Gutschein', c: '#fde1a1',
      L: `<h2>${C.gift.title}</h2><div class="d-gift">${img('giftFront')}${img('giftBack')}</div>`,
      R: `${F.gift()}<a class="go" href="${giftMail}">Gutschein bestellen →</a>` },
    { id: 'fragen', tab: 'Fragen', c: '#f3e3c3',
      L: `<h2>Dein Termin</h2><p>${C.visit.room}</p>${F.tips()}`,
      R: `<h2 style="font-size:40px">Häufige Fragen</h2><div class="d-details">${F.faq()}</div>` },
    { id: 'kontakt', tab: 'Kontakt', c: '#f6c48a',
      L: `<h2>Kontakt</h2><address style="font-style:normal"><p><b>Massage & Polarity</b><br>${C.person}<br>${C.address.join('<br>')}</p><p class="small">${F.hours()}<br>Zahlung: ${C.pay}<br>${mail}</p></address><a href="${C.maps}">${img('map', { style: 'filter:grayscale(1);max-height:170px;width:auto' })}</a>`,
      R: `<h2>Bis bald!</h2><p>${C.bye}</p><p class="small">Meine Empfehlungen in Winterthur:</p>${F.recs()}<a class="go" href="${C.book}">Termin buchen →</a>` },
  ];
  const n = spreads.length;
  return `<div class="vD">
  <header class="booktop"><a href="#willkommen">Miri's Massage & Polarity</a><a class="bt-book" href="${C.book}">Termin buchen</a></header>
  <main class="book" id="inhalt">
    <nav class="tabs" aria-label="Hauptmenü"><ul class="tablist" style="display:contents">${spreads.map(s => `<li style="display:contents"><a style="--c:${s.c}" href="#${s.id}">${s.tab}</a></li>`).join('')}<li style="display:contents"><a class="tab-book" href="${C.book}">Termin buchen</a></li></ul></nav>
    ${spreads.map((s, i) => `<section class="spread" id="${s.id}"><div class="pg">${s.L}<span class="num">${i * 2 + 1}</span></div><div class="pg">${s.R}<span class="num">${i * 2 + 2}</span></div></section>`).join('')}
    <nav class="pager" aria-label="Blättern"><a href="#${spreads[n - 1].id}" data-d="-1">‹ zurück</a><a href="#${spreads[1].id}" data-d="1">weiter ›</a></nav>
  </main>
</div>`;
}
// D flips one spread at a time on desktop; hash links keep every chapter addressable.
const D_SCRIPT = `
(() => {
  const spreads = [...document.querySelectorAll('.vD .spread')], tabs = [...document.querySelectorAll('.vD .tabs a:not(.tab-book)')];
  const pager = [...document.querySelectorAll('.vD .pager a')];
  const desktop = matchMedia('(min-width: 861px)');
  const show = id => {
    const el = id ? document.getElementById(id) : null;
    const i = el ? Math.max(0, spreads.findIndex(s => s.contains(el))) : 0;
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

/* =====================================================================
   E — Standard website, sketches as section illustrations
   ===================================================================== */
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
        ${img('massageHd', { cls: 'sketch' })}
        <h2>Mein Angebot</h2>
        <p class="lead">${C.offerIntro}</p>
      </div>
      <div class="cards">${C.services.map(s => `<article class="card" id="${s.id}"><div class="card-top"><span class="dur">${s.t}</span>${s.p ? `<span class="price">${s.p}</span>` : ''}</div><h3>${s.n}</h3>${s.alt ? `<p class="alt">${s.alt}</p>` : ''}<p>${s.d}</p>${F.more(s)}<a href="${C.book}">${s.n} buchen →</a></article>`).join('')}</div>
      <div class="extras"><h3>Ergänzende Behandlungen</h3><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul></div>
      <p class="center" style="margin-top:28px;color:var(--muted)">${C.relief}</p>
    </div></section>

    <section class="alt" id="polarity"><div class="container twocol">
      <div>
        ${img('jumpArms', { cls: 'sketch', deco: true })}
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
  </div></footer>
</div>`;
}

/* =====================================================================
   WRITE
   ===================================================================== */
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
  img { width: 120px; height: auto; mix-blend-mode: multiply; }
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
