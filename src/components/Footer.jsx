import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-container">
        {/* Brand identity */}
        <div className="footer-brand">
          <div className="footer-name">{siteConfig.identity.fullName}</div>
          <div className="footer-role">
            {siteConfig.identity.profession} · {siteConfig.identity.location}
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          {isValidContent(siteConfig.contact.whatsapp) && (
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: '#25D366', fontWeight: 700 }}
            >
              WhatsApp
            </a>
          )}

          {isValidContent(siteConfig.contact.upwork) && (
            <a
              href={siteConfig.contact.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: '#14a800', fontWeight: 700 }}
            >
              Hire on Upwork
            </a>
          )}

          {isValidContent(siteConfig.contact.linkedin) && (
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          )}

          {isValidContent(siteConfig.contact.github) && (
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
          )}

          {isValidContent(siteConfig.identity.resume) && (
            <a
              href={siteConfig.identity.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Resume
            </a>
          )}

          {siteConfig.contact.otherLinks?.map((link) => {
            if (!isValidContent(link.url)) return null;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {link.label}
              </a>
            );
          })}

          <button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="container" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          © {currentYear} {siteConfig.identity.fullName}. Engineered with React & Framer Motion. Built for production-grade reliability.
        </p>
      </div>
    </footer>
  );
}

