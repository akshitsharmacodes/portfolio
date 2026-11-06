import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, Play, Layers } from 'lucide-react';
import { isValidContent } from '../config/site';
import { easeCurves } from '../config/motion';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Project case-study dialog.
 * - Closes on Escape, backdrop click or the close button
 * - Traps Tab focus inside while open and hands focus back to the opener on close
 * - Enter/exit animations are driven by AnimatePresence in App (skipped when motion is off)
 */
export default function ProjectDialog({ project, onClose, returnFocusTo, motionEnabled = true }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = returnFocusTo;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // Lock background scroll without the page jumping sideways when the scrollbar disappears
    const { body } = document;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    const previous = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = 'hidden';
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
      // Return focus to the "Architecture & Details" button that opened the dialog
      if (opener && typeof opener.focus === 'function') {
        opener.focus({ preventScroll: true });
      }
    };
  }, [returnFocusTo]);

  if (!project) return null;

  const Overlay = motionEnabled ? motion.div : 'div';
  const Panel = motionEnabled ? motion.div : 'div';
  const overlayMotion = motionEnabled
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.25, ease: easeCurves.luxuryDecel },
      }
    : {};
  const panelMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: 32, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.99 },
        transition: { duration: 0.45, ease: easeCurves.luxuryDecel },
      }
    : {};

  return (
    <Overlay
      className={`dialog-overlay${motionEnabled ? ' is-animated' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      {...overlayMotion}
    >
      <Panel className={`dialog-content${motionEnabled ? ' is-animated' : ''}`} ref={dialogRef} {...panelMotion}>
        <button
          ref={closeBtnRef}
          type="button"
          className="dialog-close-btn"
          onClick={onClose}
          aria-label="Close project dialog"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="dialog-header">
          <div className="dialog-meta">
            <span className="project-tag-badge">{project.category}</span>
            <span className="dialog-year">{project.year}</span>
          </div>
          <h2 id="dialog-title" className="dialog-title">
            {project.title}
          </h2>
          <p className="dialog-role">{project.role}</p>
        </div>

        <div className="dialog-description">
          <p>{project.description}</p>
        </div>

        {project.architecture && project.architecture.length > 0 && (
          <div className="dialog-architecture-box">
            <h3 className="dialog-section-title">
              <Layers size={15} className="text-accent" aria-hidden="true" />
              <span>Architectural Pipeline</span>
            </h3>
            <ol className="architecture-list">
              {project.architecture.map((item) => (
                <li key={item.step} className="architecture-item">
                  <span className="architecture-step">{item.step}</span>
                  <div className="architecture-text">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div>
          <h4 className="dialog-stack-label">Engineering Stack</h4>
          <div className="dialog-stack">
            {project.tools.map((tool) => (
              <span key={tool} className="tech-tag">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {(isValidContent(project.liveUrl) ||
          isValidContent(project.sourceUrl) ||
          isValidContent(project.videoUrl)) && (
          <div className="dialog-links">
            {isValidContent(project.liveUrl) && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Live System Demo</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}

            {isValidContent(project.sourceUrl) && (
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github size={16} aria-hidden="true" />
                <span>Source Repository</span>
              </a>
            )}

            {isValidContent(project.videoUrl) && (
              <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Play size={16} aria-hidden="true" />
                <span>Video Demonstration</span>
              </a>
            )}
          </div>
        )}
      </Panel>
    </Overlay>
  );
}
