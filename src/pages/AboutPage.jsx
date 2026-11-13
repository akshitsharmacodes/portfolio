import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Awards from '../components/Awards';
import Ventures from '../components/Ventures';
import CtaBand from '../components/CtaBand';
import { siteConfig } from '../config/site';

/** About the studio and its founder (client-facing; recruiters have /recruiters) */
export default function AboutPage({ app }) {
  const { motionEnabled } = app;
  const { agency, preferences } = siteConfig;
  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['About', '/about'],
        ]}
        eyebrow={`About ${agency.name}`}
        title="A founder-led studio for AI, web and search"
        intro={`${agency.heroLine} ${agency.founderNote}`}
      >
        <Link to="/recruiters" className="btn btn-secondary">
          <span>Hiring? Akshit's resume</span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </PageHero>

      <About motionEnabled={motionEnabled} />
      <Skills motionEnabled={motionEnabled} />
      {preferences.showExperience && <Experience motionEnabled={motionEnabled} />}
      {preferences.showAwards && <Awards motionEnabled={motionEnabled} />}
      {(preferences.showVentures ?? true) && <Ventures motionEnabled={motionEnabled} />}
      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}
