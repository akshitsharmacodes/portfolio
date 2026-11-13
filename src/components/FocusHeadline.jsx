import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Hero headline with a "focus reveal": every word starts soft, and a camera-style focus
 * frame travels word by word, stretching to each word's measured box and pulling it sharp.
 * It finishes by framing the accent phrase, then fades away. The words are real text the
 * whole time (SEO / screen readers unaffected). Motion off → plain sharp headline.
 */
export default function FocusHeadline({ lead, accent, motionEnabled, ready }) {
  const wrapRef = useRef(null);
  const leadWords = lead.split(/\s+/).filter(Boolean);
  const accentWords = accent.split(/\s+/).filter(Boolean);
  const total = leadWords.length + accentWords.length;

  const [sharp, setSharp] = useState(motionEnabled ? 0 : total);
  const [frame, setFrame] = useState(null);

  useEffect(() => {
    if (!motionEnabled) {
      setSharp(total);
      setFrame(null);
      return undefined;
    }
    if (!ready) return undefined;
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const words = [...wrap.querySelectorAll('[data-w]')];
    const PAD = 6;

    // Single precomputation pass to avoid layout thrashing / forced reflows on each step
    const base = wrap.getBoundingClientRect();
    const wordBoxes = words.map((el) => {
      const rc = el.getBoundingClientRect();
      return {
        x: rc.left - base.left - PAD,
        y: rc.top - base.top - PAD,
        w: rc.width + PAD * 2,
        h: rc.height + PAD * 2,
      };
    });

    const accentEls = words.slice(leadWords.length);
    let al = Infinity;
    let at = Infinity;
    let ar = -Infinity;
    let ab = -Infinity;
    accentEls.forEach((el) => {
      const rc = el.getBoundingClientRect();
      al = Math.min(al, rc.left);
      at = Math.min(at, rc.top);
      ar = Math.max(ar, rc.right);
      ab = Math.max(ab, rc.bottom);
    });
    const finalBox = {
      x: al - base.left - PAD,
      y: at - base.top - PAD,
      w: ar - al + PAD * 2,
      h: ab - at + PAD * 2,
    };

    const timers = [];
    let i = 0;
    const step = () => {
      if (i < total) {
        if (wordBoxes[i]) {
          setFrame({ ...wordBoxes[i], on: true });
        }
        setSharp(i + 1);
        i += 1;
        timers.push(setTimeout(step, 210));
      } else {
        setFrame({ ...finalBox, on: true, final: true });
        timers.push(setTimeout(() => setFrame((f) => (f ? { ...f, on: false } : f)), 1500));
      }
    };
    setSharp(0);
    timers.push(setTimeout(step, 320));
    return () => timers.forEach(clearTimeout);
  }, [ready, motionEnabled, total, leadWords.length]);

  let n = 0;
  const word = (w) => {
    const idx = n;
    n += 1;
    return (
      <React.Fragment key={idx}>
        <span data-w className={`fr-word${idx < sharp ? ' is-sharp' : ''}`}>
          {w}
        </span>{' '}
      </React.Fragment>
    );
  };

  return (
    <span className="hero-headline focus-headline" ref={wrapRef}>
      {leadWords.map(word)}
      <span className="hero-headline-accent">{accentWords.map(word)}</span>
      {motionEnabled && frame && (
        <motion.span
          className={`focus-frame${frame.final ? ' is-final' : ''}`}
          aria-hidden="true"
          initial={false}
          animate={{ x: frame.x, y: frame.y, width: frame.w, height: frame.h, opacity: frame.on ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.7, opacity: { duration: 0.4 } }}
        >
          <i />
          <i />
          <i />
          <i />
        </motion.span>
      )}
    </span>
  );
}
