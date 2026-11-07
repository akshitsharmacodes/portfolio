import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUp } from 'lucide-react';

export default function Footer({ motionEnabled = true, onToggleMotion }) {
  const currentYear = new Date().getFullYear();
  const { contact, identity } = siteConfig;

  // Primary links first, then extra links, with duplicate URLs dropped
  // (e.g. "Hire on Upwork" used to appear twice).
  const links = [];
  const seen = new Set();
  const addLink = (label, url) => {
    if (!isValidContent(url) || seen.has(url)) return;
    seen.add(url);
    links.push({ label, url });
  };
  addLink('WhatsApp', contact.whatsapp);
  addLink('LinkedIn', contact.linkedin);
  addLink('GitHub', contact.github);
  addLink('Resume', identity.resume);
  contact.otherLinks?.forEach((link) => addLink(link.label, link.url));

  const scrollToTop = () => {
    const reduce = document.documentElement.getAttribute('data-motion') === 'off';
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-name">{identity.fullName}</div>
          <div className="footer-role">
            {identity.profession} · {identity.location}
          </div>
        </div>

        <nav className="footer-links" aria-label="Profiles and contact">
          {links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-link">
              {link.label}
            </a>
          ))}

          <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Scroll back to top of page">
            <span>Top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </nav>
      </div>

      <div className="container footer-bottom">
        <p>
          © {currentYear} {identity.fullName}. All rights reserved.
        </p>
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
    </footer>
  );
}
