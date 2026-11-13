import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Mail, MessageCircle, Linkedin, Send } from 'lucide-react';
import { projects } from '../data/projects';
import { siteConfig, isValidContent } from '../config/site';
import { experienceData, awardsData } from '../data/experience';
import { services as SERVICE_DATA } from '../data/services';

/**
 * Morph Navbar dropdown: one shell under the pill nav that springs open and resizes
 * between panels (Services / Work / About / Contact) while their content cross-blurs and drifts
 * in the direction you moved. A highlight glides between items on hover.
 */
// Same order as the nav, so content drifts in the direction the pointer moved
export const MORPH_PANELS = ['services', 'work', 'about', 'contact'];


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

  if (id === 'services') {
    return (
      <div className="morph-panel morph-panel--services" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">What we do</span>
        <div className="morph-grid">
          {SERVICE_DATA.map((s) => (
            <Item key={s.slug} id={s.slug} href={`/services/${s.slug}`} {...common}>
              <span className="morph-num">{s.num}</span>
              <span className="morph-text">
                <b>{s.name}</b>
                <small>
                  From {s.from.inr} / {s.from.usd}
                </small>
              </span>
            </Item>
          ))}
        </div>
        <Item id="pricing" href="/pricing" className="morph-foot" {...common}>
          <span className="morph-text">
            <b>Pricing & how we work</b>
            <small>Starting prices in INR and USD · fixed quotes</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Item>
      </div>
    );
  }

  if (id === 'work') {
    return (
      <div className="morph-panel morph-panel--work" onMouseLeave={() => setHl(null)}>
        <span className="morph-kicker">Case studies</span>
        <div className="morph-list">
          {projects.map((p) => (
            <Item key={p.id} id={p.id} href={`/work/${p.id}`} {...common}>
              <span className="morph-text">
                <b>{p.title}</b>
                <small>{p.category}</small>
              </span>
              <span className="morph-year">{p.year}</span>
            </Item>
          ))}
        </div>
        <Item id="all-work" href="/work" className="morph-foot" {...common}>
          <span className="morph-text">
            <b>All case studies</b>
            <small>Problem, build and outcome for each project</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Item>
      </div>
    );
  }

  if (id === 'contact') {
    const { contact } = siteConfig;
    const cards = [
      { id: 'call', icon: Calendar, title: 'Book a call', desc: 'Free 30-min scoping', onClick: (e) => onOpenCalModal?.(e.currentTarget), hot: true },
      isValidContent(contact.email) && { id: 'email', icon: Mail, title: 'Email', desc: contact.email, href: `mailto:${contact.email}` },
      isValidContent(contact.whatsapp) && { id: 'wa', icon: MessageCircle, title: 'WhatsApp', desc: 'Quick questions', href: contact.whatsapp, external: true },
      isValidContent(contact.linkedin) && { id: 'li', icon: Linkedin, title: 'LinkedIn', desc: 'Connect with the founder', href: contact.linkedin, external: true },
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
        <Item id="form" href="/contact" className="morph-foot" {...common}>
          <span className="morph-text">
            <b>Send a project brief</b>
            <small>Tell us what you want to build</small>
          </span>
          <Send size={15} aria-hidden="true" />
        </Item>
      </div>
    );
  }

  // About
  const current = experienceData.find((x) => x.current);
  const more = [
    { id: 'about', href: '/about', title: 'The studio & founder', desc: 'Officer training to AI engineering' },
    { id: 'skills', href: '/about#skills', title: 'Capabilities', desc: 'The stack we ship with' },
    preferences.showAwards && awardsData?.length > 0 && { id: 'awards', href: '/about#awards', title: 'Recognition', desc: awardsData[0].title.split(':')[0] },
    current && { id: 'experience', href: '/about#experience', title: 'Experience', desc: `${current.role} · ${current.org}` },
  ].filter(Boolean);

  return (
    <div className="morph-panel morph-panel--about" onMouseLeave={() => setHl(null)}>
      <span className="morph-kicker">About</span>
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
      <Item id="recruiters" href="/recruiters" className="morph-foot" {...common}>
        <span className="morph-text">
          <b>For recruiters</b>
          <small>Resume · available immediately</small>
        </span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </Item>
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
