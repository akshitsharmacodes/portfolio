import React, { useRef } from 'react';
import { ArrowUpRight, Cpu, Layers, GitBranch, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, onSelect, motionEnabled, index = 0 }) {
  const cardRef = useRef(null);

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
      initial={motionEnabled ? { opacity: 0, y: 35 } : undefined}
      whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={motionEnabled ? { once: true, amount: 0.2 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={motionEnabled ? { y: -6 } : undefined}
    >
      {renderVisualCard()}
      <div className="project-card-body">
        <h3 className="project-card-title">{project.title}</h3>
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
        </div>
      </div>
    </CardWrapper>
  );
}
