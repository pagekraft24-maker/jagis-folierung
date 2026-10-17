# jagis-folierung.de

Statische Website von **JAGIS Surface Protection Refinement** (Lackschutzfolierung in Witten).
Reines HTML/CSS/JS – kein Framework, keine externen Dienste. Hosting: Vercel (automatisch aus `main`).

## Struktur
- `index.html`, `lackschutzfolie-*.html`, `impressum.html`, `datenschutz.html`, `404.html` – fertige Seiten
- `assets/` – CSS, JS, lokale Schriften und Icons
- `images/` – alle Bilder (WebP), Favicons, OG-Bild
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `site.webmanifest`
- `vercel.json` – Clean URLs, Security-Header, Caching
- `_src/` – Generator (Inhalte in `data.mjs`, Rechtstexte in `legal.mjs`); wird nicht deployt

## Inhalte ändern
1. Texte in `_src/data.mjs` bzw. `_src/legal.mjs` anpassen
2. `cd _src && npm install && npm run build`
3. Committen und pushen – Vercel deployt automatisch
