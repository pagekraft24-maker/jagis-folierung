#!/usr/bin/env bash
# Baut die komplette Seite neu. Voraussetzung: npm i -D tailwindcss@3.4.17 (im Ordner _src)
set -euo pipefail
cd "$(dirname "$0")/.."
node _src/build.mjs
node _src/seo.mjs
TW="${TAILWIND_BIN:-npx --prefix _src tailwindcss}"
$TW -c _src/tailwind.config.cjs -i _src/input.css -o _src/.tw.css --minify
cat _src/.tw.css _src/icons.css > assets/css/style.css && rm _src/.tw.css
# CSP-Hash für das Inline-Skript (no-js → js) aktualisieren
HASH=$(printf '%s' "document.documentElement.classList.replace('no-js','js')" | openssl dgst -sha256 -binary | base64)
node -e "const f='vercel.json',fs=require('fs');let s=fs.readFileSync(f,'utf8');s=s.replace(/'sha256-[^']*'/,\"'sha256-$HASH'\");fs.writeFileSync(f,s)"
echo "Fertig."
