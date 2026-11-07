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
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import BackgroundGradient from './components/BackgroundGradient';
import SwarmEffect from './components/SwarmEffect';
import SectionDivider from './components/SectionDivider';
import Preloader from './components/Preloader';
import LampToggle from './components/LampToggle';
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

  // Preloader: plays on every load and refresh. index.html marks data-boot="skip" only when
  // motion is reduced / switched off. booting → revealing (curtain lifting) → done.
  const [bootPhase, setBootPhase] = useState(() =>
    document.documentElement.getAttribute('data-boot') === 'skip' ? 'done' : 'booting'
  );

  const [selectedProject, setSelectedProject] = useState(null);
  const dialogOpenerRef = useRef(null);
  const [swarmActive, setSwarmActive] = useState(false);

  // Sync theme on <html> + browser UI color
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'light' ? '#f8f7f4' : '#090909');
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

  // While booting, lock scroll (compensating for the scrollbar so nothing shifts on reveal)
  useEffect(() => {
    if (bootPhase !== 'booting') return undefined;
    const html = document.documentElement;
    const { body } = document;
    const gap = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, paddingRight: body.style.paddingRight };
    html.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
    };
  }, [bootPhase]);

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

  const handleTriggerSwarm = useCallback(() => {
    setSwarmActive((prev) => !prev);
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
  const handleBootReveal = useCallback(() => setBootPhase('revealing'), []);
  const handleBootDone = useCallback(() => setBootPhase('done'), []);

  const introReady = bootPhase !== 'booting';

  return (
    <>
      {/* Developer boot sequence (first visit per session, motion on) */}
      {bootPhase !== 'done' && <Preloader onReveal={handleBootReveal} onDone={handleBootDone} />}

      <div className={`portfolio-app theme-${theme}`} inert={bootPhase === 'booting'}>
        {/* Skip to content for keyboard users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <ScrollProgress motionEnabled={motionEnabled} />

        <BackgroundGradient motionEnabled={motionEnabled} />

        {/* Subtle ambient pointer spotlight (dark theme, fine pointers) */}
        {theme === 'dark' && <CursorGlow motionEnabled={motionEnabled} />}

        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          motionEnabled={motionEnabled}
          onToggleMotion={toggleMotion}
          onTriggerSwarm={handleTriggerSwarm}
          swarmActive={swarmActive}
        />

        {/* Pull-cord theme switch ("lamp string") hanging beside the header */}
        <LampToggle theme={theme} onToggle={toggleTheme} motionEnabled={motionEnabled} ready={introReady} />

        <main id="main-content" tabIndex={-1}>
          <Hero motionEnabled={motionEnabled} introReady={introReady} onOpenCalModal={openCalModal} />

          <SectionDivider motionEnabled={motionEnabled} />

          {/* Services / Hire Me */}
          <ClientEngine motionEnabled={motionEnabled} />

          <SectionDivider motionEnabled={motionEnabled} />

          <ProjectGrid projects={projects} motionEnabled={motionEnabled} onSelectProject={openProject} />

          <SectionDivider motionEnabled={motionEnabled} />

          <About motionEnabled={motionEnabled} />

          <Skills motionEnabled={motionEnabled} />

          {siteConfig.preferences.showExperience && (
            <>
              <SectionDivider motionEnabled={motionEnabled} />
              <Experience motionEnabled={motionEnabled} />
            </>
          )}

          {siteConfig.preferences.showAwards && (
            <>
              <SectionDivider motionEnabled={motionEnabled} />
              <Awards motionEnabled={motionEnabled} />
            </>
          )}

          {(siteConfig.preferences.showVentures ?? true) && (
            <>
              <SectionDivider motionEnabled={motionEnabled} />
              <Ventures motionEnabled={motionEnabled} />
            </>
          )}

          <SectionDivider motionEnabled={motionEnabled} />

          <Contact motionEnabled={motionEnabled} onOpenCalModal={openCalModal} />
        </main>

        <Footer />

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

        <SwarmEffect isActive={swarmActive} theme={theme} onClose={() => setSwarmActive(false)} />
      </div>
    </>
  );
}
