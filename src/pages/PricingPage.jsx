import React from 'react';
import { Calendar, ShieldCheck, Github, FileSignature, Globe2 } from 'lucide-react';
import PageHero from '../components/PageHero';
import PricingCards from '../components/PricingCards';
import Faq from '../components/Faq';
import CtaBand from '../components/CtaBand';
import { siteConfig } from '../config/site';

const TERMS = [
  { icon: ShieldCheck, title: 'Milestone payments', text: 'Pay per milestone. Upwork escrow is available if you prefer it.' },
  { icon: Github, title: 'You own the work', text: 'Code and content live in your repository and accounts from day one.' },
  { icon: FileSignature, title: 'NDA on request', text: 'Happy to sign your NDA before we see any confidential material.' },
  { icon: Globe2, title: 'INR or USD', text: 'Indian clients are quoted in INR; international clients in USD.' },
];

const PRICING_FAQS = [
  {
    q: 'Why "starting from" prices?',
    a: 'Every project differs in scope and integrations. Starting prices show the realistic minimum; you get a fixed quote within 48 hours of a free scoping call.',
  },
  {
    q: 'How do payments work?',
    a: 'Usually an upfront deposit, then payments per milestone as work is delivered and approved. Monthly services (like SEO) are billed monthly.',
  },
  {
    q: 'Can we start small?',
    a: 'Yes. Many clients start with an audit or a single workflow, then expand once they see results.',
  },
];

export default function PricingPage({ app }) {
  return (
    <>
      <PageHero
        crumbs={[
          ['Home', '/'],
          ['Pricing', '/pricing'],
        ]}
        eyebrow="Pricing"
        title="Simple starting prices, fixed quotes"
        intro={`Starting prices in INR and USD for every service. After a free scoping call you get a fixed quote with milestones within 48 hours. ${siteConfig.agency.timezoneNote}`}
      >
        <button type="button" className="btn btn-primary" onClick={(e) => app.openCalModal(e.currentTarget)}>
          <Calendar size={16} aria-hidden="true" />
          <span>Get a fixed quote</span>
        </button>
      </PageHero>

      <section className="section-padding">
        <div className="container">
          <PricingCards />
          <div className="terms-grid">
            {TERMS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="terms-item">
                <Icon size={20} aria-hidden="true" />
                <b>{title}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq items={PRICING_FAQS} title="Pricing questions" />
      <CtaBand onOpenCalModal={app.openCalModal} />
    </>
  );
}
