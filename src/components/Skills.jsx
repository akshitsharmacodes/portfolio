import React from 'react';
import { skillsData } from '../data/experience';
import { Code2, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Skills({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding" id="skills" style={{ paddingTop: 0 }} aria-label="Skills & Capabilities">
      <div className="container">
        {/* Section Header */}
        <MotionDiv
          initial={motionEnabled ? { opacity: 0, y: 24 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-meta">
            <span className="section-num">03</span>
            <span className="section-tag">Core Technical Capabilities</span>
          </div>
          <h2 className="section-title">Technical Stack</h2>
          <p className="section-desc" style={{ marginBottom: '36px' }}>
            Specialized across the modern AI engineering lifecycle—from LangChain/LangGraph orchestration and vector embeddings to scalable backend architectures.
          </p>
        </MotionDiv>

        {/* Grouped Skills Grid with Staggered Scroll Animation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {skillsData.groups.map((group, index) => (
            <MotionDiv
              key={group.group}
              className={`skill-group-card interactive-hover-card ${group.highlight ? 'highlight' : ''}`}
              initial={motionEnabled ? { opacity: 0, y: 28 } : undefined}
              whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
              viewport={motionEnabled ? { once: true, amount: 0.15 } : undefined}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={motionEnabled ? { y: -4, borderColor: 'var(--border-strong)' } : undefined}
            >
              <div className="skill-group-header">
                <span className="skill-group-title">{group.group}</span>
                {group.highlight && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: 'var(--accent)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Primary Focus
                  </span>
                )}
              </div>
              <div className="skill-items-wrap">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className={`tech-tag ${group.highlight ? 'accent-style' : ''}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Infrastructure & Tools Strip */}
        <MotionDiv
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
          initial={motionEnabled ? { opacity: 0, y: 20 } : undefined}
          whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wrench size={18} className="text-accent" aria-hidden="true" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                letterSpacing: '0.05em',
                color: 'var(--text)',
              }}
            >
              INFRASTRUCTURE & TOOLS
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skillsData.tools.map((tool) => (
              <span key={tool} className="tech-tag" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                {tool}
              </span>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
