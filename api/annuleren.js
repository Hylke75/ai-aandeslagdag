// Same-origin proxy voor annuleren → centrale CMS (token-based). Geen CSP-wijziging nodig.
const CMS_URL = process.env.CMS_URL || 'https://linkandlead.nl';

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).json({ ok: false }); return; }
  let body = req.body;
  try { if (typeof body === 'string') body = JSON.parse(body); } catch (e) { body = null; }
  const token = body && typeof body.token === 'string' ? body.token.trim() : '';
  if (!/^[0-9a-f-]{36}$/i.test(token)) { res.status(400).json({ ok: false }); return; }
  try {
    const r = await fetch(`${CMS_URL.replace(/\/$/, '')}/api/agenda/annuleren`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ token }),
    });
    const j = await r.json().catch(() => ({ ok: false }));
    res.status(r.ok ? 200 : 400).json(j);
  } catch (e) {
    console.error('annuleren-proxy:', e && e.name);
    res.status(502).json({ ok: false });
  }
}
