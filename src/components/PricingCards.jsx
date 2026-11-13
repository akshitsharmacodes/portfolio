import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '../data/services';

/** Starting-from price cards for every service, in INR and USD */
export default function PricingCards({ compact = false }) {
  return (
    <div className={`price-grid${compact ? ' is-compact' : ''}`}>
      {services.map((s) => (
        <article key={s.slug} className="price-card">
          <span className="price-num">{s.num}</span>
          <h3 className="price-name">{s.name}</h3>
          <p className="price-from">
            <small>Starting from</small>
            <b>{s.from.inr}</b>
            <span>
              {s.from.usd} · {s.from.unit}
            </span>
          </p>
          {!compact && (
            <ul className="price-list">
              {s.deliverables.slice(0, 4).map((d) => (
                <li key={d}>
                  <Check size={14} aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
          <span className="price-time">{s.timeline}</span>
          <Link to={`/services/${s.slug}`} className="price-link">
            <span>What's included</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
