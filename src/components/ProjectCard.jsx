import React, { useRef } from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { cardRevealVariant, scrollViewportEarly } from '../config/motion';
import { isValidContent, siteConfig } from '../config/site';

export default function ProjectCard({ project, onSelect, motionEnabled, index = 0 }) {
  const cardRef = useRef(null);
  const githubUrl = isValidContent(project.sourceUrl)
    ? project.sourceUrl
    : siteConfig.contact.github;

  // Track mouse within card for interactive spotlight effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--card-mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${y}px`);
  };

  // Abstract diagram visual generator according to project id
  const renderVisualCard = () => {
    if (project.id === 'zero-ops-autosre') {
      return (
        <div className="project-card-visual" aria-hidden="true">
          <div className="visual-top-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span className="project-year-badge">{project.year}</span>
          </div>
          <div className="visual-center-title">
            <span style={{ fontSize: '1.05rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.1em' }}>GDG TOP 10 FINALIST</span>
            ZERO-OPS AUTOSRE
          </div>
          {/* Autonomous SRE Telemetry & Agent Heartbeat SVG */}
          <svg style={{ position: 'absolute', right: '15px', bottom: '15px', width: '105px', height: '65px', opacity: 0.5 }} viewBox="0 0 95 60">
            <path d="M5 32 L22 32 L30 14 L38 50 L46 20 L54 38 L60 32 L88 32" fill="none" stroke="#e32b3c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="38" cy="50" r="3.5" fill="#e32b3c" />
            <circle cx="30" cy="14" r="3.5" fill="#f2efeb" />
            <circle cx="88" cy="32" r="3" fill="#10b981" />
          </svg>
          <div className="visual-accent-line"></div>
        </div>
      );
    }

    if (project.id === 'nova-sight') {
      return (
        <div className="project-card-visual" aria-hidden="true">
          <div className="visual-top-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span className="project-year-badge">{project.year}</span>
          </div>
          <div className="visual-center-title">
            <span style={{ fontSize: '1.05rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.1em' }}>DUALITY AI HACKATHON</span>
            NOVASIGHT
          </div>
          {/* YOLO Detection Bounding Box & Target Reticle SVG */}
          <svg style={{ position: 'absolute', right: '15px', bottom: '15px', width: '95px', height: '65px', opacity: 0.5 }} viewBox="0 0 90 60">
            <rect x="15" y="10" width="60" height="40" rx="4" fill="none" stroke="#e32b3c" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="45" cy="30" r="6" fill="none" stroke="#f2efeb" strokeWidth="1.8" />
            <line x1="45" y1="18" x2="45" y2="24" stroke="#f2efeb" strokeWidth="2" />
            <line x1="45" y1="36" x2="45" y2="42" stroke="#f2efeb" strokeWidth="2" />
            <line x1="33" y1="30" x2="39" y2="30" stroke="#f2efeb" strokeWidth="2" />
            <line x1="51" y1="30" x2="57" y2="30" stroke="#f2efeb" strokeWidth="2" />
          </svg>
          <div className="visual-accent-line"></div>
        </div>
      );
    }

    if (project.id === 'matcha-ai') {
      return (
        <div className="project-card-visual" aria-hidden="true">
          <div className="visual-top-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span className="project-year-badge">{project.year}</span>
          </div>
          <div className="visual-center-title">
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.1em' }}>MULTI-AGENT</span>
            MATCHA AI
          </div>
          {/* Schematic SVG */}
          <svg style={{ position: 'absolute', right: '15px', bottom: '15px', width: '100px', height: '65px', opacity: 0.4 }} viewBox="0 0 90 60">
            <rect x="5" y="15" width="22" height="30" rx="3" fill="#e32b3c" />
            <path d="M27 30 L45 30" stroke="#f2efeb" strokeWidth="2" strokeDasharray="2 2" />
            <circle cx="55" cy="30" r="10" fill="#f2efeb" fillOpacity="0.8" />
            <path d="M65 30 L80 30" stroke="#f2efeb" strokeWidth="2" />
            <rect x="80" y="20" width="8" height="20" rx="2" fill="#e32b3c" />
          </svg>
          <div className="visual-accent-line"></div>
        </div>
      );
    }

    if (project.id === 'cruisecontent') {
      return (
        <div className="project-card-visual" aria-hidden="true">
          <div className="visual-top-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span className="project-year-badge">{project.year}</span>
          </div>
          <div className="visual-center-title">
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.1em' }}>AI WORKFLOW</span>
            CRUISECONTENT
          </div>
          {/* Wave / Queue SVG */}
          <svg style={{ position: 'absolute', right: '15px', bottom: '15px', width: '100px', height: '65px', opacity: 0.4 }} viewBox="0 0 90 60">
            <path d="M10 40 Q25 15, 45 40 T80 40" fill="none" stroke="#e32b3c" strokeWidth="2.5" />
            <circle cx="28" cy="24" r="4" fill="#f2efeb" />
            <circle cx="63" cy="24" r="4" fill="#f2efeb" />
          </svg>
          <div className="visual-accent-line"></div>
        </div>
      );
    }

    // Default or SIMS
    return (
      <div className="project-card-visual" aria-hidden="true">
        <div className="visual-top-meta">
          <span className="project-tag-badge">{project.category}</span>
          <span className="project-year-badge">{project.year}</span>
        </div>
        <div className="visual-center-title">
          <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', display: 'block', letterSpacing: '0.1em' }}>SIH 2025 WINNER</span>
          SIMS RAILWAYS
        </div>
        {/* Hardware QR Motif */}
        <svg style={{ position: 'absolute', right: '15px', bottom: '15px', width: '80px', height: '65px', opacity: 0.4 }} viewBox="0 0 70 60">
          <rect x="10" y="5" width="20" height="20" fill="none" stroke="#e32b3c" strokeWidth="2" />
          <rect x="15" y="10" width="10" height="10" fill="#e32b3c" />
          <rect x="40" y="5" width="20" height="20" fill="none" stroke="#f2efeb" strokeWidth="2" />
          <rect x="10" y="32" width="20" height="20" fill="none" stroke="#f2efeb" strokeWidth="2" />
        </svg>
        <div className="visual-accent-line"></div>
      </div>
    );
  };

  const CardWrapper = motionEnabled ? motion.article : 'article';

  return (
    <CardWrapper
      ref={cardRef}
      className="project-card"
      onMouseMove={handleMouseMove}
      variants={motionEnabled ? cardRevealVariant : undefined}
      custom={Math.min(index * 0.08, 0.32)}
      initial={motionEnabled ? "hidden" : undefined}
      whileInView={motionEnabled ? "visible" : undefined}
      viewport={motionEnabled ? scrollViewportEarly : undefined}
      whileHover={motionEnabled ? { y: -6 } : undefined}
    >
      {renderVisualCard()}
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
              <span>Live Demo</span>
              <ArrowUpRight size={13} className="live-badge-arrow" aria-hidden="true" />
            </a>
          )}
        </div>
        <p className="project-card-role">{project.role}</p>
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
            onClick={() => onSelect(project)}
            aria-label={`View architecture and details for ${project.title}`}
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
