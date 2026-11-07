import React, { forwardRef } from 'react';

/**
 * MagneticButton
 * Kept as a stable API for CTAs. The cursor-follow effect was retired in the minimal redesign:
 * buttons stay still and respond with color/border changes only, so this renders the plain element.
 */
const MagneticButton = forwardRef(function MagneticButton(
  // eslint-disable-next-line no-unused-vars
  { as: Tag = 'a', motionEnabled, strength, children, ...props },
  ref
) {
  return (
    <Tag ref={ref} {...props}>
      {children}
    </Tag>
  );
});

export default MagneticButton;
