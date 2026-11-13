/**
 * Pre-render every route to static HTML after `vite build`.
 *
 * Search engines and AI crawlers (most of which don't run JavaScript) get the full page
 * content, the right <title>/description/canonical, and page-specific JSON-LD. The browser
 * then renders the React app fresh over it.
 *
 * Steps: read dist/index.html → render each route with the SSR bundle → inject head + body →
 * write dist/<route>/index.html → regenerate dist/sitemap.xml.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, ROUTES, seoFor } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in index.html`);
  return html.replace(pattern, replacement);
}

let ok = 0;
for (const route of ROUTES) {
  const seo = seoFor(route);
  let appHtml;
  try {
    appHtml = render(route);
  } catch (err) {
    console.error(`✗ ${route}: ${err.message}`);
    process.exitCode = 1;
    continue;
  }

  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`, 'title');
  html = setTag(html, /<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${esc(seo.title)}" />`, 'meta title');
  html = setTag(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${esc(seo.description)}" />`, 'description');
  html = setTag(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${seo.canonical}" />`, 'canonical');
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${seo.canonical}" />`, 'og:url');
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(seo.title)}" />`, 'og:title');
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(seo.description)}" />`, 'og:description');
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(seo.title)}" />`, 'twitter:title');
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`, 'twitter:description');
  html = html.replace(/<meta property="twitter:url" content="[^"]*" \/>|<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${seo.canonical}" />`);

  // Page-specific structured data replaces the placeholder
  const ld = seo.jsonLd
    ? `<script type="application/ld+json" id="ld-page">${JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')}</script>`
    : '';
  html = setTag(html, /<!--ld-page-->/, ld, 'ld-page placeholder');

  html = setTag(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, 'root');

  const out = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  ok += 1;
  console.log(`✓ ${route}  (${(Buffer.byteLength(html) / 1024).toFixed(0)} KB)`);
}

// Sitemap with every pre-rendered route
const today = new Date().toISOString().slice(0, 10);
const site = seoFor('/').canonical.replace(/\/$/, '');
const priority = (r) => (r === '/' ? '1.0' : r.startsWith('/services/') ? '0.9' : r === '/recruiters' || r === '/pricing' ? '0.8' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${site}${r === '/' ? '/' : r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(r)}</priority>
  </url>`
).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`\nPre-rendered ${ok}/${ROUTES.length} routes; sitemap.xml has ${ROUTES.length} URLs.`);
