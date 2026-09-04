// Beheer-/annuleerpagina op het eigen domein (SSR). Haalt de inschrijving op via het CMS (op token)
// en toont 'm in de huisstijl, met een annuleerknop (inline bevestiging, geen native pop-up).
const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';
const CSS = '/styles.css?v=11';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function datumNL(iso) {
  if (!iso) return '';
  try {
    const p = {};
    new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(new Date(iso)).forEach((x) => { p[x.type] = x.value; });
    return `${p.day} ${p.month} ${p.year} om ${p.hour}.${p.minute} uur`;
  } catch (e) { return ''; }
}
const STATUS = { gereserveerd: 'Gereserveerd (betaling in behandeling)', bevestigd: 'Bevestigd', betaald: 'Betaald', geannuleerd: 'Geannuleerd', verlopen: 'Verlopen' };

function pagina(inner) {
  return `<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mijn inschrijving · AI Aan De Slag Dag</title><meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${CSS}"></head><body>
<header class="header"><div class="wrap"><a class="brand" href="/" aria-label="AI Aan De Slag Dag, naar de homepage"><img src="/logo-brand.webp" width="96" height="96" alt=""><span>AI Aan De Slag Dag</span></a></div></header>
<main id="top"><section class="subhero"><div class="wrap" style="max-width:640px">${inner}</div></section></main>
<footer><div class="wrap footer-credit"><p>Website: <a href="https://linkandlead.nl/" target="_blank" rel="noopener">Link &amp; Lead</a> · link. lead. grow. · 2026</p></div></footer>
</body></html>`;
}

function nietGevonden() {
  return pagina(`<a class="terug" href="/">&larr; Naar de homepage</a><h1 style="margin-top:1rem">Inschrijving niet gevonden</h1><p class="lead">Controleer de link uit je bevestigingsmail, of mail ons via <a href="mailto:contact@ai-aandeslagdag.nl">contact@ai-aandeslagdag.nl</a>.</p>`);
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  const token = (req.query && req.query.token) || '';
  if (!/^[0-9a-f-]{36}$/i.test(String(token))) { res.status(404).send(nietGevonden()); return; }
  let d = null;
  try {
    const r = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/cms/inschrijving?token=${encodeURIComponent(token)}`);
    const j = await r.json().catch(() => null);
    if (j && j.ok) d = j;
  } catch (e) { console.error('beheer:', e && e.name); }
  if (!d) { res.status(404).send(nietGevonden()); return; }

  const ev = d.evenement || {};
  const geannuleerd = d.status === 'geannuleerd' || d.status === 'verlopen';
  const card =
    `<a class="terug" href="/">&larr; Naar de homepage</a>` +
    `<h1 style="margin-top:1rem">Mijn inschrijving</h1>` +
    `<div class="beheer-kaart">` +
      `<h2>${esc(ev.titel || 'AI Aan De Slag Dag')}</h2>` +
      (datumNL(ev.start_op) ? `<p class="beheer-datum">${esc(datumNL(ev.start_op))}${ev.locatie_naam ? ' · ' + esc(ev.locatie_naam) : ''}</p>` : '') +
      `<dl class="beheer-dl">` +
        `<div><dt>Referentie</dt><dd>${esc(d.referentie || '')}</dd></div>` +
        `<div><dt>Status</dt><dd id="beheer-status">${esc(STATUS[d.status] || d.status || '')}</dd></div>` +
        `<div><dt>Op naam van</dt><dd>${esc(d.besteller_naam || '')}</dd></div>` +
      `</dl>` +
    `</div>` +
    `<div id="beheer-actie">` +
      (geannuleerd
        ? `<p class="beheer-geannuleerd">Deze inschrijving is geannuleerd.</p>`
        : `<button type="button" class="btn btn-outline" id="annuleer-knop">Inschrijving annuleren</button>` +
          `<div id="annuleer-bevestig" hidden><p class="beheer-vraag">Weet je zeker dat je je inschrijving wilt annuleren? Dit geeft je plek vrij.</p>` +
          `<div class="cta-row"><button type="button" class="btn btn-primary" id="annuleer-ja">Ja, annuleren</button><button type="button" class="btn btn-outline" id="annuleer-nee">Nee, terug</button></div></div>`) +
    `</div>` +
    `<p class="beheer-hulp">Vragen? Mail <a href="mailto:contact@ai-aandeslagdag.nl">contact@ai-aandeslagdag.nl</a>.</p>` +
    `<script>(function(){var tok=${JSON.stringify(String(token))};var k=document.getElementById('annuleer-knop'),b=document.getElementById('annuleer-bevestig');
if(k){k.addEventListener('click',function(){k.style.display='none';b.hidden=false;});}
var nee=document.getElementById('annuleer-nee');if(nee){nee.addEventListener('click',function(){b.hidden=true;k.style.display='';});}
var ja=document.getElementById('annuleer-ja');if(ja){ja.addEventListener('click',function(){ja.disabled=true;ja.textContent='Bezig…';
fetch('/api/annuleren',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token:tok})}).then(function(r){return r.json();}).then(function(u){
if(u&&u.ok){document.getElementById('beheer-actie').innerHTML='<p class="beheer-geannuleerd">Je inschrijving is geannuleerd. Je ontvangt hiervan geen aparte mail.</p>';var s=document.getElementById('beheer-status');if(s)s.textContent='Geannuleerd';}
else{ja.disabled=false;ja.textContent='Ja, annuleren';alert('Annuleren lukte niet. Mail contact@ai-aandeslagdag.nl.');}}).catch(function(){ja.disabled=false;ja.textContent='Ja, annuleren';});});}
})();</script>`;
  res.status(200).send(pagina(card));
}
