// Erzeugt robots.txt, sitemap.xml, llms.txt, llms-full.txt, site.webmanifest
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const w = (f, s) => { writeFileSync(join(ROOT, f), s); console.log('✓', f); };
const { SITE } = D;

// Nur indexierbare Seiten (Impressum/Datenschutz sind noindex)
const pages = [{ path: '/', prio: '1.0' }, ...D.cities.map((c) => ({ path: `/lackschutzfolie-${c.slug}`, prio: '0.8' }))];

w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map((p) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${D.LASTMOD}</lastmod>
    <priority>${p.prio}</priority>${p.path === '/' ? `
    <image:image><image:loc>${SITE}/images/hero-1920.webp</image:loc></image:image>
${D.gallery.map((g) => `    <image:image><image:loc>${SITE}/images/galerie-${g.slug}-1600.webp</image:loc></image:image>`).join('\n')}` : ''}
  </url>`).join('\n')}
</urlset>
`);

const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot', 'MistralAI-User', 'meta-externalagent', 'cohere-ai', 'YouBot', 'Amazonbot'];
w('robots.txt', `# robots.txt – ${SITE}
User-agent: *
Allow: /

# KI-Suchmaschinen und KI-Assistenten ausdrücklich erlaubt
${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${SITE}/sitemap.xml
`);

const pkgLines = D.packages.map((p) => `- ${p.title} (${p.price}, je nach Fahrzeug): ${p.features.length ? p.features.join(', ') : p.description}`).join('\n');

w('llms.txt', `# ${D.NAME}

> JAGIS ist ein auf Lackschutzfolierung (PPF, Steinschlagschutzfolie) spezialisierter Betrieb in Witten (NRW). Angeboten werden Frontpaket (ab 850 €), Frontpaket Plus (ab 1.390 €), Komplettschutz (ab 3.500 €), einzelne Schutzzonen inkl. Komfortpaket (ab 399 €) und Displayschutz – in Glanz, Matt oder Satin Matt. Anfragen am schnellsten per WhatsApp.

- Adresse: ${D.STREET}, ${D.ZIP} ${D.CITY}
- Telefon / WhatsApp: ${D.PHONE_DISPLAY} (${D.PHONE_INTL})
- E-Mail: ${D.EMAIL}
- Einzugsgebiet: Witten, Bochum, Dortmund, Schwerte, Hagen; Hol- und Bringservice auf Anfrage für Essen, Wuppertal, Solingen und Düsseldorf

## Hauptseite

- [Lackschutzfolierung in Witten](${SITE}/): Pakete, Preise, Schutzzonen, Finishes, Ablauf, FAQ und Kontakt

## Standorte

${D.cities.map((c) => `- [Lackschutzfolie ${c.cityName}](${SITE}/lackschutzfolie-${c.slug}): ${c.description}`).join('\n')}

## Optional

- [Vollständige Inhalte als Text](${SITE}/llms-full.txt)
`);

w('llms-full.txt', `# ${D.NAME} – Lackschutzfolierung in Witten

Quelle: ${SITE}/
Stand: ${D.LASTMOD}

## Über JAGIS

JAGIS Surface Protection Refinement ist ein auf Lackschutzfolie spezialisierter Betrieb in Witten (Nordrhein-Westfalen). Das Unternehmen bietet ausschließlich Lackschutzfolierung an (auch Steinschlagschutzfolie oder PPF – Paint Protection Film genannt). Die Folie ist transparent, selbstheilend, UV-beständig und rückstandslos entfernbar und wird in drei Finishes angeboten: Glanz, Matt und Satin Matt. Material: Premium-TPU.

Alles begann mit der Liebe zum Auto. Was als Anspruch am eigenen Fahrzeug startete – ein Lack, der auch nach Jahren aussieht wie am ersten Tag – wurde zur Berufung. JAGIS steht für höchste Präzision, erstklassige Materialien und das Versprechen, jedes Fahrzeug so zu behandeln, als wäre es das eigene.

## Kontakt

- Adresse: ${D.STREET}, ${D.ZIP} ${D.CITY}
- Telefon / WhatsApp: ${D.PHONE_DISPLAY}
- E-Mail: ${D.EMAIL}
- WhatsApp: ${D.WA}
- Bevorzugter Kontaktweg: WhatsApp mit Fotos des Fahrzeugs

## Pakete und Preise

Alle Preise sind Startpreise inkl. MwSt. und richten sich nach Fahrzeugmodell, Größe und Aufwand. Nach kurzer Beratung gibt es ein verbindliches Angebot.

${pkgLines}

## Einzelne Schutzzonen

${D.schutzzonen.map((z) => `- ${z.title}: ${z.description}`).join('\n')}
- Komfortpaket: Ladekante, Türeinstiege, Türgriffmulden und Einstiegsleisten zusammen ab 399 € (statt 650 €)

## Finishes

${D.finishes.map((f) => `- ${f.title}: ${f.description}`).join('\n')}

Alle Finishes sind selbstheilend, UV-beständig und pflegeleicht. Farbige Schutzfolien auf Anfrage.

## Vorteile

${D.advantages.map((a) => `- ${a.title}: ${a.desc}`).join('\n')}

## Ablauf

${D.steps.map((s) => `${Number(s.number)}. ${s.title}: ${s.desc}`).join('\n')}

## Häufige Fragen

${D.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Einzugsgebiet und Anfahrt

${D.cities.map((c) => `- ${c.cityName}: ca. ${c.fahrzeit.replace('~', '')} über ${c.route}${c.hasHolBring ? '; Hol- und Bringservice auf Anfrage' : ''} – ${SITE}/lackschutzfolie-${c.slug}`).join('\n')}
`);

w('site.webmanifest', JSON.stringify({
  name: D.NAME, short_name: 'JAGIS', lang: 'de', start_url: '/', display: 'standalone',
  background_color: '#0A0A0A', theme_color: '#0A0A0A',
  icons: [{ src: '/images/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/images/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2) + '\n');
