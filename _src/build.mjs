// Statischer Seitengenerator für jagis-folierung.de
// Aufruf: node _src/build.mjs  (schreibt die HTML-Dateien ins Projekt-Root)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './data.mjs';
import { legalPages } from './legal.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { SITE, NAME, WA, PHONE_DISPLAY, PHONE_INTL, EMAIL, STREET, ZIP, CITY, MAPS } = D;
const ASSET_V = '20261017';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
const out = (file, html) => { const p = join(ROOT, file); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, html); console.log('✓', file); };

/* ---------------- Schema.org ---------------- */
const BIZ_ID = `${SITE}/#business`;
const business = {
  '@type': 'AutoBodyShop',
  '@id': BIZ_ID,
  name: NAME,
  alternateName: 'JAGIS',
  description: 'Spezialist für Lackschutzfolierung (PPF / Steinschlagschutzfolie) in Witten – Frontpaket, Frontpaket Plus, Komplettschutz und einzelne Schutzzonen in Glanz, Matt oder Satin Matt.',
  url: `${SITE}/`,
  logo: `${SITE}/images/logo-jagis.png`,
  image: [`${SITE}/images/og-image.jpg`, `${SITE}/images/hero-1920.webp`],
  telephone: PHONE_INTL,
  email: EMAIL,
  priceRange: '€€€',
  currenciesAccepted: 'EUR',
  address: { '@type': 'PostalAddress', streetAddress: STREET, addressLocality: CITY, postalCode: ZIP, addressRegion: 'NRW', addressCountry: 'DE' },
  geo: { '@type': 'GeoCoordinates', latitude: 51.44986, longitude: 7.39206 },
  hasMap: MAPS,
  areaServed: ['Witten', 'Bochum', 'Dortmund', 'Schwerte', 'Hagen', 'Essen', 'Wuppertal', 'Solingen', 'Düsseldorf'].map((n) => ({ '@type': 'City', name: n })),
  knowsAbout: ['Lackschutzfolie', 'Steinschlagschutzfolie', 'Paint Protection Film (PPF)', 'Displayschutzfolie'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Lackschutzfolierung',
    itemListElement: [
      ...D.packages.map((p) => ({ title: `${p.title} Lackschutzfolie`, min: p.min, desc: p.subtitle })),
      { title: 'Komfortpaket Schutzzonen', min: 399, desc: 'Ladekante, Türeinstiege, Türgriffmulden und Einstiegsleisten' },
    ].map((o) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: o.title, description: o.desc, serviceType: 'Lackschutzfolierung' },
      priceSpecification: { '@type': 'PriceSpecification', minPrice: o.min, priceCurrency: 'EUR', valueAddedTaxIncluded: true },
    })),
  },
};
const website = { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: NAME, inLanguage: 'de-DE', publisher: { '@id': BIZ_ID } };
const webpage = (path, title, description, extra = {}) => ({
  '@type': 'WebPage', '@id': `${SITE}${path}#webpage`, url: `${SITE}${path}`, name: title, description,
  inLanguage: 'de-DE', isPartOf: { '@id': `${SITE}/#website` }, about: { '@id': BIZ_ID },
  primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}/images/og-image.jpg` }, dateModified: D.LASTMOD, ...extra,
});
const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
});
const faqPage = (list, path) => ({
  '@type': 'FAQPage', '@id': `${SITE}${path}#faq`,
  mainEntity: list.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

/* ---------------- Head ---------------- */
function head({ title, description, path, robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', graph, ogTitle, preloadHero = false }) {
  const url = `${SITE}${path}`;
  return `<!doctype html>
<html lang="de" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<link rel="canonical" href="${url}">
<meta name="author" content="${NAME}">
<meta name="theme-color" content="#0A0A0A">
<meta name="format-detection" content="telephone=yes">
<meta name="geo.region" content="DE-NW">
<meta name="geo.placename" content="Witten">
<meta name="geo.position" content="51.44986;7.39206">
<meta name="ICBM" content="51.44986, 7.39206">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(ogTitle || title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/images/og-image.jpg">
<meta property="og:image:secure_url" content="${SITE}/images/og-image.jpg">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="JAGIS – Professionelle Lackschutzfolierung und Steinschlagschutz in Witten">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(ogTitle || title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE}/images/og-image.jpg">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
${preloadHero ? '<link rel="preload" as="image" href="/images/hero-1920.webp" imagesrcset="/images/hero-1024.webp 1024w, /images/hero-1920.webp 1920w" imagesizes="100vw" fetchpriority="high">\n' : ''}<link rel="stylesheet" href="/assets/css/style.css?v=${ASSET_V}">
<script>document.documentElement.classList.replace('no-js','js')</script>
<script src="/assets/js/main.js?v=${ASSET_V}" defer></script>
${ld({ '@context': 'https://schema.org', '@graph': graph })}
</head>`;
}

/* ---------------- Gemeinsame Bausteine ---------------- */
const navLinks = [
  ['Über Uns', '#ueber-uns'], ['Leistungen', '#leistungen'], ['Schutzzonen', '#schutzzonen'],
  ['Galerie', '#galerie'], ['FAQ', '#faq'], ['Kontakt', '#kontakt'],
];

function navbar(isHome) {
  const pre = isHome ? '' : '/';
  return `<a href="#inhalt" class="skip-link">Zum Inhalt springen</a>
<nav aria-label="Hauptnavigation" class="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#00B4B4]/20 h-16 md:h-32">
  <div class="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
    <a href="${isHome ? '#top' : '/'}" class="flex items-center cursor-pointer group shrink-0" aria-label="Zur Startseite">
      <img src="/images/logo-jagis.webp" alt="JAGIS Surface Protection Refinement – Lackschutzfolierung Witten" class="h-[26px] md:h-[38px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80" width="450" height="151" loading="eager" decoding="async">
    </a>
    <div class="hidden md:flex items-center gap-6 lg:gap-10">
      ${navLinks.map(([l, h]) => `<a href="${pre}${h}" class="relative text-[#B0B0B0] hover:text-[#00B4B4] text-sm tracking-widest uppercase font-medium transition-colors duration-300 group cursor-pointer">${l}<span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00B4B4] group-hover:w-full transition-all duration-300"></span></a>`).join('\n      ')}
      <a href="${WA}" target="_blank" rel="nofollow noopener noreferrer" aria-label="Direkt per WhatsApp schreiben" class="hidden lg:flex w-10 h-10 items-center justify-center rounded bg-[#25D366] hover:bg-[#1ebe5d] text-white border border-[#25D366] hover:border-[#1ebe5d] transition-all duration-300 cursor-pointer"><i class="ri-whatsapp-line text-lg" aria-hidden="true"></i></a>
      <a href="${pre}#kontakt" class="whitespace-nowrap px-6 py-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white text-sm tracking-widest uppercase font-semibold rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,180,0.5)] cursor-pointer">Angebot anfragen</a>
    </div>
    <button type="button" class="md:hidden flex flex-col gap-1.5 cursor-pointer p-2" data-menu-toggle aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">
      <span class="burger-line block w-6 h-0.5 bg-[#00B4B4] transition-all duration-300"></span>
      <span class="burger-line block w-6 h-0.5 bg-[#00B4B4] transition-all duration-300"></span>
      <span class="burger-line block w-6 h-0.5 bg-[#00B4B4] transition-all duration-300"></span>
    </button>
  </div>
</nav>
<div id="mobile-menu" class="mobile-menu fixed top-16 left-0 right-0 bottom-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden opacity-0 pointer-events-none" aria-hidden="true">
  ${navLinks.map(([l, h]) => `<a href="${pre}${h}" data-menu-link class="text-white hover:text-[#00B4B4] text-xl tracking-widest uppercase font-bold transition-colors duration-300 cursor-pointer" tabindex="-1">${l}</a>`).join('\n  ')}
  <a href="${pre}#kontakt" data-menu-link tabindex="-1" class="whitespace-nowrap mt-2 px-6 py-3 bg-[#00B4B4] hover:bg-[#009999] text-white text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 cursor-pointer">Angebot anfragen</a>
</div>`;
}

function eyebrow(text, center = true) {
  return center
    ? `<div class="flex items-center justify-center gap-4 mb-6"><span class="w-16 h-px bg-gradient-to-r from-transparent to-[#00B4B4]"></span><span class="text-[#00B4B4] text-xs tracking-[0.4em] uppercase font-medium">${text}</span><span class="w-16 h-px bg-gradient-to-l from-transparent to-[#00B4B4]"></span></div>`
    : `<div class="flex items-center gap-3 mb-6"><span class="w-8 h-[1px] bg-[#00B4B4]"></span><span class="text-[#00B4B4] text-xs tracking-[0.4em] uppercase font-medium">${text}</span></div>`;
}

const waBtn = (label, extra = '') => `<a href="${WA}" target="_blank" rel="nofollow noopener noreferrer" class="${extra}"><i class="ri-whatsapp-line text-lg" aria-hidden="true"></i>${label}</a>`;

function footer(isHome) {
  const pre = isHome ? '' : '/';
  const links = [['Über uns', `${pre}#ueber-uns`], ['Leistungen', `${pre}#leistungen`], ['Schutzzonen', `${pre}#schutzzonen`], ['Galerie', `${pre}#galerie`], ['Kontakt', `${pre}#kontakt`], ['Impressum', '/impressum'], ['Datenschutz', '/datenschutz']];
  const sorted = [...D.cities].sort((a, b) => a.cityName.localeCompare(b.cityName, 'de'));
  return `<footer class="bg-[#050505] border-t border-[#1A1A1A]">
  <div class="max-w-7xl mx-auto px-6 py-16">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
      <div>
        <div class="mb-5">
          <span class="text-white font-bold text-base tracking-widest uppercase block">JAGIS</span>
          <span class="text-[#00B4B4] text-xs tracking-[0.3em] uppercase">Surface Protection Refinement</span>
        </div>
        <address class="not-italic text-[#B0B0B0]/60 text-sm leading-relaxed">
          ${STREET}<br>${ZIP} ${CITY}, NRW<br>
          <a href="tel:${PHONE_INTL}" class="hover:text-[#00B4B4] transition-colors duration-300 cursor-pointer" aria-label="JAGIS anrufen">${PHONE_DISPLAY}</a><br>
          <a href="mailto:${EMAIL}" class="hover:text-[#00B4B4] transition-colors duration-300 cursor-pointer break-all">${EMAIL}</a>
        </address>
        <div class="mt-5 w-12 h-px bg-[#00B4B4]/40"></div>
        <p class="mt-4 text-white/80 text-sm font-medium">Jetzt beraten lassen! Schutz, der bleibt.</p>
      </div>
      <nav aria-label="Standorte">
        <p class="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-6">Standorte</p>
        <ul class="grid grid-cols-1 gap-y-3">
          ${sorted.map((c) => `<li><a href="/lackschutzfolie-${c.slug}" class="text-[#B0B0B0]/60 hover:text-[#00B4B4] text-sm transition-colors duration-300 cursor-pointer">${c.cityName}</a></li>`).join('\n          ')}
        </ul>
      </nav>
      <nav aria-label="Footer Navigation">
        <p class="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-6">Navigation</p>
        <ul class="grid grid-cols-2 gap-x-4 gap-y-3">
          ${links.map(([l, h]) => `<li><a href="${h}" class="text-[#B0B0B0]/60 hover:text-[#00B4B4] text-sm transition-colors duration-300 cursor-pointer">${l}</a></li>`).join('\n          ')}
        </ul>
      </nav>
      <div>
        <p class="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-6">Direkter Kontakt</p>
        <p class="text-[#B0B0B0]/60 text-sm leading-relaxed mb-6">Schick uns Fotos deines Fahrzeugs – wir melden uns schnell mit einem Angebot.</p>
        ${waBtn('WhatsApp', 'whitespace-nowrap inline-flex items-center gap-2 px-4 sm:px-5 py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm tracking-widest uppercase font-bold rounded border border-[#25D366] hover:border-[#1ebe5d] transition-all duration-300 cursor-pointer max-w-full')}
      </div>
    </div>
  </div>
  <div class="border-t border-[#111111]">
    <div class="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="text-[#B0B0B0]/40 text-xs">&copy; 2026 JAGIS Surface Protection Refinement – Alle Rechte vorbehalten.</p>
      <p class="text-[#B0B0B0]/30 text-xs">Made with Passion in Witten.</p>
    </div>
  </div>
</footer>`;
}

function packageCard(p, i, withDesc = true) {
  const badge = p.highlight === 'Empfohlen'
    ? 'bg-[#00B4B4]/20 text-[#00B4B4] border border-[#00B4B4]/40'
    : 'bg-[#1F1F1F] text-[#B0B0B0]/60 border border-[#2A2A2A] group-hover:bg-[#00B4B4]/20 group-hover:text-[#00B4B4] group-hover:border-[#00B4B4]/40';
  const showDesc = withDesc || p.features.length === 0;
  return `<article class="reveal card relative group rounded-lg p-8 border cursor-default transition-all duration-700 border-[#2A2A2A] bg-[#141414] hover:border-[#00B4B4]/60 hover:bg-[#1A1A1A] hover:shadow-[0_20px_50px_rgba(0,180,180,0.15)] hover:-translate-y-2 flex flex-col" style="transition-delay:${i * 100}ms">
  <div class="absolute top-0 left-0 w-16 h-16 rounded-tl-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100" style="background:radial-gradient(circle at 0% 0%, rgba(0,180,180,0.15), transparent 70%)"></div>
  <div class="absolute top-4 right-4 px-3 py-1 rounded text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${badge}">${p.highlight}</div>
  <div class="w-14 h-14 flex items-center justify-center rounded-md mb-5 transition-all duration-300 bg-[#1F1F1F] group-hover:bg-[#00B4B4]/20"><i class="${p.icon} text-2xl transition-colors duration-300 text-[#B0B0B0] group-hover:text-[#00B4B4]" aria-hidden="true"></i></div>
  <h3 class="font-bold uppercase tracking-widest text-base mb-1 transition-colors duration-300 text-white group-hover:text-[#00B4B4]" style="letter-spacing:0.1em">${p.title}</h3>
  <p class="text-[#B0B0B0]/70 text-xs tracking-[0.15em] uppercase mb-4">${p.subtitle}</p>
  ${showDesc ? `<p class="text-[#B0B0B0] text-sm leading-relaxed mb-4" style="line-height:1.8">${p.description}</p>` : ''}
  ${p.features.length ? `<ul class="space-y-2 mb-5">${p.features.map((f) => `<li class="flex items-start gap-2 text-[#B0B0B0] text-sm"><span class="text-[#00B4B4] mt-0.5 flex-shrink-0" aria-hidden="true">·</span>${f}</li>`).join('')}</ul>` : ''}
  <div class="mt-auto pt-4 border-t border-[#222222]"><span class="text-[#00B4B4] font-bold text-lg">${p.price}</span><span class="text-[#B0B0B0]/50 text-xs ml-1">– je nach Fahrzeug</span></div>
  <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00B4B4] to-transparent rounded-b-lg transition-all duration-500 w-0 group-hover:w-full"></div>
</article>`;
}

function faqItem(f, i, idPrefix) {
  const id = `${idPrefix}-${i}`;
  return `<div class="reveal border-b border-[#1E1E1E] last:border-b-0 transition-all duration-700" style="transition-delay:${(i % 5) * 60}ms">
  <h3 class="m-0"><button type="button" class="faq-btn w-full flex items-center justify-between py-6 text-left group cursor-pointer" aria-expanded="false" aria-controls="${id}" id="${id}-btn">
    <span class="faq-q font-semibold text-base pr-8 transition-colors duration-300 text-[#E8E8E8] group-hover:text-[#00B4B4]">${f.q}</span>
    <span class="faq-icon w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 bg-white/5"><i class="ri-add-line text-[#00B4B4] text-lg" aria-hidden="true"></i></span>
  </button></h3>
  <div id="${id}" class="faq-panel" role="region" aria-labelledby="${id}-btn"><p class="text-[#A0A0A0] text-sm leading-relaxed pb-6 pr-12">${f.a}</p></div>
</div>`;
}

const mapCard = (pad = 'px-6') => `<div class="rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#111111]" style="height:240px">
  <div class="h-full flex flex-col items-center justify-center text-center ${pad}">
    <i class="ri-map-pin-2-line text-[#00B4B4] text-3xl mb-3" aria-hidden="true"></i>
    <p class="text-white text-sm font-bold mb-1">${NAME}</p>
    <p class="text-[#B0B0B0] text-xs mb-4">${STREET}, ${ZIP} ${CITY}</p>
    <a href="${MAPS}" target="_blank" rel="noopener" class="whitespace-nowrap px-5 py-2.5 border border-[#00B4B4]/40 text-[#00B4B4] hover:bg-[#00B4B4]/10 text-xs tracking-widest uppercase font-semibold rounded transition-all duration-300 cursor-pointer">Route planen</a>
  </div>
</div>`;

/* ---------------- Startseite ---------------- */
function home() {
  const title = 'Lackschutzfolie Witten | Steinschlagschutz & PPF – JAGIS';
  const description = 'Lackschutzfolierung in Witten: Frontpaket ab 850 €, Komplettschutz ab 3.500 €. Selbstheilend, in Glanz, Matt oder Satin Matt. Jetzt beraten lassen.';
  const graph = [business, website, webpage('/', title, description), breadcrumb([['Startseite', '/']]), faqPage(D.faqs, '/')];
  const h = head({ title, description, path: '/', graph, ogTitle: 'JAGIS Surface Protection Refinement | Lackschutzfolie Witten', preloadHero: true });

  const hero = `<header id="top" class="relative w-full overflow-hidden hero" aria-label="JAGIS – Lackschutzfolierung in Witten">
  <div class="absolute inset-0 w-full hero-bg" data-parallax>
    <picture>
      <source type="image/webp" srcset="/images/hero-1024.webp 1024w, /images/hero-1920.webp 1920w" sizes="100vw">
      <img src="/images/hero-1920.webp" alt="Lackschutzfolierung in Witten – JAGIS Steinschlagschutz für Fahrzeuge" class="w-full h-full object-cover object-center" width="1920" height="1072" loading="eager" fetchpriority="high" decoding="async">
    </picture>
    <div class="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/40 to-[#0A0A0A]/80"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/40"></div>
  </div>
  <div class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-6 pt-16 md:pt-32">
    <h1 class="hero-in font-extrabold text-white uppercase leading-tight transition-all duration-700" style="font-size:clamp(1.5rem, 5.5vw, 4.5rem);line-height:1.15;letter-spacing:0.02em;max-width:1100px;overflow-wrap:normal;transition-delay:100ms">
      Lackschutz&shy;folierung<br>in <span class="text-[#00B4B4] font-extrabold">Witten</span>
    </h1>
    <p class="hero-in mt-5 md:mt-8 text-[#B0B0B0] font-light leading-relaxed transition-all duration-700" style="font-size:clamp(0.9rem, 1.8vw, 1.15rem);max-width:620px;transition-delay:500ms">
      Aus neu bleibt neu. Hochwertige Lackschutzfolie gegen Steinschläge, Kratzer und Umwelteinflüsse – nahezu unsichtbar, in Glanz, Matt oder Satin Matt.
    </p>
    <div class="hero-in mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto transition-all duration-700" style="transition-delay:700ms">
      <a href="#kontakt" class="whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-3.5 md:px-10 md:py-4 bg-[#00B4B4] hover:bg-[#009999] text-white text-xs md:text-sm tracking-widest uppercase font-bold rounded border border-transparent transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,180,0.6)] hover:scale-105 cursor-pointer" aria-label="Jetzt Angebot für Lackschutzfolierung anfragen">Angebot anfragen</a>
      <a href="${WA}" target="_blank" rel="nofollow noopener noreferrer" class="whitespace-nowrap inline-flex items-center justify-center w-full sm:w-auto gap-2 px-4 py-3 sm:px-6 sm:py-3.5 md:px-10 md:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs md:text-sm tracking-widest uppercase font-bold rounded border border-[#25D366] hover:border-[#1ebe5d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 cursor-pointer"><i class="ri-whatsapp-line text-sm md:text-base" aria-hidden="true"></i><span class="sm:hidden">WhatsApp</span><span class="hidden sm:inline">Oder per WhatsApp</span></a>
    </div>
    <ul class="hero-in mt-10 md:mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 transition-all duration-700" style="transition-delay:1000ms" aria-label="Eigenschaften der Lackschutzfolie">
      ${D.trustFeatures.map((f, i) => `<li class="text-[#B0B0B0]/70 text-xs tracking-widest uppercase font-medium">${i > 0 ? '<span class="text-[#B0B0B0]/30 mx-2" aria-hidden="true">·</span>' : ''}${f}</li>`).join('')}
    </ul>
  </div>
  <a href="#ueber-uns" class="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#00B4B4]/70 hover:text-[#00B4B4] transition-all duration-300 cursor-pointer" aria-label="Nach unten scrollen">
    <span class="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
    <span class="w-5 h-8 border border-[#00B4B4]/40 rounded-full flex items-start justify-center pt-1.5"><span class="w-1 h-1.5 bg-[#00B4B4] rounded-full animate-bounce"></span></span>
  </a>
</header>`;

  const ueberUns = `<section id="ueber-uns" class="relative bg-[#111111] py-32 overflow-hidden" aria-labelledby="ueber-uns-titel">
  <div class="absolute inset-0 opacity-5" style="background-image:repeating-linear-gradient(45deg, #00B4B4 0px, #00B4B4 1px, transparent 1px, transparent 60px)"></div>
  <div class="relative max-w-7xl mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <div class="reveal reveal-left transition-all duration-1000">
        ${eyebrow('Unsere Geschichte', false)}
        <h2 id="ueber-uns-titel" class="text-white font-extrabold uppercase leading-tight mb-10" style="font-size:clamp(1.8rem, 3.5vw, 3rem);letter-spacing:0.02em">Schutz, den man sieht –<br><span class="text-[#00B4B4]">Wert, den man behält.</span></h2>
        <div class="space-y-6 text-[#B0B0B0] leading-[1.9]" style="font-size:1.05rem">
          <p>Alles begann mit der Liebe zum Auto. Was als Anspruch am eigenen Fahrzeug startete – ein Lack, der auch nach Jahren aussieht wie am ersten Tag – wurde schnell zur Berufung. Die Begeisterung für Präzision, Materialien und das perfekte Ergebnis war von Anfang an spürbar.</p>
          <p>Lackschutzfolie ist eine Materie für sich. Sie verlangt Erfahrung, ein Auge für jede Kante und Material, das den Namen verdient. Genau darauf haben wir uns spezialisiert – ausschließlich.</p>
          <p>Heute steht <strong class="text-white font-semibold">JAGIS Surface Protection Refinement</strong> für höchste Präzision, erstklassige Materialien und das Versprechen, jedes Fahrzeug so zu behandeln, als wäre es das eigene. Ob Neuwagen, Leasingfahrzeug oder Liebhaberauto: Mit hochwertiger Lackschutzfolie sicherst du dir den langfristigen Werterhalt deines Fahrzeugs.</p>
        </div>
        <div class="mt-10 w-24 h-0.5 bg-gradient-to-r from-[#00B4B4] to-transparent mx-auto md:mx-0"></div>
        <div class="mt-10 md:mt-12 flex flex-wrap justify-center md:justify-start gap-6 md:gap-12">
          ${[['100%', 'Premium-Folien'], ['3', 'Finish-Varianten'], ['NRW', 'Standort Witten']].map(([v, l]) => `<div class="text-center"><div class="text-[#00B4B4] font-extrabold text-xl md:text-2xl tracking-tight">${v}</div><div class="text-[#B0B0B0]/70 text-xs tracking-widest uppercase mt-1">${l}</div></div>`).join('')}
        </div>
      </div>
      <div class="reveal reveal-right relative transition-all duration-1000" style="transition-delay:300ms">
        <div class="relative rounded-lg overflow-hidden" style="aspect-ratio:3/4">
          <img src="/images/werkstatt.webp" alt="Präzise Verarbeitung von Lackschutzfolie in der JAGIS Werkstatt Witten" class="w-full h-full object-cover object-center" width="900" height="1200" loading="lazy" decoding="async">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 via-transparent to-transparent"></div>
        </div>
        <div class="absolute inset-0 border border-[#00B4B4]/20 rounded-lg pointer-events-none"></div>
        <div class="absolute -top-6 -left-2 sm:-left-6 bg-[#0A0A0A] border border-[#00B4B4]/40 rounded-lg p-4 backdrop-blur-sm">
          <div class="text-[#00B4B4] font-bold text-lg">JG</div>
          <div class="text-[#B0B0B0] text-[10px] tracking-widest uppercase mt-0.5">PPF Schutz</div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const sectionHead = (eb, h2, p, id, size = 'clamp(2rem, 4vw, 3.5rem)', ls = '0.05em', mb = 'mb-20') => `<div class="reveal text-center ${mb} transition-all duration-1000">
    ${eyebrow(eb)}
    <h2${id ? ` id="${id}"` : ''} class="text-white font-extrabold uppercase mb-6" style="font-size:${size};letter-spacing:${ls}">${h2}</h2>
    ${p ? `<p class="text-[#B0B0B0] text-lg font-light max-w-xl mx-auto leading-relaxed">${p}</p>` : ''}
  </div>`;

  const dots = `<div class="absolute inset-0 opacity-[0.03]" style="background-image:radial-gradient(circle, #00B4B4 1px, transparent 1px);background-size:50px 50px"></div>`;
  const lineTop = (o = '30') => `<div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/${o} to-transparent"></div>`;
  const lineBottom = `<div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/20 to-transparent"></div>`;

  const leistungen = `<section id="leistungen" class="relative bg-[#0A0A0A] py-32 overflow-hidden" aria-labelledby="leistungen-titel">
  ${dots}
  <div class="relative max-w-7xl mx-auto px-6">
    ${sectionHead('Was wir anbieten', 'Unsere <span class="text-[#00B4B4]">Pakete</span>', 'Lackschutz für jeden Anspruch – vom Basis-Schutz der Frontpartie bis zum Komplettschutz des gesamten Fahrzeugs. Jedes Paket auf Wunsch in Glanz, Matt oder Satin Matt.', 'leistungen-titel')}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${D.packages.map((p, i) => packageCard(p, i)).join('\n')}
    </div>
    <div class="text-center mt-10"><p class="text-[#B0B0B0]/60 text-sm font-light">Alle Preise sind Startpreise inkl. MwSt. und richten sich nach Fahrzeugmodell, Größe und Aufwand. Nach kurzer Beratung bekommst du ein verbindliches Angebot.</p></div>
    <div class="text-center mt-8 md:mt-12">
      ${waBtn('Direkt per WhatsApp', 'whitespace-nowrap inline-flex items-center gap-2 px-4 sm:px-6 md:px-10 py-3.5 md:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm tracking-widest uppercase font-bold rounded border border-[#25D366] hover:border-[#1ebe5d] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 cursor-pointer max-w-full')}
    </div>
  </div>
</section>`;

  const schutzzonen = `<section id="schutzzonen" class="relative bg-[#0D0D0D] py-32 overflow-hidden" aria-labelledby="schutzzonen-titel">
  ${lineTop()}
  <div class="relative max-w-7xl mx-auto px-6">
    ${sectionHead('Einzeln oder als Paket', 'Du musst nicht gleich das <span class="text-[#00B4B4]">ganze Fahrzeug</span> schützen.', 'Manche Stellen nehmen im Alltag am meisten ab – oft, ohne dass man es merkt. Genau diese Bereiche kannst du auch einzeln schützen lassen. Ideal für Leasingfahrzeuge, Neuwagen und alle, die gezielt dort ansetzen wollen, wo Schäden wirklich entstehen.', 'schutzzonen-titel')}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${D.schutzzonen.map((z, i) => `<article class="reveal card relative group rounded-lg p-8 border cursor-default transition-all duration-700 border-[#2A2A2A] bg-[#141414] hover:border-[#00B4B4]/60 hover:bg-[#1A1A1A] hover:shadow-[0_20px_50px_rgba(0,180,180,0.15)] hover:-translate-y-2" style="transition-delay:${i * 100}ms">
        <div class="absolute top-0 left-0 w-16 h-16 rounded-tl-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100" style="background:radial-gradient(circle at 0% 0%, rgba(0,180,180,0.15), transparent 70%)"></div>
        <div class="w-14 h-14 flex items-center justify-center rounded-md mb-6 transition-all duration-300 bg-[#1F1F1F] group-hover:bg-[#00B4B4]/20"><i class="${z.icon} text-2xl transition-colors duration-300 text-[#B0B0B0] group-hover:text-[#00B4B4]" aria-hidden="true"></i></div>
        <h3 class="font-bold uppercase tracking-widest text-base mb-4 transition-colors duration-300 text-white group-hover:text-[#00B4B4]" style="letter-spacing:0.1em">${z.title}</h3>
        <p class="text-[#B0B0B0] text-sm leading-relaxed" style="line-height:1.8">${z.description}</p>
        <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00B4B4] to-transparent rounded-b-lg transition-all duration-500 w-0 group-hover:w-full"></div>
      </article>`).join('\n      ')}
    </div>
    <div class="mt-12">
      <div class="relative rounded-lg border-2 border-[#00B4B4]/40 bg-[#0D0D0D] p-8 md:p-10 overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-[0.04]" style="background:radial-gradient(circle at 30% 50%, #00B4B4 0%, transparent 60%)"></div>
        <div class="absolute top-4 right-4 px-3 py-1 rounded text-[10px] tracking-[0.2em] uppercase font-semibold bg-[#00B4B4]/20 text-[#00B4B4] border border-[#00B4B4]/40">Empfohlen</div>
        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 class="text-white font-bold uppercase tracking-widest text-lg mb-2">Komfortpaket</h3>
            <p class="text-[#B0B0B0] text-sm leading-relaxed">Ladekante, Türeinstiege, Türgriffmulden und Einstiegsleisten in einem Paket.</p>
          </div>
          <div class="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
            <span class="text-[#00B4B4] font-extrabold text-2xl">ab 399 €</span>
            <span class="text-[#B0B0B0]/50 text-xs line-through">statt 650 €</span>
          </div>
        </div>
        <div class="relative z-10 mt-6">
          <a href="#kontakt" class="whitespace-nowrap inline-flex items-center px-6 py-3 bg-[#00B4B4] hover:bg-[#009999] text-white text-xs sm:text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,180,180,0.4)] cursor-pointer">Schutzzonen zusammenstellen</a>
        </div>
      </div>
    </div>
  </div>
  ${lineBottom}
</section>`;

  const finish = `<section id="finish" class="relative bg-[#0A0A0A] py-32 overflow-hidden" aria-labelledby="finish-titel">
  ${dots}
  <div class="relative max-w-7xl mx-auto px-6">
    ${sectionHead('Dein Finish', 'Gleicher Schutz.<br><span class="text-[#00B4B4]">Drei Erscheinungs&shy;bilder.</span>', 'Die Schutzwirkung ist immer dieselbe – den Unterschied macht die Oberfläche.', 'finish-titel')}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      ${D.finishes.map((f, i) => `<article class="reveal card relative group rounded-lg border transition-all duration-700 overflow-hidden flex flex-col bg-[#141414] border-[#2A2A2A] hover:border-[#00B4B4]/60 hover:shadow-[0_20px_50px_rgba(0,180,180,0.15)] hover:-translate-y-2" style="transition-delay:${i * 150}ms">
        <div class="relative overflow-hidden" style="aspect-ratio:4/3">
          <img src="/images/${f.img}" alt="${f.title} Lackschutzfolie – JAGIS Lackschutzfolierung Witten" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" width="800" height="600" loading="lazy" decoding="async">
          <div class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent"></div>
        </div>
        <div class="relative p-8 bg-[#141414] flex-1">
          <div class="absolute top-0 left-0 w-16 h-16 transition-opacity duration-500 opacity-0 group-hover:opacity-100" style="background:radial-gradient(circle at 0% 0%, rgba(0,180,180,0.15), transparent 70%)"></div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 flex items-center justify-center rounded-md transition-all duration-300 bg-[#1F1F1F] group-hover:bg-[#00B4B4]/20"><i class="${f.icon} text-xl transition-colors duration-300 text-[#B0B0B0] group-hover:text-[#00B4B4]" aria-hidden="true"></i></div>
            <h3 class="font-bold uppercase tracking-widest text-base transition-colors duration-300 text-white group-hover:text-[#00B4B4]" style="letter-spacing:0.1em">${f.title}</h3>
          </div>
          <p class="text-[#B0B0B0] text-sm leading-relaxed" style="line-height:1.8">${f.description}</p>
          <div class="mt-6 h-0.5 bg-gradient-to-r from-[#00B4B4] to-transparent transition-all duration-500 w-12 group-hover:w-full"></div>
        </div>
      </article>`).join('\n      ')}
    </div>
    <p class="text-center mt-10 text-[#B0B0B0]/60 text-sm font-light">Alle Finishes sind selbstheilend, UV-beständig und pflegeleicht. Farbige Schutzfolien auf Anfrage.</p>
  </div>
</section>`;

  const vorteile = `<section id="vorteile" class="relative bg-[#0D0D0D] py-32 overflow-hidden" aria-labelledby="vorteile-titel">
  ${lineTop()}
  <div class="max-w-7xl mx-auto px-6">
    ${sectionHead('Die Vorteile', 'Warum <span class="text-[#00B4B4]">Lack&shy;schutz&shy;folie?</span>', 'Sechs Gründe, warum immer mehr Fahrzeugbesitzer auf Steinschlagschutz setzen.', 'vorteile-titel')}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      ${D.advantages.map((a, i) => `<article class="reveal card group relative p-8 rounded-lg border transition-all duration-700 cursor-default border-[#222222] bg-[#111111] hover:border-[#00B4B4]/40 hover:bg-[#161616] hover:-translate-y-1" style="transition-delay:${i * 80}ms">
        <div class="absolute top-0 left-8 h-0.5 bg-[#00B4B4] transition-all duration-500 w-0 group-hover:w-16"></div>
        <div class="flex items-start gap-5">
          <div class="w-12 h-12 flex items-center justify-center rounded-md flex-shrink-0 transition-all duration-300 bg-[#1A1A1A] group-hover:bg-[#00B4B4]/15"><i class="${a.icon} text-xl transition-colors duration-300 text-[#B0B0B0] group-hover:text-[#00B4B4]" aria-hidden="true"></i></div>
          <div>
            <h3 class="font-bold text-sm tracking-widest uppercase mb-2 transition-colors duration-300 text-white group-hover:text-[#00B4B4]">${a.title}</h3>
            <p class="text-[#B0B0B0] text-sm leading-relaxed">${a.desc}</p>
          </div>
        </div>
      </article>`).join('\n      ')}
    </div>
  </div>
  ${lineBottom}
</section>`;

  const galerie = `<section id="galerie" class="relative bg-[#0A0A0A] py-32 overflow-hidden" aria-labelledby="galerie-titel">
  <div class="max-w-7xl mx-auto px-6">
    ${sectionHead('Galerie', 'Unsere Arbeiten<br><span class="text-[#00B4B4]">sprechen für sich.</span>', '', 'galerie-titel', 'clamp(1.8rem, 4vw, 3.2rem)', '0.04em', 'mb-16').replace('</h2>\n    \n', '</h2>\n    <p class="text-[#B0B0B0] font-light max-w-xl mx-auto leading-relaxed">Jedes Fahrzeug erzählt seine eigene Geschichte. Hier erzählen wir sie.</p>\n')}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" data-gallery>
      ${D.gallery.map((g, i) => {
        const square = i % 2 === 1;
        return `<button type="button" data-index="${i}" data-full="/images/galerie-${g.slug}-1600.webp" data-label="${esc(g.label)}" class="group relative overflow-hidden rounded-lg cursor-pointer block w-full p-0 border-0 bg-[#111111]" style="aspect-ratio:${square ? '1/1' : '4/3'}" aria-label="Bild vergrößern: ${esc(g.label)}">
        <img src="/images/galerie-${g.slug}-800.webp" alt="${esc(g.label)} – Lackschutzfolierung von JAGIS in Witten" class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" width="800" height="1067" loading="lazy" decoding="async">
        <span class="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"></span>
        <span class="absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 text-left">
          <span class="text-white text-xs tracking-widest uppercase font-semibold">${g.label}</span>
          <span class="w-8 h-8 flex items-center justify-center bg-[#00B4B4]/90 rounded-full flex-shrink-0"><i class="ri-zoom-in-line text-white text-sm" aria-hidden="true"></i></span>
        </span>
        <span class="absolute inset-0 border border-[#00B4B4]/0 group-hover:border-[#00B4B4]/40 rounded-lg transition-all duration-500"></span>
      </button>`;
      }).join('\n      ')}
    </div>
  </div>
  <div class="lightbox fixed inset-0 z-[60] bg-[#0A0A0A]/[0.97] items-center justify-center backdrop-blur-sm hidden" data-lightbox role="dialog" aria-modal="true" aria-label="Bildansicht">
    <div class="relative max-w-5xl max-h-[90vh] w-full mx-6" data-lightbox-inner>
      <img alt="" class="w-full max-h-[80vh] object-contain rounded-lg" width="1200" height="1600" data-lightbox-img>
      <p class="text-center text-[#00B4B4] text-sm tracking-widest uppercase mt-4" data-lightbox-label></p>
      <button type="button" data-lightbox-close class="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center text-[#B0B0B0] hover:text-white transition-colors cursor-pointer" aria-label="Schließen"><i class="ri-close-line text-2xl" aria-hidden="true"></i></button>
      <button type="button" data-lightbox-prev class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#1A1A1A]/80 hover:bg-[#00B4B4] rounded-full border border-[#00B4B4]/30 text-white transition-all duration-300 cursor-pointer" aria-label="Vorheriges Bild"><i class="ri-arrow-left-s-line text-xl" aria-hidden="true"></i></button>
      <button type="button" data-lightbox-next class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#1A1A1A]/80 hover:bg-[#00B4B4] rounded-full border border-[#00B4B4]/30 text-white transition-all duration-300 cursor-pointer" aria-label="Nächstes Bild"><i class="ri-arrow-right-s-line text-xl" aria-hidden="true"></i></button>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2" data-lightbox-dots>
        ${D.gallery.map((_, i) => `<button type="button" data-dot="${i}" class="h-1.5 rounded-full transition-all duration-300 cursor-pointer w-1.5 bg-[#B0B0B0]/40" aria-label="Bild ${i + 1}"></button>`).join('')}
      </div>
    </div>
  </div>
</section>`;

  const ablauf = `<section id="ablauf" class="relative py-32 bg-[#111111]" aria-labelledby="ablauf-titel">
  <div class="absolute top-0 left-0 w-full" style="height:1px;background:linear-gradient(to right, transparent, rgba(0,180,180,0.25), transparent)"></div>
  <div class="max-w-7xl mx-auto px-6">
    <div class="reveal text-center mb-20 transition-all duration-1000">
      ${eyebrow('Unser Prozess')}
      <h2 id="ablauf-titel" class="font-extrabold uppercase text-white" style="font-size:clamp(1.8rem, 4vw, 3.2rem);letter-spacing:0.04em">In 4 Schritten zum <span class="text-[#00B4B4]">dauerhaften Schutz.</span></h2>
    </div>
    <div class="relative">
      <div class="hidden lg:block absolute left-[12.5%] right-[12.5%]" style="top:calc(4rem + 0.75rem + 2.5rem);height:1px;background:linear-gradient(to right, transparent, rgba(0,180,180,0.4), transparent)"></div>
      <ol class="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-6">
        ${D.steps.map((s, i) => `<li class="reveal flex flex-col items-center text-center transition-all duration-700" style="transition-delay:${i * 150}ms">
          <div class="mb-3"><span class="font-extrabold select-none" style="font-size:4rem;line-height:1;color:rgba(0,180,180,0.12)" aria-hidden="true">${s.number}</span></div>
          <div class="relative w-20 h-20 flex items-center justify-center rounded-full mb-6" style="border:2px solid rgba(0,180,180,0.4);background:#0A0A0A">
            <div class="w-14 h-14 flex items-center justify-center rounded-full" style="background:rgba(0,180,180,0.08);border:1px solid rgba(0,180,180,0.3)"><i class="${s.icon} text-2xl text-[#00B4B4]" aria-hidden="true"></i></div>
          </div>
          <span class="text-xs tracking-[0.3em] uppercase font-medium mb-3 block text-[#00B4B4]">Schritt ${s.number}</span>
          <h3 class="font-bold text-base tracking-widest uppercase mb-4 text-white">${s.title}</h3>
          <p class="text-sm leading-relaxed max-w-[240px] text-[#B0B0B0]">${s.desc}</p>
          ${i < D.steps.length - 1 ? '<div class="lg:hidden mt-8 mx-auto" style="width:1px;height:40px;background:linear-gradient(to bottom, rgba(0,180,180,0.4), transparent)" aria-hidden="true"></div>' : ''}
        </li>`).join('\n        ')}
      </ol>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 w-full" style="height:1px;background:linear-gradient(to right, transparent, rgba(0,180,180,0.2), transparent)"></div>
</section>`;

  const testimonials = `<section id="kundenstimmen" class="relative bg-[#0A0A0A] py-32 overflow-hidden" aria-labelledby="kundenstimmen-titel">
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent"></div>
  <div class="relative max-w-7xl mx-auto px-6">
    <div class="reveal text-center mb-16 transition-all duration-1000">
      ${eyebrow('Google Bewertungen')}
      <h2 id="kundenstimmen-titel" class="text-white font-extrabold uppercase" style="font-size:clamp(1.8rem, 4vw, 3rem);letter-spacing:0.04em">Das sagen <span class="text-[#00B4B4]">unsere Kunden.</span></h2>
    </div>
    <div class="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000">
      ${D.reviews.map((r) => `<figure class="bg-[#141414] border border-[#2A2A2A] rounded-lg p-6 flex flex-col hover:border-[#3A3A3A] transition-all duration-300">
        <figcaption class="flex items-center gap-2 mb-4">
          <span class="w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0"><span class="text-[#0A0A0A] font-bold text-sm leading-none">G</span></span>
          <span class="flex flex-col leading-tight"><span class="text-white text-xs font-semibold">${r.name}</span><span class="text-[#6B6B6B] text-[11px]">${r.date}</span></span>
        </figcaption>
        <div class="flex items-center gap-0.5 mb-3" role="img" aria-label="5 von 5 Sternen">${'<i class="ri-star-fill text-[#FBBC04] text-sm" aria-hidden="true"></i>'.repeat(5)}</div>
        <blockquote class="text-[#B0B0B0] text-sm leading-relaxed flex-1">${r.text}</blockquote>
        <div class="mt-4 pt-3 border-t border-[#2A2A2A] flex items-center gap-1.5"><span class="text-[#6B6B6B] text-[11px]">Gepostet auf</span><span class="text-[#6B6B6B] text-[11px] font-medium">Google</span></div>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>`;

  const faq = `<section id="faq" class="relative bg-[#080808] py-32" aria-labelledby="faq-titel">
  <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/20 to-transparent"></div>
  <div class="absolute right-0 top-1/2 w-96 h-96 rounded-full pointer-events-none" style="background:radial-gradient(circle, rgba(0,180,180,0.04) 0%, transparent 70%);transform:translateY(-50%)"></div>
  <div class="max-w-6xl mx-auto px-6">
    <div class="reveal text-center mb-16 transition-all duration-1000">
      ${eyebrow('FAQ')}
      <h2 id="faq-titel" class="text-white font-extrabold uppercase mb-5" style="font-size:clamp(2rem, 4vw, 3.2rem);letter-spacing:0.05em">Häufige <span class="text-[#00B4B4]">Fragen</span></h2>
      <p class="text-[#B0B0B0] text-base font-light max-w-xl mx-auto leading-relaxed">Alles was du über Lackschutzfolierung wissen musst – ehrlich und direkt beantwortet.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div class="bg-[#0F0F0F] rounded-xl border border-[#1A1A1A] px-6 md:px-8">${D.faqs.slice(0, 5).map((f, i) => faqItem(f, i, 'faq')).join('')}</div>
      <div class="bg-[#0F0F0F] rounded-xl border border-[#1A1A1A] px-6 md:px-8">${D.faqs.slice(5).map((f, i) => faqItem(f, i + 5, 'faq')).join('')}</div>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/20 to-transparent"></div>
</section>`;

  const card = 'reveal card relative group rounded-lg p-8 border transition-all duration-700 border-[#2A2A2A] bg-[#141414] hover:border-[#00B4B4]/60 hover:bg-[#1A1A1A] hover:shadow-[0_20px_50px_rgba(0,180,180,0.15)] hover:-translate-y-2 flex flex-col';
  const outlineBtn = 'whitespace-nowrap mt-auto inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 border border-[#00B4B4]/40 text-[#00B4B4] hover:bg-[#00B4B4]/10 text-xs sm:text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 cursor-pointer';
  const contactCard = ({ icon, iconBox, title, text, value, href, btn, btnClass, ext, delay }) => `<article class="${card}" style="transition-delay:${delay}ms">
        <div class="absolute top-0 left-0 w-16 h-16 rounded-tl-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100" style="background:radial-gradient(circle at 0% 0%, rgba(0,180,180,0.15), transparent 70%)"></div>
        <div class="w-14 h-14 flex items-center justify-center rounded-md mb-6 ${iconBox}"><i class="${icon} text-2xl" aria-hidden="true"></i></div>
        <h3 class="font-bold uppercase tracking-widest text-base mb-3 text-white group-hover:text-[#00B4B4] transition-colors duration-300" style="letter-spacing:0.1em">${title}</h3>
        <p class="text-[#B0B0B0] text-sm leading-relaxed mb-5" style="line-height:1.8">${text}</p>
        <a href="${href}"${ext ? ' target="_blank" rel="nofollow noopener noreferrer"' : ''} class="text-white font-semibold text-base mb-6 hover:text-[#00B4B4] transition-colors duration-300 break-all">${value}</a>
        <a href="${href}"${ext ? ' target="_blank" rel="nofollow noopener noreferrer"' : ''} class="${btnClass}">${btn}</a>
        <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00B4B4] to-transparent rounded-b-lg transition-all duration-500 w-0 group-hover:w-full"></div>
      </article>`;
  const kontakt = `<section id="kontakt" class="relative bg-[#0D0D0D] py-32 overflow-hidden" aria-labelledby="kontakt-titel">
  ${lineTop()}
  <div class="max-w-7xl mx-auto px-6">
    <div class="reveal text-center mb-20 transition-all duration-1000">
      ${eyebrow('Kontakt')}
      <h2 id="kontakt-titel" class="text-white font-extrabold uppercase mb-6" style="font-size:clamp(1.8rem, 4vw, 3.2rem);letter-spacing:0.04em">Bereit für <span class="text-[#00B4B4]">dauerhaften Schutz?</span></h2>
      <p class="text-[#B0B0B0] font-light max-w-xl mx-auto leading-relaxed">Schick uns eine Nachricht – am besten direkt per WhatsApp. Wir antworten schnell und erstellen dir ein individuelles Angebot.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${contactCard({ icon: 'ri-whatsapp-line', iconBox: 'bg-[#25D366]/15 text-[#25D366]', title: 'WhatsApp', text: 'Der schnellste Weg: Schick uns Fotos deines Fahrzeugs und sag uns, welche Bereiche du schützen willst.', value: PHONE_DISPLAY, href: WA, ext: true, delay: 0,
        btn: '<i class="ri-whatsapp-line text-lg" aria-hidden="true"></i>Per WhatsApp schreiben', btnClass: 'whitespace-nowrap mt-auto inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs sm:text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer' })}
      ${contactCard({ icon: 'ri-phone-line', iconBox: 'bg-[#00B4B4]/10 text-[#00B4B4]', title: 'Telefon', text: 'Lieber persönlich? Ruf an – wir beraten dich zu Paket, Finish und Termin.', value: PHONE_DISPLAY, href: `tel:${PHONE_INTL}`, ext: false, delay: 100,
        btn: '<i class="ri-phone-line text-lg" aria-hidden="true"></i>Jetzt anrufen', btnClass: outlineBtn })}
      ${contactCard({ icon: 'ri-mail-line', iconBox: 'bg-[#00B4B4]/10 text-[#00B4B4]', title: 'E-Mail', text: 'Schreib uns mit Fahrzeugmodell und Wunschpaket – gern auch mit Fotos im Anhang.', value: EMAIL, href: `mailto:${EMAIL}?subject=${encodeURIComponent('Anfrage Lackschutzfolierung')}`, ext: false, delay: 200,
        btn: '<i class="ri-mail-line text-lg" aria-hidden="true"></i>E-Mail schreiben', btnClass: outlineBtn })}
    </div>
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="reveal bg-[#111111] border border-[#1E1E1E] rounded-lg p-8 transition-all duration-700">
        <h3 class="text-white font-bold uppercase tracking-widest text-sm mb-6">Für dein Angebot brauchen wir</h3>
        <ul class="space-y-4">
          ${[['ri-car-line', 'Fahrzeugmodell und Baujahr'], ['ri-shield-check-line', 'Gewünschtes Paket oder einzelne Schutzzonen'], ['ri-contrast-drop-2-line', 'Finish: Glanz, Matt oder Satin Matt'], ['ri-camera-line', 'Ein paar Fotos deines Fahrzeugs']].map(([i, t]) => `<li class="flex items-center gap-4 text-[#B0B0B0] text-sm"><span class="w-10 h-10 flex items-center justify-center rounded-md bg-[#00B4B4]/10 border border-[#00B4B4]/20 flex-shrink-0"><i class="${i} text-[#00B4B4] text-lg" aria-hidden="true"></i></span>${t}</li>`).join('\n          ')}
        </ul>
      </div>
      <div class="reveal transition-all duration-700" style="transition-delay:150ms">
        <div class="h-full rounded-lg border border-[#1E1E1E] bg-[#111111] p-8 flex flex-col items-center justify-center text-center">
          <i class="ri-map-pin-2-line text-[#00B4B4] text-3xl mb-3" aria-hidden="true"></i>
          <p class="text-white text-sm font-bold mb-1">${NAME}</p>
          <p class="text-[#B0B0B0] text-sm mb-2">${STREET}, ${ZIP} ${CITY}</p>
          <p class="text-[#6B6B6B] text-xs leading-relaxed mb-6 max-w-sm">Termine nach Vereinbarung. Hol- und Bringservice für Essen, Wuppertal, Solingen und Düsseldorf auf Anfrage.</p>
          <a href="${MAPS}" target="_blank" rel="noopener" class="whitespace-nowrap px-5 py-2.5 border border-[#00B4B4]/40 text-[#00B4B4] hover:bg-[#00B4B4]/10 text-xs tracking-widest uppercase font-semibold rounded transition-all duration-300 cursor-pointer">Route planen</a>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const body = `<body class="bg-[#0A0A0A] text-white antialiased">
${navbar(true)}
<main id="inhalt">
${hero}
${ueberUns}
${leistungen}
${schutzzonen}
${finish}
${vorteile}
${galerie}
${ablauf}
${testimonials}
${faq}
${kontakt}
</main>
${footer(true)}
</body>
</html>`;
  out('index.html', `${h}\n${body}`);
}

/* ---------------- Standortseiten ---------------- */
function locationNav() {
  return `<a href="#inhalt" class="skip-link">Zum Inhalt springen</a>
<nav aria-label="Hauptnavigation" class="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#00B4B4]/20 h-16">
  <div class="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between">
    <a href="/" class="flex items-center cursor-pointer group shrink-0" aria-label="Zur Startseite">
      <span class="text-white font-bold text-lg tracking-widest uppercase">JAGIS</span>
      <span class="text-[#00B4B4] text-xs tracking-[0.3em] uppercase ml-2 hidden sm:inline">Surface Protection</span>
    </a>
    <div class="flex items-center gap-4">
      <a href="/" class="hidden sm:inline text-[#B0B0B0] hover:text-[#00B4B4] text-xs tracking-widest uppercase font-medium transition-colors duration-300 cursor-pointer">Startseite</a>
      <a href="/#kontakt" class="whitespace-nowrap px-4 py-2 bg-[#00B4B4] hover:bg-[#009999] text-white text-xs tracking-widest uppercase font-semibold rounded transition-all duration-300 cursor-pointer">Angebot anfragen</a>
    </div>
  </div>
</nav>`;
}

function location(c) {
  const path = `/lackschutzfolie-${c.slug}`;
  const graph = [
    business, website,
    webpage(path, c.title, c.description, { breadcrumb: { '@id': `${SITE}${path}#breadcrumb` } }),
    { ...breadcrumb([['Startseite', '/'], [`Lackschutzfolie ${c.cityName}`, path]]), '@id': `${SITE}${path}#breadcrumb` },
    {
      '@type': 'Service', '@id': `${SITE}${path}#service`, name: `Lackschutzfolierung für ${c.cityName}`, serviceType: 'Lackschutzfolierung (PPF)',
      description: c.description, provider: { '@id': BIZ_ID }, areaServed: { '@type': 'City', name: c.cityName },
      offers: D.packages.map((p) => ({ '@type': 'Offer', name: p.title, priceSpecification: { '@type': 'PriceSpecification', minPrice: p.min, priceCurrency: 'EUR', valueAddedTaxIncluded: true } })),
    },
    faqPage(D.locationFaqs, path),
  ];
  const h = head({ title: c.title, description: c.description, path, graph });
  const others = D.cities.filter((o) => o.slug !== c.slug);
  const body = `<body class="bg-[#0A0A0A] text-white antialiased">
${locationNav()}
<main id="inhalt">
  <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#0A0A0A] overflow-hidden">
    <div class="absolute inset-0 opacity-[0.02]" style="background-image:radial-gradient(circle, #00B4B4 1px, transparent 1px);background-size:40px 40px"></div>
    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <div class="reveal transition-all duration-1000">
        <nav aria-label="Brotkrumen" class="mb-6 text-[11px] tracking-widest uppercase text-[#6B6B6B]"><a href="/" class="hover:text-[#00B4B4]">Startseite</a> <span aria-hidden="true">/</span> <span class="text-[#B0B0B0]">Lackschutzfolie ${c.cityName}</span></nav>
        <div class="flex items-center justify-center gap-3 mb-6"><span class="w-12 h-px bg-[#00B4B4]/60"></span><span class="text-[#00B4B4] text-xs tracking-[0.4em] uppercase font-medium">Lackschutzfolierung</span><span class="w-12 h-px bg-[#00B4B4]/60"></span></div>
        <h1 class="text-white font-extrabold uppercase leading-tight mb-6" style="font-size:clamp(1.5rem, 6.4vw, 3.5rem);letter-spacing:0.02em">Lackschutz&shy;folierung<br>in <span class="text-[#00B4B4] font-extrabold">${c.cityName}</span></h1>
        <p class="text-[#B0B0B0] text-lg font-light max-w-xl mx-auto leading-relaxed mb-8">Du kommst aus ${c.cityName} und willst den Lack deines Fahrzeugs dauerhaft schützen? Unsere Werkstatt in Witten erreichst du in rund ${c.fahrzeit.replace('~', '')} über die ${c.route}. Wir sind auf Lackschutzfolie spezialisiert – ausschließlich. Kein Nebengeschäft.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          ${waBtn('Per WhatsApp anfragen', 'whitespace-nowrap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer')}
          <a href="tel:${PHONE_INTL}" class="whitespace-nowrap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 border border-[#00B4B4]/40 text-[#00B4B4] hover:bg-[#00B4B4]/10 text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 cursor-pointer"><i class="ri-phone-line text-lg" aria-hidden="true"></i>Anrufen</a>
        </div>
      </div>
    </div>
  </section>

  <section class="relative py-20 md:py-28 bg-[#111111]">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/30 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-6">
      <div class="reveal transition-all duration-1000">
        <h2 class="text-white font-extrabold uppercase mb-8" style="font-size:clamp(1.6rem, 3vw, 2.4rem);letter-spacing:0.04em">Steinschlagschutz für Fahrzeuge aus <span class="text-[#00B4B4]">${c.cityName}</span></h2>
        <p class="text-[#B0B0B0] text-base leading-relaxed mb-4">Wer regelmäßig auf der ${c.route} unterwegs ist, kennt das: Rollsplitt, Baustellen, aufgewirbelte Steine. Jeder Einschlag kostet Lack – und beim Wiederverkauf oder bei der Leasingrückgabe bares Geld. Eine Lackschutzfolie fängt das ab, bevor es den Lack erreicht.</p>
        <p class="text-[#B0B0B0] text-base leading-relaxed">Als spezialisierter PPF-Folierer mit Standort in Witten schützen wir Fahrzeuge aus ${c.cityName} und dem gesamten Ruhrgebiet mit hochwertiger Lackschutzfolie. Selbstheilend, UV-beständig und in drei Finishes erhältlich – Glanz, Matt und Satin Matt.</p>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/20 to-transparent"></div>
  </section>

  <section class="relative py-20 md:py-28 bg-[#0A0A0A]">
    <div class="max-w-6xl mx-auto px-6">
      <div class="reveal text-center mb-14 transition-all duration-1000">
        <h2 class="text-white font-extrabold uppercase mb-6" style="font-size:clamp(1.8rem, 4vw, 3rem);letter-spacing:0.04em">Unsere <span class="text-[#00B4B4]">Pakete</span></h2>
        <p class="text-[#B0B0B0] text-lg font-light max-w-xl mx-auto leading-relaxed">Lackschutz für jeden Anspruch – vom Basis-Schutz der Frontpartie bis zum Komplettschutz. Auf Wunsch in Glanz, Matt oder Satin Matt.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${D.packages.map((p, i) => packageCard(p, i, false)).join('\n')}
      </div>
      <p class="text-center mt-8 text-[#B0B0B0]/60 text-sm font-light">Alle Preise sind Startpreise inkl. MwSt. und richten sich nach Fahrzeugmodell, Größe und Aufwand. <a href="/#schutzzonen" class="text-[#00B4B4] hover:underline">Einzelne Schutzzonen ansehen</a>.</p>
    </div>
  </section>

  <section class="relative py-20 md:py-28 bg-[#0D0D0D]">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/30 to-transparent"></div>
    <div class="max-w-4xl mx-auto px-6">
      <div class="reveal transition-all duration-1000">
        <h2 class="text-white font-extrabold uppercase mb-8" style="font-size:clamp(1.6rem, 3vw, 2.4rem);letter-spacing:0.04em">Anfahrt aus <span class="text-[#00B4B4]">${c.cityName}</span></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4 text-[#B0B0B0] text-base leading-relaxed">
            <p>Von ${c.cityName} aus erreichst du unsere Werkstatt in Witten in etwa <strong class="text-white">${c.fahrzeit.replace('~', '')}</strong> über die <strong class="text-white">${c.route}</strong>. Die genaue Adresse lautet ${STREET}, ${ZIP} ${CITY}.</p>
            <p>Kostenlose Parkplätze sind direkt vor der Werkstatt vorhanden. Wir empfehlen eine vorherige Terminvereinbarung per WhatsApp oder Telefon – so können wir uns voll auf dein Fahrzeug konzentrieren und Wartezeiten vermeiden.</p>
            ${c.hasHolBring ? `<div class="mt-6 p-6 rounded-lg border border-[#00B4B4]/30 bg-[#00B4B4]/5">
              <h3 class="text-[#00B4B4] font-bold uppercase tracking-widest text-sm mb-3"><i class="ri-truck-line mr-2" aria-hidden="true"></i>Hol- und Bringservice für ${c.cityName}</h3>
              <p class="text-[#B0B0B0] text-sm leading-relaxed">Der Weg zu uns ist dir zu weit? Auf Anfrage holen wir dein Fahrzeug in ${c.cityName} ab und bringen es dir fertig geschützt zurück. Du gibst den Schlüssel ab und bekommst dein Auto wieder – der Rest liegt bei uns.</p>
            </div>` : ''}
          </div>
          ${mapCard('px-4')}
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/20 to-transparent"></div>
  </section>

  <section class="relative py-20 md:py-28 bg-[#0A0A0A]">
    <div class="max-w-4xl mx-auto px-6">
      <div class="reveal transition-all duration-1000">
        <h2 class="text-white font-extrabold uppercase mb-10 text-center" style="font-size:clamp(1.6rem, 3vw, 2.4rem);letter-spacing:0.04em">Häufige Fragen aus <span class="text-[#00B4B4]">${c.cityName}</span></h2>
        <div class="bg-[#0F0F0F] rounded-xl border border-[#1A1A1A] px-6 md:px-8">${D.locationFaqs.map((f, i) => faqItem(f, i, 'lfaq')).join('')}</div>
      </div>
    </div>
  </section>

  <section class="relative py-16 bg-[#0D0D0D]">
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00B4B4]/30 to-transparent"></div>
    <div class="max-w-3xl mx-auto px-6 text-center">
      <h2 class="text-white font-extrabold uppercase mb-6" style="font-size:clamp(1.4rem, 3vw, 2rem);letter-spacing:0.04em">Bereit für <span class="text-[#00B4B4]">dauerhaften Lackschutz</span>?</h2>
      <p class="text-[#B0B0B0] text-base mb-8">Schreib uns per WhatsApp oder ruf an – wir beraten dich persönlich und erstellen ein individuelles Angebot für dein Fahrzeug aus ${c.cityName}.</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
        ${waBtn('Jetzt per WhatsApp anfragen', 'whitespace-nowrap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer')}
        <a href="tel:${PHONE_INTL}" class="whitespace-nowrap inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 border border-[#00B4B4]/40 text-[#00B4B4] hover:bg-[#00B4B4]/10 text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 cursor-pointer"><i class="ri-phone-line text-lg" aria-hidden="true"></i>${PHONE_DISPLAY}</a>
      </div>
      <p class="mt-10 text-[#6B6B6B] text-xs leading-relaxed">Wir sind auch für dich da in: ${others.map((o) => `<a href="/lackschutzfolie-${o.slug}" class="hover:text-[#00B4B4] underline-offset-2 hover:underline">${o.cityName}</a>`).join(' · ')}</p>
    </div>
  </section>
</main>
${footer(false)}
</body>
</html>`;
  out(`lackschutzfolie-${c.slug}.html`, `${h}\n${body}`);
}

/* ---------------- Rechtliches & 404 ---------------- */
function legal(p) {
  const graph = [business, website, webpage(p.path, p.title, p.description), breadcrumb([['Startseite', '/'], [p.h1.replace(/&shy;/g, ''), p.path]])];
  const h = head({ title: p.title, description: p.description, path: p.path, robots: 'noindex, follow', graph });
  const body = `<body class="bg-[#0A0A0A] text-white antialiased">
${navbar(false)}
<main id="inhalt">
  <section class="pt-32 pb-20 md:pt-48 md:pb-28">
    <div class="max-w-3xl mx-auto px-6">
      <div class="flex items-center gap-3 mb-8"><span class="w-12 h-px bg-[#00B4B4]/60"></span><span class="text-[#00B4B4] text-xs tracking-[0.4em] uppercase font-medium">Rechtliches</span></div>
      <h1 class="text-white font-extrabold uppercase mb-10" style="font-size:clamp(1.8rem, 3vw, 2.5rem);letter-spacing:0.04em">${p.h1}</h1>
      <div class="legal text-[#B0B0B0] text-base leading-relaxed">${p.html}</div>
    </div>
  </section>
</main>
${footer(false)}
</body>
</html>`;
  out(`${p.path.slice(1)}.html`, `${h}\n${body}`);
}

function notFound() {
  const title = 'Seite nicht gefunden | JAGIS Surface Protection Refinement';
  const description = 'Die angeforderte Seite existiert nicht. Zur Startseite von JAGIS – Lackschutzfolierung in Witten.';
  const graph = [business, website];
  const h = head({ title, description, path: '/404', robots: 'noindex, follow', graph }).replace(/<link rel="canonical"[^>]*>\n/, '');
  const body = `<body class="bg-[#0A0A0A] text-white antialiased">
${navbar(false)}
<main id="inhalt" class="relative min-h-screen flex items-center justify-center text-center px-6 pt-16 md:pt-32 overflow-hidden">
  <span class="absolute bottom-0 left-1/2 -translate-x-1/2 font-extrabold text-[#111111] select-none pointer-events-none" style="font-size:clamp(8rem, 30vw, 20rem);line-height:1" aria-hidden="true">404</span>
  <div class="relative z-10">
    <div class="flex items-center justify-center gap-4 mb-6"><span class="w-16 h-px bg-gradient-to-r from-transparent to-[#00B4B4]"></span><span class="text-[#00B4B4] text-xs tracking-[0.4em] uppercase font-medium">Fehler 404</span><span class="w-16 h-px bg-gradient-to-l from-transparent to-[#00B4B4]"></span></div>
    <h1 class="text-white font-extrabold uppercase mb-6" style="font-size:clamp(1.8rem, 4vw, 3rem);letter-spacing:0.04em">Seite <span class="text-[#00B4B4]">nicht gefunden.</span></h1>
    <p class="text-[#B0B0B0] font-light max-w-md mx-auto leading-relaxed mb-10">Diese Seite gibt es nicht (mehr). Alles rund um Lackschutzfolie findest du auf unserer Startseite.</p>
    <a href="/" class="whitespace-nowrap inline-flex items-center px-8 py-4 bg-[#00B4B4] hover:bg-[#009999] text-white text-sm tracking-widest uppercase font-bold rounded transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,180,0.6)] cursor-pointer">Zur Startseite</a>
  </div>
</main>
${footer(false)}
</body>
</html>`;
  out('404.html', `${h}\n${body}`);
}

home();
D.cities.forEach(location);
legalPages.forEach(legal);
notFound();
