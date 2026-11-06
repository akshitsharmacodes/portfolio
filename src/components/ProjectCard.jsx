import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cardRevealVariant, scrollViewportEarly } from '../config/motion';
import { isValidContent, siteConfig } from '../config/site';
import ProjectGlyph, { PROJECT_VISUALS } from './ProjectGlyph';

export default function ProjectCard({ project, onSelect, motionEnabled, delayIndex = 0 }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);
  const githubUrl = isValidContent(project.sourceUrl) ? project.sourceUrl : siteConfig.contact.github;
  const visual = PROJECT_VISUALS[project.id] || { eyebrow: project.category, glyph: 'pipeline' };

  // Cover parallax: the artwork drifts ±12px as the card crosses the viewport
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const glyphY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // Cursor spotlight: write the pointer position to CSS vars, at most once per frame
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el || frameRef.current) return;
    const { clientX, clientY } = e;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--card-mouse-x', `${clientX - rect.left}px`);
      el.style.setProperty('--card-mouse-y', `${clientY - rect.top}px`);
    });
  };

  const CardWrapper = motionEnabled ? motion.article : 'article';
  const GlyphLayer = motionEnabled ? motion.div : 'div';

  return (
    <CardWrapper
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      variants={motionEnabled ? cardRevealVariant : undefined}
      custom={delayIndex * 0.09}
      initial={motionEnabled ? 'hidden' : undefined}
      whileInView={motionEnabled ? 'visible' : undefined}
      viewport={motionEnabled ? scrollViewportEarly : undefined}
    >
      {/* Cover: code-window frame + generative artwork */}
      <div className="project-card-visual">
        <div className="visual-window-bar" aria-hidden="true">
          <span className="window-dots"><i /><i /><i /></span>
          <span className="window-path">~/work/<b>{project.id}</b></span>
          <span className="project-year-badge">{project.year}</span>
        </div>
        <div className="visual-stage">
          <GlyphLayer className="visual-glyph-layer" style={motionEnabled ? { y: glyphY } : undefined}>
            <ProjectGlyph kind={visual.glyph} />
          </GlyphLayer>
          <span className="visual-ribbon">{visual.eyebrow}</span>
        </div>
        <div className="visual-accent-line" aria-hidden="true"></div>
      </div>

      <div className="project-card-body">
        <div className="project-card-title-row">
          <h3 className="project-card-title">{project.title}</h3>
          {isValidContent(project.liveUrl) && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-live-badge"
              aria-label={`Open live demo for ${project.title}`}
              title={`Open Live ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="live-pulse-dot" aria-hidden="true" />
              <span>Live</span>
              <ArrowUpRight size={12} className="live-badge-arrow" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="project-card-meta">
          <span className="project-tag-badge">{project.category}</span>
          <span className="project-card-role">{project.role}</span>
        </div>

        <p className="project-card-summary">{project.summary}</p>

        <div className="project-card-tags" aria-label="Technologies used">
          {project.tools.map((tool) => (
            <span key={tool} className="tech-tag">
              {tool}
            </span>
          ))}
        </div>

        <div className="project-card-footer">
          <button
            type="button"
            className="btn btn-secondary card-action-btn"
            onClick={(e) => onSelect(project, e.currentTarget)}
            aria-label={`View architecture and details for ${project.title}`}
            aria-haspopup="dialog"
          >
            <span>Architecture & Details</span>
            <ArrowUpRight size={15} className="btn-arrow" aria-hidden="true" />
          </button>

          <div className="card-footer-actions">
            {isValidContent(project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon-btn card-live-icon-btn"
                aria-label={`Open live demo for ${project.title}`}
                title="Live System Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-icon-btn card-github-btn"
                aria-label={`View ${project.title} on GitHub`}
                title="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}
