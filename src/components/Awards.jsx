import React from 'react';
import { awardsData } from '../data/experience';
import { siteConfig, isValidContent } from '../config/site';
import { Trophy, Award, ShieldCheck, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  scrollViewport,
  scrollViewportEarly,
  fadeInUpVariant,
  cardRevealVariant,
} from '../config/motion';

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
          {awardsData.map((award, index) => (
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

              {(isValidContent(award.liveUrl) || isValidContent(award.sourceUrl) || isValidContent(award.credentialUrl)) && (
                <div className="award-action-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  {isValidContent(award.liveUrl) && (
                    <a
                      href={award.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="award-link-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        padding: '5px 12px',
                        background: 'rgba(227, 43, 60, 0.08)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'all 160ms ease',
                      }}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {isValidContent(award.sourceUrl) && (
                    <a
                      href={award.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="award-link-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        padding: '5px 12px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'all 160ms ease',
                      }}
                    >
                      <Github size={13} />
                      <span>Source Code</span>
                    </a>
                  )}
                  {isValidContent(award.credentialUrl) && (
                    <a
                      href={award.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="award-link-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                        padding: '5px 12px',
                        background: 'rgba(227, 43, 60, 0.08)',
                        border: '1px solid var(--border-accent)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'all 160ms ease',
                      }}
                    >
                      <span>{award.credentialLabel || 'View Credential'}</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
