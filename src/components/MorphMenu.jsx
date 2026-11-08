import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Mail, MessageCircle, Linkedin, Send } from 'lucide-react';
import { projects } from '../data/projects';
import { siteConfig, isValidContent } from '../config/site';
import { experienceData, awardsData } from '../data/experience';

/**
 * Morph Navbar dropdown: one shell under the pill nav that springs open and resizes
 * between panels (Services / Work / About / Experience / Contact) while their content cross-blurs and drifts
 * in the direction you moved. A highlight glides between items on hover.
 */
// Same order as the nav, so content drifts in the direction the pointer moved
export const MORPH_PANELS = ['hire-me', 'work', 'about', 'experience', 'contact'];

const SERVICES = [
  { num: '01', title: 'AI agents & workflows', desc: 'Multi-agent systems with LangGraph' },
  { num: '02', title: 'RAG & semantic search', desc: 'Grounded answers over your data' },
  { num: '03', title: 'Production backends', desc: 'FastAPI, Django, Postgres, Redis' },
  { num: '04', title: 'MVP to production', desc: 'From prototype to maintained system' },
];

function Item({ href, onNavigate, onClick, hl, setHl, id, children, className = '', external = false }) {
  const Tag = href ? 'a' : 'button';
  const linkProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : { type: 'button' };
  return (
    <Tag
      {...linkProps}
      className={`morph-item ${className}`}
      onMouseEnter={() => setHl(id)}
      onFocus={() => setHl(id)}
      onClick={(e) => {
        onClick?.(e);
        onNavigate?.();
      }}
    >
      {hl === id && (
        <motion.span
          layoutId="morph-hl"
          className="morph-hl"
          transition={{ type: 'spring', stiffness: 520, damping: 40 }}
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  );
}

function Panel({ id, onNavigate, onOpenCalModal }) {
  const [hl, setHl] = useState(null);
  const common = { onNavigate, hl, setHl };
  const { preferences } = siteConfig;

  if (id === 'hire-me') {
    return (
      <div className="morph-panel morph-panel--services" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">What I build</span>
        <div className="morph-grid">
          {SERVICES.map((s) => (
            <Item key={s.num} id={s.num} href="#hire-me" {...common}>
              <span className="morph-num">{s.num}</span>
              <span className="morph-text">
                <b>{s.title}</b>
                <small>{s.desc}</small>
              </span>
            </Item>
          ))}
        </div>
        <Item id="process" href="#process" className="morph-foot" {...common}>
          <span className="morph-text">
            <b>How I work</b>
            <small>Discovery → plan → build → ship → support</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Item>
      </div>
    );
  }

  if (id === 'work') {
    return (
      <div className="morph-panel morph-panel--work" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">Selected work</span>
        <div className="morph-list">
          {projects.map((p) => (
            <Item key={p.id} id={p.id} href="#work" {...common}>
              <span className="morph-text">
                <b>{p.title}</b>
                <small>{p.category}</small>
              </span>
              <span className="morph-year">{p.year}</span>
            </Item>
          ))}
        </div>
      </div>
    );
  }

  if (id === 'experience') {
    const awards = (awardsData || []).slice(0, 3);
    return (
      <div className="morph-panel morph-panel--experience" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">Experience</span>
        <div className="morph-list">
          {experienceData.map((x) => (
            <Item key={x.id} id={x.id} href="#experience" {...common}>
              <span className="morph-text">
                <b>
                  {x.role}
                  {x.current && <em className="morph-badge">Now</em>}
                </b>
                <small>
                  {x.org} · {x.dates}
                </small>
              </span>
            </Item>
          ))}
        </div>
        {preferences.showAwards && awards.length > 0 && (
          <>
            <span className="morph-kicker morph-kicker--sub">Recognition</span>
            <div className="morph-chips">
              {awards.map((a) => (
                <Item key={a.title} id={`aw-${a.title}`} href="#awards" className="morph-chip" {...common}>
                  <span className="morph-text">
                    <b>{a.title.split(':')[0]}</b>
                    {a.title.includes(':') && <small>{a.title.split(':').slice(1).join(':').trim()}</small>}
                  </span>
                </Item>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  if (id === 'contact') {
    const { contact } = siteConfig;
    const cards = [
      { id: 'call', icon: Calendar, title: 'Book a call', desc: 'Free 30-min scoping', onClick: (e) => onOpenCalModal?.(e.currentTarget), hot: true },
      isValidContent(contact.email) && { id: 'email', icon: Mail, title: 'Email', desc: contact.email, href: `mailto:${contact.email}` },
      isValidContent(contact.whatsapp) && { id: 'wa', icon: MessageCircle, title: 'WhatsApp', desc: 'Quick questions', href: contact.whatsapp, external: true },
      isValidContent(contact.linkedin) && { id: 'li', icon: Linkedin, title: 'LinkedIn', desc: 'Connect with me', href: contact.linkedin, external: true },
    ].filter(Boolean);
    return (
      <div className="morph-panel morph-panel--contact" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">Let's talk</span>
        <div className="morph-cards">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Item
                key={c.id}
                id={c.id}
                href={c.href}
                external={c.external}
                onClick={c.onClick}
                className={`morph-card${c.hot ? ' is-hot' : ''}`}
                {...common}
              >
                <span className="morph-card-icon" aria-hidden="true">
                  <Icon size={16} />
                </span>
                <span className="morph-text">
                  <b>{c.title}</b>
                  <small>{c.desc}</small>
                </span>
              </Item>
            );
          })}
        </div>
        <Item id="form" href="#contact" className="morph-foot" {...common}>
          <span className="morph-text">
            <b>Send a message</b>
            <small>Tell me about the process you want automated</small>
          </span>
          <Send size={15} aria-hidden="true" />
        </Item>
      </div>
    );
  }

  const more = [
    { id: 'about', href: '#about', title: 'About', desc: 'Army officer training to AI engineering' },
    { id: 'skills', href: '#skills', title: 'Skills', desc: 'The stack I ship with' },
    preferences.showVentures && { id: 'side-hustles', href: '#side-hustles', title: 'Ventures', desc: 'Things I run on the side' },
  ].filter(Boolean);

  return (
    <div className="morph-panel morph-panel--about" onMouseLeave={() => setHl(null)}>
      <span className="morph-kicker">About me</span>
      <div className="morph-list">
        {more.map((m) => (
          <Item key={m.id} id={m.id} href={m.href} {...common}>
            <span className="morph-text">
              <b>{m.title}</b>
              <small>{m.desc}</small>
            </span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </Item>
        ))}
      </div>
    </div>
  );
}

export default function MorphMenu({ openId, onNavigate, onOpenCalModal, onPointerEnter, onPointerLeave, motionEnabled }) {
  const prevRef = useRef(openId);
  const dir =
    openId && prevRef.current && openId !== prevRef.current
      ? Math.sign(MORPH_PANELS.indexOf(openId) - MORPH_PANELS.indexOf(prevRef.current))
      : 0;
  if (openId) prevRef.current = openId;

  const spring = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 };

  return (
    <div className="morph-anchor" onMouseEnter={onPointerEnter} onMouseLeave={onPointerLeave}>
      <AnimatePresence>
        {openId && (
          <motion.div
            className="morph-shell"
            layout={motionEnabled}
            initial={motionEnabled ? { opacity: 0, y: -8, scale: 0.96 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={motionEnabled ? { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.16 } } : { opacity: 0 }}
            transition={motionEnabled ? spring : { duration: 0 }}
            style={{ borderRadius: 22 }}
            role="region"
            aria-label="Quick links"
          >
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <motion.div
                key={openId}
                className="morph-content"
                custom={dir}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 28, filter: 'blur(6px)' }),
                  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                  exit: (d) => ({ opacity: 0, x: d * -28, filter: 'blur(6px)' }),
                }}
                initial={motionEnabled ? 'enter' : false}
                animate="center"
                exit={motionEnabled ? 'exit' : undefined}
                transition={motionEnabled ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
                layout={motionEnabled ? 'position' : false}
              >
                <Panel id={openId} onNavigate={onNavigate} onOpenCalModal={onOpenCalModal} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
