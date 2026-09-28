# AI Aan De Slag — frontend

De publieke website voor **AI Aan De Slag voor Teams**: een praktisch AI-programma voor
maximaal 20 medewerkers per organisatie (**€3.995 excl. btw**). Persoonlijke AI WerkScan vooraf,
een praktische trainingsdag, en een AI Impact Sessie na 4–6 weken. De organisatie ontvangt een
AI Kansenkaart. De trainingsdag kan bij de opdrachtgever op locatie of in de Grote Kerk in
Den Haag plaatsvinden.

De site is een **statische frontend** (HTML/CSS) met één serverless endpoint dat leadverkeer
naar het centrale CMS (`linkandlead.nl`) stuurt.

## Structuur

```
index.html          Homepage — verkoopt het teamprogramma. Eén CTA: "Plan een kennismaking".
privacy.html        Privacyverklaring.
voorwaarden.html    Algemene voorwaarden (programma-boeking).
404.html            Foutpagina.
styles.css          Design system + componenten (?v=… cache-bump bij CSS-wijziging).
api/kennismaking.js Same-origin lead-proxy: valideert + anti-spam → POST /api/cms/lead (site-gescoopt).
consent.js          Cookie-toestemming (analytics laadt pas na akkoord).
vercel.json         Redirects (oude eventpagina's → /), beveiligingsheaders + CSP.
.env.example        CMS_URL.
```

## Conversie-flow

De enige primaire CTA is **"Plan een kennismaking"** (`#kennismaking`). Het formulier post
same-origin naar `api/kennismaking.js`, dat de aanvraag (naam, organisatie, e-mail, telefoon,
aantal deelnemers, toelichting) doorstuurt naar het centrale lead-endpoint. Er is **geen** online
afrekenen of losse ticketverkoop; facturatie gebeurt na de kennismaking.

De boekings-, deelnemer- en AI WerkScan-flow (na verkoop) leeft in het centrale CMS
(`linkandlead-web`), niet in deze publieke frontend.

## Lokaal draaien

```bash
open index.html          # statisch (zonder het /api-endpoint)
npx vercel dev           # mét het serverless endpoint
```

## Deploy

Push naar `main` (Vercel-git, auto-deploy). Prijs en propositie staan hardcoded in `index.html`.
