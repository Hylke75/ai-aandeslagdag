// Genereert de statische blog uit blog-content.mjs:
//   /blog/index.html            (overzicht)
//   /blog/<slug>.html           (artikel, clean URL /blog/<slug>)
// Hergebruikt exact de site-shell (header/footer/chatbot/consent) + huisstijl.
// Draaien:  node scripts/bouw-blog.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { posts, AUTEUR } from './blog-content.mjs'

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const BLOGDIR = path.join(DIR, 'blog')
const BASE = 'https://ai-aandeslagdag.nl'
const CSS = '/styles.css?v=8'

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const MAAND = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
function datumNL(d) { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d); if (!m) return ''; return `${Number(m[3])} ${MAAND[Number(m[2]) - 1]} ${m[1]}` }

function head({ title, desc, url, type = 'website' }) {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="AI Aan De Slag Dag">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BASE}/beeld-1-twee-deelnemers-werken-samen.webp">
<meta name="twitter:card" content="summary_large_image">
<!-- Analytics laadt pas na cookie-toestemming (zie consent.js) -->
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
      <a href="/blog" aria-current="page">Blog</a>
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
  <a href="/blog" aria-current="page">Blog</a>
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
        <a href="https://www.linkedin.com/company/ai-aan-de-slag-dag/" target="_blank" aria-label="Volg AI Aan De Slag Dag op LinkedIn" rel="noopener noreferrer" data-event="social" data-loc="linkedin"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4v16h-4zM8 8h3.83v2.19h.05c.53-1 1.84-2.19 3.79-2.19 4.05 0 4.8 2.67 4.8 6.14V24h-4v-7.03c0-1.68-.03-3.84-2.34-3.84-2.35 0-2.7 1.83-2.7 3.72V24H8z"/></svg></a>
        <a href="https://www.instagram.com/ai_aandeslagdag/" target="_blank" aria-label="Volg AI Aan De Slag Dag op Instagram" rel="noopener noreferrer" data-event="social" data-loc="instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none"/></svg></a>
      </div>
    </div>
    <nav class="footer-col" aria-label="Footer navigatie ontdek">
      <h3>Ontdek</h3>
      <ul>
        <li><a href="/#wat">Wat ga je doen?</a></li>
        <li><a href="/#voor-wie">Voor wie?</a></li>
        <li><a href="/voor-wie-niet">Voor wie is deze dag niet?</a></li>
        <li><a href="/#coaches">AI-coaches</a></li>
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

<!-- Chatbot-widget -->
<script src="https://www.chatbot-builder.com/widget.js" data-agent="slag-goi5jc" async></script>
<script>
(function(){
  var burger=document.querySelector('.burger'),nav=document.getElementById('mobileNav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.getAttribute('data-open')==='true';
      nav.setAttribute('data-open',String(!open));
      burger.setAttribute('aria-expanded',String(!open));
      burger.setAttribute('aria-label',open?'Menu openen':'Menu sluiten');
      document.body.style.overflow=open?'':'hidden';
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){burger.click();});});
  }
})();
</script>
</body>
</html>
`
}

function kaart(p) {
  return `      <a class="post-card" href="/blog/${p.slug}" data-event="blog_kaart" data-slug="${p.slug}">
        <span class="post-card-top" aria-hidden="true"></span>
        <span class="post-card-body">
          <span class="post-card-rubriek">${esc(p.rubriek)}</span>
          <span class="post-card-titel">${esc(p.titel)}</span>
          <span class="post-card-samenvatting">${esc(p.samenvatting)}</span>
          <span class="post-card-meta"><time datetime="${p.datum}">${datumNL(p.datum)}</time></span>
        </span>
      </a>`
}

function bouwIndex(sorted) {
  const desc = 'Praktische inzichten over slimmer werken met AI: van je eerste werkwijze tot AI voor teams. De blog van AI Aan De Slag Dag.'
  const ld = {
    '@context': 'https://schema.org', '@type': 'Blog', name: 'AI Aan De Slag Dag Blog', url: `${BASE}/blog`,
    blogPost: sorted.map((p) => ({ '@type': 'BlogPosting', headline: p.titel, datePublished: p.datum, url: `${BASE}/blog/${p.slug}`, author: { '@type': 'Organization', name: AUTEUR } })),
  }
  return head({ title: 'Blog · AI Aan De Slag Dag', desc, url: `${BASE}/blog` }) +
    `\n<script type="application/ld+json">${JSON.stringify(ld)}</script>\n` +
    header() +
`
<main id="top">
<section class="subhero blog-hero" aria-labelledby="h-blog">
  <div class="wrap">
    <a class="terug" href="/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Terug naar de homepage</a>
    <p class="eyebrow eyebrow--accent">Blog</p>
    <h1 id="h-blog">Slimmer werken met AI, in de praktijk.</h1>
    <p class="blog-hero-lead">Korte, concrete stukken over hoe je van losse AI-vragen naar een vaste werkwijze gaat. Geen hype, wel bruikbaar.</p>
  </div>
</section>

<section aria-label="Blogberichten">
  <div class="wrap">
    <div class="blog-grid">
${sorted.map(kaart).join('\n')}
    </div>
    <div class="blog-cta">
      <h2>Liever meteen zelf aan de slag?</h2>
      <p>Lezen is een begin. Op AI Aan De Slag Dag bouw je een dag lang aan je eigen werk.</p>
      <a class="btn btn-primary" href="/#tickets" data-event="cta_reserveer" data-loc="blog_index">Reserveer mijn werkplek</a>
    </div>
  </div>
</section>
</main>
` + footer()
}

function bouwArtikel(p, alle) {
  const alineas = p.hoofdtekst.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
  const gerelateerd = alle.filter((x) => x.slug !== p.slug).sort((a, b) => (a.rubriek === p.rubriek ? -1 : 1)).slice(0, 3)
  const ld = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.titel, description: p.samenvatting,
    datePublished: p.datum, dateModified: p.datum, url: `${BASE}/blog/${p.slug}`,
    image: `${BASE}/beeld-1-twee-deelnemers-werken-samen.webp`,
    author: { '@type': 'Organization', name: AUTEUR },
    publisher: { '@type': 'Organization', name: 'AI Aan De Slag Dag' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${p.slug}` },
  }
  return head({ title: `${p.titel} · AI Aan De Slag Dag`, desc: p.samenvatting, url: `${BASE}/blog/${p.slug}`, type: 'article' }) +
    `\n<script type="application/ld+json">${JSON.stringify(ld)}</script>\n` +
    header() +
`
<main id="top">
<article class="article">
  <div class="wrap article-head">
    <a class="terug" href="/blog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg> Alle blogberichten</a>
    <p class="article-rubriek">${esc(p.rubriek)}</p>
    <h1>${esc(p.titel)}</h1>
    <p class="article-meta"><time datetime="${p.datum}">${datumNL(p.datum)}</time> · Door ${esc(p.auteur || AUTEUR)}</p>
  </div>
  <div class="wrap article-lead">
    <div class="article-antwoord">${esc(p.antwoordblok)}</div>
    <p class="article-samenvatting">${esc(p.samenvatting)}</p>
  </div>
  <div class="wrap article-body">
${alineas.map((a) => `    <p>${esc(a)}</p>`).join('\n')}
  </div>
  <div class="wrap article-cta">
    <h2>Neem je eigen werk mee</h2>
    <p>Dit lees je in een paar minuten. Op AI Aan De Slag Dag maak je er een dag lang werk van, met een AI-coach aan tafel.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="/#tickets" data-event="cta_reserveer" data-loc="blog_artikel" data-slug="${p.slug}">Reserveer mijn werkplek voor €595</a>
      <a class="btn btn-outline" href="/programma" data-event="nav_programma" data-loc="blog_artikel">Bekijk het programma</a>
    </div>
  </div>
</article>

<section class="wrap article-related" aria-label="Meer lezen">
  <h2>Meer lezen</h2>
  <div class="blog-grid blog-grid--3">
${gerelateerd.map(kaart).join('\n')}
  </div>
</section>
</main>
` + footer()
}

// ---- schrijven ----
fs.mkdirSync(BLOGDIR, { recursive: true })
const sorted = [...posts].sort((a, b) => (a.datum < b.datum ? 1 : -1))
fs.writeFileSync(path.join(BLOGDIR, 'index.html'), bouwIndex(sorted))
let n = 0
for (const p of sorted) { fs.writeFileSync(path.join(BLOGDIR, `${p.slug}.html`), bouwArtikel(p, sorted)); n++ }
console.log(`✓ Blog gegenereerd: /blog/index.html + ${n} artikelen.`)
