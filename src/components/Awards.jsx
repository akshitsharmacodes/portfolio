import React from 'react';
import { awardsData } from '../data/experience';
import { siteConfig, isValidContent } from '../config/site';
import { Trophy, Award, Medal, ShieldCheck, ExternalLink, Github, Linkedin, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  scrollViewport,
  scrollViewportEarly,
  fadeInUpVariant,
  cardRevealVariant,
} from '../config/motion';

function renderActionIcon(iconType) {
  switch (iconType) {
    case 'github':
      return <Github size={13} aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin size={13} aria-hidden="true" />;
    case 'code':
      return <Code2 size={13} aria-hidden="true" />;
    case 'medal':
    case 'award':
      return <Medal size={13} aria-hidden="true" />;
    default:
      return <ExternalLink size={13} aria-hidden="true" />;
  }
}

function getAwardActionLinks(award) {
  if (Array.isArray(award.links) && award.links.length > 0) {
    return award.links.filter((item) => isValidContent(item?.url));
  }
  const links = [];
  if (isValidContent(award.liveUrl)) {
    links.push({
      label: award.liveLabel || 'Live Site',
      url: award.liveUrl,
      icon: 'external',
      variant: 'primary',
    });
  }
  if (isValidContent(award.sourceUrl)) {
    links.push({
      label: award.sourceLabel || 'Source Code',
      url: award.sourceUrl,
      icon: 'github',
      variant: 'secondary',
    });
  }
  if (isValidContent(award.credentialUrl)) {
    links.push({
      label: award.credentialLabel || 'View Credential',
      url: award.credentialUrl,
      icon: 'external',
      variant: 'primary',
    });
  }
  return links;
}

export default function Awards({ motionEnabled = true }) {
  if (!siteConfig.preferences.showAwards) return null;

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="awards" aria-label="Awards and Honors">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          variants={motionEnabled ? fadeInUpVariant : undefined}
          initial={motionEnabled ? "hidden" : undefined}
          whileInView={motionEnabled ? "visible" : undefined}
          viewport={motionEnabled ? scrollViewport : undefined}
        >
          <div className="section-meta">
            <span className="section-num">05</span>
            <span className="section-tag">National Recognition</span>
          </div>
          <h2 className="section-title">Honors & Awards</h2>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            Distinctions in competitive national engineering challenges and defense officer selections.
          </p>
        </MotionDiv>

        <div className="awards-grid">
          {awardsData.map((award, index) => {
            const actionLinks = getAwardActionLinks(award);
            return (
              <MotionDiv
                key={award.id}
                className="award-card interactive-hover-card"
                variants={motionEnabled ? cardRevealVariant : undefined}
                custom={index * 0.08}
                initial={motionEnabled ? "hidden" : undefined}
                whileInView={motionEnabled ? "visible" : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
                whileHover={motionEnabled ? { y: -6 } : undefined}
              >
                <div className="award-badge-row">
                  <span className="award-badge">{award.badge}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                    {award.year}
                  </span>
                </div>

                <h3 className="award-title">{award.title}</h3>
                <p className="award-detail">{award.detail}</p>

                {actionLinks.length > 0 && (
                  <div className="award-action-links">
                    {actionLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`award-link-btn ${link.variant === 'secondary' ? 'secondary' : ''}`}
                      >
                        {renderActionIcon(link.icon)}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </MotionDiv>
            );
          })}
        </div>
      </div>
    </section>
  );
}
