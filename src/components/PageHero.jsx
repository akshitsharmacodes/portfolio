import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Header for inner pages: breadcrumb, eyebrow, H1, intro and actions.
 * Plain markup (no reveal animation), so the main heading is visible in the pre-rendered HTML.
 */
export default function PageHero({ crumbs = [], eyebrow, title, intro, children, aside }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div className="page-hero-main">
          {crumbs.length > 0 && (
            <nav className="crumbs" aria-label="Breadcrumb">
              <ol>
                {crumbs.map(([label, to], i) => (
                  <li key={to + label}>
                    {i < crumbs.length - 1 ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}
                    {i < crumbs.length - 1 && <ChevronRight size={12} aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <span className="page-eyebrow">{eyebrow}</span>}
          <h1 className="page-title">{title}</h1>
          {intro && <p className="page-intro">{intro}</p>}
          {children && <div className="page-actions">{children}</div>}
        </div>
        {aside && <aside className="page-hero-aside">{aside}</aside>}
      </div>
    </section>
  );
}
