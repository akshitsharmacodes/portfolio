import React from 'react';
import { Calendar } from 'lucide-react';
import PageHero from '../components/PageHero';
import Contact from '../components/Contact';
import { siteConfig } from '../config/site';

export default function ContactPage({ app }) {
  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['Contact', '/contact'],
        ]}
        eyebrow="Contact"
        title="Tell us what you want to build"
        intro={`Book a free 30-minute discovery call, send a brief, or message on WhatsApp. ${siteConfig.agency.timezoneNote}`}
      >
        <button type="button" className="btn btn-primary" onClick={(e) => app.openCalModal(e.currentTarget)}>
          <Calendar size={16} aria-hidden="true" />
          <span>Book a discovery call</span>
        </button>
      </PageHero>
      <Contact motionEnabled={app.motionEnabled} onOpenCalModal={app.openCalModal} />
    </>
  );
}
