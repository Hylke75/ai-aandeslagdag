# AI Aan De Slag Dag — frontend

De publieke landingspagina voor **AI Aan De Slag Dag** (maandag 23 november 2026, Grote Kerk
Den Haag). Een **losse frontend** met het **exacte aangeleverde ontwerp**, die z'n content
optioneel **live uit het centrale CMS** (`linkandlead.nl`) haalt. Gebouwd volgens
`BOUW-EEN-SITE.md`.

## Structuur

```
index.html        Het exacte ontwerp (statische one-pager, alles inline).
api/content.js     Server-side CMS-endpoint (leest /api/cms/content met het token).
vercel.json        Beveiligingsheaders.
.env.example       CMS_URL + CMS_TOKEN (nooit committen).
```

## Hoe de CMS-koppeling werkt

- De pagina toont **standaard exact het ontwerp** — alle teksten staan hardcoded in `index.html`.
- Onderaan `index.html` staat een kleine **hydratie-stap** die `/api/content` ophaalt.
- `api/content.js` leest het centrale CMS **alleen** als `CMS_URL` + `CMS_TOKEN` gezet zijn.
  Zonder token antwoordt het `{ok:false}` en verandert er niets aan de pagina.
- Elke override is **non-destructief**: een leeg of ontbrekend CMS-veld laat de bestaande
  tekst staan. De site kan dus nooit "breken" op een CMS-hik.

Nu gehydrateerd (indien in het CMS gevuld): `<title>`, hero-eyebrow, hero-h1, hero-lead,
hero-body. Uit te breiden in de hydratie-stap onderaan `index.html`.

## Lokaal draaien

```bash
# Statisch bekijken (zonder CMS-endpoint):
open index.html

# Mét het /api/content-endpoint (Vercel dev):
npx vercel dev
```

## Deploy

1. Eigen Vercel-project (los van de CMS-repo).
2. Zet — zodra er een CMS-site + token is — `CMS_URL` en `CMS_TOKEN` als Environment
   Variables (Production + Preview). Token **nooit** in git.
3. Testen op de Vercel-preview-URL vóór domeinkoppeling.
4. Domein `aandeslagdag.nl` koppelen in Vercel. Pas ná akkoord live.

## De centrale CMS-repo blijft ongemoeid.
