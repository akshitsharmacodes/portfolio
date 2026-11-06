import React, { useEffect, useState } from 'react';

/**
 * Ambient Cursor Spotlight
 * Subtle radial crimson glow that tracks the pointer on desktop,
 * illuminating borders and typography with cinematic depth.
 */
export default function CursorGlow({ motionEnabled }) {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!motionEnabled) return;

    // Only on fine pointers (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [motionEnabled, visible]);

  if (!motionEnabled || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(227, 43, 60, 0.045), transparent 80%)`,
        transition: 'background 40ms ease-out',
      }}
      aria-hidden="true"
    />
  );
}

