import React from 'react';
import { motion } from 'framer-motion';
import { scrollViewportEarly, dividerVariant } from '../config/motion';

export default function SectionDivider({ motionEnabled = true }) {
  if (!motionEnabled) {
    return <hr className="section-divider" />;
  }

  return (
    <div className="section-divider-wrapper" aria-hidden="true">
      <motion.div
        className="section-divider-line"
        variants={dividerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewportEarly}
      />
      <motion.div
        className="section-divider-gem"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={scrollViewportEarly}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
