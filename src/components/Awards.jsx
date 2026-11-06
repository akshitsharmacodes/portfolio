import React from 'react';
import { awardsData } from '../data/experience';
import { siteConfig } from '../config/site';
import { Trophy, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Awards({ motionEnabled = true }) {
  if (!siteConfig.preferences.showAwards) return null;

  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="awards" aria-label="Awards and Honors">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              initial={motionEnabled ? { opacity: 0, y: 28 } : undefined}
              whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
