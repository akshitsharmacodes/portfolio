import React, { useEffect, useState } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUpRight, ArrowRight, MapPin, Calendar, Check, CornerDownRight } from 'lucide-react';
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
    transition: { duration: 0.7, delay: 0.25, ease: easeCurves.luxuryDecel, staggerChildren: 0.16, delayChildren: 0.6 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeCurves.luxuryDecel } },
};

// Illustrative trace of the kind of agent workflow Akshit builds (labelled "Example run" in the UI)
const AGENT_STEPS = [
  { name: 'Classify intent', tool: 'LLM router', meta: '0.4s' },
  { name: 'Retrieve context', tool: 'RAG · pgvector', meta: '12 docs' },
  { name: 'Plan & draft reply', tool: 'LangGraph', meta: '1.1s' },
  { name: 'Policy check', tool: 'Guardrails', meta: 'pass' },
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

function AgentRunPanel({ motionEnabled, ready }) {
  const Panel = motionEnabled ? motion.div : 'div';
  const Step = motionEnabled ? motion.li : 'li';
  const panelProps = motionEnabled
    ? { variants: panelVariants, initial: 'hidden', animate: ready ? 'visible' : 'hidden' }
    : {};
  const stepProps = motionEnabled ? { variants: stepVariants } : {};

  return (
    <Panel className="agent-run" aria-label="Example AI agent run" role="figure" {...panelProps}>
      <div className="agent-run-bar">
        <span className="agent-run-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="agent-run-title">support-triage-agent</span>
        <span className="agent-run-tag">Example run</span>
      </div>

      <div className="agent-run-input">
        <span className="agent-run-label">Input</span>
        <p>“Our invoice sync failed overnight. Can you check what happened?”</p>
      </div>

      <ol className="agent-run-steps">
        {AGENT_STEPS.map((step) => (
          <Step key={step.name} className="agent-run-step" {...stepProps}>
            <span className="agent-run-check" aria-hidden="true">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="agent-run-step-name">{step.name}</span>
            <span className="agent-run-step-tool">{step.tool}</span>
            <span className="agent-run-step-meta">{step.meta}</span>
          </Step>
        ))}
      </ol>

      <Step className="agent-run-result" {...stepProps}>
        <CornerDownRight size={14} aria-hidden="true" />
        <span>Resolved without a human</span>
        <span className="agent-run-result-meta">1.9s total</span>
      </Step>
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
              <div className="hero-meta">
                <span className="hero-meta-item">
                  <MapPin size={13} aria-hidden="true" />
                  {identity.location}
                </span>
                <ul className="hero-stack" aria-label="Core stack">
                  {specialties.slice(0, 4).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </Item>
          </Wrap>

          <AgentRunPanel motionEnabled={motionEnabled} ready={ready} />
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
