import React from 'react';
import { skillsData } from '../data/experience';
import { Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, fadeInUpVariant, cardRevealVariant } from '../config/motion';
import SectionHeader from './SectionHeader';

export default function Skills({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  return (
    <section className="section-padding section-padding--tight-top" id="skills" aria-label="Skills and capabilities">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Core Technical Capabilities"
          title="Technical Stack"
          description="Specialized across the modern AI engineering lifecycle—from LangChain/LangGraph orchestration and vector embeddings to scalable backend architectures."
        />

        <div className="skills-grid">
          {skillsData.groups.map((group, index) => (
            <MotionDiv
              key={group.group}
              className={`skill-group-card interactive-hover-card ${group.highlight ? 'highlight' : ''}`}
              variants={motionEnabled ? cardRevealVariant : undefined}
              custom={(index % 3) * 0.08}
              initial={motionEnabled ? 'hidden' : undefined}
              whileInView={motionEnabled ? 'visible' : undefined}
              viewport={motionEnabled ? scrollViewportEarly : undefined}
              whileHover={motionEnabled ? { y: -4 } : undefined}
            >
              <div className="skill-group-header">
                <span className="skill-group-title">{group.group}</span>
                {group.highlight && <span className="skill-group-flag">Primary Focus</span>}
              </div>
              <div className="skill-items-wrap">
                {group.items.map((skill) => (
                  <span key={skill} className="tech-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv
          className="skills-tools-strip"
          variants={motionEnabled ? fadeInUpVariant : undefined}
          custom={0.1}
          initial={motionEnabled ? 'hidden' : undefined}
          whileInView={motionEnabled ? 'visible' : undefined}
          viewport={motionEnabled ? scrollViewportEarly : undefined}
        >
          <span className="skills-tools-label">
            <Wrench size={16} className="text-accent" aria-hidden="true" />
            Infrastructure & Tools
          </span>
          <div className="skills-tools-list">
            {skillsData.tools.map((tool) => (
              <span key={tool} className="tech-tag">
                {tool}
              </span>
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
