export const SITE = 'https://jagis-folierung.de';
export const NAME = 'JAGIS Surface Protection Refinement';
export const PHONE_DISPLAY = '0157 35626023';
export const PHONE_INTL = '+4915735626023';
export const WA = 'https://wa.me/4915735626023';
export const EMAIL = 'gottmannjascha@gmail.com';
export const STREET = 'Friedrich-Ebert-Straße 84';
export const ZIP = '58454';
export const CITY = 'Witten';
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Friedrich-Ebert-Stra%C3%9Fe+84%2C+58454+Witten';
export const LASTMOD = '2026-10-17';

export const trustFeatures = ['Selbstheilend', 'UV-beständig', 'Rückstandslos entfernbar', 'Glanz / Matt / Satin Matt', 'Premium-TPU'];

export const packages = [
  {
    icon: 'ri-shield-line', title: 'Frontpaket', subtitle: 'Basis-Schutz für den Alltag', price: 'ab 850 €', min: 850,
    description: 'Schutz genau dort, wo die meisten Steinschläge entstehen:',
    features: ['Stoßstange (vollflächig)', 'Motorhaube (teil- oder vollflächig)'], highlight: 'Basis',
  },
  {
    icon: 'ri-shield-star-line', title: 'Frontpaket Plus', subtitle: 'Rundum-Schutz für die wichtigsten Frontbereiche', price: 'ab 1.390 €', min: 1390,
    description: 'Rundum-Schutz für die wichtigsten Frontbereiche:',
    features: ['Stoßstange (vollflächig)', 'Motorhaube (vollflächig)', 'Kotflügel vorne', 'Außenspiegel', 'A-Säulen (bis Dachanfang)', 'Dachansatz (ca. 15 cm ab Frontscheibe)'], highlight: 'Empfohlen',
  },
  {
    icon: 'ri-shield-check-line', title: 'Komplettschutz', subtitle: 'Maximaler Schutz für höchste Ansprüche', price: 'ab 3.500 €', min: 3500,
    description: 'Komplettschutz des gesamten Fahrzeugs – jede lackierte Fläche unter einer durchgehenden Schutzschicht.',
    features: [], highlight: 'Maximal',
  },
];

export const schutzzonen = [
  { icon: 'ri-shopping-bag-3-line', title: 'Ladekante Kofferraum', description: 'Die meistbelastete Kante am Fahrzeug. Jedes Gepäckstück, jeder Einkauf hinterlässt Spuren – unsichtbar geschützt.' },
  { icon: 'ri-door-open-line', title: 'Türeinstiege', description: 'Schuhe, Sand und Streusalz treffen hier täglich auf Lack. Ein Bereich, der bei der Fahrzeugrückgabe fast immer bemängelt wird.' },
  { icon: 'ri-fingerprint-line', title: 'Türgriffmulden', description: 'Fingernägel und Schlüssel hinterlassen feine Kratzer rund um den Griff. Mit Folie entstehen sie gar nicht erst.' },
  { icon: 'ri-layout-bottom-2-line', title: 'Einstiegsleisten', description: 'Dauerhaft belastet beim Ein- und Aussteigen. Schutz, den man nicht sieht, aber jeden Tag nutzt.' },
  { icon: 'ri-scissors-cut-line', title: 'Individuelle Bereiche', description: 'Spoilerkante, Radläufe, Heckstoßstange, Schwellerbereich – sag uns, was dir wichtig ist, wir schneiden passgenau zu.' },
  { icon: 'ri-smartphone-line', title: 'JAGIS Displayschutz', description: 'Entspiegelter Premium-Schutz für dein Fahrzeugdisplay: weniger Fingerabdrücke, weniger Reflexionen, Schutz vor Mikrokratzern – bei unverändert präzisem Touch-Gefühl.' },
];

export const finishes = [
  { title: 'Glanz', icon: 'ri-sun-line', img: 'finish-glanz.webp', description: 'Erhält den originalen Tiefenglanz deines Lacks und verstärkt ihn sogar. Die klassische Wahl – man sieht nur den Lack, nie die Folie.' },
  { title: 'Matt', icon: 'ri-contrast-drop-2-line', img: 'finish-matt.webp', description: 'Verwandelt jeden glänzenden Lack in eine gleichmäßig matte Oberfläche – ohne Lackierung und jederzeit rückstandslos umkehrbar.' },
  { title: 'Satin Matt', icon: 'ri-moon-clear-line', img: 'finish-satin.webp', description: 'Der Mittelweg: seidiger Schimmer statt hartem Glanz. Zurückhaltend, edel und besonders auf dunklen Lacken beeindruckend.' },
];

export const advantages = [
  { icon: 'ri-money-euro-circle-line', title: 'Werterhalt sichern', desc: 'Ein makelloser Lack ist beim Wiederverkauf bares Geld wert. Die Folie hält deinen Lack im Auslieferungszustand.' },
  { icon: 'ri-shield-check-line', title: 'Originalzustand bewahren', desc: 'Steinschläge, Kratzer und Waschstraßen-Spuren treffen die Folie, nicht deinen Lack.' },
  { icon: 'ri-sun-line', title: 'Selbstheilende Oberfläche', desc: 'Durch Wärmeaktivierung verschwinden feine Kratzer von selbst. Sonne oder warmes Wasser genügen.' },
  { icon: 'ri-road-map-line', title: 'Sorgenfreies Fahren', desc: 'Landstraße, Autobahn, Baustelle: Du fährst entspannt, weil dein Lack geschützt ist.' },
  { icon: 'ri-drop-line', title: 'Pflegeleicht & widerstandsfähig', desc: 'Schmutz und Wasser perlen ab. Beständig gegen Chemikalien, Witterung und UV-Strahlung.' },
  { icon: 'ri-car-line', title: 'Für nahezu jedes Fahrzeug', desc: 'Ob Neuwagen, Leasingfahrzeug oder Liebhaberauto – wir schneiden passgenau zu.' },
];

export const gallery = [
  { slug: 'motorhaube-vollflaechig', label: 'Motorhaube vollflächig' },
  { slug: 'komplettschutz-satin-matt', label: 'Komplettschutz – Satin Matt' },
  { slug: 'handwerk-praezision', label: 'Handwerk & Präzision' },
  { slug: 'selbstheilende-oberflaeche', label: 'Selbstheilende Oberfläche' },
  { slug: 'ladekante-kofferraum', label: 'Ladekante Kofferraum' },
  { slug: 'frontpaket-plus', label: 'Frontpaket Plus' },
  { slug: 'komplettschutz-glanz', label: 'Komplettschutz – Glanz' },
  { slug: 'tuereinstiege-einstiegsleisten', label: 'Türeinstiege & Einstiegsleisten' },
];

export const steps = [
  { number: '01', icon: 'ri-whatsapp-line', title: 'Anfrage', desc: 'Schreib uns per WhatsApp oder ruf an. Schick uns Fotos deines Fahrzeugs und sag uns, welche Bereiche du schützen willst.' },
  { number: '02', icon: 'ri-chat-check-line', title: 'Beratung, Paket & Finish', desc: 'Wir beraten dich persönlich, zeigen dir Muster in Glanz, Matt und Satin Matt und erstellen ein individuelles Angebot.' },
  { number: '03', icon: 'ri-tools-line', title: 'Vorbereitung & Applikation', desc: 'Gründliche Lackreinigung, passgenauer Zuschnitt, blasenfreie Montage. Präzision bis in jede Kante.' },
  { number: '04', icon: 'ri-award-line', title: 'Übergabe', desc: 'Dein Fahrzeug: geschützt, perfekt verarbeitet und bereit für jeden Kilometer. Inklusive Pflegehinweisen.' },
];

export const reviews = [
  { name: 'Marcus T.', date: 'vor 2 Wochen', text: 'Frontpaket Plus am BMW – man sieht die Folie schlicht nicht. Saubere Kanten, kein Staubeinschluss, perfekt umgeschlagen. Endlich entspannt Autobahn fahren.' },
  { name: 'Kevin R.', date: 'vor 1 Monat', text: 'Komplettschutz in Satin Matt. Das Ergebnis wirkt hochwertiger als jede Lackierung, und die ersten feinen Kratzer waren nach einem Sommertag wieder weg.' },
  { name: 'Sarah W.', date: 'vor 3 Wochen', text: 'Nur Ladekante, Türeinstiege und Griffmulden am neuen Firmenwagen – genau die Stellen, die sonst leiden. Schnell, sauber, fairer Preis.' },
  { name: 'Daniel H.', date: 'vor 1 Woche', text: 'Leasingfahrzeug vorne komplett geschützt. Bei der Rückgabe zahle ich jetzt keine Steinschläge nach. Beste Investition am Auto seit langem.' },
];

export const faqs = [
  { q: 'Was kostet eine Lackschutzfolierung?', a: 'Das Frontpaket startet ab 850 €, das Frontpaket Plus ab 1.390 € und der Komplettschutz ab 3.500 € – je nach Fahrzeug, Größe und Aufwand. Einzelne Schutzzonen sind deutlich günstiger. Nach kurzer Beratung bekommst du ein verbindliches, transparentes Angebot.' },
  { q: 'Was ist der Unterschied zwischen Lackschutzfolie und Steinschlagschutzfolie?', a: 'Das ist dasselbe Produkt. Beide Begriffe beschreiben eine transparente, selbstheilende Schutzfolie, die auf den Originallack aufgebracht wird und Steinschläge, Kratzer und Umwelteinflüsse abfängt. Fachlich heißt sie PPF – Paint Protection Film.' },
  { q: 'Kann ich auch nur einzelne Bereiche schützen lassen?', a: 'Ja, und das ist oft die klügste Lösung. Ladekante, Türeinstiege, Türgriffmulden und Einstiegsleisten sind die Stellen, an denen im Alltag die meisten Schäden entstehen. Einzeln buchbar oder gebündelt im Komfortpaket für 399 € statt 650 €.' },
  { q: 'Welche Finishes gibt es?', a: 'Glanz, Matt und Satin Matt. Die Schutzwirkung ist bei allen dreien identisch, es geht rein um die Optik. Muster zeigen wir dir bei der Beratung.' },
  { q: 'Wie lange dauert die Applikation?', a: 'Ein Frontpaket ist meist in 1–2 Tagen fertig, das Frontpaket Plus in 2–3 Tagen. Ein Komplettschutz braucht je nach Fahrzeug rund 5–7 Werktage. Einzelne Schutzzonen erledigen wir oft am selben Tag.' },
  { q: 'Verschwinden Kratzer wirklich von selbst?', a: 'Ja, bei feinen Kratzern und Waschstraßenspuren. Die selbstheilende Oberfläche wird durch Wärme aktiviert: Sonneneinstrahlung oder warmes Wasser genügen, und die Struktur schließt sich wieder.' },
  { q: 'Lässt sich die Folie wieder entfernen?', a: 'Ja, rückstandslos. Der Originallack darunter kommt unbeschädigt und geschützt zum Vorschein. Genau das macht Lackschutzfolie bei Leasingfahrzeugen und beim Wiederverkauf so wertvoll.' },
  { q: 'Wie pflege ich mein Fahrzeug mit Lackschutzfolie?', a: 'Ganz normal. Handwäsche oder kontaktlose Waschanlagen sind ideal, Bürstenanlagen solltest du vermeiden. Schmutz und Wasser perlen ohnehin ab. Für matte Oberflächen gibt es spezielle Reiniger.' },
  { q: 'Woher kommen eure Kunden?', a: 'Aus Witten, Bochum, Dortmund, Schwerte und Hagen ist es ein kurzer Weg zu uns. Für Kunden aus Essen, Wuppertal, Solingen und Düsseldorf bieten wir auf Anfrage einen Hol- und Bringservice an.' },
];

// Location-FAQ: same three as original LocationPage (indices 0, 4, 6)
export const locationFaqs = [faqs[0], faqs[4], faqs[6]];

export const cities = [
  { slug: 'bochum', cityName: 'Bochum', fahrzeit: '~12 Min', route: 'A43 / Ruhrschnellweg A40', hasHolBring: false,
    title: 'Lackschutzfolie Bochum | PPF & Steinschlagschutz Auto',
    description: 'Lackschutzfolierung für Bochum: Frontpaket ab 850 €, Komplettschutz & Einzelzonen. 12 Minuten bis zu unserer Werkstatt in Witten.' },
  { slug: 'dortmund', cityName: 'Dortmund', fahrzeit: '~20 Min', route: 'B1 / A45 Sauerlandlinie', hasHolBring: false,
    title: 'Lackschutzfolie Dortmund | Steinschlagschutzfolie & PPF',
    description: 'Steinschlagschutz für Dortmund – Frontpaket ab 850 €. Nur 20 Minuten entfernt. Selbstheilende Folie, rückstandslos entfernbar.' },
  { slug: 'duesseldorf', cityName: 'Düsseldorf', fahrzeit: '~55 Min', route: 'A46 / A3', hasHolBring: true,
    title: 'Lackschutzfolie Düsseldorf | PPF Steinschlagschutz',
    description: 'Hochwertige Lackschutzfolierung für Düsseldorf. Hol- und Bringservice auf Anfrage – dein Fahrzeug wird abgeholt und geschützt zurückgebracht.' },
  { slug: 'essen', cityName: 'Essen', fahrzeit: '~35 Min', route: 'A40 Ruhrschnellweg', hasHolBring: true,
    title: 'Lackschutzfolie Essen | Steinschlagschutzfolie fürs Auto',
    description: 'PPF-Lackschutz für Essener Fahrzeuge – Frontpaket ab 850 €. Hol- und Bringservice auf Anfrage. Beratung per WhatsApp.' },
  { slug: 'hagen', cityName: 'Hagen', fahrzeit: '~15 Min', route: 'A1 / Volmetal', hasHolBring: false,
    title: 'Lackschutzfolie Hagen | PPF & Steinschlagschutzfolie',
    description: 'Steinschlagschutz für Hagener Fahrzeuge – 15 Minuten bis Witten. Frontpaket ab 850 €, selbstheilend und rückstandslos entfernbar.' },
  { slug: 'schwerte', cityName: 'Schwerte', fahrzeit: '~18 Min', route: 'A1 Richtung Westhofener Kreuz', hasHolBring: false,
    title: 'Lackschutzfolie Schwerte | Steinschlagschutz fürs Auto',
    description: 'Lackschutzfolierung für Schwerte – 18 Minuten entfernt. Frontpaket, Komplettschutz, Ladekante & Türeinstiege. Jetzt Termin per WhatsApp.' },
  { slug: 'solingen', cityName: 'Solingen', fahrzeit: '~50 Min', route: 'A46 / A46-Anschluss Haan', hasHolBring: true,
    title: 'Lackschutzfolie Solingen | PPF & Steinschlagschutzfolie',
    description: 'Professioneller Lackschutz für Solingen. Selbstheilende Folie in Glanz, Matt oder Satin Matt. Hol- und Bringservice möglich.' },
  { slug: 'wuppertal', cityName: 'Wuppertal', fahrzeit: '~35 Min', route: 'A43 / A46', hasHolBring: true,
    title: 'Lackschutzfolie Wuppertal | Steinschlagschutz & PPF',
    description: 'Lackschutzfolierung für Wuppertal: Schutz vor Steinschlägen und Kratzern. Frontpaket ab 850 €. Hol- und Bringservice möglich.' },
];
