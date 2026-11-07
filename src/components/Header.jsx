import React, { useState, useEffect, useRef } from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Menu, X, ArrowUpRight, ArrowRight, Github, FileText, Sun, Moon, MessageCircle, Pause, Play } from 'lucide-react';

// Page order (used for scroll-spy); nav labels/visibility come from site config
const SECTION_IDS = ['hire-me', 'work', 'about', 'skills', 'experience', 'awards', 'side-hustles', 'contact'];

function MotionToggle({ motionEnabled, onToggleMotion, size = 15 }) {
  return (
    <button
      type="button"
      className={`motion-toggle-btn${motionEnabled ? '' : ' is-paused'}`}
      onClick={onToggleMotion}
      aria-label="Reduce motion"
      aria-pressed={!motionEnabled}
      title={motionEnabled ? 'Pause animations' : 'Resume animations'}
    >
      {motionEnabled ? <Pause size={size} aria-hidden="true" /> : <Play size={size} aria-hidden="true" />}
    </button>
  );
}

export default function Header({
  theme,
  onToggleTheme,
  motionEnabled,
  onToggleMotion,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const wasOpenRef = useRef(false);

  // Scroll state + scroll-spy (rAF-throttled)
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 30);
      const probe = window.scrollY + 220;
      let current = '';
      for (const sectionId of SECTION_IDS) {
        const el = document.getElementById(sectionId);
        if (el && probe >= el.offsetTop && probe < el.offsetTop + el.offsetHeight) {
          current = sectionId;
          break;
        }
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Escape closes the drawer; Tab traps focus inside
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const drawer = document.getElementById('mobile-drawer');
        if (!drawer) return;
        const focusables = drawer.querySelectorAll(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll while the drawer is open; move focus in on open and back to the trigger on close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      drawerCloseRef.current?.focus();
      wasOpenRef.current = true;
    } else {
      document.body.style.overflow = '';
      if (wasOpenRef.current) {
        menuTriggerRef.current?.focus({ preventScroll: true });
        wasOpenRef.current = false;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Same order as the page, so the active pill moves left → right while scrolling down
  const navLinks = [
    // `primary` links appear in the desktop bar; every link appears in the mobile drawer
    { label: 'Services', href: '#hire-me', id: 'hire-me', show: true, primary: true },
    { label: 'Work', href: '#work', id: 'work', show: true, primary: true },
    { label: 'About', href: '#about', id: 'about', show: true, primary: true },
    { label: 'Skills', href: '#skills', id: 'skills', show: true },
    { label: 'Experience', href: '#experience', id: 'experience', show: siteConfig.preferences.showExperience, primary: true },
    { label: 'Recognition', href: '#awards', id: 'awards', show: siteConfig.preferences.showAwards },
    { label: 'Ventures', href: '#side-hustles', id: 'side-hustles', show: siteConfig.preferences.showVentures },
    { label: 'Contact', href: '#contact', id: 'contact', show: true, primary: true },
  ].filter((item) => item.show);
  const desktopLinks = navLinks.filter((item) => item.primary);

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="header-glass-dock">
          <a href="#" className="brand-pill" aria-label="Akshit Sharma, back to top">
            <span className="brand-initials">AS</span>
            <div className="brand-text">
              <span className="brand-name">{siteConfig.identity.displayName}</span>
              <span className="brand-sub">AI/ML</span>
            </div>
          </a>

          <nav className="desktop-only" aria-label="Main navigation">
            <ul className="nav-dock-list">
              {desktopLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-dock-link ${isActive ? 'active' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="dock-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {isValidContent(siteConfig.contact.github) && (
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="dock-icon-btn desktop-only"
                aria-label="GitHub profile"
                title="GitHub"
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}

            <a href="#contact" className="nav-cta-btn desktop-only">
              <span>Get in touch</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>

            <button
              ref={menuTriggerRef}
              type="button"
              className="menu-trigger-sleek"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="mobile-drawer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          id="mobile-drawer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileMenuOpen(false);
          }}
        >
          <div className="mobile-drawer-card">
            <div className="mobile-drawer-top">
              <a href="#" className="brand-pill" onClick={() => setMobileMenuOpen(false)}>
                <span className="brand-initials">AS</span>
                <div className="brand-text">
                  <span className="brand-name">{siteConfig.identity.displayName}</span>
                  <span className="brand-sub">AI/ML</span>
                </div>
              </a>

              <div className="mobile-drawer-controls">
                <MotionToggle motionEnabled={motionEnabled} onToggleMotion={onToggleMotion} size={17} />
                <button
                  type="button"
                  className="theme-toggle-btn"
                  onClick={onToggleTheme}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  ref={drawerCloseRef}
                  type="button"
                  className="menu-trigger-sleek"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <ul className="mobile-drawer-nav">
              {navLinks.map((link, idx) => (
                <li key={link.href} style={{ '--i': idx }}>
                  <a
                    href={link.href}
                    className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                    aria-current={activeSection === link.id ? 'location' : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mobile-nav-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="mobile-nav-label">{link.label}</span>
                    <ArrowUpRight size={16} className="mobile-nav-arrow" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mobile-drawer-bottom">
              <a
                href="#contact"
                className="btn btn-primary mobile-drawer-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>

              {isValidContent(siteConfig.identity.resume) && (
                <a
                  href={siteConfig.identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary mobile-drawer-cta"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FileText size={16} aria-hidden="true" />
                  <span>View Resume</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}

              <div className="mobile-quick-links">
                {isValidContent(siteConfig.contact.whatsapp) && (
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary mobile-quick-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle size={16} className="icon-whatsapp" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                )}
                {isValidContent(siteConfig.contact.github) && (
                  <a
                    href={siteConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary mobile-quick-link"
                  >
                    <Github size={16} aria-hidden="true" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
