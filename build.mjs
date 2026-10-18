// Renders the Miriam Pimputkar – Massage & Polarity one-page site to static HTML (index.html),
// so every word is in the HTML source for Google and AI crawlers.
// Run: node build.mjs            preview build (noindex) — what GitHub Pages serves
//      LAUNCH=1 node build.mjs   launch build (indexable)
import { writeFileSync, mkdirSync } from 'node:fs';

/* =====================================================================
   CONTENT
   Sources: the Acuity booking page (mirismassage.as.me) and the draft Webador
   site (temp-hllkqxtelkpliqksexao.webadorsite.com). Webador text is switched
   from "Sie" to "du" to match the rest, and obvious typos are fixed.
   ===================================================================== */
const C = {
  name: 'Miriam Pimputkar – Massage & Polarity',
  formerNames: ["Miri's Massage & Polarity", "Miri's Klassische Massage"],   // older names (booking page, Google Maps) stay findable
  person: 'Miriam Pimputkar',
  book: 'https://mirismassage.as.me/',
  email: 'mirismassage@gmail.com',
  address: ['Münzgasse 2', '4. Stock, Lift vorhanden', '8400 Winterthur'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Miri%27s+Klassische+Massage+M%C3%BCnzgasse+2+8400+Winterthur',
  directions: 'Wenige Gehminuten vom Hauptbahnhof Winterthur',
  hours: { days: 'Mittwoch und Freitag', short: 'Mi & Fr', time: '10–20 Uhr' },
  rating: { score: '5,0', count: 22 },
  // Acuity appointment types (owner 28010488) — ids, durations and prices as configured in Acuity
  acuityOwner: '28010488',
  booking: {
    // svc = the treatment card(s) on /angebot/ a type belongs to (filters the picker); was = the regular price it replaces
    first: [
      { id: '39957629', n: 'Kennenlernmassage – klassisch oder ganzheitlich', t: '60 min', p: '80 CHF', was: '100 / 110 CHF', svc: ['klassisch', 'ganzheitlich'], art: 'kontakt' },
      { id: '92472809', n: 'Kennenlernen: Hawaiianische Ganzkörpermassage', t: '90 min', p: '140 CHF', was: '180 CHF', svc: ['hawaiianisch'], art: 'hawaii' },
      { id: '78873137', n: 'Kennenlernen: Polaritybehandlung', t: '90 min', p: 'Preis nach deinem Ermessen', svc: ['polarity-behandlung'], art: 'gespraech' },
    ],
    regular: [
      { id: '39957699', n: 'Klassische Massage', t: '30 min', p: '50 CHF', svc: ['klassisch'], art: 'stressed' },
      { id: '39957683', n: 'Klassische Massage', t: '60 min', p: '100 CHF', svc: ['klassisch'], art: 'massage' },
      { id: '79868943', n: 'Ganzheitliche Massage', t: '60 min', p: '110 CHF', svc: ['ganzheitlich'], art: 'fuesse' },
      { id: '92469297', n: 'Hawaiianische Ganzkörpermassage', t: '90 min', p: '180 CHF', svc: ['hawaiianisch'], art: 'hawaii' },
      { id: '86048501', n: 'Polaritybehandlung', t: '60 min', p: '88 CHF (Ausbildungstarif)', svc: ['polarity-behandlung'], art: 'gespraech' },
    ],
  },

  // booking picker: 4 treatments, in the order of the cards on /angebot/; "Erstes Mal hier?" selects the first-visit (Kennenlern) type or the regular ones
  pick: [
    { svc: 'klassisch', n: 'Klassische Massage', art: 'massage', d: 'Löst gezielt Verspannungen in Rücken, Nacken und Beinen.', first: ['39957629'], was: '100 CHF', regular: ['39957699', '39957683'] },
    { svc: 'ganzheitlich', n: 'Ganzheitliche Massage', art: 'fuesse', d: 'Massage ergänzt mit sanften Polarity-Griffen und Reflexzonen.', first: ['39957629'], was: '110 CHF', regular: ['79868943'] },
    { svc: 'polarity-behandlung', n: 'Polarity&shy;behandlung', art: 'gespraech', d: 'Körperarbeit und begleitendes Gespräch, am bekleideten Körper.', first: ['78873137'], regular: ['86048501'] },
    { svc: 'hawaiianisch', n: 'Hawaiianische Ganzkörper&shy;massage', art: 'hawaii', d: 'Lomi Lomi: fliessende Unterarmstriche mit warmem Öl.', first: ['92472809'], regular: ['92469297'] },
  ],
  tagline: 'Massage & Polarity für Körper und Geist',
  claim: 'Achtsame Körperarbeit und Prozessbegleitung',
  // the start page's first sentence: what happens and what it costs (facts from below)
  heroLead: 'Achtsame Massagen und Polarity an der Münzgasse 2. Dein erster Besuch: Kennenlernmassage mit Vorgespräch, 80&nbsp;CHF.',
  intro: 'Finde zurück in dein natürliches Gleichgewicht. In meiner Praxis in Winterthur begleite ich dich mit achtsamer Berührung, gezielten Massagen und stärkender Energiearbeit zu mehr Entspannung und Vitalität.',
  motto: ['Der Körper weiss, was der nächste Schritt ist.', 'Der Verstand ist oft mehrere Schritte zu weit.'],
  welcome: 'Herzlich Willkommen! Schön, dass du hier bist!',
  hook: 'Bist du körperlich angespannt? Schränkt dich dein Körper im Alltag ein? Hast du Muskelschmerzen? Oder möchtest du dich einfach mal genüsslich entspannen und dir so etwas Gutes tun? Dann bist du bei mir genau richtig.',
  why: [
    'Mit der Massage wird durch manuellen Druck und Zug auf deine Muskeln die Durchblutung gefördert. Dein Stoffwechsel wird angeregt. Deine Muskeln entspannen sich und schmerzhafte Verhärtungen lösen sich auf.',
    'Die Massage hilft dir, Stress abzubauen. Oft lassen dabei nicht nur körperliche Beschwerden wie Verspannungskopfschmerzen nach, auch innerlich wirst du ruhiger. Ein ganzheitliches Wohlbefinden entsteht.',
  ],
  relief: 'Sitzende Tätigkeiten, Stress und einseitige Belastungen hinterlassen Spuren in der Muskulatur. In meiner Praxis in Winterthur verbinde ich anatomisches Feingefühl mit hochwertigen Ölen, um Verhärtungen sanft zu lösen und dein Wohlbefinden wiederherzustellen.',

  offerLead: 'Als Dipl. Klassische Masseurin und Polaritytherapeutin in Ausbildung biete ich dir vier Behandlungen an – beim ersten Besuch zum Kennenlernpreis.',
  offerIntro: 'Ob gezielte Linderung körperlicher Verspannungen oder energetische Harmonisierung: Ich begleite dich mit fundierter Erfahrung und achtsamen Behandlungsmethoden. Als Dipl. Klassische Masseurin und Polaritytherapeutin in Ausbildung biete ich dir folgendes an:',
  services: [
    { id: 'klassisch', n: 'Klassische Massage', alt: 'Klassische Ölmassage', t: '30 / 60 min', p: '50 / 100 CHF', first: 'Erstes Mal? Kennenlernmassage 80 statt 100 CHF',
      d: 'Löst gezielt muskuläre Verspannungen, regt die Durchblutung an und fördert die spürbare Regeneration von Körper und Muskulatur nach körperlicher Belastung oder stressigen Tagen.',
      more: [
        '<b>Klassisch fokussiert (30 min):</b> Ideal für die gezielte Behandlung akuter Verspannungen im Nacken-, Schulter- oder Lendenbereich. Schnelle Entlastung für zwischendurch.',
        '<b>Klassische Massage (60 min):</b> Ausführliche Bearbeitung von Rücken, Nacken und Beinen. Löst tiefsitzende Muskelverspannungen nachhaltig und fördert die Durchblutung.',
      ] },
    { id: 'ganzheitlich', n: 'Ganzheitliche Massage', t: '60 min', p: '110 CHF', first: 'Erstes Mal? Kennenlernmassage 80 statt 110 CHF',
      d: 'Verbindet wirkungsvolle manuelle Techniken mit feinfühliger Körperwahrnehmung. Eine tiefgreifende Auszeit, die das gesamte Nervensystem beruhigt und neue Kraft schenkt.',
      more: ['Die Klassische Massage wird individuell ergänzt mit der Polaritymethode. Dies beinhaltet sanfte, craniosacrale Berührungen, sanfte Schaukelbewegungen, welche das Gewebe lockern, bis tiefere, kräftigere Drucktechniken, osteopathische Griffe, Dehnungen, Mobilisierung der Gelenke und Arbeit mit Reflexzonen, um Blockaden im Körper zu lösen und so die Gesundheit zu unterstützen.'] },
    { id: 'polarity-behandlung', n: 'Polarity&shy;behandlung', t: '60 min · erste 90 min', p: '88 CHF / Std.', first: 'Erstes Mal? Du bestimmst den Preis selbst',
      d: 'Unterstützt den freien Fluss der Lebensenergie durch sanfte Berührungen, Energiearbeit und gezielte Impulse. Kann bei innerer Unruhe helfen und möchte deine natürlichen Selbstheilungskräfte anregen.',
      more: ['Die erste Polaritybehandlung beinhaltet ein ausführliches Vorgespräch, bei Bedarf eine Haltungsanalyse sowie eine manuelle Behandlung auf der Liege.'] },
    { id: 'hawaiianisch', n: 'Hawaiianische Ganzkörper&shy;massage', alt: 'Lomi Lomi', t: '90 min', p: '180 CHF', first: 'Erstes Mal? 140 statt 180 CHF',
      d: 'Ganzheitliches Wellness-Erlebnis mit fliessenden Unterarmstrichen und viel warmem Öl. Bringt Körper, Geist und Nervensystem in tiefe Harmonie.',
      more: [
        'Tauche ein in eine tief entspannende Körperreise, bei welcher du von Kopf bis Fuss, vorne und hinten massiert wirst. Die fliessenden, langen Streichungen nebst sanften Dehnungen und Lockerung von Gelenken erinnern an die Wellen des Ozeans und machen diese Massage einzigartig.',
        'In einem kurzen Vorgespräch kläre ich mit dir ab, was bei deinem Körper zu beachten ist und ob Berührung/Massage im Gesicht und/oder Bauch erwünscht ist. Am Schluss gebe ich dir 2–3 Minuten Zeit, um die Massage nachwirken zu lassen.',
      ] },
  ],
  difference: 'Klassisch oder ganzheitlich? Die Klassische Massage löst gezielt Verspannungen in Rücken, Nacken und Beinen. Die Ganzheitliche Massage ergänzt sie mit sanften Polarity-Griffen, Dehnungen und Arbeit mit Reflexzonen – für Körper und Nervensystem.',
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
      'Möchte die Selbstheilungskräfte anregen und die körpereigene Abwehr stärken.',
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
        'In der Polarity-Lehre gelten ungünstige Ess- und Lebensgewohnheiten als Nährboden für Beschwerden und Krankheiten.',
        'Mit der Ernährung beeinflussen wir in direkter Weise unser Befinden. Die Polarity-Ernährung hat zum Ziel, das Ernährungsbewusstsein zu fördern, indem Zusammenhänge zwischen Verhalten, Befinden und Essgewohnheiten ergründet werden. Das Ziel ist somit eine Ernährungsweise zu finden, die den Gesundheitsprozess unterstützt.'] },
      { h: 'Polarity Reinigung', p: [
        'Die Polarity Reinigung ist eine Ernährungskur, die Leber, Nieren, die Verdauungsorgane, die Haut und das Bindegewebe entlasten soll. Ihr Ziel sind ganzheitliches Wohlbefinden und innere Ruhe.',
        'Die Reinigung im Rahmen einer Ernährungsdiät kann als Kur fern vom Alltag oder auch zuhause durchgeführt werden.'] },
      { h: 'Haltung der Therapeutin', p: ['Achtsamkeit, Empathie und Respekt sind die Basis, um eine wohlwollende und sichere Umgebung im Therapieraum zu schaffen.'] },
    ],
  },

  prices: {
    intro: 'Transparente Konditionen für deine Auszeit und Regeneration in Winterthur. Deine erste Massage kostet 80 CHF statt 100 oder 110 CHF.',
    polarityNote: 'Polarity: 88 CHF / Std. ist mein Tarif im letzten Ausbildungsjahr. Er wird an meinen Ausbildungsstand angepasst: mit Diplom 110 CHF / Std., mit Krankenkassenanerkennung 132 CHF / Std.',
    terms: [
      ['Zahlungsarten vor Ort', 'TWINT, bar oder Karte'],
      ['Geschenkgutscheine', 'GUTSCHEIN_LINK'],
      ['Krankenkasse', 'Derzeit noch Selbstzahler (ich bin noch in Ausbildung)'],
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
    kinds: ['Ganzheitliche Massage', 'Klassische Massage', 'Hawaiianische Ganzkörpermassage', 'Polaritybehandlung', 'Massage nach Wahl', 'Behandlung nach Wahl'],
    versions: ['als Faltkarte per Post (A6)', 'digital zum Verschicken', 'digital zum selber Ausdrucken (A6 oder A5)'],
    note: 'Schreib mir per E-Mail, welche Behandlung und welche Version du möchtest – bei Postversand mit Adresse.',
  },
  // Acuity shows Miri's long business description above every calendar; drop this line once it is cut to one sentence in Acuity
  calHint: 'Im Kalender steht zuerst ein Begrüssungstext – die freien Termine folgen gleich darunter.',
  afterBooking: 'Nach der Buchung erhältst du eine Bestätigung per E-Mail. Bezahlt wird vor Ort mit TWINT, bar oder Karte.',
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
  ['Was kostet eine Massage in Winterthur bei Miriam Pimputkar?', `Eine Klassische Massage kostet 50 CHF (30 min) oder 100 CHF (60 min), eine Ganzheitliche Massage 110 CHF, eine Hawaiianische Ganzkörpermassage 180 CHF (90 min) und eine Polaritybehandlung 88 CHF pro Stunde. Deine erste Massage bekommst du als Kennenlernmassage für 80 CHF, die erste Hawaiianische Ganzkörpermassage für 140 CHF; bei der ersten Polaritybehandlung entscheidest du selbst, wie viel sie dir wert ist.`],
  ['Wann ist die Praxis geöffnet?', `Praxistage sind ${C.hours.days}, jeweils ${C.hours.time}. Termine buchst du bequem online.`],
  ['Wo befindet sich die Praxis?', `An der Münzgasse 2 in 8400 Winterthur, wenige Gehminuten vom Hauptbahnhof. Die Praxis ist im 4. Stock, ein Lift ist vorhanden.`],
  ['Wie kann ich bezahlen?', `Vor Ort mit ${C.pay}.`],
  ['Übernimmt die Krankenkasse die Kosten?', `Polarity wird von den meisten Krankenkassen als Komplementärtherapie anerkannt. Da ich mich noch in Ausbildung befinde, sind meine Behandlungen derzeit noch selbst zu bezahlen.`],
  ['Wie buche ich einen Termin?', `Direkt hier auf der Seite unter «Termin online buchen»: Behandlung wählen, freien Termin aussuchen, fertig. Du siehst alle freien Termine in Echtzeit.`],
  ['Wann wähle ich bei der Kennenlernmassage klassisch oder ganzheitlich?', `Ganz einfach beim Termin: Im Vorgespräch schauen wir zusammen, was dir gerade guttut, und entscheiden dann gemeinsam.`],
  ['Kann ich einen Termin absagen?', `Ja. Eine Absage mindestens 24 Stunden vorher ist kostenfrei. Bitte melde dich schriftlich ab, sonst wird der Termin verrechnet.`],
  // TODO Miri: confirm this answer (drafted from the Vorgespräch and Polarity texts)
  ['Was ziehe ich für die Massage aus?', `Das besprechen wir vor der Behandlung, und du entscheidest selbst, was für dich stimmt. Im Vorgespräch klären wir auch, wo du berührt werden möchtest und wo nicht. Polarity findet am bekleideten Körper statt.`],
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
  // drawn with the Miri model in tools/sketches.mjs
  gespraech: ['sketches/gespraech.svg', 'Miri im begleitenden Gespräch mit einer Klientin, beide sitzen auf Stühlen', 640, 400],
  fuesse: ['sketches/fuesse.svg', 'Miri massiert die Füsse einer liegenden Person (Reflexzonen)', 640, 400],
  hawaii: ['sketches/hawaii.svg', 'Miri gibt eine hawaiianische Ganzkörpermassage mit langen, fliessenden Streichungen', 640, 400],
  yoga: ['sketches/yoga.svg', 'Miri macht Yoga in der Baumhaltung', 360, 420],
  geschenk: ['sketches/gutschein.svg', 'Miri hält ein Geschenk – einen Gutschein für eine Massage', 360, 420],
  termin: ['sketches/termin.svg', 'Miri zeigt auf einen Kalender mit einem eingetragenen Termin', 460, 420],
  kontakt: ['sketches/kontakt.svg', 'Miri winkt und hält einen Brief in der Hand', 360, 420],
  besuch: ['sketches/besuch.svg', 'Dein erster Besuch: Miri begrüsst eine Klientin an der Tür ihrer Praxis, die Massageliege steht bereit', 640, 400],
  angebot: ['sketches/angebot.svg', 'Miri steht neben der Massageliege, hält eine Flasche Massageöl und lädt dich ein, dich hinzulegen', 640, 400],
  polarity: ['sketches/polarity.svg', 'Polarity: eine Klientin sitzt entspannt auf einem Hocker, Miri steht hinter ihr und legt ihr die Hände auf den Kopf', 480, 420],
  fragen: ['sketches/fragen.svg', 'Miri überlegt und kratzt sich am Kopf, umgeben von Fragezeichen', 360, 420],
  miriam: ['miriam.jpg', 'Miriam Pimputkar, dipl. Masseurin und Polaritytherapeutin in Winterthur', 336, 448],
  praxis: ['praxis.jpg', 'Massagepraxis an der Münzgasse 2 in Winterthur mit Massageliege', 320, 242],
  giftFront: ['gutschein-vorne.jpg', 'Geschenkgutschein «Zeit für dich», Vorderseite mit Massage-Zeichnung', 900, 639],
  giftBack: ['gutschein-hinten.jpg', 'Geschenkgutschein, Rückseite mit Platz für Namen und Wert', 900, 639],
  anfahrt: ['sketches/anfahrt.svg', 'Skizze der Anfahrt: vom Hauptbahnhof Winterthur sind es wenige Gehminuten bis zur Münzgasse 2, Miri winkt aus dem Fenster im 4. Stock', 640, 400],
};
// path prefix of the page being rendered ('' for the home page, '../' for /angebot/ etc.)
let P = '';
const img = (k, o = {}) => {
  const [f, alt, w, h] = IMG[k];
  return `<img src="${P}img/${f}" alt="${o.deco ? '' : alt}" width="${w}" height="${h}" loading="${o.eager ? 'eager' : 'lazy'}"${o.cls ? ` class="${o.cls}"` : ''}${o.style ? ` style="${o.style}"` : ''}>`;
};
const mail = `<a href="mailto:${C.email}">${C.email}</a>`;
const acuity = (id, embed = false) => `https://app.acuityscheduling.com/schedule.php?owner=${C.acuityOwner}${id ? `&appointmentType=${id}` : ''}${embed ? '&ref=embedded_csp' : ''}`;
const ALL_TYPES = [...C.booking.first, ...C.booking.regular];
const typeLabel = id => { const t = ALL_TYPES.find(x => x.id === id); return `${t.n} · ${t.t} · ${t.p}`; };
// on the booking page: opens Acuity directly without JS, or the embedded calendar for that type with JS
const pickLink = (id, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${acuity(id)}" data-type="${id}" data-label="${typeLabel(id)}">${text}</a>`;
// anywhere else: goes to the booking page with that treatment's calendar already open
const bookLink = (id, text, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${url('buchen')}?typ=${id}">${text}</a>`;
const giftMail = `mailto:${C.email}?subject=${encodeURIComponent('Gutscheinbestellung')}&body=${encodeURIComponent('Hallo Miriam\n\nIch möchte gerne einen Gutschein bestellen:\n\nBehandlung: \nVersion (Post / digital verschicken / selber ausdrucken A6 oder A5): \nName: \nAdresse (bei Postversand): \n\nLiebe Grüsse')}`;

/* =====================================================================
   CONTENT FRAGMENTS
   ===================================================================== */
// page slugs double as URLs: /angebot/, /polarity/ … ('' = home)
const NAV = [
  ['angebot', 'Angebot & Preise'], ['polarity', 'Polarity'], ['ueber-mich', 'Über mich'], ['#kontakt', 'Kontakt'],
];
const url = slug => slug.startsWith('#') ? (P || './') + slug : P + (slug ? slug + '/' : '') || './';
const navList = cur => `<ul class="navlist" id="menu"><li class="nav-start"><a href="${url('')}"${cur === '' ? ' aria-current="page"' : ''}>Start</a></li>${NAV.map(([slug, l]) => `<li><a href="${url(slug)}"${slug === cur ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul>`;
const SERVICE_ART = { klassisch: 'massage', ganzheitlich: 'fuesse', 'polarity-behandlung': 'gespraech', hawaiianisch: 'hawaii' };
const F = {
  // expandable details for a service: real text, collapsed so phones aren't flooded
  more: (s, summary = 'Details') => `<details class="more"><summary>${summary}</summary>${s.more.map(p => `<p>${p}</p>`).join('')}</details>`,
  // one price list, built from the same booking types as the picker; every row links to its calendar
  polarityNote: () => `<p class="note">${C.prices.polarityNote}</p>`,
  terms: () => `<dl class="prices terms">${C.prices.terms.map(([k, v]) => `<div><dt>${k}</dt><dd>${v === 'GUTSCHEIN_LINK' ? `<a href="${url('angebot')}#gutschein">Gutschein bestellen</a>` : v}</dd></div>`).join('')}</dl>`,
  // five drawn stars (an authored icon instead of a ★ glyph)
  stars: () => `<span class="stars" aria-hidden="true">${'<svg viewBox="0 0 20 20"><path d="M10 1.8l2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7z"/></svg>'.repeat(5)}</span>`,
  facts: () => `<ul class="facts-list">${C.polarity.facts.map(f => `<li>${f}</li>`).join('')}</ul>`,
  topics: (h = 'h3') => C.polarity.topics.map(t => `<details class="topic"><summary><${h}>${t.h}</${h}></summary>${t.p.map(p => `<p>${p}</p>`).join('')}</details>`).join(''),
  training: (h = 'h3') => C.training.map(t => `<details class="training"><summary><${h}>${t.h}</${h}></summary>${t.groups.map(([g, items]) =>
    `${g ? `<p class="group">${g}</p>` : ''}<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`).join('')}</details>`).join(''),
  faq: (h = 'h3') => FAQ.map(([q, a]) => `<details class="faq"><summary><${h}>${q}</${h}></summary><p>${a}</p></details>`).join(''),
  tips: () => `<ul class="tips">${C.visit.tips.map(t => `<li>${t}</li>`).join('')}</ul>`,
  gift: () => `<p>${C.gift.lead}</p><ul class="kinds-list">${C.gift.kinds.map(k => `<li>${k}</li>`).join('')}</ul><p><b>Erhältlich</b> ${C.gift.versions.join(' · ')}.</p><p>${C.gift.note}</p>`,
  recs: () => `<ul class="recs">${C.recs.map(([n, u]) => `<li><a href="${u}" rel="noopener">${n}</a></li>`).join('')}</ul>`,
  hours: () => `Praxistage: ${C.hours.days}, ${C.hours.time}`,
  rating: () => `<a class="rating" href="${C.maps}" rel="noopener">${F.stars()} <b>${C.rating.score}</b> aus ${C.rating.count} Google-Bewertungen</a>`,
  quote: (q, text = q.q) => `<blockquote>${F.stars()}<p>«${text}»</p><footer>${F.who(q)}</footer></blockquote>`,
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
const DESC = 'Klassische Massage (100 CHF), Ganzheitliche Massage, Hawaiianische Ganzkörpermassage und Polarity in Winterthur, Münzgasse 2. Mi & Fr 10–20 Uhr. Kennenlernmassage 80 CHF. Termin online buchen.';
const business = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${SITE}#praxis`,
    name: C.name,
    alternateName: C.formerNames,
    description: `${C.tagline}. ${C.claim}. ${C.intro}`,
    slogan: C.claim,
    url: SITE,
    image: [`${SITE}img/miriam.jpg`, `${SITE}img/praxis.jpg`, `${SITE}img/og-image.jpg`],
    email: C.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Münzgasse 2', postalCode: '8400', addressLocality: 'Winterthur', addressRegion: 'ZH', addressCountry: 'CH' },
    areaServed: { '@type': 'City', name: 'Winterthur' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Wednesday', 'https://schema.org/Friday'], opens: '10:00', closes: '20:00' }],
    priceRange: 'CHF 50–180',
    paymentAccepted: 'TWINT, Bargeld, Karte',
    currenciesAccepted: 'CHF',
    knowsLanguage: 'de',
    employee: { '@type': 'Person', name: C.person, jobTitle: 'Dipl. Klassische Masseurin, Polaritytherapeutin in Ausbildung' },
    potentialAction: { '@type': 'ReserveAction', target: C.book, name: 'Massage-Termin online buchen' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: 'Massagen & Behandlungen',
      itemListElement: [
        ...C.services.map(s => {
          const price = { klassisch: '100', ganzheitlich: '110', 'polarity-behandlung': '88', hawaiianisch: '180' }[s.id];
          return { '@type': 'Offer', ...(price && { price, priceCurrency: 'CHF' }), itemOffered: { '@type': 'Service', name: s.n, ...(s.alt && { alternateName: s.alt }), description: `${s.d} Dauer: ${s.t}.` } };
        }),
        { '@type': 'Offer', price: '80', priceCurrency: 'CHF', itemOffered: { '@type': 'Service', name: 'Kennenlernmassage (erste Massage)' } },
        ...C.extras.map(e => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: e, description: 'Ergänzende Behandlung' } })),
      ],
    },
};
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap';

function page(pg, body) {
  const canonical = SITE + (pg.slug ? pg.slug + '/' : '');
  const ld = [business, ...(pg.faq ? [faqLd] : [])];
  return `<!doctype html>
<!-- Generated by build.mjs — edit that file, not this one. -->
<html lang="de-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${pg.title}</title>
<meta name="description" content="${pg.desc}">${PREVIEW ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_CH">
<meta property="og:site_name" content="${C.name}">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${pg.title}">
<meta property="og:description" content="${pg.desc}">
<meta property="og:image" content="${SITE}img/og-image.jpg">
<meta name="geo.region" content="CH-ZH">
<meta name="geo.placename" content="Winterthur">
<meta name="theme-color" content="#f9f9f9">
<link rel="icon" href="${P}img/sketches/massage.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link href="${P}styles.css" rel="stylesheet">
${ld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
${header(pg.slug)}
<main id="inhalt">
${body}
${pg.band ? ctaBand(pg.band) : ''}
</main>
${footer()}
${pg.slug === 'buchen' ? '' : `<a class="float-book" href="${url('buchen')}">Termin buchen</a>`}
<script>
// mobile menu: the icon turns into a cross, the label says what the button does
const header = document.querySelector('.site-header'), toggle = header.querySelector('.menu-toggle');
const setMenu = open => {
  header.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open); toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
};
toggle.addEventListener('click', () => setMenu(!header.classList.contains('open')));
// it closes again with Escape, a tap outside the header, or a link (Kontakt only scrolls this page)
addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('open')) { setMenu(false); toggle.focus(); } });
addEventListener('click', e => { if (header.classList.contains('open') && (!header.contains(e.target) || e.target.closest('#menu a'))) setMenu(false); });
// on phones a booking button sits in thumb reach once the header one has scrolled away,
// and steps aside while another booking button (or the footer) is on screen
const fb = document.querySelector('.float-book');
if (fb) {
  const inView = new Set(), update = () => fb.classList.toggle('show', scrollY > 480 && !inView.size);
  const io = new IntersectionObserver(es => { for (const e of es) e.isIntersecting ? inView.add(e.target) : inView.delete(e.target); update(); });
  document.querySelectorAll('main .btn-primary, .cta-band .btn, .site-footer').forEach(el => io.observe(el));
  addEventListener('scroll', update, { passive: true });
}
${pg.script || ''}
</script>
</body>
</html>
`;
}

// header: in the DOM the order matches what is on screen — on phones brand · Buchen · ☰ (menu below),
// on desktop brand · menu · Termin buchen. Each "Buchen" button exists once per layout.
const header = cur => `
  <header class="site-header"><div class="container">
    <a class="brand" href="${url('')}">${img('massage', { deco: true, eager: true })}<span>Miriam Pimputkar <small>Massage &amp; Polarity</small></span></a>
    <a class="btn btn-primary book-m" href="${url('buchen')}"${cur === 'buchen' ? ' aria-current="page"' : ''}>Buchen<span class="sr"> – Termin buchen</span></a>
    <button class="menu-toggle" aria-expanded="false" aria-controls="menu" aria-label="Menü öffnen"><span></span></button>
    <nav aria-label="Hauptmenü" style="display:contents">${navList(cur)}</nav>
    <a class="btn btn-primary book-d" href="${url('buchen')}"${cur === 'buchen' ? ' aria-current="page"' : ''}>Termin buchen</a>
  </div></header>`;

const footer = () => `
  <footer class="site-footer"><div class="container">
    <div><h2 class="h3">${C.person}</h2><address style="font-style:normal">Massage &amp; Polarity<br>${C.address.join('<br>')}<br>${F.hours()}<br>${mail}</address></div>
    <nav aria-label="Fussmenü"><h2 class="h3">Seiten</h2><ul><li><a href="${url('')}">Start</a></li>${NAV.map(([slug, l]) => `<li><a href="${url(slug)}">${l}</a></li>`).join('')}<li><a href="${url('buchen')}">Termin buchen</a></li><li><a href="${url('buchen')}#fragen">Häufige Fragen</a></li></ul></nav>
    <div><h2 class="h3">Angebot</h2><ul>${C.services.map(s => `<li><a href="${url('angebot')}#${s.id}">${s.n}</a></li>`).join('')}</ul></div>
  </div></footer>`;

// the closing band says what makes sense on that page, with a drawing the page doesn't already show
const ctaBand = ({ art, h, p, cta, href }) => `
    <section class="cta-band"><div class="container center">
      ${img(art, { cls: 'sketch', deco: true })}
      <h2>${h}</h2>
      <p class="lead">${p}</p>
      <a class="btn" href="${href ?? url('buchen')}">${cta}</a>
    </div></section>`;
const KENNENLERN = () => `${url('buchen')}?typ=39957629`;

// top of every sub-page: drawing, the page's one <h1>, a lead sentence
const pageHero = (art, h1, lead = '', extra = '') => `
    <section class="page-hero${art ? ' has-art' : ''}"><div class="container">
      <div class="ph-text"><h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}${extra}</div>
      ${art ? `<div class="ph-art">${img(art, { deco: true })}</div>` : ''}
    </div></section>`;

const serviceCard = s => `<article class="card sheet" id="${s.id}">${img(SERVICE_ART[s.id], { cls: 'card-art' })}<div class="card-top"><span class="dur">${s.t}</span><span class="price">${s.p}</span></div><h3>${s.n}</h3>${s.alt ? `<p class="alt">${s.alt}</p>` : ''}<p>${s.d}</p>${F.more(s)}${s.id === 'polarity-behandlung' ? `<a class="sub-link" href="${url('polarity')}">Polarity ansehen&nbsp;→</a>` : ''}<p class="first">${s.first}</p><a class="go" href="${url('buchen')}?behandlung=${s.id}">Termin buchen&nbsp;→</a></article>`;
// one booking button per Acuity type; data-when lets the "Erstes Mal hier?" question show only the matching ones
const slot = (id, when, was) => { const t = ALL_TYPES.find(x => x.id === id); was = was || t.was; return pickLink(id, `<span class="sl">${when === 'first' ? 'Kennenlernen' : t.t}</span><span class="sp">${when === 'first' ? `${t.t} · ` : ''}${t.p}${when === 'first' && was ? ` <span class="was">statt <s>${was}</s></span>` : ''}</span>`, `slot ${when}`).replace('<a ', `<a data-when="${when}" `); };
const pickCard = c => `<li class="pc sheet" data-svc="${c.svc}">${img(c.art, { cls: 'pc-art', deco: true })}<h3>${c.n}</h3><p>${c.d}</p><div class="slots">${c.first.map(id => slot(id, 'first', c.was)).join('')}${c.regular.map(id => slot(id, 'regular')).join('')}</div></li>`;
const check = '<svg class="ck" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';

/* =====================================================================
   PAGES
   ===================================================================== */
const PAGES = [
  {
    slug: '', title: 'Massage & Polarity in Winterthur | Miriam Pimputkar', desc: DESC,
    band: { art: 'kontakt', h: C.curious[0], p: `${C.curious[1]} ${C.bye}`, cta: 'Kennenlernmassage buchen', href: '' },
    // links into the old one-page site (index.html#preise …) land on the new pages
    script: `const old = { angebot: 'angebot/', polarity: 'polarity/', preise: 'angebot/#preise', buchen: 'buchen/', arbeit: 'ueber-mich/#arbeit', 'ueber-mich': 'ueber-mich/', erfahrungen: 'ueber-mich/#erfahrungen', gutschein: 'angebot/#gutschein', fragen: 'buchen/#fragen' }[location.hash.slice(1)];
if (old) location.replace(old);`,
    body: () => `
    <section class="hero"><div class="container">
      <div>
        <h1>Massage &amp; Polarity in Winterthur</h1>
        <p class="lead">${C.heroLead}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${url('buchen')}">Termin buchen</a>
          <a class="btn btn-ghost" href="${url('angebot')}">Angebot ansehen</a>
        </div>
        <ul class="facts">
          <li>${check}${C.hours.short}, ${C.hours.time}</li><li>${check}4. Stock, Lift vorhanden</li>
        </ul>
        <p class="hero-rating">${F.rating()}</p>
      </div>
      <figure class="hero-scene">
        ${img('besuch', { eager: true })}
        <figcaption>«${C.motto[0]}»</figcaption>
      </figure>
    </div></section>

    <section class="alt" id="warum"><div class="container twocol" style="align-items:center">
      <figure class="why-art sheet" aria-hidden="true"><div>${img('stressed', { deco: true })}<figcaption>vorher</figcaption></div><svg class="arrow" viewBox="0 0 90 40"><path d="M4 26 C 26 6, 54 6, 80 22 M68 12 L81 22 L66 29"/></svg><div>${img('stretch', { deco: true })}<figcaption>nachher</figcaption></div></figure>
      <div><h2>${C.welcome.split('! ')[1] || C.welcome}</h2><p>${C.intro}</p><p>${C.hook}</p>${C.why.map(p => `<p>${p}</p>`).join('')}</div>
    </div></section>

    <section><div class="container">
      <div class="center"><h2>Mein Angebot</h2><p class="lead">${C.offerIntro.split(':')[0]}.</p></div>
      <ul class="signposts">${C.services.map(s => `<li><a href="${url('angebot')}#${s.id}">${img(SERVICE_ART[s.id], { deco: true })}<span>${s.n}</span></a></li>`).join('')}</ul>
      <p class="center first-offer">Dein erster Besuch: <b>Kennenlernmassage 80 CHF</b></p>
      <p class="center more-row"><a class="btn btn-ghost" href="${url('angebot')}#preise">Alle Preise ansehen</a></p>
    </div></section>

    <section class="alt"><div class="container">
      <div class="center"><h2>Das sagen meine Kundinnen und Kunden</h2><p class="lead">${F.rating()}</p></div>
      <div class="quotes">${C.quotes.slice(0, 3).map(q => F.quote(q, q.short)).join('')}</div>
      <p class="center more-row"><a class="btn btn-ghost" href="${url('ueber-mich')}#erfahrungen">Alle Erfahrungsberichte ansehen</a></p>
    </div></section>

    <section id="kontakt"><div class="container twocol">
      <div>
        <h2>Kontakt &amp; Anfahrt</h2>
        <dl class="glance">
          <dt>Praxis</dt><dd>Massage & Polarity, ${C.person}</dd>
          <dt>Adresse</dt><dd>${C.address[0]}, ${C.address[2]}</dd>
          <dt>Anfahrt</dt><dd>${C.directions}</dd>
          <dt>Zugang</dt><dd>${C.address[1]}</dd>
          <dt>Praxistage</dt><dd>${C.hours.days}, ${C.hours.time}</dd>
          <dt>Termine</dt><dd><a href="${url('buchen')}">online buchen</a></dd>
          <dt>Kontakt</dt><dd>per E-Mail: ${mail}</dd>
          <dt>Zahlung</dt><dd>${C.pay}</dd>
          <dt>Fragen</dt><dd><a href="${url('buchen')}#fragen">Häufige Fragen</a></dd>
        </dl>
        <h2 class="h3">Meine Empfehlungen in Winterthur</h2>
        ${F.recs()}
      </div>
      <a href="${C.maps}" class="map-link">${img('anfahrt', { cls: 'map' })}<span>Route in Google Maps öffnen&nbsp;→</span></a>
    </div></section>`,
  },
  {
    slug: 'angebot', title: 'Angebot & Preise: Massage & Polarity in Winterthur | Miriam Pimputkar',
    desc: 'Klassische Massage ab 50 CHF, Ganzheitliche Massage 110 CHF, Hawaiianische Ganzkörpermassage 180 CHF und Polarity in Winterthur. Kennenlernmassage 80 CHF, Geschenkgutscheine, Online-Buchung.',
    band: { art: 'jump', h: 'Welche Behandlung passt zu dir?', p: 'Bei deinem ersten Besuch kostet die Kennenlernmassage 80 CHF – klassisch oder ganzheitlich.', cta: 'Kennenlernmassage buchen', href: '' },
    body: () => `${pageHero('angebot', 'Angebot &amp; Preise', C.offerLead)}
    <section><div class="container">
      <h2 class="sr">Behandlungen</h2>
      <div class="cards" id="preise">${C.services.slice(0, 2).map(serviceCard).join('')}<p class="difference sheet">${C.difference}</p>${C.services.slice(2).map(serviceCard).join('')}</div>
      <div class="extras"><h2 class="h3">Ergänzende Behandlungen</h2><ul>${C.extras.map(e => `<li>${e}</li>`).join('')}</ul><p>Fragen dazu? Schreib mir: ${mail}</p></div>
      <p class="center relief">${C.relief}</p>
    </div></section>

    <section class="alt" id="konditionen"><div class="container twocol">
      <div>
        <h2>Gut zu wissen</h2>
        ${F.terms()}
        <p>${C.prices.cancel}</p>
        ${F.polarityNote()}
      </div>
      <div class="social-box"><h3>Soziales Entgegenkommen</h3><p>${C.prices.social} ${mail}</p></div>
    </div></section>

    <section id="gutschein"><div class="container gift">
      <div>
        ${img('geschenk', { cls: 'sketch', deco: true })}
        <h2>${C.gift.title}</h2>
        ${F.gift()}
        <p>Die Preise der Behandlungen findest du <a href="#preise">bei den Behandlungen</a>.</p>
        <a class="btn btn-primary" href="${giftMail}">Gutschein per E-Mail bestellen</a>
        <p class="mail-alt">Öffnet sich kein E-Mail-Programm? Schreib direkt an ${mail}.</p>
      </div>
      <div class="gift-imgs">${img('giftFront')}${img('giftBack')}</div>
    </div></section>`,
  },
  {
    slug: 'polarity', title: 'Polarity Therapie in Winterthur | Miriam Pimputkar',
    desc: 'Polarity nach Dr. Randolph Stone: Körperarbeit, begleitendes Gespräch, Yoga und Ernährung. Polaritybehandlung in Winterthur – die erste nach deinem Ermessen.',
    band: { art: 'termin', h: 'Polarity kennenlernen', p: 'Bei der ersten Polaritybehandlung entscheidest du am Ende selbst, wie viel sie dir wert ist.', cta: 'Erste Polaritybehandlung buchen', href: 'POL' },
    body: () => `${pageHero('polarity', 'Polarity', C.polarity.intro[0], `<p class="ph-price"><span><b>Erste Behandlung:</b> 90 Minuten, den Preis bestimmst du selbst.</span><span>Danach 60 Minuten für 88 CHF (Ausbildungstarif).</span></p>`)}
    <section class="session"><div class="container">
      <h2>So läuft eine Polaritybehandlung ab</h2>
      <ol class="steps">
        <li class="sheet">${img('gespraech', { deco: true })}<h3>Vorgespräch</h3><p>Wir sprechen über dein Anliegen; bei Bedarf schaue ich mir deine Haltung an.</p></li>
        <li class="sheet">${img('fuesse', { deco: true })}<h3>Körperarbeit auf der Liege</h3><p>${C.polarity.topics[0].p[0]}</p></li>
        <li class="sheet">${img('yoga', { deco: true })}<h3>Übungen für den Alltag</h3><p>${C.polarity.topics[2].p[0]}</p></li>
      </ol>
    </div></section>
    <section class="alt"><div class="container twocol">
      <div>
        <blockquote class="pull">«${C.polarity.quote}»<footer>${C.polarity.quoteBy}</footer></blockquote>
        <p>${C.polarity.intro[1]}</p>
        <h2 class="h3">Polarity …</h2>
        ${F.facts()}
      </div>
      <div><h2 class="h3">Mehr zu den einzelnen Teilen</h2><div class="accordion">${F.topics()}</div></div>
    </div></section>`,
  },
  {
    slug: 'buchen', title: 'Termin online buchen | Miriam Pimputkar, Massage Winterthur', faq: true,
    desc: 'Wähle deine Behandlung und buche direkt einen freien Termin – Praxistage Mittwoch und Freitag, 10–20 Uhr. Mit Hinweisen und Antworten auf häufige Fragen.',
    // our own treatment picker, then Acuity's calendar for that type (loaded only on demand).
    // ?behandlung=<service> (treatment cards) narrows the picker; ?typ=<id> opens that calendar straight away.
    script: `document.documentElement.classList.add('js');   // with JS the prices wait for the answer to "Erstes Mal?"
const paper = document.querySelector('.paper'), pick = document.getElementById('pick'), cal = document.getElementById('cal'), frame = cal.querySelector('.cal-frame');
const direct = cal.querySelector('.cal-direct'), bar = cal.querySelector('.cal-bar'), lead = document.querySelector('.page-hero .lead'), leadText = lead.innerHTML;
let embedJs = false, slow;
function openType(id, label, focus) {
  clearTimeout(slow);
  const src = 'https://app.acuityscheduling.com/schedule.php?owner=${C.acuityOwner}&appointmentType=' + id;
  frame.innerHTML = '<div class="cal-loading" role="status"><span class="spinner" aria-hidden="true"></span>Kalender wird geladen …</div>'
    + '<iframe src="' + src + '&ref=embedded_csp" title="Termin vereinbaren: ' + label + '" width="100%" height="800" frameborder="0" allow="payment"></iframe>';
  direct.href = src;
  const loading = frame.querySelector('.cal-loading');
  frame.querySelector('iframe').addEventListener('load', () => { clearTimeout(slow); loading.remove(); });
  // blocked or very slow (tracker blocker, offline): say so and offer the way around
  slow = setTimeout(() => { loading.classList.add('failed'); loading.innerHTML = 'Der Kalender lädt nicht? <a href="' + src + '" rel="noopener">Direkt bei Acuity buchen</a> oder schreib mir: <a href="mailto:${C.email}">${C.email}</a>'; }, 8000);
  if (!embedJs) { const sc = document.createElement('script'); sc.src = 'https://embed.acuityscheduling.com/js/embed.js'; document.body.append(sc); embedJs = true; }
  cal.querySelector('.chosen').textContent = label;
  const when = pick.querySelector('a[data-type="' + id + '"]')?.dataset.when;
  if (when) pick.querySelector('input[value="' + when + '"]').checked = true;
  lead.innerHTML = 'Deine Wahl: <b>' + label + '</b> – such dir unten einen freien Termin aus.';
  pick.hidden = true; cal.hidden = false; paper.classList.add('is-cal');
  paper.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  // the picker just disappeared under the keyboard focus: put focus (and the screen reader) on the choice
  if (focus) bar.focus({ preventScroll: true });
}
function closeCal() { clearTimeout(slow); frame.innerHTML = ''; cal.hidden = true; pick.hidden = false; paper.classList.remove('is-cal'); lead.innerHTML = leadText; }
document.addEventListener('click', e => {
  const a = e.target.closest('a[data-type]'); if (!a) return;
  e.preventDefault(); openType(a.dataset.type, a.dataset.label, true);
  // a real history entry, so the browser's Back button returns to the picker
  history.pushState({ typ: a.dataset.type }, '', '?typ=' + a.dataset.type);
});
cal.querySelector('.back').addEventListener('click', () => history.back());
addEventListener('popstate', () => {
  const t = new URLSearchParams(location.search).get('typ'), a = t && document.querySelector('a[data-type="' + CSS.escape(t) + '"]');
  if (a) openType(a.dataset.type, a.dataset.label, true);
  else { closeCal(); paper.scrollIntoView(); pick.querySelector('input, a')?.focus({ preventScroll: true }); }
});
// filter by treatment (?behandlung=)
const filterNote = document.querySelector('.filter-note'), names = ${JSON.stringify(Object.fromEntries(C.pick.map(x => [x.svc, x.n.replace(/&shy;/g, '')])))};
function filter(svc) {
  pick.querySelectorAll('li[data-svc]').forEach(li => li.hidden = !!svc && li.dataset.svc !== svc);
  filterNote.hidden = !svc; if (svc) filterNote.querySelector('b').textContent = names[svc];
}
filterNote.querySelector('button').addEventListener('click', () => { filter(null); history.replaceState(null, '', location.pathname); });
const q = new URLSearchParams(location.search);
if (names[q.get('behandlung')]) filter(q.get('behandlung'));
const pre = q.get('typ') && document.querySelector('a[data-type="' + CSS.escape(q.get('typ')) + '"]');
if (pre) { history.replaceState({ typ: pre.dataset.type }, '', location.search); openType(pre.dataset.type, pre.dataset.label, false); }`,
    body: () => `${pageHero('termin', 'Termin online buchen', `Wähle deine Behandlung – danach siehst du alle freien Termine und buchst direkt hier. ${F.hours()}. <a href="#fragen">Fragen zum Termin?</a>`)}
    <section class="booking"><div class="container">
      <ul class="assure"><li>${check}Absagen bis 24 h vorher kostenfrei</li><li>${check}Bezahlung vor Ort: TWINT, bar oder Karte</li><li>${check}Beim ersten Termin ein kurzes Vorgespräch</li></ul>
      <div class="paper">
        <form class="pick" id="pick" onsubmit="return false">
          <fieldset class="firstq">
            <legend>Bist du zum ersten Mal bei mir?</legend>
            <label><input type="radio" name="erstes" value="first"> Ja, zum ersten Mal</label>
            <label><input type="radio" name="erstes" value="regular"> Nein, ich war schon da</label>
          </fieldset>
          <p class="firstq-hint">Beim ersten Besuch gilt der Kennenlernpreis – zum Beispiel 80 statt 100 CHF. Mit deiner Antwort siehst du die passenden Preise.</p>
          <p class="filter-note" hidden>Gezeigt: <b></b> <button type="button">Alle Behandlungen anzeigen</button></p>
          <h2 class="sr">Behandlung wählen</h2>
          <ul class="pick-cards">${C.pick.map(pickCard).join('')}</ul>
        </form>
        <div class="cal" id="cal" hidden>
          <div class="cal-bar" tabindex="-1" role="status"><button type="button" class="back">← andere Behandlung</button><span class="chosen"></span></div>
          <p class="cal-hint">${C.calHint}</p>
          <div class="cal-frame"></div>
          <p class="cal-help">Probleme mit dem Kalender? <a class="cal-direct" href="${acuity()}" rel="noopener">Im neuen Fenster öffnen</a> · <a href="mailto:${C.email}">E-Mail schreiben</a></p>
        </div>
        <p class="cal-note">${C.afterBooking} Die Buchung läuft über <a href="${acuity()}" rel="noopener">Acuity Scheduling</a>; der Kalender wird erst geladen, wenn du eine Behandlung wählst.</p>
      </div>
    </div></section>

    <section class="alt" id="fragen"><div class="container twocol">
      <div>
        ${img('fragen', { cls: 'sketch', deco: true })}
        <h2>Hinweise für deinen Termin</h2>
        <p class="lead">${C.visit.room}</p>
        ${F.tips()}
      </div>
      <div><h2>Häufige Fragen</h2><div class="accordion">${F.faq()}</div></div>
    </div></section>`,
  },
  {
    slug: 'ueber-mich', title: 'Über mich – Miriam Pimputkar, Masseurin in Winterthur',
    desc: 'Dipl. Klassische Masseurin und Polaritytherapeutin in Ausbildung in Winterthur: wie ich arbeite, meine Ausbildungen – und was meine Kundinnen und Kunden sagen (5,0 aus 22 Google-Bewertungen).',
    band: { art: 'massage', h: C.curious[0], p: C.curious[1], cta: 'Kennenlernmassage buchen', href: '' },
    body: () => `${pageHero('yoga', 'Über mich', C.aboutLead)}
    <section><div class="container twocol">
      <div>
        <figure class="portrait">${img('miriam')}<figcaption>${C.person}</figcaption></figure>
        <h2 class="h3">Ausbildung & Erfahrung</h2>
        <div class="accordion">${F.training()}</div>
      </div>
      <div>
        ${C.about.map(p => `<p>${p}</p>`).join('')}
        <figure class="room">${img('praxis')}<figcaption>Meine Praxis an der Münzgasse 2</figcaption></figure>
      </div>
    </div></section>

    <section class="alt" id="arbeit"><div class="container">
      <div class="center">${img('run', { cls: 'sketch' })}<h2>Was meine Arbeit ausmacht</h2></div>
      <div class="values">${C.values.map(v => `<div><h3>${v.k}</h3><p>${v.v}${v.k === 'Sozial' ? ' ' + mail : ''}</p></div>`).join('')}</div>
    </div></section>

    <section id="erfahrungen"><div class="container">
      <div class="center"><h2>Erfahrungsberichte</h2><p class="lead">${F.rating()}</p></div>
      <div class="quotes">${C.quotes.map(q => F.quote(q)).join('')}<a class="quote-more" href="${C.maps}" rel="noopener">${F.stars()}<span>Alle ${C.rating.count} Bewertungen auf Google lesen&nbsp;→</span></a></div>
    </div></section>`,
  },
];

/* =====================================================================
   WRITE
   ===================================================================== */
for (const pg of PAGES) {
  P = pg.slug ? '../' : '';
  if (pg.band) pg.band.href = { '': KENNENLERN(), POL: `${url('buchen')}?typ=78873137`, GIFT: giftMail }[pg.band.href] ?? pg.band.href;
  const out = new URL(pg.slug ? `${pg.slug}/index.html` : 'index.html', import.meta.url);
  mkdirSync(new URL('.', out), { recursive: true });
  writeFileSync(out, page(pg, pg.body()));
}
// merged pages: /preise/ → /angebot/#preise etc.; a crawler gets the canonical, a visitor is sent on
for (const [from, to] of [['preise', 'angebot/#preise'], ['gutschein', 'angebot/#gutschein'], ['erfahrungen', 'ueber-mich/#erfahrungen'], ['kontakt', '#kontakt']]) {
  const out = new URL(`${from}/index.html`, import.meta.url);
  mkdirSync(new URL('.', out), { recursive: true });
  writeFileSync(out, `<!doctype html>\n<!-- Generated by build.mjs: /${from}/ moved to /${to} -->\n<html lang="de-CH"><head><meta charset="utf-8"><meta name="robots" content="noindex">\n<link rel="canonical" href="${SITE}${to.split('#')[0]}"><meta http-equiv="refresh" content="0; url=../${to}">\n<title>Weitergeleitet – ${C.name}</title></head>\n<body><p>Diese Seite ist umgezogen: <a href="../${to}">weiter</a>.</p><script>location.replace('../${to}')</script></body></html>\n`);
}
writeFileSync(new URL('sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(pg => `  <url><loc>${SITE}${pg.slug ? pg.slug + '/' : ''}</loc></url>`).join('\n')}
</urlset>
`);
writeFileSync(new URL('robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${SITE}sitemap.xml\n`);
console.log(`wrote ${PAGES.length} pages + sitemap.xml (${PREVIEW ? 'preview, noindex' : 'launch'})`);
