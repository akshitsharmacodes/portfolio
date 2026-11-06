/**
 * Motion system
 * One easing family, short travel distances, no blur filters (they are costly on
 * large text and mobile GPUs). Every consumer checks `motionEnabled`, which
 * already folds in the visitor's `prefers-reduced-motion` setting.
 */

export const easeCurves = {
  // Smooth deceleration for most reveals
  luxuryDecel: [0.22, 1, 0.36, 1],
  // Snappier expo-out for masks and micro-interactions
  responsive: [0.16, 1, 0.3, 1],
  // Gentle in-out for ambient movement
  organic: [0.25, 0.1, 0.25, 1],
  // Heavy in-out for full-screen curtains (preloader exit)
  curtain: [0.76, 0, 0.24, 1],
};

// Section-level reveals: fire once ~20% of the element is on screen
export const scrollViewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -8% 0px',
};

// Cards and grids: fire a little earlier so rows don't feel late
export const scrollViewportEarly = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -4% 0px',
};

export const luxuryTransition = (delay = 0, duration = 0.65) => ({
  duration,
  delay: typeof delay === 'number' ? delay : 0,
  ease: easeCurves.luxuryDecel,
});

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.04) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeInUpVariant = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

export const cardRevealVariant = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.responsive,
    },
  }),
};

export const fadeInLeftVariant = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

export const fadeInRightVariant = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: typeof custom === 'number' ? custom : 0,
      ease: easeCurves.luxuryDecel,
    },
  }),
};

// Words rising out of a mask (SplitReveal, hero headline)
export const maskWordVariant = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.85, ease: easeCurves.responsive },
  },
};

// Small meta rows (section index, eyebrow): slide in from the left
export const metaVariant = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easeCurves.luxuryDecel },
  },
};

export const dividerVariant = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easeCurves.luxuryDecel,
    },
  },
};

/**
 * Column position of an item inside a `.bento-grid` (see styles.css quantity queries),
 * so staggered entrance delays restart on every row instead of growing down the grid.
 */
export function bentoColumnIndex(index, count) {
  if (count === 5) return index < 2 ? index : index - 2;
  if (count === 3) return index;
  if (count <= 2 || count === 4) return index % 2;
  return index % 3;
}

// Backwards compatibility aliases
export const fastViewport = scrollViewport;
export const fastTransition = luxuryTransition;
