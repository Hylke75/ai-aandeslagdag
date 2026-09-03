// Headless content-endpoint voor de "AI Aan De Slag Dag"-frontend.
//
// Draait server-side op Vercel zodat het CMS_TOKEN nooit in de browser komt.
// Zonder CMS_URL + CMS_TOKEN antwoordt hij {ok:false} en blijft de pagina exact het
// aangeleverde ontwerp (alle teksten staan als fallback in index.html).
//
// Met token: haalt de home-pagina (slug "/") uit het centrale CMS en geeft de blokken
// door aan de frontend. De frontend mapt elk blok op een sectie via content._sectie
// (of, als dat ontbreekt, op het bloktype) en overschrijft de bijbehorende teksten/lijsten
// non-destructief — een leeg veld laat de bestaande tekst staan.

const CMS_URL = process.env.CMS_URL;     // https://linkandlead.nl
const CMS_TOKEN = process.env.CMS_TOKEN; // cms_...

function homePagina(data) {
  const paginas = data?.paginas || [];
  return paginas.find((p) => p.slug === '/') || paginas[0] || null;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');

  if (!CMS_URL || !CMS_TOKEN) {
    res.status(200).json({ ok: false, reden: 'geen-cms-token' });
    return;
  }

  try {
    const url = `${CMS_URL.replace(/\/$/, '')}/api/cms/content?slug=/`;
    const r = await fetch(url, { headers: { authorization: `Bearer ${CMS_TOKEN}` } });
    if (!r.ok) {
      res.status(200).json({ ok: false, reden: `cms-status-${r.status}` });
      return;
    }
    const data = await r.json();
    if (!data || data.ok === false) {
      res.status(200).json({ ok: false, reden: 'cms-leeg' });
      return;
    }

    const home = homePagina(data);
    const blokken = Array.isArray(home?.blokken) ? home.blokken : [];

    res.status(200).json({
      ok: true,
      titel: typeof home?.titel === 'string' ? home.titel : undefined,
      beschrijving: typeof home?.beschrijving === 'string' ? home.beschrijving : undefined,
      // Volledige blokken (type + content). De frontend beslist wat hij ermee doet.
      blokken: blokken.map((b) => ({ type: b.type, content: b.content || {} })),
    });
  } catch (e) {
    res.status(200).json({ ok: false, reden: 'cms-onbereikbaar' });
  }
}
