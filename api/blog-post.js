// /blog/<slug> — server-side gerenderd artikel, live uit het CMS. 404 als het niet bestaat/gepubliceerd is.
import { fetchArtikel, fetchArtikelen, postHtml, notFoundHtml } from '../lib/blog-render.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const slug = (req.query && req.query.slug) || '';
  try {
    const artikel = await fetchArtikel(slug);
    if (!artikel) {
      res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30');
      res.status(404).send(notFoundHtml());
      return;
    }
    const alle = await fetchArtikelen().catch(() => []);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(postHtml(artikel, alle));
  } catch (e) {
    console.error('blog-post:', e && e.message);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=15');
    res.status(500).send(notFoundHtml());
  }
}
