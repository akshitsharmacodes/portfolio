import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

/**
 * How I work as a Hover List (after Scrolltide's component): big numbered rows with huge
 * titles. The active row darkens, opens its description and swings a picture in from a
 * steep angle to settle at a slight lean. Hover waits a beat; tap / focus works too.
 */
const STEPS = [
  {
    title: 'Discovery call',
    meta: 'Day 0 · free, 30 min',
    desc: 'We map the process that eats your time and agree on one number that defines success.',
    pic: 'call',
  },
  {
    title: 'Scoped plan',
    meta: 'Within 48 hours',
    desc: 'A fixed-scope proposal with architecture, milestones, timeline and price. No surprises later.',
    pic: 'plan',
  },
  {
    title: 'Build in the open',
    meta: 'Weekly demos',
    desc: 'Work lands in a GitHub repo you own from day one, with a live demo and a short update every week.',
    pic: 'git',
  },
  {
    title: 'Ship & hand over',
    meta: 'Production',
    desc: 'Deployed, documented and tested with evals and monitoring, so your team can run it without me.',
    pic: 'ship',
  },
  {
    title: 'Support',
    meta: '2 weeks included',
    desc: 'Bug fixes and tuning after launch, then an optional retainer if you want to keep improving it.',
    pic: 'support',
  },
];

function Pic({ kind }) {
  if (kind === 'call') {
    return (
      <div className="hl-pic-inner">
        <small>Calendar invite</small>
        <b>Discovery call</b>
        <div className="hl-row">
          <span>30 min</span>
          <span>Google Meet</span>
        </div>
        <div className="hl-avatars">
          <i>AS</i>
          <i>You</i>
        </div>
      </div>
    );
  }
  if (kind === 'plan') {
    return (
      <div className="hl-pic-inner">
        <small>Proposal.pdf</small>
        <b>Scoped plan</b>
        <ul className="hl-lines">
          <li>
            <span>Architecture</span>
            <em>✓</em>
          </li>
          <li>
            <span>Milestones</span>
            <em>4</em>
          </li>
          <li>
            <span>Fixed price</span>
            <em>✓</em>
          </li>
        </ul>
      </div>
    );
  }
  if (kind === 'git') {
    return (
      <div className="hl-pic-inner hl-mono">
        <small>git log --oneline</small>
        <ul className="hl-lines">
          <li>
            <span>
              <i>a91f</i> feat: agent tools
            </span>
          </li>
          <li>
            <span>
              <i>7c2e</i> feat: rag retriever
            </span>
          </li>
          <li>
            <span>
              <i>3b08</i> test: evals suite
            </span>
          </li>
          <li>
            <span>
              <i>e41d</i> docs: weekly demo
            </span>
          </li>
        </ul>
      </div>
    );
  }
  if (kind === 'ship') {
    return (
      <div className="hl-pic-inner">
        <small>Production</small>
        <b>
          <span className="hl-live" /> Deployed
        </b>
        <div className="hl-bars">
          <span style={{ '--v': 0.92 }}>Evals</span>
          <span style={{ '--v': 0.99 }}>Uptime</span>
          <span style={{ '--v': 0.8 }}>Docs</span>
        </div>
      </div>
    );
  }
  return (
    <div className="hl-pic-inner">
      <small>Support thread</small>
      <p className="hl-bubble">Can we tune the reply tone?</p>
      <p className="hl-bubble is-me">Done. Shipped with today's fix ✓</p>
    </div>
  );
}

export default function Process({ motionEnabled = true }) {
  const [active, setActive] = useState(0);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const hoverTo = (i) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(i), 110);
  };

  return (
    <section className="section-padding process-section" id="process" aria-label="How I work">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="How I work"
          title="From first call to production, in five steps."
          description="A simple, predictable process: you always know what's being built, what it costs and when it ships."
        />

        <ol className="hl-list" onMouseLeave={() => clearTimeout(timer.current)}>
          {STEPS.map((step, i) => {
            const isOpen = active === i;
            const Body = motionEnabled ? motion.div : 'div';
            return (
              <li key={step.title} className={`hl-row-item${isOpen ? ' is-open' : ''}`} onMouseEnter={() => hoverTo(i)}>
                <button
                  type="button"
                  className="hl-head"
                  aria-expanded={isOpen}
                  aria-controls={`hl-body-${i}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="hl-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="hl-title">{step.title}</h3>
                  <span className="hl-arrow" aria-hidden="true">
                    {isOpen ? <ArrowRight size={18} /> : <ArrowUpRight size={18} />}
                  </span>
                </button>

                <Body
                  className="hl-body"
                  id={`hl-body-${i}`}
                  inert={!isOpen}
                  {...(motionEnabled
                    ? {
                        initial: false,
                        animate: isOpen ? 'open' : 'closed',
                        variants: {
                          open: {
                            height: 'auto',
                            opacity: 1,
                            transition: { height: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.35, delay: 0.1 } },
                          },
                          closed: {
                            height: 0,
                            opacity: 0,
                            transition: { height: { duration: 0.45, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.18 } },
                          },
                        },
                      }
                    : { style: { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 } })}
                >
                  <div className="hl-body-inner">
                    <span className="hl-meta">{step.meta}</span>
                    <p className="hl-desc">{step.desc}</p>
                  </div>
                </Body>

                <div className="hl-pic" aria-hidden="true">
                  <Pic kind={step.pic} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
