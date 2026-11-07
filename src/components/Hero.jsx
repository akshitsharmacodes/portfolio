import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUpRight, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { easeCurves } from '../config/motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeCurves.luxuryDecel } },
};

/**
 * Hero: one message, two actions, one proof strip.
 * The name and role sit inside the <h1> (for search), styled as a quiet kicker above the headline.
 */
export default function Hero({ motionEnabled, onOpenCalModal }) {
  const { identity, specialties, metrics } = siteConfig;
  const headlineLead = identity.headline.replace(identity.headlineAccent, '').trim();

  const Wrap = motionEnabled ? motion.div : 'div';
  const Item = motionEnabled ? motion.div : 'div';
  const wrapProps = motionEnabled ? { variants: containerVariants, initial: 'hidden', animate: 'visible' } : {};
  const itemProps = motionEnabled ? { variants: itemVariants } : {};

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <div className="container">
        <Wrap className="hero-content" {...wrapProps}>
          <Item {...itemProps}>
            <a href="#contact" className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span>{identity.availability}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </a>
          </Item>

          <Item {...itemProps}>
            <h1 className="hero-title">
              <span className="hero-kicker">
                {identity.fullName} · {identity.profession}
              </span>
              <span className="hero-headline">
                {headlineLead} <span className="hero-headline-accent">{identity.headlineAccent}</span>
              </span>
            </h1>
          </Item>

          <Item {...itemProps}>
            <p className="hero-intro">{identity.intro}</p>
          </Item>

          <Item {...itemProps}>
            <div className="hero-actions">
              <button
                type="button"
                onClick={(e) => onOpenCalModal?.(e.currentTarget)}
                className="btn btn-primary"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Book a discovery call</span>
              </button>
              <a href="#work" className="btn btn-secondary">
                <span>View work</span>
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              {isValidContent(identity.resume) && (
                <a
                  href={identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link"
                  aria-label="View resume (opens Google Drive)"
                >
                  <span>Resume</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </Item>

          <Item {...itemProps}>
            <p className="hero-meta">
              <span className="hero-meta-item">
                <MapPin size={13} aria-hidden="true" />
                {identity.location}
              </span>
              <span className="hero-meta-sep" aria-hidden="true" />
              <span className="hero-meta-stack">{specialties.slice(0, 5).join(' · ')}</span>
            </p>
          </Item>

          <Item {...itemProps}>
            <dl className="metrics-strip">
              {metrics.map((metric) => (
                <div key={metric.label} className="metric-item">
                  <dt className="metric-label">{metric.label}</dt>
                  <dd className="metric-value">{metric.value}</dd>
                  <dd className="metric-detail">{metric.detail}</dd>
                </div>
              ))}
            </dl>
          </Item>
        </Wrap>
      </div>
    </section>
  );
}
