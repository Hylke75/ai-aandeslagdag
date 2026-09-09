// Genereert de 5 doelgroep-landingspagina's uit werkscan-configs.mjs.
//   /ai-voor-sales /ai-voor-marketing /ai-voor-managers /ai-voor-ondernemers /ai-voor-teams
// Campagnepagina's: NIET in het hoofdmenu. Elke pagina bevat de AI WerkScan (config inline) + /werkscan.js.
// Draaien: node scripts/bouw-landingspaginas.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CONFIGS, SLUGS } from './werkscan-configs.mjs'

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BASE = 'https://ai-aandeslagdag.nl'
const CSS = '/styles.css?v=16'
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

const PROG = [
  ['Inspire', 'Zie wat er inmiddels mogelijk is.'],
  ['Discover', 'Onderzoek waar AI jouw werk kan verbeteren.'],
  ['Learn', 'Leer hoe je van losse prompts naar een werkbare workflow gaat.'],
  ['Improve', 'Maak je eerste oplossing beter.'],
  ['Build', 'Bouw door aan je eigen toepassing.'],
  ['Ship', 'Test hem. Leg hem vast. Zorg dat je hem morgen kunt gebruiken.'],
]
const FAQ = [
  ['Werken we alleen met ChatGPT?', 'Nee. ChatGPT is één van de tools die relevant kan zijn, net als Claude, Gemini en Copilot. Maar AI gaat inmiddels verder dan chatbots: afhankelijk van je werkvraag kunnen ook tools voor research, bouwen en automatisering passen, zoals Perplexity, Lovable, Claude Code, Cursor of n8n. We beginnen niet bij de tool, maar bij wat jij met je werk wilt verbeteren.'],
  ['Moet ik kunnen programmeren?', 'Nee. Veel toepassingen bouw je zonder code. Wil je technischer werken of heb je al programmeerervaring, dan kunnen tools als Claude Code of Cursor juist interessant zijn. Maar programmeerkennis is geen voorwaarde om mee te doen.'],
  ['Moet ik al deze tools hebben?', 'Nee. Je hoeft niet vooraf accounts voor alle genoemde tools aan te maken. Je werkt met wat relevant en beschikbaar is voor jouw case.'],
  ['Wat neem ik mee?', 'Je eigen laptop en één terugkerende taak uit je eigen werk. Daar bouw je die dag een slimmere werkwijze omheen.'],
  ['Wat heb ik aan het einde van de dag?', 'Iets dat af is: een werkwijze of toepassing die je de dag erna kunt gebruiken. Geen lijst met tools.'],
  ['Hoeveel mensen zijn er per coach?', 'Maximaal 6 deelnemers per AI-coach, zodat er echt aandacht is voor jouw werk.'],
]

function head(cfg, slug) {
  const title = `${cfg.h1.join(' ')} · AI Aan De Slag Dag`
  const desc = cfg.subhead
  const url = `${BASE}/${slug}`
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AI Aan De Slag Dag">
<meta property="og:title" content="${esc(cfg.h1.join(' '))}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/beeld-1-twee-deelnemers-werken-samen.webp">
<meta name="twitter:card" content="summary_large_image">
<script src="/consent.js" defer></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${CSS}">`
}

function header() {
  return `</head>
<body>
<header class="header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="AI Aan De Slag Dag, naar de homepage">
      <img src="/logo-brand.webp" width="96" height="96" alt="">
      <span>AI Aan De Slag Dag</span>
    </a>
    <nav class="nav" aria-label="Hoofdnavigatie">
      <a href="/#wat">Wat ga je doen?</a>
      <a href="/#voor-wie">Voor wie?</a>
      <a href="/#coaches">AI-coaches</a>
      <a href="/programma">Programma</a>
      <a href="/blog">Blog</a>
      <a href="/#faq">FAQ</a>
      <a class="btn btn-primary" href="/#tickets" data-event="cta_reserveer" data-loc="header">Reserveer</a>
    </nav>
    <button class="burger" aria-label="Menu openen" aria-expanded="false" aria-controls="mobileNav"><span></span></button>
  </div>
</header>
<div class="mobile-nav" id="mobileNav" data-open="false">
  <a href="/#wat">Wat ga je doen?</a>
  <a href="/#voor-wie">Voor wie?</a>
  <a href="/#coaches">AI-coaches</a>
  <a href="/programma">Programma</a>
  <a href="/blog">Blog</a>
  <a href="/#faq">FAQ</a>
  <a class="btn btn-primary" href="/#tickets" data-event="cta_reserveer" data-loc="mobile_nav">Reserveer mijn werkplek</a>
</div>
`
}

function footer() {
  return `
<footer>
  <div class="wrap footer-grid">
    <div class="footer-brand">
      <img src="/logo-footer.webp" width="360" height="218" alt="AI Aan De Slag Dag, in één dag echt werken met AI">
      <p class="footer-tagline">De praktische AI-werkdag voor professionals. In één dag van AI proberen naar echt werken met AI.</p>
      <p class="footer-org">Een initiatief van <strong>Hylke Thiry</strong> · Promotie- &amp; Communicatiebegeleiding</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/company/ai-aan-de-slag-dag/" target="_blank" aria-label="Volg AI Aan De Slag Dag op LinkedIn" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4v16h-4zM8 8h3.83v2.19h.05c.53-1 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.03c0-1.68-.03-3.84-2.34-3.84-2.35 0-2.7 1.83-2.7 3.72V24H8z"/></svg></a>
        <a href="https://www.instagram.com/ai_aandeslagdag/" target="_blank" aria-label="Volg AI Aan De Slag Dag op Instagram" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none"/></svg></a>
      </div>
    </div>
    <nav class="footer-col" aria-label="Footer navigatie ontdek">
      <h3>Ontdek</h3>
      <ul>
        <li><a href="/#wat">Wat ga je doen?</a></li>
        <li><a href="/#voor-wie">Voor wie?</a></li>
        <li><a href="/voor-wie-niet">Voor wie is deze dag niet?</a></li>
        <li><a href="/programma">Programma</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/#faq">FAQ</a></li>
      </ul>
    </nav>
    <div class="footer-col">
      <h3>Reserveren</h3>
      <ul>
        <li><a href="/#tickets" data-event="cta_reserveer" data-loc="footer">Individuele werkplek</a></li>
        <li><a href="/#teams" data-event="cta_team" data-loc="footer">Teamtafel</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3>Contact</h3>
      <ul class="footer-contact">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg><a href="mailto:contact@ai-aandeslagdag.nl">contact@ai-aandeslagdag.nl</a></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Grote Kerk · Rond de Grote Kerk 12, Den Haag</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>Maandag 23 november 2026</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <p>© 2026 AI Aan De Slag Dag · een initiatief van Hylke Thiry | Promotie- &amp; Communicatiebegeleiding · KvK 74563270 · btw NL195051208B04</p>
    <ul>
      <li><a href="/privacy">Privacy</a></li>
      <li><a href="#" data-cookievoorkeuren>Cookievoorkeuren</a></li>
      <li><a href="/voorwaarden">Algemene voorwaarden</a></li>
    </ul>
  </div>
  <div class="wrap footer-credit"><p>Website: <a href="https://linkandlead.nl/" target="_blank" rel="noopener">Link &amp; Lead</a> · link. lead. grow. · 2026</p></div>
</footer>
`
}

function checkSvg() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>' }

function page(key) {
  const cfg = CONFIGS[key]
  const slug = SLUGS[key]
  const isTeam = cfg.ticket === 'team'
  const prijs = isTeam ? '€2.995 excl. btw voor zes personen' : '€595 excl. btw'
  const ticketHref = isTeam ? '/#teams' : '/#tickets'
  const scanConfig = JSON.stringify(cfg)
  return head(cfg, slug) + header() + `
<main id="top">

<!-- 01 HERO -->
<section class="hero lp-hero" aria-labelledby="lp-h1">
  <div class="wrap reveal">
    <p class="eyebrow eyebrow--accent">${esc(cfg.eyebrow)}</p>
    <h1 id="lp-h1">${cfg.h1.map(esc).join('<br>')}</h1>
    <p class="lead">${esc(cfg.subhead)}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="${ticketHref}" data-event="audience_primary_cta_click" data-loc="hero">${esc(cfg.ctaPrimair.label)} &rarr;</a>
      <a class="lp-scanlink" href="#werkscan-sectie" data-event="audience_scan_link" data-loc="hero">${esc(cfg.ctaScan)} &rarr;</a>
    </div>
    <p class="price-note">± 2 minuten · gratis · persoonlijke uitslag</p>
  </div>
</section>

<!-- 02 HERKEN JE DIT? -->
<section class="lp-herken" aria-labelledby="lp-herken">
  <div class="wrap">
    <h2 id="lp-herken">${esc(cfg.herken.titel)}</h2>
    <ul>
      ${cfg.herken.punten.map((p) => `<li>${checkSvg()}${esc(p)}</li>`).join('\n      ')}
    </ul>
  </div>
</section>

<!-- 03 AI WERKSCAN -->
<section id="werkscan-sectie" class="quiet" aria-labelledby="lp-scan">
  <div class="wrap">
    <h2 id="lp-scan" class="sr">${esc(cfg.scanNaam)}</h2>
    <div id="werkscan"></div>
  </div>
</section>

<!-- 04 WAT KAN AI OVERNEMEN -->
<section aria-labelledby="lp-overnemen">
  <div class="wrap">
    <h2 id="lp-overnemen">${esc(cfg.overnemen.titel)}</h2>
    <p class="lead">${esc(cfg.overnemen.tekst)}</p>
  </div>
</section>

<!-- 05 CONCRETE VOORBEELDEN -->
<section class="quiet" aria-labelledby="lp-vb">
  <div class="wrap">
    <h2 id="lp-vb">${esc(cfg.voorbeelden.titel)}</h2>
    <div class="lp-vb">
      ${cfg.voorbeelden.items.map((it) => `<div class="lp-vb-item"><b>${esc(it.k)}</b><span>${esc(it.v)}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- 06 DIT GA JE NIET ALLEEN BEKIJKEN -->
<section class="dark statement" aria-labelledby="lp-niet-alleen">
  <div class="wrap">
    <h2 id="lp-niet-alleen">Dit ga je niet alleen bekijken.</h2>
    <p class="lead">Neem je laptop mee. Neem een taak uit je eigen werk mee. Je AI-coach helpt je die slimmer te maken.</p>
    <p class="rule">Maximaal 6 deelnemers per AI-coach.</p>
  </div>
</section>

<!-- 07 MINI-PROGRAMMA -->
<section aria-labelledby="lp-prog">
  <div class="wrap">
    <h2 id="lp-prog">Zo ziet de dag eruit</h2>
    <div class="lp-prog">
      ${PROG.map(([k, v]) => `<div class="lp-prog-step"><b>${esc(k)}</b><span>${esc(v)}</span></div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- 08 RESULTAAT 17.30 -->
<section class="dark statement lp-1730" aria-labelledby="lp-1730">
  <div class="wrap">
    <h2 id="lp-1730">En om 17.30 uur?</h2>
    <p class="highlight">Staat er iets op je laptop dat je morgen kunt gebruiken.</p>
  </div>
</section>

<!-- 09 AI-COACHES -->
<section class="quiet" aria-labelledby="lp-coaches">
  <div class="wrap">
    <h2 id="lp-coaches">Je eigen AI-coach aan tafel</h2>
    <p class="lead">Je werkt niet in je eentje. Aan jouw tafel zit een AI-coach die je helpt van een idee naar een werkende aanpak te komen, met maximaal 6 deelnemers per coach.</p>
    <a class="btn btn-outline" href="/#coaches" data-event="audience_program_click" data-loc="coaches">Bekijk de AI-coaches</a>
  </div>
</section>

<!-- 10 SPREKERS -->
<section aria-labelledby="lp-sprekers">
  <div class="wrap">
    <h2 id="lp-sprekers">Ja, er zijn sprekers.</h2>
    <p class="lead">Maar daar kom je niet de hele dag voor. Onder anderen Jarno Duursma, Ben van der Burg en Hylke Thiry laten zien wat er speelt. Daarna gaat je laptop weer open en werk je aan je eigen taak.</p>
  </div>
</section>

<!-- 11 60-SECONDEN ZELFSELECTIE -->
<section class="quiet" aria-label="Zelfselectie">
  <div class="wrap">
    <div class="lp-zelfselectie">
      <strong>Nog niet zeker?</strong>
      <p>Doe de 60-seconden check om te zien of deze dag überhaupt bij je past.</p>
      <a class="btn btn-outline" href="/voor-wie-niet" data-event="audience_self_selection_click">Check of deze dag bij je past &rarr;</a>
    </div>
  </div>
</section>

<!-- 12 PRIJS -->
<section id="prijs" aria-labelledby="lp-prijs">
  <div class="wrap">
    <h2 id="lp-prijs">${isTeam ? 'Een teamtafel' : 'Wat het kost'}</h2>
    <p class="lead">${isTeam
      ? 'Zes losse tickets kosten 6 × €595 = €3.570. Een teamtafel is €2.995 excl. btw voor zes personen. Eigen tafel. Eigen AI-coach.'
      : 'Individuele werkplek: €595 excl. btw. Inclusief lunch, borrel en een voorbereidende intake. Maximaal 6 deelnemers per AI-coach.'}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="${ticketHref}" data-event="audience_ticket_click" data-loc="prijs">${isTeam ? 'Reserveer een teamtafel' : 'Reserveer je werkplek'} &rarr;</a>
    </div>
  </div>
</section>

<!-- 13 FAQ -->
<section class="quiet" aria-labelledby="lp-faq">
  <div class="wrap">
    <h2 id="lp-faq">Veelgestelde vragen</h2>
    <div class="faq">
      ${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- 14 FINAL CTA -->
<section class="dark statement" aria-labelledby="lp-final">
  <div class="wrap">
    <h2 id="lp-final">Begin bij je werk. Niet bij de tool.</h2>
    <p class="lead">23 november 2026 · Grote Kerk Den Haag · ${esc(prijs)}</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="${ticketHref}" data-event="audience_ticket_click" data-loc="final">${isTeam ? 'Reserveer een teamtafel' : 'Reserveer je werkplek'} &rarr;</a>
    </div>
  </div>
</section>

</main>
` + footer() + `
<script>
window.WERKSCAN = ${scanConfig};
window.WERKSCAN_META = { audience: ${JSON.stringify(cfg.audience)} };
(function(){
  // landing-analytics (geen PII)
  function push(ev,extra){try{var p={event:ev,audience:${JSON.stringify(cfg.audience)}};if(extra)for(var k in extra)p[k]=extra[k];(window.dataLayer=window.dataLayer||[]).push(p);if(typeof window.gtag==='function')window.gtag('event',ev,p);}catch(e){}}
  push('audience_landing_view');
  document.addEventListener('click',function(e){var t=e.target.closest('[data-event]');if(t)push(t.getAttribute('data-event'),{loc:t.getAttribute('data-loc')||undefined});});
  // mobiel menu
  var burger=document.querySelector('.burger'),nav=document.getElementById('mobileNav');
  if(burger&&nav){burger.addEventListener('click',function(){var open=nav.getAttribute('data-open')==='true';nav.setAttribute('data-open',String(!open));burger.setAttribute('aria-expanded',String(!open));document.body.style.overflow=open?'':'hidden';});nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){burger.click();});});}
})();
</script>
<script src="/werkscan.js" defer></script>
<script src="https://www.chatbot-builder.com/widget.js" data-agent="slag-goi5jc" async></script>
</body>
</html>
`
}

let n = 0
for (const key of Object.keys(CONFIGS)) { fs.writeFileSync(path.join(DIR, `${SLUGS[key]}.html`), page(key)); n++ }
console.log(`✓ ${n} landingspagina's gegenereerd: ${Object.values(SLUGS).join(', ')}`)
