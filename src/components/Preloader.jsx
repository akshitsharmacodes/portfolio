import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/site';
import { easeCurves } from '../config/motion';

/**
 * Developer boot sequence (preloader).
 *
 * - The first frame is painted by static markup in index.html (inside #root), so there is
 *   no blank screen while the JS bundle downloads. React replaces it with this component,
 *   which renders the same structure and picks up the timeline from navigation start.
 * - Holds until web fonts and the window load event are done (so the hero never flashes a
 *   fallback face), with a hard cap of MAX_WAIT_MS.
 * - Shown on every refresh and page load; skipped under reduced motion
 *   (decided before first paint by the inline script in index.html).
 * - Skippable at any time: button, Esc, Enter or Space.
 * Styles live inline in index.html so they apply before the main stylesheet loads.
 */

const COMMAND = 'python -m portfolio --serve';
const STEPS = [
  { at: 0.3, label: 'Loading agent graph', value: 'langgraph' },
  { at: 0.46, label: 'Indexing vector store', value: 'chromadb' },
  { at: 0.62, label: 'Warming cache layer', value: 'redis' },
  { at: 0.78, label: 'Starting API server', value: 'fastapi' },
];

const MIN_DURATION_MS = 1900; // total sequence length, measured from navigation start
const MAX_WAIT_MS = 3500; // never hold a visitor longer than 3.5s per spec
const HOLD_AFTER_READY_MS = 420; // let "ready" register before the curtain lifts
const REVEAL_LEAD_MS = 340; // start the hero entrance while the curtain is still moving

const clamp01 = (v) => Math.min(1, Math.max(0, v));

const markBooted = () => {
  try {
    sessionStorage.setItem('akshit-portfolio-booted', '1');
  } catch {}
};

export default function Preloader({ onReveal, onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading → ready → exiting
  const [readyMs, setReadyMs] = useState(null);

  const phaseRef = useRef('loading');
  const timersRef = useRef([]);
  const assetsReadyAtRef = useRef(null);

  const later = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const startExit = useCallback(() => {
    if (phaseRef.current === 'exiting') return;
    phaseRef.current = 'exiting';
    setPhase('exiting');
    markBooted();
    later(() => onReveal?.(), REVEAL_LEAD_MS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReveal]);

  const skip = useCallback(() => {
    if (phaseRef.current === 'exiting') return;
    markBooted();
    setProgress(1);
    if (readyMs === null) setReadyMs(Math.round(performance.now()));
    startExit();
  }, [readyMs, startExit]);

  // Main timeline
  useEffect(() => {
    let frame = 0;
    let assetsReady = false;
    let shown = 0;

    const markReady = () => {
      if (assetsReady) return;
      assetsReady = true;
      assetsReadyAtRef.current = performance.now();
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const windowLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
    Promise.all([fontsReady, windowLoaded]).then(markReady, markReady);
    const capId = window.setTimeout(markReady, Math.max(0, MAX_WAIT_MS - performance.now()));

    let last = performance.now();
    const tick = () => {
      if (phaseRef.current === 'exiting') return;
      const now = performance.now();
      const dt = Math.min(250, now - last);
      last = now;
      const linear = clamp01(now / MIN_DURATION_MS);
      const eased = 1 - Math.pow(1 - linear, 2.2);
      const target = assetsReady ? eased : Math.min(eased, 0.9);
      // Time-based easing toward the target: same feel at 30, 60 or 120 fps
      shown += (target - shown) * (1 - Math.exp(-dt / 70));
      if (target >= 1 && shown > 0.99) shown = 1;
      setProgress(shown);

      if (shown >= 1) {
        phaseRef.current = 'ready';
        setPhase('ready');
        setReadyMs(Math.round(assetsReadyAtRef.current ?? performance.now()));
        later(startExit, HOLD_AFTER_READY_MS);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(capId);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, [startExit]);

  // Keyboard skip
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skip]);

  const percent = Math.round(progress * 100);
  const typedCount = Math.round(COMMAND.length * clamp01((progress - 0.02) / 0.22));
  const typing = typedCount < COMMAND.length;
  const visibleSteps = STEPS.filter((step) => progress >= step.at);
  const isReady = phase !== 'loading';
  const exiting = phase === 'exiting';

  const caret = <span className="boot-caret" aria-hidden="true" />;

  return (
    <motion.div
      className="boot"
      initial={false}
      animate={exiting ? { y: '-100%' } : { y: '0%' }}
      transition={{ duration: 0.95, ease: easeCurves.curtain }}
      onAnimationComplete={() => {
        if (phaseRef.current === 'exiting') onDone?.();
      }}
    >
      <div className="boot-top">
        <div className="boot-brand">
          <span className="boot-mark" aria-hidden="true">AS</span>
          <span>{siteConfig.identity.fullName}</span>
        </div>
        <button type="button" className="boot-skip" onClick={skip}>
          Skip intro <kbd>Esc</kbd>
        </button>
      </div>

      <div className="boot-center">
        <motion.div
          className="boot-terminal"
          initial={false}
          animate={exiting ? { opacity: 0, y: -18, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: easeCurves.luxuryDecel }}
          aria-hidden="true"
        >
          <div className="boot-terminal-bar">
            <span className="boot-dots"><i /><i /><i /></span>
            <span className="boot-terminal-title">akshit@portfolio: ~</span>
          </div>
          <div className="boot-terminal-body">
            <div className="boot-line boot-line--cmd">
              <span className="boot-prompt">$</span>
              <span className="boot-typed">{COMMAND.slice(0, typedCount)}</span>
              {typing && caret}
            </div>
            {visibleSteps.map((step) => (
              <div className="boot-line" key={step.label}>
                <span className="boot-ok">[ OK ]</span>
                <span className="boot-step">{step.label}</span>
                <span className="boot-leader" />
                <span className="boot-value">{step.value}</span>
              </div>
            ))}
            {isReady && (
              <div className="boot-line boot-line--done">
                <span className="boot-arrow">→</span>
                <span>
                  ready in {readyMs ? (readyMs / 1000).toFixed(2) + ' s' : '—'} <span className="boot-dim">— welcome.</span>
                </span>
                {caret}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="boot-bottom">
        <div className="boot-label">
          <span>{isReady ? 'Systems nominal' : 'Booting portfolio'}</span>
          <span className="boot-sub">{siteConfig.identity.profession} · {siteConfig.identity.location}</span>
        </div>
        <div className="boot-counter" aria-hidden="true">
          <span className="boot-count">{String(percent).padStart(3, '0')}</span>
          <span className="boot-pct">%</span>
        </div>
      </div>

      <div
        className="boot-progress"
        role="progressbar"
        aria-label="Loading portfolio"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span className="boot-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </motion.div>
  );
}
