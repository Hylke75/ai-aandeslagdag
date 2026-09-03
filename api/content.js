// Headless content-endpoint voor de "AI Aan De Slag Dag"-frontend.
//
// Dit draait server-side op Vercel, zodat het CMS_TOKEN nooit in de browser terechtkomt.
// Zonder CMS_URL + CMS_TOKEN (dus zolang er nog geen token is) antwoordt hij {ok:false}
// en valt de site terug op de content die in index.html staat — pixel-identiek aan het ontwerp.
//
// Zodra er een token is: zet CMS_URL + CMS_TOKEN als Environment Variables in Vercel.
// De frontend (zie de CMS-hydratie onderaan index.html) haalt dit endpoint dan op en
// vervangt de hero-teksten en de <title>. Elk ontbrekend veld laat de bestaande tekst staan.

const CMS_URL = process.env.CMS_URL;     // https://linkandlead.nl
const CMS_TOKEN = process.env.CMS_TOKEN; // cms_...

// Zoek het eerste header-blok in de CMS-content (de hero). Daaruit lezen we de losse velden.
function eersteHeader(data) {
  for (const p of data?.paginas || []) {
    for (const b of p.blokken || []) {
      if (b.type === 'header' && b.content) return b.content;
    }
  }
  return null;
}

// De home-pagina (slug "/") voor titel/beschrijving; anders de eerste pagina.
function homePagina(data) {
  const paginas = data?.paginas || [];
  return paginas.find((p) => p.slug === '/') || paginas[0] || null;
}

function tekst(v) {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined;
}

export default async function handler(req, res) {
  // Kleine cache: content ververst binnen ~60s, net als de CMS-lees-API zelf.
  res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');

  if (!CMS_URL || !CMS_TOKEN) {
    // Nog geen token: de site gebruikt de content in de code.
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
    const h = eersteHeader(data) || {};

    res.status(200).json({
      ok: true,
      titel: tekst(home?.titel),
      eyebrow: tekst(h.eyebrow),
      heading: tekst(h.heading),
      lead: tekst(h.subheading),
      // De hero-body staat in het CMS meestal als losse tekst; ondersteun een paar veldnamen.
      body: tekst(h.body) || tekst(h.tekst) || tekst(h.intro),
    });
  } catch (e) {
    // Nooit de site laten breken op een CMS-hik: val terug op code-content.
    res.status(200).json({ ok: false, reden: 'cms-onbereikbaar' });
  }
}
