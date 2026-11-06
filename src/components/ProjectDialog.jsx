import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Play, Layers, CheckCircle2 } from 'lucide-react';
import { isValidContent } from '../config/site';

export default function ProjectDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Close on Escape & trap focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    // Lock background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="dialog-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="dialog-content" ref={dialogRef}>
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          className="dialog-close-btn"
          onClick={onClose}
          aria-label="Close project dialog"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="dialog-header">
          <div className="dialog-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              {project.year}
            </span>
          </div>
          <h2 id="dialog-title" className="dialog-title">
            {project.title}
          </h2>
          <p className="dialog-role">{project.role}</p>
        </div>

        {/* Narrative Description */}
        <div className="dialog-description">
          <p>{project.description}</p>
        </div>

        {/* Architecture Breakdown if available */}
        {project.architecture && project.architecture.length > 0 && (
          <div className="dialog-architecture-box">
            <h3
              style={{
                fontSize: '1rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Layers size={16} className="text-accent" aria-hidden="true" />
              <span>Architectural Pipeline</span>
            </h3>
            <div>
              {project.architecture.map((item) => (
                <div key={item.step} className="architecture-item">
                  <span className="architecture-step">{item.step}</span>
                  <div className="architecture-text">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack Tags */}
        <div>
          <h4
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-dim)',
              marginBottom: '10px',
            }}
          >
            Engineering Stack
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tools.map((tool) => (
              <span key={tool} className="tech-tag accent-style">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Valid Action Links (omits all placeholders cleanly) */}
        {(isValidContent(project.liveUrl) ||
          isValidContent(project.sourceUrl) ||
          isValidContent(project.videoUrl)) && (
          <div className="dialog-links">
            {isValidContent(project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <span>Live System Demo</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}

            {isValidContent(project.sourceUrl) && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Github size={16} aria-hidden="true" />
                <span>Source Repository</span>
              </a>
            )}

            {isValidContent(project.videoUrl) && (
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <Play size={16} aria-hidden="true" />
                <span>Video Demonstration</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

