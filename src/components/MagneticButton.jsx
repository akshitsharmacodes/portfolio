import React, { forwardRef, useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const finePointerQuery = '(hover: hover) and (pointer: fine)';

/**
 * MagneticButton
 * A CTA that leans toward the cursor and springs back on leave.
 * Only active with a fine pointer (mouse/trackpad) and motion enabled; everywhere else it
 * renders the plain element, so it is never required to interact.
 */
const MagneticButton = forwardRef(function MagneticButton(
  { as = 'a', motionEnabled = true, strength = 0.28, className, children, onMouseMove, onMouseLeave, ...props },
  forwardedRef
) {
  const localRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const setRefs = useCallback(
    (node) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef]
  );

  const finePointer = typeof window !== 'undefined' && window.matchMedia(finePointerQuery).matches;

  if (!motionEnabled || !finePointer) {
    const Tag = as;
    return (
      <Tag ref={setRefs} className={className} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.a;

  const handleMove = (event) => {
    const el = localRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    }
    onMouseMove?.(event);
  };

  const handleLeave = (event) => {
    x.set(0);
    y.set(0);
    onMouseLeave?.(event);
  };

  return (
    <MotionTag
      ref={setRefs}
      className={`${className || ''} is-magnetic`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </MotionTag>
  );
});

export default MagneticButton;
