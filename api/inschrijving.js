// "Mijn inschrijving"-hub op het eigen domein (SSR). Toont de inschrijving in de huisstijl +
// voorbereidingsacties (agenda, WerkScan, programma) + annuleren (inline bevestiging, geen native pop-up).
const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';
const CSS = '/styles.css?v=12';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function datumNL(iso) {
  if (!iso) return '';
  try {
    const p = {};
    new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(new Date(iso)).forEach((x) => { p[x.type] = x.value; });
    return `${p.weekday} ${p.day} ${p.month} ${p.year} · ${p.hour}.${p.minute} uur`;
  } catch (e) { return ''; }
}
function tijdNL(iso) { if (!iso) return ''; try { const p = {}; new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date(iso)).forEach((x) => { p[x.type] = x.value; }); return `${p.hour}.${p.minute}`; } catch (e) { return ''; } }
function compactUTC(iso) { try { return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); } catch (e) { return ''; } }
function googleAgenda(ev) {
  const s = compactUTC(ev.start_op), e = compactUTC(ev.eind_op || ev.start_op);
  if (!s) return '';
  const loc = [ev.locatie_naam, ev.locatie_adres, ev.locatie_postcode, ev.locatie_plaats].filter(Boolean).join(', ');
  const q = new URLSearchParams({ action: 'TEMPLATE', text: ev.titel || 'AI Aan De Slag Dag', dates: `${s}/${e}`, location: loc, details: ev.samenvatting || 'Zie ai-aandeslagdag.nl' });
  return 'https://calendar.google.com/calendar/render?' + q.toString();
}
function icsDataUri(ev, ref) {
  const s = compactUTC(ev.start_op), e = compactUTC(ev.eind_op || ev.start_op);
  if (!s) return '';
  const loc = [ev.locatie_naam, ev.locatie_adres, ev.locatie_postcode, ev.locatie_plaats].filter(Boolean).join(', ');
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AI Aan De Slag Dag//NL', 'BEGIN:VEVENT',
    `UID:${ref || s}@ai-aandeslagdag.nl`, `DTSTART:${s}`, `DTEND:${e}`,
    `SUMMARY:${(ev.titel || 'AI Aan De Slag Dag').replace(/[,;]/g, '')}`, `LOCATION:${loc.replace(/[,;]/g, ' ')}`,
    'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}

const STATUS = { gereserveerd: 'Gereserveerd (betaling in behandeling)', bevestigd: 'Bevestigd', betaald: 'Betaald', geannuleerd: 'Geannuleerd', verlopen: 'Verlopen' };

function pagina(inner) {
  return `<!DOCTYPE html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mijn inschrijving · AI Aan De Slag Dag</title><meta name="robots" content="noindex,nofollow">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${CSS}"></head><body>
<header class="header"><div class="wrap"><a class="brand" href="/" aria-label="AI Aan De Slag Dag, naar de homepage"><img src="/logo-brand.webp" width="96" height="96" alt=""><span>AI Aan De Slag Dag</span></a></div></header>
<main id="top"><section class="subhero"><div class="wrap" style="max-width:680px">${inner}</div></section></main>
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
  const loc = [ev.locatie_naam, ev.locatie_adres, [ev.locatie_postcode, ev.locatie_plaats].filter(Boolean).join(' ')].filter(Boolean).join(', ');
  const gcal = googleAgenda(ev), ics = icsDataUri(ev, d.referentie);

  const kaart =
    `<a class="terug" href="/">&larr; Naar de homepage</a>` +
    `<h1 style="margin-top:1rem">Mijn inschrijving</h1>` +
    `<div class="beheer-kaart">` +
      `<h2>${esc(ev.titel || 'AI Aan De Slag Dag')}</h2>` +
      (datumNL(ev.start_op) ? `<p class="beheer-datum">${esc(datumNL(ev.start_op))}${ev.eind_op ? ' tot ' + esc(tijdNL(ev.eind_op)) + ' uur' : ''}</p>` : '') +
      `<dl class="beheer-dl">` +
        `<div><dt>Referentie</dt><dd>${esc(d.referentie || '')}</dd></div>` +
        `<div><dt>Status</dt><dd id="beheer-status">${esc(STATUS[d.status] || d.status || '')}</dd></div>` +
        `<div><dt>Op naam van</dt><dd>${esc(d.besteller_naam || '')}</dd></div>` +
        (loc ? `<div><dt>Locatie</dt><dd>${esc(loc)}</dd></div>` : '') +
      `</dl>` +
      (gcal ? `<div class="beheer-agenda">${gcal ? `<a class="btn btn-outline" href="${esc(gcal)}" target="_blank" rel="noopener" data-event="agenda_google">Zet in Google Agenda</a>` : ''}${ics ? `<a class="btn btn-outline" href="${esc(ics)}" download="ai-aan-de-slag-dag.ics" data-event="agenda_ics">Download voor Outlook/Apple</a>` : ''}</div>` : '') +
    `</div>` +

    (geannuleerd ? '' :
    `<div class="beheer-prep">` +
      `<h2>Zo bereid je je voor</h2>` +
      `<ul class="beheer-checks">` +
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><strong>Neem je laptop mee</strong> en kies alvast één terugkerende taak die je week telkens tijd kost. Daar ga je die dag mee aan de slag.</span></li>` +
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><strong>Doe de gratis AI WerkScan</strong> om te ontdekken waar bij jou de grootste AI-kans zit. <a href="/ai-voor-ondernemers#werkscan-sectie">Start de WerkScan &rarr;</a></span></li>` +
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><strong>Bekijk het programma</strong> zodat je weet hoe de dag eruitziet. <a href="/programma">Naar het programma &rarr;</a></span></li>` +
        `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><strong>Lees ter inspiratie de blog</strong> over slimmer werken met AI. <a href="/blog">Naar de blog &rarr;</a></span></li>` +
      `</ul>` +
    `</div>`) +

    `<div id="beheer-actie" class="beheer-annuleer">` +
      (geannuleerd
        ? `<p class="beheer-geannuleerd">Deze inschrijving is geannuleerd.</p>`
        : `<button type="button" class="beheer-annuleer-link" id="annuleer-knop">Inschrijving annuleren</button>` +
          `<div id="annuleer-bevestig" hidden><p class="beheer-vraag">Weet je zeker dat je je inschrijving wilt annuleren? Dit geeft je plek vrij.</p>` +
          `<div class="cta-row"><button type="button" class="btn btn-primary" id="annuleer-ja">Ja, annuleren</button><button type="button" class="btn btn-outline" id="annuleer-nee">Nee, terug</button></div></div>`) +
    `</div>` +
    `<p class="beheer-hulp">Vragen of iets wijzigen? Mail <a href="mailto:contact@ai-aandeslagdag.nl">contact@ai-aandeslagdag.nl</a>.</p>` +
    `<script>(function(){var tok=${JSON.stringify(String(token))};var k=document.getElementById('annuleer-knop'),b=document.getElementById('annuleer-bevestig');
if(k){k.addEventListener('click',function(){k.style.display='none';b.hidden=false;b.scrollIntoView({behavior:'smooth',block:'center'});});}
var nee=document.getElementById('annuleer-nee');if(nee){nee.addEventListener('click',function(){b.hidden=true;k.style.display='';});}
var ja=document.getElementById('annuleer-ja');if(ja){ja.addEventListener('click',function(){ja.disabled=true;ja.textContent='Bezig…';
fetch('/api/annuleren',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({token:tok})}).then(function(r){return r.json();}).then(function(u){
if(u&&u.ok){document.getElementById('beheer-actie').innerHTML='<p class="beheer-geannuleerd">Je inschrijving is geannuleerd en je plek is vrijgegeven.</p>';var s=document.getElementById('beheer-status');if(s)s.textContent='Geannuleerd';}
else{ja.disabled=false;ja.textContent='Ja, annuleren';alert('Annuleren lukte niet. Mail contact@ai-aandeslagdag.nl.');}}).catch(function(){ja.disabled=false;ja.textContent='Ja, annuleren';alert('Er ging iets mis. Probeer het opnieuw of mail contact@ai-aandeslagdag.nl.');});});}
})();</script>`;
  res.status(200).send(pagina(kaart));
}
