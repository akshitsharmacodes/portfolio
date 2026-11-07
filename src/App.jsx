import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import ClientEngine from './components/ClientEngine';
import ProjectGrid from './components/ProjectGrid';
import ProjectDialog from './components/ProjectDialog';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Ventures from './components/Ventures';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CalModal from './components/CalModal';
import { siteConfig } from './config/site';
import { projects } from './data/projects';

const THEME_KEY = 'akshit-portfolio-theme';
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
  // Theme: the inline script in index.html already applied it before first paint
  const [theme, setTheme] = useState(() => {
    const applied = document.documentElement.getAttribute('data-theme');
    if (applied === 'light' || applied === 'dark') return applied;
    return readStorage(THEME_KEY) === 'light' ? 'light' : 'dark';
  });

  // Motion: an explicit choice from the header toggle wins; otherwise follow the OS setting
  const [motionEnabled, setMotionEnabled] = useState(() => {
    const stored = readStorage(MOTION_KEY);
    if (stored === 'on' || stored === 'off') return stored === 'on';
    return !prefersReducedMotion();
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const dialogOpenerRef = useRef(null);

  // Sync theme on <html> + browser UI color
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#ffffff' : '#0a0a0a');
    writeStorage(THEME_KEY, theme);
  }, [theme]);

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
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
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
        />

        <main id="main-content" tabIndex={-1}>
          <Hero motionEnabled={motionEnabled} onOpenCalModal={openCalModal} />

          {/* Services / Hire Me */}
          <ClientEngine motionEnabled={motionEnabled} />

          <ProjectGrid projects={projects} motionEnabled={motionEnabled} onSelectProject={openProject} />

          <About motionEnabled={motionEnabled} />

          <Skills motionEnabled={motionEnabled} />

          {siteConfig.preferences.showExperience && <Experience motionEnabled={motionEnabled} />}

          {siteConfig.preferences.showAwards && <Awards motionEnabled={motionEnabled} />}

          {(siteConfig.preferences.showVentures ?? true) && <Ventures motionEnabled={motionEnabled} />}

          <Contact motionEnabled={motionEnabled} onOpenCalModal={openCalModal} />
        </main>

        <Footer motionEnabled={motionEnabled} onToggleMotion={toggleMotion} />

        {/* Project case-study dialog (enter + exit animations) */}
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
      </div>
    </>
  );
}
