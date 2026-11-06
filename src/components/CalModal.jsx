import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { easeCurves } from '../config/motion';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export default function CalModal({ isOpen, onClose, returnFocusTo, theme = 'dark', motionEnabled = true }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isLight = theme === 'light';

  useEffect(() => {
    if (!isOpen) return;

    setIframeLoaded(false);
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
      if (opener && typeof opener.focus === 'function') {
        opener.focus();
      }
    };
  }, [isOpen, returnFocusTo]);

  if (!isOpen) return null;

  const calUrl = `https://cal.com/akshitsharmacodes?embed=true&theme=${isLight ? 'light' : 'dark'}`;

  return (
    <div
      className={`cal-modal-backdrop ${isLight ? 'light-mode' : 'dark-mode'}`}
      data-theme={theme}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cal-modal-title"
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="cal-modal-dialog"
        data-theme={theme}
        initial={motionEnabled ? { opacity: 0, scale: 0.96, y: 14 } : false}
        animate={motionEnabled ? { opacity: 1, scale: 1, y: 0 } : false}
        exit={motionEnabled ? { opacity: 0, scale: 0.96, y: 10 } : false}
        transition={{ duration: 0.24, ease: easeCurves.expressiveOut }}
      >
        {/* Mobile handle indicator */}
        <div className="cal-modal-drag-bar" aria-hidden="true" />

        <div className="cal-modal-header">
          <div className="cal-modal-header-info">
            <div className="cal-modal-badge">
              <Calendar size={12} aria-hidden="true" />
              <span>15-Min Discovery Call</span>
            </div>
            <h3 id="cal-modal-title" className="cal-modal-title">
              Book a 1:1 Call with Akshit
            </h3>
            <p className="cal-modal-subtitle">
              Select an available slot below. An instant Google Meet invite will be created.
            </p>
          </div>

          <div className="cal-modal-header-actions">
            <a
              href="https://cal.com/akshitsharmacodes"
              target="_blank"
              rel="noopener noreferrer"
              className="cal-external-link"
              title="Open full page in new tab"
              aria-label="Open scheduling page in new tab"
            >
              <span className="cal-external-text">Open in Cal.com</span>
              <ExternalLink size={13} aria-hidden="true" />
            </a>

            <button
              ref={closeBtnRef}
              type="button"
              className="cal-modal-close"
              onClick={onClose}
              aria-label="Close scheduling modal"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="cal-modal-body">
          {!iframeLoaded && (
            <div className="cal-loading-state" aria-live="polite">
              <Loader2 size={26} className="cal-spinner" aria-hidden="true" />
              <span>Loading calendar availability...</span>
            </div>
          )}

          <iframe
            key={`cal-iframe-${theme}`}
            src={calUrl}
            title="Schedule meeting with Akshit Sharma"
            className={`cal-iframe ${iframeLoaded ? 'loaded' : ''}`}
            style={{ colorScheme: isLight ? 'light' : 'dark' }}
            loading="eager"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </motion.div>
    </div>
  );
}
