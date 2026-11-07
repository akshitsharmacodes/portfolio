import React, { useId, useRef, useState } from 'react';
import { experienceData, educationData } from '../data/experience';
import { Briefcase, GraduationCap, MapPin, ExternalLink, FileText, ChevronDown } from 'lucide-react';
import { isValidContent } from '../config/site';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { scrollViewportEarly, fadeInLeftVariant, fadeInRightVariant, easeCurves } from '../config/motion';
import SectionHeader from './SectionHeader';

/**
 * Accessible expandable timeline row.
 * The summary (dates, role, org) is a real <button> with aria-expanded/aria-controls;
 * details collapse with a height animation (instant when motion is off).
 */
function TimelineRow({ item, index, isOpen, onToggle, motionEnabled }) {
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const MotionDiv = motionEnabled ? motion.div : 'div';

  const details = (
    <div className="timeline-details-inner">
      <ul className="timeline-points">
        {item.points.map((point, pIndex) => (
          <li key={pIndex} className="timeline-point">
            {point}
          </li>
        ))}
      </ul>

      {item.tech && (
        <div className="timeline-tech">
          {item.tech.map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      )}

      {isValidContent(item.credentialUrl) && (
        <div className="timeline-credential">
          <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer" className="pill-link">
            <FileText size={13} aria-hidden="true" />
            <span>{item.credentialLabel || 'View Document'}</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );

  return (
    <MotionDiv
      className={`timeline-card interactive-hover-card${item.current ? ' current' : ''}${isOpen ? ' is-open' : ''}`}
      variants={motionEnabled ? fadeInLeftVariant : undefined}
      custom={index * 0.08}
      initial={motionEnabled ? 'hidden' : undefined}
      whileInView={motionEnabled ? 'visible' : undefined}
      viewport={motionEnabled ? scrollViewportEarly : undefined}
    >
      <div className="timeline-dot" aria-hidden="true"></div>

      <h4 className="timeline-heading">
        <button
          type="button"
          className="timeline-toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          data-tooltip={isOpen ? 'Click to collapse' : 'Click to see details'}
        >
          <span className="timeline-dates">
            {item.current && <span className="timeline-current-pill">Current</span>}
            <span>{item.dates}</span>
          </span>
          <span className="timeline-role">{item.role}</span>
          <span className="timeline-org">
            <span>{item.org}</span>
            <span className="timeline-org-sep" aria-hidden="true">•</span>
            <span className="timeline-org-location">
              <MapPin size={13} aria-hidden="true" />
              {item.location}
            </span>
          </span>
          {/* Visible cue for touch users too; the tooltip adds the same hint on hover/focus */}
          <span className="timeline-hint">
            <span className="timeline-hint-text">{isOpen ? 'Hide' : 'Details'}</span>
            <ChevronDown size={16} className="timeline-chevron" aria-hidden="true" />
          </span>
        </button>
      </h4>

      {motionEnabled ? (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              key="panel"
              className="timeline-details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: easeCurves.luxuryDecel }}
            >
              {details}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        isOpen && (
          <div id={panelId} className="timeline-details">
            {details}
          </div>
        )
      )}
    </MotionDiv>
  );
}

export default function Experience({ motionEnabled = true }) {
  const MotionDiv = motionEnabled ? motion.div : 'div';

  // First role open, others collapsed. Several can be open at once.
  const [openIds, setOpenIds] = useState(() => new Set(experienceData.length ? [experienceData[0].id] : []));
  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allOpen = openIds.size === experienceData.length;

  // Scroll-linked rail: fills as the reader moves through the roles
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 55%'] });
  const railScale = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section className="section-padding" id="experience" aria-label="Experience and education">
      <div className="container">
        <SectionHeader
          motionEnabled={motionEnabled}
          tag="Career Trajectory"
          title="Experience & Education"
          description="Proven execution across production AI systems, distributed caching, and military leadership training."
        />

        <div className="timeline-section-grid">
          <div>
            <div className="timeline-column-head">
              <h3 className="timeline-column-title">
                <Briefcase size={20} className="text-accent" aria-hidden="true" />
                <span>Professional Experience</span>
              </h3>
              <button
                type="button"
                className="timeline-expand-all"
                onClick={() =>
                  setOpenIds(allOpen ? new Set() : new Set(experienceData.map((item) => item.id)))
                }
              >
                {allOpen ? 'Collapse all' : 'Expand all'}
              </button>
            </div>

            <div className="timeline-list" ref={listRef}>
              {motionEnabled && (
                <motion.span className="timeline-progress" style={{ scaleY: railScale }} aria-hidden="true" />
              )}
              {experienceData.map((item, index) => (
                <TimelineRow
                  key={item.id}
                  item={item}
                  index={index}
                  isOpen={openIds.has(item.id)}
                  onToggle={() => toggle(item.id)}
                  motionEnabled={motionEnabled}
                />
              ))}
            </div>
          </div>

          <div className="education-column">
            <h3 className="timeline-column-title">
              <GraduationCap size={20} className="text-accent" aria-hidden="true" />
              <span>Academic Background</span>
            </h3>

            {educationData.map((edu, index) => (
              <MotionDiv
                key={edu.institution}
                className="education-card interactive-hover-card"
                variants={motionEnabled ? fadeInRightVariant : undefined}
                custom={index * 0.08}
                initial={motionEnabled ? 'hidden' : undefined}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={motionEnabled ? scrollViewportEarly : undefined}
              >
                <div className="edu-dates">{edu.dates}</div>
                <h4 className="edu-inst">{edu.institution}</h4>
                <div className="edu-qual">{edu.qualification}</div>
                <div className="edu-location">
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
