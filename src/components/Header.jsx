import React, { useState, useEffect } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Menu, X, ArrowUpRight, Zap, Github, FileText, Sun, Moon } from 'lucide-react';

export default function Header({
  theme,
  onToggleTheme,
  onTriggerSwarm,
  swarmActive,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [scrolled, setScrolled] = useState(false);

  // Handle active section and scrolled state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['work', 'about', 'skills', 'experience', 'awards', 'contact'];
      const scrollPosition = window.scrollY + 220;

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

  // Lock scroll when mobile menu is open
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
    { label: 'Work', href: '#work', id: 'work', show: true },
    { label: 'Hire Me', href: '#hire-me', id: 'hire-me', show: true },
    { label: 'About', href: '#about', id: 'about', show: true },
    { label: 'Skills', href: '#skills', id: 'skills', show: true },
    { label: 'Experience', href: '#experience', id: 'experience', show: siteConfig.preferences.showExperience },
    { label: 'Recognition', href: '#awards', id: 'awards', show: siteConfig.preferences.showAwards },
    { label: 'Contact', href: '#contact', id: 'contact', show: true },
  ].filter((item) => item.show);

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="header-glass-dock">
          {/* Brand Identity */}
          <a href="#" className="brand-pill" aria-label="Akshit Sharma Home">
            <span className="brand-initials">AS</span>
            <div className="brand-text">
              <span className="brand-name">{siteConfig.identity.displayName}</span>
              <span className="brand-sub">AI/ML</span>
            </div>
          </a>

          {/* Desktop Center Navigation Links */}
          <nav className="desktop-only" aria-label="Main Navigation">
            <ul className="nav-dock-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-dock-link ${isActive ? 'active' : ''}`}
                    >
                      {isActive && <span className="nav-active-dot" aria-hidden="true" />}
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Actions: Theme Toggle + Swarm Motion + GitHub + Red Resume Button */}
          <div className="dock-actions">
            {/* Theme Toggle Button */}
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Swarm Motion Trigger Button */}
            <button
              type="button"
              className={`motion-pill-trigger ${swarmActive ? 'active' : ''}`}
              onClick={onTriggerSwarm}
              aria-label="Toggle Interactive Agent Swarm"
              title="Click to trigger interactive Agent Swarm animation"
            >
              <Zap size={13} className="motion-pill-icon" aria-hidden="true" />
              <span>Motion</span>
              {swarmActive && <span className="motion-indicator-dot" />}
            </button>

            {/* GitHub Icon Link */}
            {isValidContent(siteConfig.contact.github) && (
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-icon-btn desktop-only"
                aria-label="GitHub Profile"
                title="GitHub: akshitsharmacodes"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}

            <span className="dock-divider desktop-only" aria-hidden="true" />

            {/* Prominent Red Button: RESUME */}
            {isValidContent(siteConfig.identity.resume) && (
              <a
                href={siteConfig.identity.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-resume-btn desktop-only"
                title="View Resume on Google Drive"
                aria-label="View Resume PDF"
              >
                <FileText size={14} aria-hidden="true" />
                <span>Resume</span>
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="menu-trigger-sleek"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" role="dialog" aria-modal="true" aria-label="Navigation Menu">
          <div className="mobile-drawer-card">
            <div className="mobile-drawer-top">
              <a
                href="#"
                className="brand-pill"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="brand-initials">AS</span>
                <div className="brand-text">
                  <span className="brand-name">{siteConfig.identity.displayName}</span>
                  <span className="brand-sub">AI/ML</span>
                </div>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={onToggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  type="button"
                  className="menu-trigger-sleek"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="mobile-drawer-nav">
              {navLinks.map((link, idx) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-num">0{idx + 1}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                    <ArrowUpRight size={16} className="mobile-nav-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-bottom">
              {/* Hire on Upwork */}
              {isValidContent(siteConfig.contact.upwork) && (
                <a
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    minHeight: '46px',
                    justifyContent: 'center',
                    backgroundColor: '#14a800',
                    boxShadow: '0 4px 16px rgba(20, 168, 0, 0.3)',
                    fontWeight: 700,
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Hire Me on Upwork</span>
                  <ArrowUpRight size={16} />
                </a>
              )}

              {/* Primary Mobile Red Resume Button */}
              {isValidContent(siteConfig.identity.resume) && (
                <a
                  href={siteConfig.identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: '100%', minHeight: '44px', justifyContent: 'center' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={16} className="text-accent" />
                  <span>View Resume</span>
                  <ArrowUpRight size={16} />
                </a>
              )}

              <div className="mobile-quick-links">
                {isValidContent(siteConfig.contact.github) && (
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, minHeight: '44px', fontSize: '0.84rem', justifyContent: 'center' }}
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </a>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1, minHeight: '44px', fontSize: '0.84rem', justifyContent: 'center' }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTriggerSwarm();
                  }}
                >
                  <Zap size={15} className="text-accent" />
                  <span>{swarmActive ? 'Stop Swarm' : 'Swarm Motion'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
