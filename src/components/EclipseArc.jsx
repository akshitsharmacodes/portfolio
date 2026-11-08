import React, { useEffect, useRef } from 'react';

/**
 * Eclipse arc: a huge sphere sitting above the hero with only its lower edge in view,
 * lit from behind so a palette-coloured rim of light wraps the bottom and spills onto
 * the headline (the reel's "ZYNO" hero).
 *
 * - Entrance: the rim draws in and the bloom swells once the intro loader lifts.
 * - Pointer: the hottest point of the rim leans toward the cursor.
 * - Scroll: the arc rises, grows slightly and dims as the hero scrolls away (and reverses).
 * - A spark of light drifts along the rim (motion on only).
 * Pure CSS + two CSS variables written at most once per frame; nothing runs while idle.
 * `children` render inside the sphere (reserved for a portrait later).
 */
export default function EclipseArc({ motionEnabled, ready, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!motionEnabled) {
      el.style.setProperty('--lx', '0');
      el.style.setProperty('--sy', '0');
      return undefined;
    }
    const target = { lx: 0, sy: 0 };
    const cur = { lx: 0, sy: 0 };
    let raf = 0;
    let isVisible = true;
    let sectionHeight = el.closest('section')?.offsetHeight || window.innerHeight;

    const tick = () => {
      raf = 0;
      if (!isVisible) return;
      cur.lx += (target.lx - cur.lx) * 0.12;
      cur.sy += (target.sy - cur.sy) * 0.2;
      el.style.setProperty('--lx', cur.lx.toFixed(4));
      el.style.setProperty('--sy', cur.sy.toFixed(4));
      if (Math.abs(target.lx - cur.lx) > 0.001 || Math.abs(target.sy - cur.sy) > 0.001) {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!raf && isVisible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (!isVisible || e.pointerType === 'touch') return;
      target.lx = (e.clientX / window.innerWidth) * 2 - 1;
      kick();
    };
    const onScroll = () => {
      if (!isVisible) return;
      target.sy = Math.min(Math.max(window.scrollY / sectionHeight, 0), 1);
      kick();
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) {
          sectionHeight = el.closest('section')?.offsetHeight || window.innerHeight;
          onScroll();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    onScroll();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [motionEnabled]);

  return (
    <div
      ref={ref}
      className={`eclipse${ready || !motionEnabled ? ' is-lit' : ''}${motionEnabled ? ' is-animated' : ''}`}
      aria-hidden="true"
    >
      <div className="eclipse-bloom" />
      <div className="eclipse-sphere">
        {children}
        <div className="eclipse-rim eclipse-rim--glow" />
        <div className="eclipse-rim" />
        <div className="eclipse-spark" />
      </div>
    </div>
  );
}
