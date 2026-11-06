import React, { useEffect, useRef } from 'react';

/**
 * Ambient cursor spotlight (dark theme, fine pointers only).
 * Writes the pointer position to CSS variables once per animation frame instead of
 * re-rendering React on every mousemove.
 */
export default function CursorGlow({ motionEnabled }) {
  const glowRef = useRef(null);

  useEffect(() => {
    if (!motionEnabled) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const el = glowRef.current;
    if (!el) return undefined;

    let frame = 0;
    let x = -1000;
    let y = -1000;

    const paint = () => {
      frame = 0;
      el.style.setProperty('--glow-x', `${x}px`);
      el.style.setProperty('--glow-y', `${y}px`);
    };

    const handleMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const handleLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(frame);
    };
  }, [motionEnabled]);

  if (!motionEnabled) return null;

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
