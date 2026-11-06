import React, { useState, useEffect } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Menu, X, ArrowRight, Zap, Play, Github, FileText } from 'lucide-react';

export default function Header({
  motionEnabled,
  onToggleMotion,
  onTriggerSwarm,
  swarmActive,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'skills', 'experience', 'awards', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work', show: true },
    { label: 'About', href: '#about', show: true },
    { label: 'Skills', href: '#skills', show: true },
    { label: 'Experience', href: '#experience', show: siteConfig.preferences.showExperience },
    { label: 'Recognition', href: '#awards', show: siteConfig.preferences.showAwards },
    { label: 'Contact', href: '#contact', show: true },
  ].filter((item) => item.show);

  return (
    <>
      <header className="header" role="banner">
        <div className="container header-container">
          {/* Brand Wordmark */}
          <a href="#" className="brand-logo" aria-label="Akshit Sharma Home">
            <span className="brand-badge" aria-hidden="true">AS</span>
            <span>{siteConfig.identity.displayName}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-only" aria-label="Main Navigation">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: "Motion" Swarm Trigger + Resume + GitHub + CTA + Mobile Trigger */}
          <div className="header-actions">
            {/* The primary "Motion" button requested */}
            <button
              type="button"
              className={`motion-btn ${swarmActive ? 'active' : ''}`}
              onClick={onTriggerSwarm}
              aria-label="Trigger Swarm Motion Animation"
              title="Click to trigger interactive Agent Swarm animation"
            >
              <Zap size={14} className="motion-btn-icon" aria-hidden="true" />
              <span>Motion</span>
              {swarmActive && <span className="motion-live-badge">Live</span>}
            </button>

            {/* Resume button */}
            {isValidContent(siteConfig.identity.resume) && (
              <a
                href={siteConfig.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary desktop-only"
                style={{ padding: '6px 14px', minHeight: '38px', fontSize: '0.82rem' }}
                aria-label="View Resume on Google Drive"
                title="View Resume"
              >
                <FileText size={14} className="text-accent" aria-hidden="true" />
                <span>Resume</span>
              </a>
            )}

            {/* GitHub Logo Link */}
            {isValidContent(siteConfig.contact.github) && (
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost desktop-only"
                style={{ padding: '8px', minWidth: '40px', minHeight: '40px', borderRadius: '50%' }}
                aria-label="Visit GitHub Profile (akshitsharmacodes)"
                title="GitHub: akshitsharmacodes"
              >
                <Github size={18} aria-hidden="true" />
              </a>
            )}

            {/* Desktop Contact CTA */}
            <a
              href="#contact"
              className="btn btn-primary desktop-only"
              style={{ padding: '8px 18px', minHeight: '40px', fontSize: '0.84rem' }}
            >
              <span>Let's Talk</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="mobile-drawer-header">
            <a
              href="#"
              className="brand-logo"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="brand-badge">AS</span>
              <span>{siteConfig.identity.displayName}</span>
            </a>
            <button
              type="button"
              className="menu-trigger"
              style={{ display: 'flex' }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <ul className="mobile-drawer-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`mobile-drawer-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer-footer">
            <div style={{ display: 'flex', gap: '10px' }}>
              {isValidContent(siteConfig.identity.resume) && (
                <a
                  href={siteConfig.identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <FileText size={16} className="text-accent" />
                  <span>Resume</span>
                </a>
              )}
              {isValidContent(siteConfig.contact.github) && (
                <a
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              )}
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ justifyContent: 'center' }}
              onClick={() => {
                setMobileMenuOpen(false);
                onTriggerSwarm();
              }}
            >
              <Zap size={16} className="text-accent" />
              <span>Trigger Swarm Motion</span>
            </button>

            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get In Touch</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
