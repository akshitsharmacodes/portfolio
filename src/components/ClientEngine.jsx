import React from 'react';
import { siteConfig, isValidContent } from '../config/site';
import { Bot, Globe, Search, Sparkles, ArrowUpRight, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { services } from '../data/services';
import { motion } from 'framer-motion';
import ServiceTabs from './ServiceTabs';
import { scrollViewportEarly, cardRevealVariant, luxuryTransition } from '../config/motion';
import SectionHeader from './SectionHeader';
import MagneticButton from './MagneticButton';

function UpworkLogo({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.704-2.704 2.704zm0-8.14c-3.14 0-5.32 2.248-5.938 4.488-1.182-1.759-2.008-3.673-2.46-5.499H6.848v7.444c0 2.018-1.635 3.653-3.653 3.653-2.018 0-3.654-1.635-3.653-3.653V4.007H0v7.444c0 3.738 3.036 6.774 6.774 6.774 2.274 0 4.287-1.127 5.513-2.859.629 1.499 1.682 2.802 3.036 3.622 1.002.608 2.146.929 3.238.929 3.535 0 6.41-2.875 6.41-6.41 0-3.535-2.875-6.41-6.41-6.41z" />
    </svg>
  );
}

// The four Gentle Tech Labs services, each linking to its own page
const SERVICE_ICONS = [Bot, Globe, Search, Sparkles];
const clientPillars = services.map((svc, i) => ({
  icon: SERVICE_ICONS[i],
  num: svc.num,
  title: svc.name,
  desc: `${svc.short} ${svc.intro}`,
  tags: svc.stack.slice(0, 5),
  href: `/services/${svc.slug}`,
  linkLabel: `${svc.name}: from ${svc.from.inr} / ${svc.from.usd}`,
}));

const trustBadges = [
  { title: 'Upwork Escrow Protection', desc: 'Hire safely with hourly tracking or milestone escrow.' },
  { title: 'Direct GitHub Repository', desc: '100% transparent commits, branches, and code documentation.' },
  { title: 'Fast Direct Communication', desc: 'Clear updates via Cal.com, Slack, or Upwork workrooms.' },
  { title: 'Military Discipline & Rigor', desc: 'OTA Gaya trained decision-making under high-stakes timelines.' },
];

export default function ClientEngine({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';
  const bannerRef = React.useRef(null);

  const HeadingTag = motionEnabled ? motion.h3 : 'h3';

  return (
    <section className="section-padding" id="hire-me" aria-label="Services and freelance engagements">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Services"
          title={<>Four services. <span className="text-accent">One accountable team.</span></>}
          description="AI that takes work off your team, websites that convert, and the search visibility to get found on Google and in AI assistants. Every project is led by our founder from first call to launch."
        />

        {/* Interactive service tabs with live architecture scenes */}
        <ServiceTabs items={clientPillars} motionEnabled={motionEnabled} />

        {/* Hire banner */}
        <MotionDiv
          ref={bannerRef}
          className="client-banner-card"
          variants={motionEnabled ? cardRevealVariant : undefined}
          custom={0.08}
          initial={motionEnabled ? 'hidden' : undefined}
          whileInView={motionEnabled ? 'visible' : undefined}
          viewport={motionEnabled ? scrollViewportEarly : undefined}
        >
          <div className="client-banner-glow" aria-hidden="true" />

          <div className="client-banner-header">
            <div className="client-banner-intro">
              <div className="client-status-badge">
                <span className="client-status-dot" aria-hidden="true" />
                <span>Available for New Projects</span>
              </div>
              <HeadingTag
                className="client-banner-heading"
                
              >
                Ready to start your project?
              </HeadingTag>
            </div>

            <div className="client-banner-actions">
              {isValidContent(siteConfig.contact.upwork) && (
                <MagneticButton
                  as="a"
                  motionEnabled={motionEnabled}
                  href={siteConfig.contact.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-upwork"
                  title="Hire Akshit on Upwork with escrow payment protection"
                >
                  <UpworkLogo size={18} className="upwork-logo-svg" />
                  <span>Hire on Upwork</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </MagneticButton>
              )}

              {isValidContent(siteConfig.contact.whatsapp) && (
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-liquid-glass"
                  title="Direct WhatsApp message"
                >
                  <MessageCircle size={16} className="icon-whatsapp" aria-hidden="true" />
                  <span>WhatsApp DM</span>
                </a>
              )}

              <a
                href="https://cal.com/akshitsharmacodes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-liquid-glass"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Book a discovery call</span>
              </a>
            </div>
          </div>

          <div className="client-trust-grid">
            {trustBadges.map((badge, bIdx) => (
              <MotionDiv
                key={badge.title}
                className="client-trust-item"
                initial={motionEnabled ? { opacity: 0, y: 14 } : undefined}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
                transition={motionEnabled ? luxuryTransition(0.2 + bIdx * 0.06, 0.5) : undefined}
              >
                <CheckCircle2 size={18} className="client-trust-icon" aria-hidden="true" />
                <div>
                  <h4 className="client-trust-title">{badge.title}</h4>
                  <p className="client-trust-desc">{badge.desc}</p>
                </div>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
