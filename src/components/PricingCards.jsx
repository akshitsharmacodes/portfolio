import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGsapContext } from '../hooks/useScrollAnimation';
import { services } from '../data/services';

/** Starting-from price cards for every service, in INR and USD */
export default function PricingCards({ compact = false, motionEnabled = true }) {
  const containerRef = useRef(null);

  useGsapContext(
    containerRef,
    (ctx, mm) => {
      mm.add('(min-width: 769px)', () => {
        gsap.from('.price-card', {
          y: 24,
          opacity: 0,
          stagger: 0.08,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        });
      });

      mm.add('(max-width: 768px)', () => {
        gsap.from('.price-card', {
          y: 16,
          opacity: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          },
        });
      });
    },
    [],
    motionEnabled
  );

  return (
    <div ref={containerRef} className={`price-grid${compact ? ' is-compact' : ''}`}>
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
