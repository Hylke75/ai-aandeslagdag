# AI Aan De Slag — frontend

De publieke website voor **AI Aan De Slag voor Teams**: een praktisch AI-programma voor
maximaal 20 medewerkers per organisatie (€3.995 excl. btw). Van persoonlijke AI-intake tot
een praktische trainingsdag en een AI Impact Sessie na 4–6 weken. Bij de klant op locatie of
in de Grote Kerk in Den Haag.

De site is een **statische frontend** (HTML/CSS + een paar serverless endpoints) die leadverkeer
naar het centrale CMS (`linkandlead.nl`) stuurt.

## Structuur

```
index.html          Homepage — verkoopt het volledige teamprogramma. Primaire CTA: "Plan een kennismaking".
privacy.html        Privacyverklaring (programma-context).
voorwaarden.html    Algemene voorwaarden (programma-boeking).
404.html            Nette foutpagina.
styles.css          Design system + alle componenten (?v=… cache-bump bij CSS-wijziging).
api/kennismaking.js Same-origin lead-proxy: valideert + anti-spam → POST /api/cms/lead (site-gescoopt).
lib/blog-render.js  Server-side render van de blog (live uit het CMS). Blog: evergreen AI-content.
api/blog-index.js   /blog overzicht.  api/blog-post.js  /blog/:slug.
vercel.json         Redirects (oude eventpagina's → /), rewrites (/blog), beveiligingsheaders + CSP.
.env.example        CMS_URL + optionele keys.
```

## Conversie-flow

De enige primaire CTA is **"Plan een kennismaking"** (`#kennismaking`). Het formulier post
same-origin naar `api/kennismaking.js`, dat de aanvraag (naam, organisatie, e-mail, telefoon,
aantal deelnemers, toelichting) doorstuurt naar het centrale lead-endpoint. Er is **geen** online
afrekenen; facturatie gebeurt na de kennismaking.

## Dormant / niet meer in de navigatie

De oude open-event-ticketverkoop (`checkout.js`, `api/checkout.js`, `api/inschrijving.js`,
`api/annuleren.js`) en de oude AI WerkScan (`api/werkscan.js`) staan **niet** meer in de site,
maar zijn behouden voor bestaande boekingslinks (`/inschrijving/:token` blijft werken). De oude
CMS-hydratie (`api/content.js`) wordt niet meer aangeroepen vanaf de homepage. Oude
persona-/eventpagina's zijn verwijderd en 302-geredirect naar `/` in `vercel.json`.

## Lokaal draaien

```bash
open index.html          # statisch (zonder de /api-endpoints)
npx vercel dev           # mét de serverless endpoints
```

## Deploy

Push naar `main` (Vercel-git, auto-deploy). Prijs en propositie staan hardcoded in `index.html`;
de blog leest live uit het CMS.
