import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Hover Tabs (after Scrolltide's component of the same name): a services list beside one
 * framed picture. The active row becomes a tab in the frame's colour, opens to its
 * description and joins the frame through concave corners, while the picture crossfades.
 *
 * The "pictures" are small illustrated scenes drawn in the palette's colours, one per
 * service. The tab fades in place (no sliding / stretching), heights ease open and closed,
 * and hover waits a beat so sweeping across rows doesn't flicker.
 */
const OPEN = { height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.35, delay: 0.1 } };
const CLOSE = { height: { duration: 0.42, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.18 } };

/* ---------- scenes ---------- */
function AgentScene() {
  return (
    <div className="scene scene--agents">
      <div className="sc-node sc-in">
        <small>trigger</small>
        <b>New support email</b>
      </div>
      <div className="sc-wire" />
      <div className="sc-node sc-hub">
        <small>LangGraph supervisor</small>
        <b>Classify · plan · route</b>
      </div>
      <div className="sc-branches">
        <div className="sc-node sc-tool">
          <small>tool</small>
          <b>CRM lookup</b>
        </div>
        <div className="sc-node sc-tool">
          <small>tool</small>
          <b>Draft reply</b>
        </div>
        <div className="sc-node sc-tool">
          <small>tool</small>
          <b>Ticket update</b>
        </div>
      </div>
      <div className="sc-wire" />
      <div className="sc-node sc-out">
        <small>result</small>
        <b>Resolved in 41s · verified ✓</b>
      </div>
    </div>
  );
}

function RagScene() {
  const hits = [
    ['refund-policy.pdf', 0.94],
    ['sla-2026.md', 0.88],
    ['ticket-7712.json', 0.79],
  ];
  return (
    <div className="scene scene--rag">
      <div className="sc-query">
        <span className="sc-dot" />
        How long do enterprise refunds take?
      </div>
      <ul className="sc-hits">
        {hits.map(([doc, s]) => (
          <li key={doc}>
            <span>{doc}</span>
            <i style={{ '--s': s }} />
            <em>{s.toFixed(2)}</em>
          </li>
        ))}
      </ul>
      <div className="sc-answer">
        <small>Grounded answer</small>
        <p>
          Enterprise refunds settle within 5 business days <sup>[1]</sup>, and SLA credits apply after 48 hours{' '}
          <sup>[2]</sup>.
        </p>
      </div>
    </div>
  );
}

function BackendScene() {
  const rows = [
    ['POST', '/v1/agents/run', '38ms'],
    ['GET', '/v1/documents', '12ms'],
    ['POST', '/v1/ingest', '202'],
    ['GET', '/health', '4ms'],
  ];
  return (
    <div className="scene scene--backend">
      <div className="sc-api">
        <small>FastAPI · v1</small>
        {rows.map(([m, path, t]) => (
          <div key={path} className="sc-route">
            <b className={`sc-m sc-m--${m.toLowerCase()}`}>{m}</b>
            <span>{path}</span>
            <em>{t}</em>
          </div>
        ))}
      </div>
      <div className="sc-infra">
        <div className="sc-box">
          <small>queue</small>
          <b>Celery × 4</b>
        </div>
        <div className="sc-box">
          <small>cache</small>
          <b>Redis</b>
        </div>
        <div className="sc-box">
          <small>db</small>
          <b>PostgreSQL</b>
        </div>
      </div>
    </div>
  );
}

function MvpScene() {
  const weeks = [
    ['Wk 1', 'Scope + architecture', true],
    ['Wk 2–3', 'Core agent + API', true],
    ['Wk 4', 'Evals + UI', true],
    ['Wk 5', 'Deploy + handover', false],
  ];
  return (
    <div className="scene scene--mvp">
      <div className="sc-mvp-head">
        <small>Launch plan</small>
        <b>Prototype → production</b>
      </div>
      <ol className="sc-weeks">
        {weeks.map(([w, label, done]) => (
          <li key={w} className={done ? 'is-done' : ''}>
            <span className="sc-check" />
            <em>{w}</em>
            <span>{label}</span>
          </li>
        ))}
      </ol>
      <div className="sc-progress">
        <i />
        <span>Shipping in 5 weeks</span>
      </div>
    </div>
  );
}

const SCENES = [AgentScene, RagScene, BackendScene, MvpScene];

export default function ServiceTabs({ items, motionEnabled }) {
  const [active, setActive] = useState(0);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const hoverTo = (i) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 110);
  };
  const cancel = () => clearTimeout(timer.current);
  const Scene = SCENES[active % SCENES.length];

  return (
    <div className="htabs">
      <ol className="htabs-list" onMouseLeave={cancel}>
        {items.map((item, i) => {
          const isOpen = active === i;
          const Body = motionEnabled ? motion.div : 'div';
          return (
            <li
              key={item.title}
              className={`htab${isOpen ? ' is-open' : ''}`}
              onMouseEnter={() => hoverTo(i)}
            >
              <span className="htab-bg" aria-hidden="true">
                <i className="htab-corner htab-corner--top" />
                <i className="htab-corner htab-corner--bottom" />
              </span>
              <button
                type="button"
                className="htab-head"
                aria-expanded={isOpen}
                aria-controls={`htab-body-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="htab-num" aria-hidden="true">{item.num}</span>
                <h3 className="htab-title">{item.title}</h3>
              </button>
              <Body
                className="htab-body"
                id={`htab-body-${i}`}
                inert={!isOpen}
                {...(motionEnabled
                  ? {
                      initial: false,
                      animate: isOpen ? 'open' : 'closed',
                      variants: {
                        open: { height: 'auto', opacity: 1, transition: OPEN },
                        closed: { height: 0, opacity: 0, transition: CLOSE },
                      },
                    }
                  : { style: { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 } })}
              >
                <div className="htab-body-inner">
                  <p className="htab-desc">{item.desc}</p>
                  <div className="htab-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Body>
            </li>
          );
        })}
      </ol>

      <div className="htabs-frame" aria-hidden="true">
        <div className="htabs-picture">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={active}
              className="htabs-scene-wrap"
              initial={motionEnabled ? { opacity: 0, scale: 1.04, filter: 'blur(8px)' } : false}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={motionEnabled ? { opacity: 0, scale: 0.98, filter: 'blur(6px)' } : { opacity: 0 }}
              transition={motionEnabled ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
          <span className="htabs-caption">
            {items[active].num} — {items[active].title}
          </span>
        </div>
      </div>
    </div>
  );
}
