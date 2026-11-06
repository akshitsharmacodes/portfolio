import React, { useEffect, useState } from 'react';

export default function ScrollProgress({ motionEnabled }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      setProgress((currentScroll / totalHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!motionEnabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        backgroundColor: 'var(--accent)',
        zIndex: 9999,
        transition: 'width 80ms ease-out',
      }}
      aria-hidden="true"
    />
  );
}

