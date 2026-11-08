import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUp, ArrowUpRight, Calendar } from 'lucide-react';
import GridWarpHeadline from './GridWarpHeadline';
import VisitorCounter from './VisitorCounter';

/**
 * Full-bleed CTA footer: a palette-coloured block with an oversized headline that
 * rises and settles as it scrolls into view (scroll-driven), then the primary actions
 * and a quiet row of links / legal underneath.
 */
function Headline({ motionEnabled }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 75%'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const o = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  const s = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const lines = ["Let's build", 'your agent.'];

  // Scroll-driven rise on the wrapper; Grid Warp handles the pointer inside it
  if (!motionEnabled) {
    return (
      <div ref={ref}>
        <GridWarpHeadline lines={lines} motionEnabled={false} />
      </div>
    );
  }
  return (
    <motion.div ref={ref} style={{ y, opacity: o, scale: s, transformOrigin: 'left bottom' }}>
      <GridWarpHeadline lines={lines} motionEnabled />
    </motion.div>
  );
}

export default function Footer({ motionEnabled = true, onToggleMotion, onOpenCalModal }) {
  const currentYear = new Date().getFullYear();
  const { contact, identity } = siteConfig;

  // Primary links first, then extra links, with duplicate URLs dropped
  const links = [];
  const seen = new Set();
  const addLink = (label, url) => {
    if (!isValidContent(url) || seen.has(url)) return;
    seen.add(url);
    links.push({ label, url });
  };
  addLink('LinkedIn', contact.linkedin);
  addLink('GitHub', contact.github);
  addLink('Upwork', contact.upwork);
  addLink('WhatsApp', contact.whatsapp);
  addLink('Resume', identity.resume);
  contact.otherLinks?.forEach((link) => addLink(link.label, link.url));

  const scrollToTop = () => {
    const reduce = document.documentElement.getAttribute('data-motion') === 'off';
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer footer-block" role="contentinfo">
      <div className="footer-block-inner">
        <span className="footer-eyebrow">
          <span className="status-dot" aria-hidden="true" />
          Taking on new projects
        </span>

        <Headline motionEnabled={motionEnabled} />

        <p className="footer-sub">
          Bring the process that eats your team's week. I'll turn it into an AI agent or RAG system that runs in
          production, with weekly updates and code you own.
        </p>

        <div className="footer-cta-row">
          <button type="button" className="footer-cta-primary" onClick={(e) => onOpenCalModal?.(e.currentTarget)}>
            <Calendar size={18} aria-hidden="true" />
            <span>Book a discovery call</span>
          </button>
          {isValidContent(contact.email) && (
            <a className="footer-cta-secondary" href={`mailto:${contact.email}`}>
              <span>{contact.email}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="footer-block-bottom">
          <nav className="footer-block-links" aria-label="Profiles and contact">
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="footer-block-legal">
            <p className="footer-legal-copy">
              © {currentYear} {identity.fullName} · {identity.location}
            </p>
            <VisitorCounter />
            {onToggleMotion && (
              <button
                type="button"
                className="footer-motion-toggle"
                onClick={onToggleMotion}
                aria-pressed={!motionEnabled}
              >
                Animations: {motionEnabled ? 'On' : 'Off'}
              </button>
            )}
            <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Scroll back to top of page">
              <span>Top</span>
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
