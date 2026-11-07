import React from 'react';
import { awardsData } from '../data/experience';
import { siteConfig, isValidContent } from '../config/site';
import { ExternalLink, Github, Linkedin, Code2, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, cardRevealVariant, bentoColumnIndex } from '../config/motion';
import SectionHeader from './SectionHeader';

function renderActionIcon(iconType) {
  switch (iconType) {
    case 'github':
      return <Github size={12} aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin size={12} aria-hidden="true" />;
    case 'code':
      return <Code2 size={12} aria-hidden="true" />;
    case 'medal':
    case 'award':
      return <Medal size={12} aria-hidden="true" />;
    default:
      return <ExternalLink size={12} aria-hidden="true" />;
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
    });
  }
  if (isValidContent(award.sourceUrl)) {
    links.push({
      label: award.sourceLabel || 'Source Code',
      url: award.sourceUrl,
      icon: 'github',
    });
  }
  if (isValidContent(award.credentialUrl)) {
    links.push({
      label: award.credentialLabel || 'View Credential',
      url: award.credentialUrl,
      icon: 'external',
    });
  }
  return links;
}

export default function Awards({ motionEnabled = true }) {
  if (!siteConfig.preferences.showAwards) return null;

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="awards" aria-label="Awards and honors">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="National Recognition"
          title="Honors & Awards"
          description="Distinctions in competitive national engineering challenges and defense officer selections."
        />

        {/* Bento: the two headline wins take the first row, the rest share the second */}
        <div className="awards-grid bento-grid">
          {awardsData.map((award, index) => {
            const actionLinks = getAwardActionLinks(award);
            return (
              <MotionDiv
                key={award.id}
                className="award-card interactive-hover-card"
                data-index={String(index + 1).padStart(2, '0')}
                variants={motionEnabled ? cardRevealVariant : undefined}
                custom={bentoColumnIndex(index, awardsData.length) * 0.09}
                initial={motionEnabled ? 'hidden' : undefined}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
              >
                <div className="award-badge-row">
                  <span className="award-badge">{award.badge}</span>
                  <span className="award-year">{award.year}</span>
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
                        className="pill-link"
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
