import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

/** Mid-page nudge after the work grid: one line of copy, one primary and one secondary action */
export default function CtaBand({ onOpenCalModal }) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="container">
        <div className="cta-band-card">
          <div className="cta-band-copy">
            <span className="cta-band-eyebrow">Free 30-minute scoping call</span>
            <h2 id="cta-band-title" className="cta-band-title">
              Seen something close to what you need? Let's scope your agent together.
            </h2>
          </div>
          <div className="cta-band-actions">
            <button
              type="button"
              className="btn btn-primary glow-ring-btn"
              onClick={(e) => onOpenCalModal?.(e.currentTarget)}
            >
              <span className="glow-ring-disc" aria-hidden="true">
                <Calendar size={14} />
              </span>
              <span>Book a call</span>
            </button>
            <a href="#contact" className="btn btn-secondary btn-liquid-glass">
              <span>Send a brief</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
