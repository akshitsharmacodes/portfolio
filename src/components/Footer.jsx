import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUpRight, Calendar, Download } from 'lucide-react';
import GridWarpHeadline from './GridWarpHeadline';
import VisitorCounter from './VisitorCounter';

/**
 * Full-bleed CTA footer: a palette-coloured block with an oversized headline that
 * rises and settles as it scrolls into view (scroll-driven), dynamically adapting
 * between client studio pages and the recruiter career view.
 * 
 * On the homepage, uses a sleek utility layout to avoid duplicating the Contact
 * form and booking CTA directly above it.
 */
function Headline({ motionEnabled, lines }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end 75%'] });
  const y = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const o = useTransform(scrollYProgress, [0, 0.6], [0.15, 1]);
  const s = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

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
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '' || location.pathname === '/index.html';
  const isRecruiter = location.pathname.startsWith('/recruiters');
  const currentYear = new Date().getFullYear();
  const { contact, identity, career, agency } = siteConfig;

  // Option 1 copy: punchy, value-led
  const headlineLines = isRecruiter
    ? ['Ready to ship', 'from day one.']
    : ["Let's build", "what's next."];

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

  // Option 4 (Page-Aware Layout): On the homepage, visitors just completed the Contact section.
  // Render a streamlined, elegant utility footer without repeating the giant headline & CTA button.
  if (isHome) {
    return (
      <footer className="footer footer-block footer-block--home" role="contentinfo">
        <div className="footer-block-inner footer-block-inner--compact">
          <div className="footer-home-grid">
            <div className="footer-home-brand">
              <Link to="/" className="footer-brand-title">
                {agency?.name || identity.fullName}
              </Link>
              <p className="footer-brand-sub">
                {agency?.tagline || identity.profession}
              </p>
              <div className="footer-availability-chip">
                <span className="status-dot" aria-hidden="true" />
                <span>{agency?.availability || 'Booking new projects · India & worldwide'}</span>
              </div>
            </div>

            <div className="footer-home-nav-grid">
              <div className="footer-nav-col">
                <span className="footer-nav-header">Explore</span>
                <Link to="/work" className="footer-link">Work & Case Studies</Link>
                <Link to="/pricing" className="footer-link">Pricing & Plans</Link>
                <Link to="/about" className="footer-link">About Founder</Link>
                <Link to="/recruiters" className="footer-link">For Recruiters</Link>
              </div>

              <div className="footer-nav-col">
                <span className="footer-nav-header">Connect</span>
                {links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-block-bottom">
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
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Inner pages (/work, /pricing, /about, /services/*) & Recruiter page (/recruiters):
  // Render the full punchy Option 1 CTA banner
  return (
    <footer className="footer footer-block" role="contentinfo">
      <div className="footer-block-inner">
        {isRecruiter ? (
          <span className="footer-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Open to engineering roles · Available immediately
          </span>
        ) : (
          <span className="footer-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            Taking on new projects
          </span>
        )}

        <Headline motionEnabled={motionEnabled} lines={headlineLines} />

        {isRecruiter ? (
          <p className="footer-sub">
            AI & full-stack software engineer ready to deploy production agents, backends, and high-performance apps.
            Available for remote (India or international) and on-site roles.
          </p>
        ) : (
          <p className="footer-sub">
            Weekly demos. Code you own. Fixed quotes within 48h.
          </p>
        )}

        <div className="footer-cta-row">
          {isRecruiter ? (
            <>
              {isValidContent(career?.interviewUrl) ? (
                <a
                  className="footer-cta-primary"
                  href={career.interviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar size={18} aria-hidden="true" />
                  <span>Schedule an interview</span>
                </a>
              ) : (
                <button type="button" className="footer-cta-primary" onClick={(e) => onOpenCalModal?.(e.currentTarget)}>
                  <Calendar size={18} aria-hidden="true" />
                  <span>Schedule an interview</span>
                </button>
              )}
              {isValidContent(identity.resume) && (
                <a
                  className="footer-cta-secondary"
                  href={identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download resume PDF"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </>
          ) : (
            <>
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
            </>
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
          </div>
        </div>
      </div>
    </footer>
  );
}
