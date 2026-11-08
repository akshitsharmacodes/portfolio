import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ClientEngine from './components/ClientEngine';
import ProjectGrid from './components/ProjectGrid';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Ventures from './components/Ventures';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { siteConfig } from './config/site';
import { projects } from './data/projects';
import CtaBand from './components/CtaBand';
import Process from './components/Process';
import { DEFAULT_PALETTE, PALETTE_KEY, THEME_CHOICE_KEY, isPalette } from './config/palettes';
import { Analytics } from '@vercel/analytics/react';

// Lazily load heavy modals to keep the initial page bundle lean and fast
const ProjectDialog = lazy(() => import('./components/ProjectDialog'));
const CommandMenu = lazy(() => import('./components/CommandMenu'));
const CalModal = lazy(() => import('./components/CalModal'));
const MOTION_KEY = siteConfig.appearance.storageKeyMotion;

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode): preference lasts for this page only */
  }
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  // Theme: the inline script in index.html already applied it before first paint.
  // Without an explicit choice it follows the OS colour scheme (live).
  const [theme, setTheme] = useState(() => {
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') return applied;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [palette, setPaletteState] = useState(() => {
    const applied = document.documentElement.getAttribute('data-palette');
    return isPalette(applied) ? applied : DEFAULT_PALETTE;
  });

  // Motion: an explicit choice from the header toggle wins; otherwise follow the OS setting
  const [motionEnabled, setMotionEnabled] = useState(() => {
    const stored = readStorage(MOTION_KEY);
    if (stored === 'on' || stored === 'off') return stored === 'on';
    return !prefersReducedMotion();
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const dialogOpenerRef = useRef(null);

  // Sync theme + palette on <html> and the browser UI colour
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-palette', palette);
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    if (bg) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg);
  }, [theme, palette]);

  // Follow live OS colour-scheme changes until the visitor picks a theme
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (readStorage(THEME_CHOICE_KEY) === null) setTheme(e.matches ? 'dark' : 'light');
    };
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);

  // Reflect motion state on <html> (CSS uses it to stop keyframe animations).
  // Persisting happens only in toggleMotion, so an untouched OS preference is never overwritten.
  useEffect(() => {
    const root = document.documentElement;
    if (motionEnabled) root.removeAttribute('data-motion');
    else root.setAttribute('data-motion', 'off');
  }, [motionEnabled]);

  // Follow live OS reduced-motion changes until the visitor makes an explicit choice
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => {
      if (readStorage(MOTION_KEY) === null) setMotionEnabled(!e.matches);
    };
    query.addEventListener?.('change', onChange);
    return () => query.removeEventListener?.('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      writeStorage(THEME_CHOICE_KEY, next);
      return next;
    });
  }, []);

  const setPalette = useCallback((id) => {
    if (!isPalette(id)) return;
    setPaletteState(id);
    writeStorage(PALETTE_KEY, id);
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionEnabled((prev) => {
      const next = !prev;
      writeStorage(MOTION_KEY, next ? 'on' : 'off');
      return next;
    });
  }, []);

  // Remember which control opened the dialog so focus can return to it on close
  const openProject = useCallback((project, opener) => {
    dialogOpenerRef.current = opener || document.activeElement;
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => setSelectedProject(null), []);

  const [calModalOpen, setCalModalOpen] = useState(false);
  const calOpenerRef = useRef(null);

  const openCalModal = useCallback((opener) => {
    calOpenerRef.current = opener || document.activeElement;
    setCalModalOpen(true);
  }, []);

  const closeCalModal = useCallback(() => {
    setCalModalOpen(false);
  }, []);

  // ⌘K / Ctrl+K command menu
  const [commandOpen, setCommandOpen] = useState(false);
  const commandOpenerRef = useRef(null);
  const openCommand = useCallback((opener) => {
    commandOpenerRef.current = opener || document.activeElement;
    setCommandOpen(true);
  }, []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((open) => {
          if (!open) commandOpenerRef.current = document.activeElement;
          return !open;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <div className={`portfolio-app theme-${theme}`}>
        {/* Skip to content for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          motionEnabled={motionEnabled}
          onToggleMotion={toggleMotion}
          onOpenCommand={openCommand}
          palette={palette}
          onSetPalette={setPalette}
          onOpenCalModal={openCalModal}
        />

        <main id="main-content" tabIndex={-1}>
          <Hero
            motionEnabled={motionEnabled}
            onOpenCalModal={openCalModal}
            onOpenCommand={openCommand}
            onToggleTheme={toggleTheme}
            onToggleMotion={toggleMotion}
            palette={palette}
            theme={theme}
          />

          {/* Services / Hire Me */}
          <ClientEngine motionEnabled={motionEnabled} />

          <Process motionEnabled={motionEnabled} />

          <ProjectGrid projects={projects} motionEnabled={motionEnabled} onSelectProject={openProject} />

          <CtaBand onOpenCalModal={openCalModal} />

          <About motionEnabled={motionEnabled} />

          <Skills motionEnabled={motionEnabled} />

          {siteConfig.preferences.showExperience && <Experience motionEnabled={motionEnabled} />}

          {siteConfig.preferences.showAwards && <Awards motionEnabled={motionEnabled} />}

          {(siteConfig.preferences.showVentures ?? true) && <Ventures motionEnabled={motionEnabled} />}

          <Contact motionEnabled={motionEnabled} onOpenCalModal={openCalModal} />
        </main>

        <Footer motionEnabled={motionEnabled} onToggleMotion={toggleMotion} onOpenCalModal={openCalModal} />

        {/* Project case-study dialog (enter + exit animations) */}
        <Suspense fallback={null}>
          <AnimatePresence>
            {selectedProject && (
              <ProjectDialog
                key={selectedProject.id}
                project={selectedProject}
                onClose={closeProject}
                returnFocusTo={dialogOpenerRef.current}
                motionEnabled={motionEnabled}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {commandOpen && (
              <CommandMenu
                key="command-menu"
                onClose={closeCommand}
                returnFocusTo={commandOpenerRef.current}
                theme={theme}
                onToggleTheme={toggleTheme}
                motionEnabled={motionEnabled}
                onToggleMotion={toggleMotion}
                onOpenCalModal={openCalModal}
                palette={palette}
                onSetPalette={setPalette}
              />
            )}
          </AnimatePresence>

          {/* Cal.com embedded scheduling dialog */}
          <AnimatePresence>
            {calModalOpen && (
              <CalModal
                key="cal-modal"
                isOpen={calModalOpen}
                onClose={closeCalModal}
                returnFocusTo={calOpenerRef.current}
                theme={theme}
                motionEnabled={motionEnabled}
              />
            )}
          </AnimatePresence>
        </Suspense>

        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </>
  );
}
