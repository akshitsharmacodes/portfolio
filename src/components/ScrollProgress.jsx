import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress({ motionEnabled = true }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!motionEnabled) return null;

  return (
    <>
      {/* Precision Top Scroll Indicator */}
      <div className="scroll-indicator-track" aria-hidden="true">
        <motion.div
          className="scroll-indicator-bar"
          style={{ scaleX }}
        />
      </div>

      {/* Elegant Floating Scroll to Top Pill */}
      {showScrollTop && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="floating-back-to-top"
          aria-label="Scroll back to top of page"
          title="Back to Top"
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUp size={16} aria-hidden="true" />
          <span className="floating-top-text">Top</span>
        </motion.button>
      )}
    </>
  );
}
