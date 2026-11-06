/**
 * Premium Motion & Scroll Viewport Configuration
 * Engineered with luxury easing curves, staggered reveals, and responsive physics.
 */

// Bespoke easing curves inspired by Apple and Linear
export const easeCurves = {
  // Ultra-smooth luxury deceleration curve
  luxuryDecel: [0.22, 1, 0.36, 1],
  // Responsive ease for micro-interactions
  responsive: [0.16, 1, 0.3, 1],
  // Smooth organic glide
  organic: [0.25, 0.1, 0.25, 1],
};

// Viewport configuration for scroll reveals:
// Triggers when ~12% of the element enters the viewport with a gentle negative bottom margin,
// ensuring the user actually experiences the animation unfolding gracefully as they scroll down.
export const scrollViewport = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -40px 0px',
};

// For larger cards and grids that benefit from early triggering
export const scrollViewportEarly = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -20px 0px',
};

// Luxury transition generator
export const luxuryTransition = (delay = 0, duration = 0.65) => ({
  duration,
  delay: typeof delay === 'number' ? delay : 0,
  ease: easeCurves.luxuryDecel,
});

// Staggered container variant generator
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.04) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Standard premium fade-up variant for headers and sections
export const fadeInUpVariant = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(4px)',
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

// Scale & fade variant for cards and interactive components
export const cardRevealVariant = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

// Horizontal slide-in variant for left-side columns
export const fadeInLeftVariant = {
  hidden: {
    opacity: 0,
    x: -28,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

// Horizontal slide-in variant for right-side columns
export const fadeInRightVariant = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

// Section divider draw line variant
export const dividerVariant = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easeCurves.luxuryDecel,
    },
  },
};

// Backwards compatibility aliases
export const fastViewport = scrollViewport;
export const fastTransition = luxuryTransition;
