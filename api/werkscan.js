// Server-endpoint voor de AI WerkScan (same-origin → geen CSP-wijziging, secrets server-side).
// 1) valideert + anti-spam (honeypot + tijdmeting);
// 2) slaat de lead op via het bestaande centrale-CMS lead-endpoint (site-gescoopt) + notificeert de site;
// 3) stuurt de indiener een persoonlijke resultaatmail via Resend (alleen als RESEND_API_KEY gezet is
//    en het afzenderdomein geverifieerd is; anders wordt de mail netjes overgeslagen).
// Geen PII in logs. De on-page-uitslag werkt los van de mail.

const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';
const SITE_ID = process.env.WERKSCAN_SITE_ID || '4f51800e-6e4a-4ca1-bc6f-ddeb88481de9'; // AI Aan de Slag Dag (publiek)
const RESEND_API_KEY = process.env.RESEND_API_KEY;             // optioneel
const MAIL_VAN = process.env.WERKSCAN_MAIL_VAN || 'AI Aan De Slag Dag <contact@ai-aandeslagdag.nl>';

const AUD_LABEL = { sales: 'Sales', marketing: 'Marketing & Communicatie', managers: 'Managers', entrepreneurs: 'Ondernemers', teams: 'Teams' };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max || 300) : '');
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch (e) { body = null; }
  if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, melding: 'Ongeldige aanvraag.' }); return; }

  // Anti-spam: honeypot gevuld of te snel ingevuld → doe alsof het lukte (bot leert niets).
  if (str(body._website)) { res.status(200).json({ ok: true }); return; }
  const ts = Number(body._ts);
  if (Number.isFinite(ts) && Date.now() - ts < 2000) { res.status(200).json({ ok: true }); return; }

  const voornaam = str(body.voornaam, 80), achternaam = str(body.achternaam, 80), email = str(body.email, 160);
  const audience = str(body.audience, 40);
  if (!voornaam || !achternaam || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, melding: 'Controleer je naam en e-mailadres.' });
    return;
  }

  const kansen = Array.isArray(body.kansen) ? body.kansen.slice(0, 3).map((k) => ({ titel: str(k && k.titel, 120), waarom: str(k && k.waarom, 600) })) : [];
  const opps = kansen.map((k) => k.titel).filter(Boolean);
  const advies = str(body.start, 600), build = str(body.build, 600);
  const profiel = str(body.result_profile, 120);
  const ticket = body.ticket === 'team' ? 'team' : 'individueel';

  // Gestructureerde, niet-gevoelige samenvatting voor opslag (vraag-veld van de aanvraag).
  const utmRegels = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((k) => (str(body[k]) ? `${k}=${str(body[k], 120)}` : null)).filter(Boolean);
  const samenvatting = [
    `AI WerkScan (${AUD_LABEL[audience] || audience || 'onbekend'})`,
    `Scan-versie: ${str(body.scan_version, 40)}`,
    `Profiel: ${profiel}`,
    `Top-3 kansen: ${opps.join(', ')}`,
    `Marketingtoestemming: ${body.marketing_consent ? 'ja' : 'nee'}`,
    `Bronpagina: ${str(body.source_page, 120)}`,
    utmRegels.length ? `UTM: ${utmRegels.join(' · ')}` : null,
  ].filter(Boolean).join('\n');

  // 1+2) Opslaan + site notificeren via bestaand headless lead-endpoint.
  let opgeslagen = false;
  try {
    const r = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/cms/lead`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        site_id: SITE_ID,
        naam: `${voornaam} ${achternaam}`.trim(),
        email,
        vraag: samenvatting,
        bron_pagina: str(body.source_page, 200),
        herkomst: `werkscan-${audience || 'onbekend'}`,
      }),
    });
    const j = await r.json().catch(() => null);
    opgeslagen = !!(r.ok && j && j.ok);
  } catch (e) {
    console.error('werkscan: opslag mislukt', e && e.name);
  }

  if (!opgeslagen) {
    // Leadopslag is de harde succesvoorwaarde: laat de frontend de antwoorden bewaren en opnieuw proberen.
    res.status(502).json({ ok: false, melding: 'Opslaan lukte niet.' });
    return;
  }

  // 3) Persoonlijke resultaatmail (best-effort; blokkeert de response nooit).
  if (RESEND_API_KEY) {
    resultaatMail(voornaam, email, kansen, advies, build, ticket).catch((e) => console.error('werkscan: mail mislukt', e && e.name));
  }

  res.status(200).json({ ok: true });
}

async function resultaatMail(voornaam, email, kansen, advies, build, ticket) {
  const prijs = ticket === 'team' ? '&euro;2.995 excl. btw voor zes personen' : '&euro;595 excl. btw';
  const ctaHref = ticket === 'team' ? 'https://ai-aandeslagdag.nl/#teams' : 'https://ai-aandeslagdag.nl/#tickets';
  const kansenHtml = kansen.map((k, i) => `<tr><td style="padding:8px 0;vertical-align:top;color:#E5007D;font-weight:700;width:34px">${i + 1}.</td><td style="padding:8px 0"><strong>${esc(k.titel)}</strong><br><span style="color:#3A3A3A">${esc(k.waarom)}</span></td></tr>`).join('');
  const html = `<!DOCTYPE html><html lang="nl"><body style="margin:0;background:#F5F3F0;font-family:Arial,Helvetica,sans-serif;color:#111">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
  <p style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#E5007D;font-weight:700;margin:0 0 6px">AI WerkScan</p>
  <h1 style="font-size:24px;line-height:1.2;margin:0 0 16px">${esc(voornaam)}, dit zijn jouw grootste AI-kansen</h1>
  <p style="color:#3A3A3A;font-size:15px;line-height:1.55;margin:0 0 12px">Op basis van jouw AI WerkScan zien we vooral kansen bij:</p>
  <table style="width:100%;font-size:15px;line-height:1.5;border-collapse:collapse">${kansenHtml}</table>
  ${advies ? `<h2 style="font-size:16px;margin:22px 0 6px">Je beste startpunt</h2><p style="color:#3A3A3A;font-size:15px;line-height:1.55;margin:0">${esc(advies)}</p>` : ''}
  ${build ? `<h2 style="font-size:16px;margin:22px 0 6px">Dit zou je op 23 november kunnen bouwen</h2><p style="color:#3A3A3A;font-size:15px;line-height:1.55;margin:0">${esc(build)}</p>` : ''}
  <div style="margin:26px 0;padding:20px;background:#111;border-radius:14px;color:#fff">
    <p style="margin:0 0 4px;font-weight:700;font-size:16px">23 november 2026 &middot; Grote Kerk Den Haag</p>
    <p style="margin:0 0 14px;color:#D8D8D8;font-size:14px">Maximaal 6 deelnemers per AI-coach &middot; ${prijs}</p>
    <a href="${ctaHref}" style="display:inline-block;background:#fff;color:#111;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:10px">Bekijk de AI Aan De Slag Dag &rarr;</a>
  </div>
  <p style="color:#6E6E6E;font-size:12px;line-height:1.5">Je ontvangt deze mail omdat je de AI WerkScan hebt gedaan op ai-aandeslagdag.nl.</p>
</div></body></html>`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ from: MAIL_VAN, to: [email], subject: `${voornaam}, dit zijn jouw grootste AI-kansen`, html }),
  });
  if (!r.ok) console.error('werkscan: resend status', r.status);
}
