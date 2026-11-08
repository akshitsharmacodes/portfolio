import React, { useEffect, useState } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowDown, ArrowUpRight, Calendar, Sun, Moon, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { easeCurves } from '../config/motion';
import MeshFlow from './MeshFlow';
import FocusHeadline from './FocusHeadline';
import EclipseArc from './EclipseArc';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

// Tech marquee under the hero (✦ separators come from CSS)
const STACK = ['Python', 'LangGraph', 'LangChain', 'RAG', 'FastAPI', 'Django', 'PostgreSQL', 'pgvector', 'Redis', 'OpenAI', 'Claude', 'Docker'];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeCurves.luxuryDecel } },
};

// True once the index.html intro loader has lifted (or immediately when it was skipped)
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
 * Eclipse hero (after the reel's "ZYNO" layout): a glowing palette-coloured arc rises
 * behind one giant centred headline, a single line of copy and two buttons; proof
 * metrics and the tech marquee sit underneath. Mesh Flow grid behind everything.
 */
export default function Hero({
  motionEnabled,
  onOpenCalModal,
  onOpenCommand,
  onToggleTheme,
  onToggleMotion,
  theme,
  palette,
}) {
  const { identity, metrics } = siteConfig;
  const headlineLead = identity.headline.replace(identity.headlineAccent, '').trim();
  const ready = usePreloaderDone();
  // "Available for Hire · Contract & Freelance Projects": the second half hides on phones
  const [availMain, ...rest] = identity.availability.split(' · ');
  const availMore = rest.join(' · ');

  const Wrap = motionEnabled ? motion.div : 'div';
  const Item = motionEnabled ? motion.div : 'div';
  const wrapProps = motionEnabled
    ? { variants: containerVariants, initial: 'hidden', animate: ready ? 'visible' : 'hidden' }
    : {};
  const itemProps = motionEnabled ? { variants: itemVariants } : {};

  return (
    <section className="hero-section hero--eclipse" id="hero" aria-label="Introduction">
      <MeshFlow motionEnabled={motionEnabled} />
      <EclipseArc motionEnabled={motionEnabled} ready={ready} />

      <div className="container hero-eclipse-inner">
        <Wrap className="hero-eclipse-content" {...wrapProps}>
          <Item {...itemProps}>
            <a href="#contact" className="hero-status">
              <span className="status-dot" aria-hidden="true" />
              <span>
                {availMain}
                {availMore && <span className="hero-status-more"> · {availMore}</span>}
              </span>
            </a>
          </Item>

          <Item {...itemProps}>
            <h1 className="hero-title">
              {/* Name stays in the h1 for search and screen readers; the nav already shows it */}
              <span className="sr-only">{identity.fullName}, {identity.profession}: </span>
              <FocusHeadline
                lead={headlineLead}
                accent={identity.headlineAccent}
                motionEnabled={motionEnabled}
                ready={ready}
              />
            </h1>
          </Item>

          <Item {...itemProps}>
            <p className="hero-intro">{identity.heroLine || identity.intro}</p>
          </Item>

          <Item {...itemProps}>
            <div className="hero-actions">
              <button
                type="button"
                onClick={(e) => onOpenCalModal?.(e.currentTarget)}
                className="btn btn-primary glow-ring-btn"
              >
                <span className="glow-ring-disc" aria-hidden="true">
                  <Calendar size={15} />
                </span>
                <span>Book a discovery call</span>
              </button>
              <a href="#work" className="btn btn-secondary btn-liquid-glass">
                <span>See my work</span>
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            {isValidContent(identity.resume) && (
              <a
                href={identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link hero-resume"
                aria-label="View resume (opens Google Drive)"
              >
                <span>or view my resume</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            )}
          </Item>

          {/* Elegant Prompt Ribbon (Revealed after preloader finishes & home screen loads) */}
          <Item
            {...(motionEnabled
              ? {
                  variants: {
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.35, ease: easeCurves.luxuryDecel },
                    },
                  },
                }
              : {})}
          >
            <div className="hero-quick-tips" role="region" aria-label="Quick navigation and shortcuts">
              <span className="hero-quick-tip-hint">
                <span className="hero-tip-spark" aria-hidden="true">✦</span>
                <span className="hero-tip-text">Quick actions:</span>
              </span>

              {onOpenCommand && (
                <button
                  type="button"
                  className="hero-quick-tip-btn"
                  onClick={(e) => onOpenCommand(e.currentTarget)}
                  title="Open command palette (Ctrl+K / ⌘K)"
                  aria-label="Open command palette"
                >
                  <kbd className="hero-tip-kbd">{isMac ? '⌘K' : 'Ctrl+K'}</kbd>
                  <span>to navigate</span>
                </button>
              )}

              {onToggleTheme && (
                <>
                  <span className="hero-quick-tip-divider" aria-hidden="true">·</span>
                  <button
                    type="button"
                    className="hero-quick-tip-btn"
                    onClick={onToggleTheme}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label="Toggle theme"
                  >
                    <span className="hero-tip-icon" aria-hidden="true">
                      {theme === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                    </span>
                    <span>toggle theme</span>
                  </button>
                </>
              )}

              {onToggleMotion && (
                <>
                  <span className="hero-quick-tip-divider desktop-only" aria-hidden="true">·</span>
                  <button
                    type="button"
                    className="hero-quick-tip-btn desktop-only"
                    onClick={onToggleMotion}
                    title={motionEnabled ? 'Pause animations & motion' : 'Resume animations & motion'}
                    aria-label="Toggle motion on/off"
                  >
                    <span className="hero-tip-icon" aria-hidden="true">
                      {motionEnabled ? <Pause size={12} /> : <Play size={12} />}
                    </span>
                    <span>motion {motionEnabled ? 'on' : 'off'}</span>
                  </button>
                </>
              )}
            </div>
          </Item>
        </Wrap>

        <Item
          {...(motionEnabled
            ? {
                initial: { opacity: 0, y: 14 },
                animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                transition: { duration: 0.7, delay: ready ? 0.75 : 0, ease: easeCurves.luxuryDecel },
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

        <div className="stack-marquee" role="group" aria-label="Core stack">
          <div className="stack-marquee-track">
            <ul>
              {STACK.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {/* Second copy makes the loop seamless; hidden from assistive tech */}
            <ul aria-hidden="true">
              {STACK.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
