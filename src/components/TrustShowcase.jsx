import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Github, MessagesSquare, Medal, ChevronDown } from 'lucide-react';

/**
 * Showcase cards (after Scrolltide's "Showcase Card"): each trust point is a card with a
 * picture, its title sitting on a progressively blurred foot and a glass "Details" button.
 * Opening it unfolds the card downward into a short case summary: overview, chips and a
 * description that sharpen out of a blur, one after another.
 */
const CARDS = [
  {
    id: 'escrow',
    icon: ShieldCheck,
    title: 'Upwork escrow',
    sub: 'Payment protection',
    summary: 'Hire safely with hourly tracking or milestone escrow.',
    chips: ['Hourly', 'Fixed milestones', 'Escrow'],
    detail: 'Each milestone is funded before work starts and released only when you approve what was delivered.',
    hue: 0,
  },
  {
    id: 'github',
    icon: Github,
    title: 'Your GitHub repo',
    sub: 'You own the code',
    summary: '100% transparent commits, branches and code documentation.',
    chips: ['Your repo', 'Pull requests', 'README & docs'],
    detail: 'Work lands in a repository you own from day one, so your team can review it as it grows and pick it up after handover.',
    hue: 1,
  },
  {
    id: 'comms',
    icon: MessagesSquare,
    title: 'Direct communication',
    sub: 'Weekly updates',
    summary: 'Clear updates via Cal.com, Slack or Upwork workrooms.',
    chips: ['Cal.com', 'Slack', 'Upwork'],
    detail: 'You talk to the engineer building it, not an account manager, with a short demo and written update every week.',
    hue: 2,
  },
  {
    id: 'discipline',
    icon: Medal,
    title: 'Military discipline',
    sub: 'OTA Gaya trained',
    summary: 'Decision-making trained for high-stakes timelines.',
    chips: ['TES-48', 'SSB recommended', 'Ownership'],
    detail: 'Officer training taught me to plan carefully, decide under pressure and own the outcome. Your project runs on the same rules.',
    hue: 3,
  },
];

const reveal = {
  closed: { opacity: 0, y: 8, filter: 'blur(8px)' },
  open: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Card({ card, motionEnabled }) {
  const [open, setOpen] = useState(false);
  const Icon = card.icon;
  const Body = motionEnabled ? motion.div : 'div';
  const Line = motionEnabled ? motion.div : 'div';
  const lineProps = (i) => (motionEnabled ? { variants: reveal, custom: i } : {});

  return (
    <article className={`tcard tcard--${card.hue}${open ? ' is-open' : ''}`}>
      <div className="tcard-pic">
        <span className="tcard-art" aria-hidden="true">
          <i />
          <i />
          <Icon size={34} strokeWidth={1.5} />
        </span>
        <div className="tcard-foot">
          <div className="tcard-names">
            <h4 className="tcard-title">{card.title}</h4>
            <span className="tcard-sub">{card.sub}</span>
          </div>
          <button
            type="button"
            className="tcard-btn"
            aria-expanded={open}
            aria-controls={`tcard-body-${card.id}`}
            onClick={() => setOpen((o) => !o)}
          >
            <span>{open ? 'Close' : 'Details'}</span>
            <ChevronDown size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <Body
        className="tcard-body"
        id={`tcard-body-${card.id}`}
        inert={!open}
        {...(motionEnabled
          ? {
              initial: false,
              animate: open ? 'open' : 'closed',
              variants: {
                open: { height: 'auto', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                closed: { height: 0, transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] } },
              },
            }
          : { style: { height: open ? 'auto' : 0 } })}
      >
        <div className="tcard-body-inner">
          <Line className="tcard-summary" {...lineProps(0)}>
            {card.summary}
          </Line>
          <Line className="tcard-chips" {...lineProps(1)}>
            {card.chips.map((c) => (
              <span key={c} className="tech-tag">
                {c}
              </span>
            ))}
          </Line>
          <Line className="tcard-detail" {...lineProps(2)}>
            {card.detail}
          </Line>
        </div>
      </Body>
    </article>
  );
}

export default function TrustShowcase({ motionEnabled }) {
  return (
    <div className="tcard-grid">
      {CARDS.map((card) => (
        <Card key={card.id} card={card} motionEnabled={motionEnabled} />
      ))}
    </div>
  );
}
