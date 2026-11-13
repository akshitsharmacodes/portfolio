import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Hero from '../components/Hero';
import ClientEngine from '../components/ClientEngine';
import Process from '../components/Process';
import ProjectGrid from '../components/ProjectGrid';
import CtaBand from '../components/CtaBand';
import Contact from '../components/Contact';
import PricingCards from '../components/PricingCards';
import Faq from '../components/Faq';
import { projects } from '../data/projects';
import { homeFaqs } from '../data/services';

/** Client view (default): Gentle Tech Labs agency homepage */
export default function HomePage({ app }) {
  const { motionEnabled, openCalModal, openCommand, toggleTheme, toggleMotion, palette, theme, openProject } = app;
  return (
    <>
      <Hero
        motionEnabled={motionEnabled}
        onOpenCalModal={openCalModal}
        onOpenCommand={openCommand}
        onToggleTheme={toggleTheme}
        onToggleMotion={toggleMotion}
        palette={palette}
        theme={theme}
      />

      {/* Services + trust & guarantees */}
      <ClientEngine motionEnabled={motionEnabled} />

      <Process motionEnabled={motionEnabled} />

      <ProjectGrid projects={projects} motionEnabled={motionEnabled} onSelectProject={openProject} />
      <div className="container section-link-row">
        <Link to="/work" className="btn btn-secondary">
          <span>All case studies</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>

      <section className="section-padding" id="pricing" aria-labelledby="pricing-title">
        <div className="container">
          <div className="section-intro-row">
            <div>
              <span className="page-eyebrow">Pricing</span>
              <h2 id="pricing-title" className="section-title">
                Transparent starting prices, in INR and USD.
              </h2>
            </div>
            <Link to="/pricing" className="btn-link">
              <span>Full pricing</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <PricingCards compact />
        </div>
      </section>

      <Faq items={homeFaqs} />

      <CtaBand onOpenCalModal={openCalModal} />

      <Contact motionEnabled={motionEnabled} onOpenCalModal={openCalModal} />
    </>
  );
}
