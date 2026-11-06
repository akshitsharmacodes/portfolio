import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowDown, ArrowUpRight, MapPin, FileText, Calendar, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { easeCurves } from '../config/motion';
import SplitReveal from './SplitReveal';
import MagneticButton from './MagneticButton';

/**
 * Agent-graph motif: an orchestrator hub with satellite agents. The outer ring orbits,
 * dashed edges flow into the hub and nodes pulse (CSS keyframes, paused under reduced motion).
 */
function AgentGraph() {
  return (
    <>
      <g className="graph-orbit">
        <circle cx="200" cy="200" r="160" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 6" opacity="0.55" />
        <circle cx="200" cy="40" r="4" fill="var(--accent)" />
        <circle cx="61" cy="280" r="2.5" fill="currentColor" opacity="0.6" />
      </g>
      <circle cx="200" cy="200" r="122" stroke="currentColor" strokeOpacity="0.07" />
      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeOpacity="0.16" />

      {/* Static edges */}
      <line x1="80" y1="120" x2="200" y2="200" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
      <line x1="200" y1="200" x2="320" y2="150" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.35" />
      <line x1="200" y1="200" x2="280" y2="300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
      <line x1="200" y1="200" x2="100" y2="290" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />

      {/* Data flowing from agents into the orchestrator */}
      <line className="graph-edge-flow" x1="80" y1="120" x2="200" y2="200" stroke="var(--accent)" strokeWidth="1.6" />
      <line className="graph-edge-flow" x1="320" y1="150" x2="200" y2="200" stroke="var(--accent)" strokeWidth="1.6" />
      <line className="graph-edge-flow" x1="280" y1="300" x2="200" y2="200" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
      <line className="graph-edge-flow" x1="100" y1="290" x2="200" y2="200" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />

      {/* Nodes */}
      <circle className="graph-node-pulse" cx="80" cy="120" r="5" fill="var(--accent)" />
      <circle className="graph-node-pulse" cx="320" cy="150" r="5" fill="var(--accent)" style={{ '--pulse-delay': '0.8s' }} />
      <circle cx="200" cy="200" r="16" fill="var(--accent)" opacity="0.14" />
      <circle cx="200" cy="200" r="8" fill="var(--accent)" />
      <circle className="graph-node-pulse" cx="280" cy="300" r="4" fill="currentColor" style={{ '--pulse-delay': '1.6s' }} />
      <circle className="graph-node-pulse" cx="100" cy="290" r="4" fill="currentColor" style={{ '--pulse-delay': '2.4s' }} />
    </>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeCurves.responsive },
  },
};

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

const charVariants = {
  hidden: { y: '108%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: easeCurves.responsive },
  },
};

const chipListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeCurves.luxuryDecel },
  },
};

export default function Hero({ motionEnabled, introReady = true, onOpenCalModal }) {
  // Restrained layered parallax: layers drift at different rates and directions.
  // Distances stay smaller than the gaps between blocks, so nothing ever overlaps on screen.
  const { scrollY } = useScroll();
  const graphY = useTransform(scrollY, [0, 700], [0, 110]);
  const graphRotate = useTransform(scrollY, [0, 900], [0, 18]);
  const nameY = useTransform(scrollY, [0, 700], [0, 40]);
  const introY = useTransform(scrollY, [0, 700], [0, -20]);
  const metricsY = useTransform(scrollY, [0, 700], [0, -32]);
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0]);
  // Once faded, take the cue out of the tab order and hit-testing too
  const cueVisibility = useTransform(scrollY, (v) => (v > 150 ? 'hidden' : 'visible'));

  const { identity, specialties, metrics, contact } = siteConfig;
  const nameWords = identity.fullName.split(' ');

  // Static render (motion off / reduced motion): same markup, no choreography
  if (!motionEnabled) {
    return (
      <section className="hero-section" id="hero" aria-label="Introduction">
        <svg className="hero-graph-decor" viewBox="0 0 400 400" fill="none" aria-hidden="true">
          <AgentGraph />
        </svg>
        <div className="container">
          <div className="hero-content">
            <HeroTagline identity={identity} />
            <h1 className="hero-name-callout">{identity.fullName}</h1>
            <div className="hero-headline">
              I build AI agents that <span className="text-accent">{identity.headlineAccent}</span>
            </div>
            <div className="hero-intro">
              <p>{identity.intro}</p>
            </div>
            <div className="hero-specialties">
              {specialties.map((spec) => (
                <span key={spec} className="tech-tag accent-style">{spec}</span>
              ))}
            </div>
            <HeroActions identity={identity} contact={contact} motionEnabled={false} onOpenCalModal={onOpenCalModal} />
            <HeroMetrics metrics={metrics} />
          </div>
        </div>
      </section>
    );
  }

  const state = introReady ? 'visible' : 'hidden';

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <motion.div
        className="hero-graph-wrap"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={introReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 1.4, ease: easeCurves.luxuryDecel, delay: 0.35 }}
      >
        <motion.svg
          className="hero-graph-decor"
          viewBox="0 0 400 400"
          fill="none"
          style={{ y: graphY, rotate: graphRotate }}
        >
          <AgentGraph />
        </motion.svg>
      </motion.div>

      <div className="container">
        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate={state}>
          <motion.div variants={itemVariants}>
            <HeroTagline identity={identity} />
          </motion.div>

          {/* Name rises letter by letter out of a mask, then drifts slower than the page (parallax) */}
          <motion.h1 className="hero-name-callout" variants={nameVariants} style={{ y: nameY }}>
            <span className="sr-only">{identity.fullName}</span>
            {nameWords.map((word, wordIndex) => (
              <React.Fragment key={word + wordIndex}>
                {wordIndex > 0 && ' '}
                <span className="hero-name-word" aria-hidden="true">
                  {[...word].map((char, charIndex) => (
                    <motion.span key={charIndex} className="hero-name-char" variants={charVariants}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              </React.Fragment>
            ))}
          </motion.h1>

          <SplitReveal as="div" className="hero-headline" motionEnabled stagger={0.045}>
            I build AI agents that <span className="text-accent">{identity.headlineAccent}</span>
          </SplitReveal>

          {/* Entrance on the outer layer, scroll parallax on the inner one (never both on one element) */}
          <motion.div variants={itemVariants}>
            <motion.div className="hero-intro" style={{ y: introY }}>
              <p>{identity.intro}</p>
            </motion.div>
          </motion.div>

          <motion.div className="hero-specialties" variants={chipListVariants}>
            {specialties.map((spec) => (
              <motion.span key={spec} className="tech-tag accent-style" variants={chipVariants}>
                {spec}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <HeroActions identity={identity} contact={contact} motionEnabled onOpenCalModal={onOpenCalModal} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.div style={{ y: metricsY }}>
              <HeroMetrics metrics={metrics} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue: fades in after the intro, fades out as soon as the visitor scrolls */}
      <motion.div
        className="hero-scroll-cue-wrap"
        initial={{ opacity: 0 }}
        animate={introReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <motion.a
          href="#work"
          className="hero-scroll-cue"
          aria-label="Scroll to selected work"
          style={{ opacity: cueOpacity, visibility: cueVisibility }}
        >
          <span className="hero-scroll-cue-text">Scroll to discover</span>
          <span className="hero-scroll-cue-track" aria-hidden="true">
            <span className="hero-scroll-cue-dot" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function HeroTagline({ identity }) {
  return (
    <div className="hero-tagline-row">
      <div className="status-pill">
        <span className="status-dot" aria-hidden="true"></span>
        <span>{identity.availability}</span>
      </div>
      <span className="hero-profession">
        {identity.profession} · {identity.roleLine2}
      </span>
    </div>
  );
}

function HeroActions({ identity, contact, motionEnabled = false, onOpenCalModal }) {
  return (
    <div className="hero-actions">
      <MagneticButton
        as="button"
        motionEnabled={motionEnabled}
        type="button"
        onClick={(e) => onOpenCalModal?.(e.currentTarget)}
        className="btn btn-primary"
        title="Book a Discovery Call with Akshit"
      >
        <Calendar size={16} aria-hidden="true" />
        <span>Book a Discovery Call</span>
      </MagneticButton>

      <a href="#contact" className="btn btn-secondary">
        <Mail size={16} aria-hidden="true" />
        <span>Send Message</span>
      </a>

      <div className="hero-actions-tertiary">
        <a href="#work" className="btn-link">
          <span>View Selected Work</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
        {isValidContent(identity.resume) && (
          <a
            href={identity.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
            aria-label="View resume on Google Drive"
          >
            <FileText size={15} aria-hidden="true" />
            <span>Resume</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="hero-location" title="Current base">
        <MapPin size={14} aria-hidden="true" />
        <span>{identity.location}</span>
      </div>
    </div>
  );
}

function HeroMetrics({ metrics }) {
  return (
    <div className="metrics-strip">
      {metrics.map((metric) => (
        <div key={metric.label} className="metric-item">
          <div className="metric-value">{metric.value}</div>
          <div className="metric-label">{metric.label}</div>
          <div className="metric-detail">{metric.detail}</div>
        </div>
      ))}
    </div>
  );
}
