import React, { useEffect, useState } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUpRight, Calendar } from 'lucide-react';
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

const panelVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.25, ease: easeCurves.luxuryDecel, staggerChildren: 0.14, delayChildren: 0.55 },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeCurves.luxuryDecel } },
};

// Illustrative semantic-search hits for the example query (the panel is labelled "Architecture")
const RAG_HITS = [
  { doc: 'api-keys.md', score: 0.92 },
  { doc: 'sso-admin-guide.pdf', score: 0.87 },
  { doc: 'ticket-4821.json', score: 0.81 },
];

// True once the index.html preloader has lifted (or immediately when it was skipped)
function usePreloaderDone() {
  const [done, setDone] = useState(() => typeof window === 'undefined' || Boolean(window.__preloaderDone));
  useEffect(() => {
    if (done) return undefined;
    const onDone = () => setDone(true);
    window.addEventListener('preloader:done', onDone);
    if (window.__preloaderDone) setDone(true);
    return () => window.removeEventListener('preloader:done', onDone);
  }, [done]);
  return done;
}

/**
 * RAG pipeline, drawn as one slim timeline: query → embed → semantic search (top-k hits)
 * → LLM → grounded answer. A single data dot travels down the rail (CSS, off with motion off).
 */
const RAG_STEPS = [
  { name: 'Query', meta: '“rotate api keys?”' },
  { name: 'Embed', meta: '1536-d vector' },
  { name: 'Semantic search', meta: 'pgvector · top-k 3', hits: true },
  { name: 'LLM', meta: 'prompt + context' },
  { name: 'Grounded answer', meta: '3 citations', done: true },
];

function RagDiagram({ motionEnabled, ready }) {
  const Panel = motionEnabled ? motion.figure : 'figure';
  const Step = motionEnabled ? motion.li : 'li';
  const panelProps = motionEnabled
    ? { variants: panelVariants, initial: 'hidden', animate: ready ? 'visible' : 'hidden' }
    : {};
  const stepProps = motionEnabled ? { variants: nodeVariants } : {};

  return (
    <Panel
      className="rag"
      aria-label="RAG architecture: a user query is embedded, matched by semantic search in a vector database, and the retrieved context is passed to an LLM to produce a grounded answer."
      {...panelProps}
    >
      <figcaption className="rag-head">
        <span>RAG pipeline</span>
        <span className="rag-head-meta">architecture</span>
      </figcaption>

      <div className="rag-body">
        <span className="rag-rail" aria-hidden="true"><i /></span>
        <ol className="rag-steps">
        {RAG_STEPS.map((step) => (
          <Step key={step.name} className={`rag-step${step.done ? ' is-done' : ''}`} {...stepProps}>
            <span className="rag-node-dot" aria-hidden="true" />
            <div className="rag-step-row">
              <span className="rag-step-name">{step.name}</span>
              <span className="rag-step-meta">{step.meta}</span>
            </div>
            {step.hits && (
              <ul className="rag-hits">
                {RAG_HITS.map((hit) => (
                  <li key={hit.doc} className="rag-hit">
                    <span className="rag-hit-doc">{hit.doc}</span>
                    <span className="rag-hit-bar" aria-hidden="true">
                      <span style={{ '--score': hit.score }} />
                    </span>
                    <span className="rag-hit-score">{hit.score.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Step>
        ))}
        </ol>
      </div>
    </Panel>
  );
}

/**
 * Hero: message + actions on the left, a concrete "what I build" visual on the right,
 * proof strip across the full width below.
 */
export default function Hero({ motionEnabled, onOpenCalModal }) {
  const { identity, specialties, metrics } = siteConfig;
  const headlineLead = identity.headline.replace(identity.headlineAccent, '').trim();
  const ready = usePreloaderDone();

  // "Scroll down to view work" cue: appears 1s after the intro starts (immediately with motion off)
  const [showCue, setShowCue] = useState(!motionEnabled);
  useEffect(() => {
    if (!motionEnabled) {
      setShowCue(true);
      return undefined;
    }
    if (!ready) return undefined;
    const timer = setTimeout(() => setShowCue(true), 1000);
    return () => clearTimeout(timer);
  }, [ready, motionEnabled]);

  const Wrap = motionEnabled ? motion.div : 'div';
  const Item = motionEnabled ? motion.div : 'div';
  const wrapProps = motionEnabled
    ? { variants: containerVariants, initial: 'hidden', animate: ready ? 'visible' : 'hidden' }
    : {};
  const itemProps = motionEnabled ? { variants: itemVariants } : {};

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <Wrap className="hero-content" {...wrapProps}>
            <Item {...itemProps}>
              <a href="#contact" className="hero-status">
                <span className="status-dot" aria-hidden="true" />
                <span>{identity.availability}</span>
              </a>
            </Item>

            <Item {...itemProps}>
              <h1 className="hero-title">
                {/* Name stays in the h1 for search and screen readers; the page already shows it in the nav */}
                <span className="sr-only">{identity.fullName}, {identity.profession}: </span>
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
              <a href="#work" className={`hero-work-cue${showCue ? ' is-visible' : ''}`}>
                <span className="hero-work-cue-line" aria-hidden="true" />
                <span>Scroll down to view work</span>
              </a>
            </Item>

            <Item {...itemProps}>
              <div className="hero-meta">
                <ul className="hero-stack" aria-label="Core stack">
                  {specialties.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Item>
          </Wrap>

          <RagDiagram motionEnabled={motionEnabled} ready={ready} />
        </div>

        <Item
          {...(motionEnabled
            ? {
                initial: { opacity: 0, y: 10 },
                animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                transition: { duration: 0.6, delay: ready ? 0.55 : 0, ease: easeCurves.luxuryDecel },
              }
            : {})}
        >
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
      </div>
    </section>
  );
}
