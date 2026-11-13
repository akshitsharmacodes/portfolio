import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoFor } from '../config/seo';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const m = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/**
 * Keeps <head> in sync with the current route during client-side navigation.
 * The pre-rendered HTML already ships the same values (scripts/prerender.mjs uses seoFor too).
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = seoFor(pathname);
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('link[rel="canonical"]', 'href', seo.canonical);
    setMeta('meta[property="og:url"]', 'content', seo.canonical);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="robots"]', 'content', seo.notFound ? 'noindex' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    let ld = document.getElementById('ld-page');
    if (seo.jsonLd) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        ld.id = 'ld-page';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(seo.jsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [pathname]);

  return null;
}
