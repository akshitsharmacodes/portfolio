import React from 'react';
import { Plus } from 'lucide-react';

/**
 * FAQ list using native <details>, so every answer is in the HTML (crawlable, works without
 * JavaScript) and matches the FAQPage structured data for the page.
 */
export default function Faq({ title = 'Frequently asked questions', items, id = 'faq' }) {
  return (
    <section className="section-padding faq-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="container faq-grid">
        <div className="faq-head">
          <span className="page-eyebrow">FAQ</span>
          <h2 id={`${id}-title`} className="faq-title">
            {title}
          </h2>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
