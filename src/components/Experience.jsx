import React from 'react';
import { experienceData, educationData } from '../data/experience';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Experience({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="experience" aria-label="Experience & Education">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-meta">
            <span className="section-num">04</span>
            <span className="section-tag">Career Trajectory</span>
          </div>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-desc" style={{ marginBottom: '40px' }}>
            Proven execution across production AI systems, distributed caching, and military leadership training.
          </p>
        </MotionDiv>

        <div className="timeline-section-grid">
          {/* Work Experience Timeline */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--text)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Briefcase size={20} className="text-accent" aria-hidden="true" />
              <span>Professional Experience</span>
            </h3>

            <div className="timeline-list">
              {experienceData.map((item, index) => (
                <MotionDiv
                  key={item.id}
                  className={`timeline-card interactive-hover-card ${item.current ? 'current' : ''}`}
                  initial={motionEnabled ? { opacity: 0, x: -20 } : undefined}
                  whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
                  viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={motionEnabled ? { x: 4 } : undefined}
                >
                  <div className="timeline-dot" aria-hidden="true"></div>

                  <div className="timeline-dates">
                    {item.dates}
                  </div>

                  <h4 className="timeline-role">{item.role}</h4>

                  <div className="timeline-org">
                    <span>{item.org}</span>
                    <span style={{ color: 'var(--text-dim)' }}>•</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.84rem' }}>
                      <MapPin size={13} aria-hidden="true" />
                      {item.location}
                    </span>
                  </div>

                  <ul className="timeline-points">
                    {item.points.map((point, pIndex) => (
                      <li key={pIndex} className="timeline-point">
                        {point}
                      </li>
                    ))}
                  </ul>

                  {item.tech && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
                      {item.tech.map((t) => (
                        <span key={t} className="tech-tag" style={{ fontSize: '0.72rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </MotionDiv>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="education-column">
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--text)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <GraduationCap size={20} className="text-accent" aria-hidden="true" />
              <span>Academic Background</span>
            </h3>

            {educationData.map((edu, index) => (
              <MotionDiv
                key={edu.institution}
                className="education-card interactive-hover-card"
                initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
                whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
                viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
                transition={{ duration: 0.55, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                whileHover={motionEnabled ? { y: -4 } : undefined}
              >
                <div className="edu-dates">{edu.dates}</div>
                <h4 className="edu-inst">{edu.institution}</h4>
                <div className="edu-qual">{edu.qualification}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                  <MapPin size={13} aria-hidden="true" />
                  {edu.location}
                </div>
                {edu.notes && <p className="edu-notes">{edu.notes}</p>}
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
