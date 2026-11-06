import React, { useState, useEffect } from 'react';
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
import { siteConfig } from './config/site';
import { projects } from './data/projects';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem('akshit-portfolio-theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return 'dark';
  });

  // Motion preference state with localStorage persistence
  const [motionEnabled, setMotionEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(siteConfig.appearance.storageKeyMotion);
    if (stored !== null) {
      return stored === 'on';
    }
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [swarmActive, setSwarmActive] = useState(false);

  // Sync theme attribute on <html> element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    localStorage.setItem('akshit-portfolio-theme', theme);
  }, [theme]);

  // Sync motion state attribute on root element
  useEffect(() => {
    const root = document.documentElement;
    if (motionEnabled) {
      root.removeAttribute('data-motion');
      localStorage.setItem(siteConfig.appearance.storageKeyMotion, 'on');
    } else {
      root.setAttribute('data-motion', 'off');
      localStorage.setItem(siteConfig.appearance.storageKeyMotion, 'off');
    }
  }, [motionEnabled]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleMotion = () => {
    setMotionEnabled((prev) => !prev);
  };

  const handleTriggerSwarm = () => {
    setSwarmActive((prev) => !prev);
  };

  return (
    <div className={`portfolio-app theme-${theme}`}>
      {/* Skip to Content for Keyboard Accessibility */}
      <a href="#work" className="skip-link">
        Skip to main content
      </a>

      {/* Top Scroll Indicator */}
      <ScrollProgress motionEnabled={motionEnabled} />

      {/* Palette-Complementary Ambient Background Gradient */}
      <BackgroundGradient motionEnabled={motionEnabled} />

      {/* Subtle Ambient Mouse Spotlight (Dark mode fine-pointer) */}
      {theme === 'dark' && <CursorGlow motionEnabled={motionEnabled} />}

      {/* Clean & Elegant Navbar with Theme Toggle, Motion Trigger, and Red Resume Button */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        motionEnabled={motionEnabled}
        onToggleMotion={toggleMotion}
        onTriggerSwarm={handleTriggerSwarm}
        swarmActive={swarmActive}
      />

      {/* Main Page Content with Scroll Animations */}
      <main id="main-content">
        <Hero motionEnabled={motionEnabled} />

        <SectionDivider motionEnabled={motionEnabled} />

        {/* Client Acquisition Engine / Hire Me Solutions */}
        <ClientEngine motionEnabled={motionEnabled} />

        <SectionDivider motionEnabled={motionEnabled} />

        <ProjectGrid
          projects={projects}
          motionEnabled={motionEnabled}
          onSelectProject={(project) => setSelectedProject(project)}
        />

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

        <Contact motionEnabled={motionEnabled} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Case Study Dialog */}
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Standalone Swarm Rebuild Animation Feature */}
      <SwarmEffect
        isActive={swarmActive}
        theme={theme}
        onClose={() => setSwarmActive(false)}
      />
    </div>
  );
}
