import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FrostTransition
 * Full-viewport frosted glass transition that triggers when navigating between
 * the Recruiter view (/recruiters) and the Client studio pages.
 * Delivers a cinematic optical blur with glass sheen.
 */
export default function FrostTransition({ motionEnabled = true }) {
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState('');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const prev = prevPathRef.current;
    const current = location.pathname;
    prevPathRef.current = current;

    const wasRecruiter = prev.startsWith('/recruiters');
    const isRecruiter = current.startsWith('/recruiters');

    // Only trigger when crossing the boundary between recruiters view and client view
    if (wasRecruiter !== isRecruiter) {
      setTargetLabel(isRecruiter ? 'Entering Recruiter Profile' : 'Switching to Studio View');
      setTransitioning(true);
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, motionEnabled ? 500 : 80);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, motionEnabled]);

  if (!motionEnabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {transitioning && (
        <motion.div
          className="frost-transition-overlay"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{
            opacity: [0, 1, 1, 0],
            backdropFilter: ['blur(0px)', 'blur(28px)', 'blur(28px)', 'blur(0px)'],
          }}
          transition={{
            duration: 0.52,
            times: [0, 0.28, 0.72, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          <motion.div
            className="frost-transition-card"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.94, 1, 1, 0.98],
              y: [8, 0, 0, -6],
            }}
            transition={{
              duration: 0.52,
              times: [0, 0.28, 0.72, 1],
              ease: 'easeInOut',
            }}
          >
            <span className="frost-transition-sparkle" />
            <span className="frost-transition-label">{targetLabel}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

