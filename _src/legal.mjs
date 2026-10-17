import { NAME, STREET, ZIP, CITY, PHONE_DISPLAY, PHONE_INTL, EMAIL } from './data.mjs';

// TODO vor Livegang: Inhaber und ggf. USt-IdNr. eintragen
export const OWNER = '[Vor- und Nachname Inhaber]';
export const VAT_ID = ''; // z. B. 'DE123456789' – leer lassen, wenn keine vorhanden

const contactBlock = `<p>${NAME}<br>Inhaber: ${OWNER}<br>${STREET}<br>${ZIP} ${CITY}</p>
<p>Telefon: <a href="tel:${PHONE_INTL}">${PHONE_DISPLAY}</a><br>E-Mail: <a href="mailto:${EMAIL}">${EMAIL}</a></p>`;

const impressum = `
<h2>Angaben gemäß § 5 DDG</h2>
${contactBlock}
${VAT_ID ? `<h2>Umsatzsteuer-ID</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: ${VAT_ID}</p>` : ''}
<h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
<p>${OWNER}<br>${STREET}<br>${ZIP} ${CITY}</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Haftung für Inhalte</h2>
<p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.</p>
<h2>Haftung für Links</h2>
<p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.</p>
<h2>Urheberrecht</h2>
<p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
`;

const datenschutz = `
<p>Stand: Oktober 2026</p>
<h2>1. Verantwortlicher</h2>
${contactBlock}
<h2>2. Allgemeines</h2>
<p>Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website und zur Bearbeitung deiner Anfragen erforderlich ist. Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO (Vertrag und vorvertragliche Maßnahmen), lit. c (rechtliche Verpflichtung) und lit. f DSGVO (berechtigtes Interesse).</p>
<h2>3. Hosting und Server-Logfiles</h2>
<p>Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL sowie Browser- und Betriebssysteminformationen (Server-Logfiles). Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der sicheren und stabilen Bereitstellung der Website. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; ergänzend gelten die EU-Standardvertragsklauseln.</p>
<h2>4. Keine Cookies, kein Tracking</h2>
<p>Diese Website setzt keine Cookies und verwendet keine Analyse- oder Marketing-Tools. Schriftarten und Symbole werden lokal von unserem Server geladen; es findet keine Verbindung zu Google Fonts oder anderen Drittanbietern statt.</p>
<h2>5. Kontaktaufnahme</h2>
<p>Wenn du uns per Telefon, E-Mail oder WhatsApp kontaktierst, verarbeiten wir deine Angaben (z. B. Name, Kontaktdaten, Fahrzeug, Anliegen) zur Bearbeitung deiner Anfrage und für mögliche Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage mit einem Vertrag zusammenhängt, ansonsten Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
<h2>6. WhatsApp</h2>
<p>Über die WhatsApp-Schaltflächen auf dieser Website gelangst du zu WhatsApp, einem Dienst der WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland. Eine Datenübertragung an WhatsApp findet erst statt, wenn du einen dieser Links anklickst. Bei der Nutzung von WhatsApp gelten die Datenschutzbestimmungen von WhatsApp; dabei kann eine Übermittlung von Daten in die USA (Meta Platforms Inc.) stattfinden. Die Nutzung ist freiwillig – du kannst uns alternativ jederzeit per Telefon oder E-Mail erreichen.</p>
<h2>7. Links zu Google Maps</h2>
<p>Über die Schaltfläche „Route planen“ gelangst du zu Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Eine Datenübertragung an Google findet erst statt, wenn du den Link anklickst. Es gelten dann die Datenschutzbestimmungen von Google.</p>
<h2>8. Deine Rechte</h2>
<p>Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Wende dich dazu einfach an die oben genannten Kontaktdaten.</p>
<p>Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, zum Beispiel bei der Landesbeauftragten für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.</p>
<h2>9. SSL-/TLS-Verschlüsselung</h2>
<p>Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du am „https://“ in der Adresszeile deines Browsers.</p>
`;

export const legalPages = [
  {
    path: '/impressum', h1: 'Impressum',
    title: 'Impressum | JAGIS Surface Protection Refinement',
    description: 'Impressum und Anbieterkennzeichnung von JAGIS Surface Protection Refinement, Friedrich-Ebert-Straße 84 in 58454 Witten.',
    html: impressum,
  },
  {
    path: '/datenschutz', h1: 'Datenschutz&shy;erklärung',
    title: 'Datenschutzerklärung | JAGIS Surface Protection Refinement',
    description: 'Informationen zur Verarbeitung personenbezogener Daten auf der Website von JAGIS Surface Protection Refinement in Witten.',
    html: datenschutz,
  },
];
