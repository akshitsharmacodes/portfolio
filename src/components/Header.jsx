import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { siteConfig, isValidContent } from '../config/site';
import PalettePicker, { PaletteRow } from './PalettePicker';
import MorphMenu, { MORPH_PANELS } from './MorphMenu';
import { useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ArrowRight, Calendar, Github, FileText, Sun, Moon, MessageCircle, BriefcaseBusiness } from 'lucide-react';

// On the homepage, sections highlight the matching nav item while scrolling
const PRIMARY_FOR = { 'hire-me': 'services', process: 'services', work: 'work', pricing: 'pricing', faq: 'contact', contact: 'contact' };

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

/** Wordmark: the agency name, linking home */
function BrandMark({ onClick }) {
  return (
    <a href="/" className="brand-mark" aria-label={`${siteConfig.agency.name}, home`} onClick={onClick}>
      <span className="brand-word">
        gentle<span className="brand-tld">tech</span>labs
      </span>
    </a>
  );
}

/** 1px reading-progress line along the bottom edge of the bar / pill */
function NavProgress({ motionEnabled }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.span
      className="nav-progress"
      aria-hidden="true"
      style={{ scaleX: motionEnabled ? smooth : scrollYProgress }}
    />
  );
}

// Homepage sections, in page order (scroll-spy)
const SECTION_IDS = ['hire-me', 'process', 'work', 'pricing', 'faq', 'contact'];

/** Which nav item a route belongs to */
function navIdForPath(pathname) {
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/pricing')) return 'pricing';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/recruiters')) return 'recruiters';
  return '';
}

export default function Header({
  theme,
  onToggleTheme,
  motionEnabled,
  onToggleMotion,
  onOpenCommand,
  palette,
  onSetPalette,
  onOpenCalModal,
}) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  // Morph dropdown: which panel is open, with a short grace period so the pointer can travel to it
  const [morphId, setMorphId] = useState(null);
  const morphTimer = useRef(0);
  const openMorph = (id) => {
    clearTimeout(morphTimer.current);
    setMorphId(MORPH_PANELS.includes(id) ? id : null);
  };
  const keepMorph = () => clearTimeout(morphTimer.current);
  const closeMorph = (delay = 180) => {
    clearTimeout(morphTimer.current);
    morphTimer.current = setTimeout(() => setMorphId(null), delay);
  };
  useEffect(() => () => clearTimeout(morphTimer.current), []);
  useEffect(() => {
    if (!morphId) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMorphId(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [morphId]);
  const menuTriggerRef = useRef(null);
  const drawerCloseRef = useRef(null);
  const wasOpenRef = useRef(false);

  // Scroll state + scroll-spy (rAF-throttled) with smooth hysteresis
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Hysteresis: morph to capsule at > 24px, seamlessly return to top bar at <= 8px
      setScrolled((prev) => (prev ? y > 8 : y > 24));
      const probe = y + 220;
      let current = '';
      if (window.location.pathname !== '/') {
        setActiveSection('');
        return;
      }
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
  }, [pathname]);

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
    { label: 'Services', href: '/#hire-me', id: 'services' },
    { label: 'Work', href: '/work', id: 'work' },
    { label: 'Pricing', href: '/pricing', id: 'pricing' },
    { label: 'About', href: '/about', id: 'about' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];
  const desktopLinks = navLinks;
  // Active item: the current page, or (on the homepage) the section in view
  const activeId = isHome ? PRIMARY_FOR[activeSection] || '' : navIdForPath(pathname);

  return (
    <>
      <header className={`header-wrapper ${scrolled ? 'is-scrolled' : ''}`} role="banner">
        <div className="header-glass-dock">
          <BrandMark />

          <nav
            className="desktop-only nav-center"
            aria-label="Main navigation"
            onMouseLeave={() => closeMorph()}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) closeMorph(0);
            }}
          >
            <ul className="nav-dock-list">
              {desktopLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`nav-dock-link ${isActive ? 'active' : ''}${morphId === link.id ? ' is-morph' : ''}`}
                      aria-current={isActive ? 'location' : undefined}
                      onMouseEnter={() => openMorph(link.id)}
                      onFocus={() => openMorph(link.id)}
                      onClick={() => setMorphId(null)}
                    >
                      {isActive &&
                        (motionEnabled ? (
                          <motion.span
                            layoutId="nav-active-pill"
                            className="nav-active-pill"
                            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                          />
                        ) : (
                          <span className="nav-active-pill" />
                        ))}
                      <span className="nav-dock-label">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <MorphMenu
              openId={morphId}
              motionEnabled={motionEnabled}
              onPointerEnter={keepMorph}
              onPointerLeave={() => closeMorph()}
              onNavigate={() => setMorphId(null)}
              onOpenCalModal={onOpenCalModal}
            />
          </nav>

          <div className="dock-actions">
            {onSetPalette && (
              <PalettePicker palette={palette} onSetPalette={onSetPalette} motionEnabled={motionEnabled} />
            )}

            <button
              type="button"
              className="theme-toggle-btn"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Second door: recruiters / HR */}
            <a
              href="/recruiters"
              className={`nav-recruiter-link desktop-only${pathname === '/recruiters' ? ' is-active' : ''}`}
              aria-current={pathname === '/recruiters' ? 'page' : undefined}
            >
              <BriefcaseBusiness size={14} aria-hidden="true" />
              <span>For recruiters</span>
            </a>

            {/* Glow Ring: an iridescent ring orbits the icon disc and settles on hover */}
            <button
              type="button"
              className="nav-cta-btn glow-ring-btn desktop-only"
              onClick={(e) => (onOpenCalModal ? onOpenCalModal(e.currentTarget) : (window.location.href = '/contact'))}
            >
              <span className="glow-ring-disc" aria-hidden="true">
                <Calendar size={13} />
              </span>
              <span>Book a call</span>
            </button>

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

          <NavProgress motionEnabled={motionEnabled} />
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
              <BrandMark onClick={() => setMobileMenuOpen(false)} />

              <div className="mobile-drawer-controls">
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
                    className={`mobile-nav-item ${activeId === link.id ? 'active' : ''}`}
                    aria-current={activeId === link.id ? 'page' : undefined}
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
              {onSetPalette && <PaletteRow palette={palette} onSetPalette={onSetPalette} />}

              <a
                href="/contact"
                className="btn btn-primary glow-ring-btn mobile-drawer-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="glow-ring-disc" aria-hidden="true">
                  <ArrowRight size={14} />
                </span>
                <span>Start a project</span>
              </a>

              <a
                href="/recruiters"
                className="btn btn-secondary btn-liquid-glass mobile-drawer-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileText size={16} aria-hidden="true" />
                <span>For recruiters: resume</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>

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
