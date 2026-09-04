// Same-origin checkout-proxy (geen CSP-wijziging, geen ID's/secrets client-side). Voegt site_id,
// event-slug en het juiste ticket_id server-side toe en forwardt naar het headless CMS-endpoint,
// dat de inschrijving + Mollie/factuur afhandelt. Retour: {ok, redirect?, melding?}.

const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';
const SITE_ID = process.env.WERKSCAN_SITE_ID || '4f51800e-6e4a-4ca1-bc6f-ddeb88481de9';
const EVENT_SLUG = process.env.EVENT_SLUG || 'ai-aan-de-slag-dag';
const TICKETS = {
  individueel: process.env.TICKET_INDIVIDUEEL || '88b57c68-c0e6-48aa-8af4-a5da23d9eac6',
  teamtafel: process.env.TICKET_TEAMTAFEL || 'c6740dc9-d4e8-48c7-8298-41aec6d10cdd',
};
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max || 300) : '');
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch (e) { body = null; }
  if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, melding: 'Ongeldige aanvraag.' }); return; }

  const ticketKey = body.ticket === 'teamtafel' ? 'teamtafel' : 'individueel';
  const ticketId = TICKETS[ticketKey];
  const naam = str(body.naam, 120), email = str(body.email, 160);
  if (!naam || !EMAIL_RE.test(email)) { res.status(400).json({ ok: false, melding: 'Vul je naam en een geldig e-mailadres in.' }); return; }

  const deelnemers = Array.isArray(body.deelnemers)
    ? body.deelnemers.map((d) => ({ naam: str(d && d.naam, 120), functie: str(d && d.functie, 120) })).filter((d) => d.naam)
    : [];
  if (deelnemers.length === 0) deelnemers.push({ naam });

  const payload = {
    site_id: SITE_ID,
    slug: EVENT_SLUG,
    ticket_id: ticketId,
    betaalwijze: body.betaalwijze === 'factuur' ? 'factuur' : 'online',
    deelnemers,
    besteller: {
      naam,
      email,
      bedrijf: str(body.bedrijf, 160),
      telefoon: str(body.telefoon, 40),
      factuur_adres: str(body.factuur_adres, 160),
      factuur_postcode: str(body.factuur_postcode, 16),
      factuur_plaats: str(body.factuur_plaats, 80),
      factuur_land: str(body.factuur_land, 2) || 'NL',
      btw_nummer: str(body.btw_nummer, 20),
      opmerking: str(body.opmerking, 500),
      bron_pagina: str(body.bron_pagina, 200),
    },
    optin: !!body.optin,
    optin_tekst: body.optin ? str(body.optin_tekst, 300) : undefined,
    _website: str(body._website, 100),
    _ts: Number(body._ts) || undefined,
  };

  try {
    const r = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/cms/inschrijven`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
    });
    const j = await r.json().catch(() => null);
    if (!j) { res.status(502).json({ ok: false, melding: 'Er ging iets mis. Probeer het opnieuw.' }); return; }
    res.status(r.ok ? 200 : 400).json(j);
  } catch (e) {
    console.error('checkout-proxy:', e && e.name);
    res.status(502).json({ ok: false, melding: 'Er ging iets mis. Probeer het later opnieuw.' });
  }
}
