// Same-origin lead-endpoint voor "Plan een kennismaking" (AI Aan De Slag voor Teams).
// 1) valideert + anti-spam (honeypot + tijdmeting);
// 2) slaat de aanvraag op via het bestaande centrale-CMS lead-endpoint (site-gescoopt) + notificeert de site.
// Geen secrets client-side, geen PII in logs. De frontend werkt los van dit endpoint (nette foutmelding).

const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';
const SITE_ID = process.env.WERKSCAN_SITE_ID || '4f51800e-6e4a-4ca1-bc6f-ddeb88481de9'; // AI Aan De Slag (publiek)

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max || 300) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch (e) { body = null; }
  if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, melding: 'Ongeldige aanvraag.' }); return; }

  // Anti-spam: honeypot gevuld of te snel ingevuld → doe alsof het lukte (bot leert niets).
  if (str(body._website)) { res.status(200).json({ ok: true }); return; }
  const ts = Number(body._ts);
  if (Number.isFinite(ts) && Date.now() - ts < 2000) { res.status(200).json({ ok: true }); return; }

  const naam = str(body.naam, 120);
  const organisatie = str(body.organisatie, 160);
  const email = str(body.email, 160);
  const telefoon = str(body.telefoon, 40);
  const aantalRaw = str(body.aantal, 8);
  const toelichting = str(body.toelichting, 1200);

  if (!naam || !organisatie || !EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, melding: 'Vul je naam, organisatie en een geldig e-mailadres in.' });
    return;
  }

  // Aantal deelnemers netjes normaliseren (1–20), leeg = onbekend.
  let aantal = '';
  const n = parseInt(aantalRaw, 10);
  if (Number.isFinite(n)) aantal = String(Math.min(20, Math.max(1, n)));

  // Gestructureerde, niet-gevoelige samenvatting voor opslag (vraag-veld van de aanvraag).
  const utmRegels = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .map((k) => (str(body[k]) ? `${k}=${str(body[k], 120)}` : null)).filter(Boolean);
  const samenvatting = [
    'Aanvraag kennismaking — AI Aan De Slag voor Teams',
    `Organisatie: ${organisatie}`,
    telefoon ? `Telefoon: ${telefoon}` : null,
    `Aantal deelnemers: ${aantal || 'onbekend'}`,
    toelichting ? `Toelichting: ${toelichting}` : null,
    `Bronpagina: ${str(body.bron_pagina, 200)}`,
    utmRegels.length ? `UTM: ${utmRegels.join(' · ')}` : null,
  ].filter(Boolean).join('\n');

  try {
    const r = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/cms/lead`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        site_id: SITE_ID,
        naam,
        email,
        vraag: samenvatting,
        bron_pagina: str(body.bron_pagina, 200),
        herkomst: 'kennismaking-teams',
      }),
    });
    const j = await r.json().catch(() => null);
    if (r.ok && j && j.ok) { res.status(200).json({ ok: true }); return; }
    res.status(502).json({ ok: false, melding: 'Opslaan lukte niet. Probeer het opnieuw of mail contact@ai-aandeslagdag.nl.' });
  } catch (e) {
    console.error('kennismaking: opslag mislukt', e && e.name);
    res.status(502).json({ ok: false, melding: 'Er ging iets mis. Probeer het later opnieuw of mail contact@ai-aandeslagdag.nl.' });
  }
}
