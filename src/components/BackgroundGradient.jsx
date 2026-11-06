import React from 'react';

/**
 * BackgroundGradient
 * Implements a cinematic ambient gradient mesh that complements
 * the obsidian (#090909) and crimson (#e32b3c) design system.
 *
 * Includes:
 * 1. Radiant crimson top bloom for the Hero section
 * 2. Warm wine & ember mid-page atmospheric glow
 * 3. Deep midnight indigo depth counter-balance
 * 4. Grounding crimson bottom aura for Contact & Footer sections
 * 5. Radial focus vignette for cinematic contrast
 * 6. Responsive, hardware-accelerated gentle floating motion
 * 7. Instant static freeze when motion is disabled or reduced
 */
export default function BackgroundGradient({ motionEnabled = true }) {
  return (
    <div
      className={`ambient-gradient-mesh ${motionEnabled ? 'motion-active' : 'motion-reduced'}`}
      aria-hidden="true"
    >
      <div className="ambient-orb orb-primary" />
      <div className="ambient-orb orb-secondary" />
      <div className="ambient-orb orb-tertiary" />
      <div className="ambient-orb orb-accent" />
      <div className="ambient-vignette" />
    </div>
  );
}
