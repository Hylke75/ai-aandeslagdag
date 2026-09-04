// /blog — server-side gerenderd overzicht, live uit het CMS (Supabase, published + site-gescoopt).
import { fetchArtikelen, indexHtml } from '../lib/blog-render.js';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  try {
    const artikelen = await fetchArtikelen();
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(indexHtml(Array.isArray(artikelen) ? artikelen : []));
  } catch (e) {
    console.error('blog-index:', e && e.message);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=15');
    res.status(200).send(indexHtml([])); // nette lege staat i.p.v. foutpagina
  }
}
