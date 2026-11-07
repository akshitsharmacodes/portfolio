import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './LampToggle.css';

/**
 * LampToggle: a pull-cord theme switch hanging from the top edge of the page.
 *
 * - Pull the bead down and let go, click it, or press Enter/Space to switch
 *   between dark ("lights off") and light ("lights on").
 * - The cord stretches against increasing resistance, leans toward the pointer
 *   while pulled, and swings back on release.
 * - Where the View Transitions API exists, the new theme spreads out in a circle
 *   from the bead, like light filling the room.
 * - With motion off (site toggle or prefers-reduced-motion) it still switches the
 *   theme, just without the swing, the first-visit hint or the reveal.
 * - `ready` is false while the boot preloader covers the page; the cord drops in
 *   once the curtain lifts, and the one-time hint waits until after that.
 * - Phones: the cord hangs clear of the menu button, takes touch drags without
 *   scrolling the page, tucks itself away once you scroll (so it never covers
 *   content) and drops back when you return to the top. A short haptic tick
 *   confirms the switch where the device supports vibration.
 */

const MAX_PULL = 64;   // visual stretch limit in px
const SWITCH_AT = 24;  // visual pull needed on release to flip the theme
const HINT_KEY = 'akshit-portfolio-lamp-hint';
const HIDDEN_Y = -150; // rig offset that lifts cord + bead fully above the viewport
const PHONE_QUERY = '(max-width: 800px)';
const TUCK_AFTER = 160; // phones: scroll distance (px) after which the cord tucks away…
const DROP_BEFORE = 90; // …and the distance under which it drops back (gap avoids flicker)

// Soft asymptote: the further you drag, the harder the cord resists
const resist = (raw) => (raw <= 0 ? 0 : MAX_PULL * (1 - Math.exp(-raw / MAX_PULL)));

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function LampToggle({ theme, onToggle, motionEnabled = true, ready = true }) {
  const isLight = theme === 'light';
  const animated = motionEnabled && !prefersReducedMotion();

  const cordRef = useRef(null);
  const knobRef = useRef(null);
  const cordLength = useRef(84);
  const gesture = useRef(null); // { x, y, settled } for the pointer press in progress
  const interacted = useRef(false);
  const prevTheme = useRef(theme);
  const [hinting, setHinting] = useState(false);

  // `raw` is the drag offset Framer writes to the hit area; everything visible follows the resisted value
  const raw = useMotionValue(0);
  const pull = useTransform(raw, resist);
  const knobCounter = useTransform(raw, (r) => resist(r) - r);
  const cordScale = useTransform(pull, (p) => 1 + p / cordLength.current);
  const sway = useMotionValue(0);
  // Vertical position of the whole rig: starts above the viewport, drops in once the page is ready,
  // and (on phones) tucks back up while the reader is scrolled down
  const drop = useMotionValue(animated ? HIDDEN_Y : 0);
  const hasDropped = useRef(false);
  const [tucked, setTucked] = useState(false);
  const tuckedRef = useRef(false);

  // Phones only: tuck the cord away once the page scrolls so it never sits over content or buttons
  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);
    let frameId = 0;
    const update = () => {
      frameId = 0;
      const y = window.scrollY;
      let next = tuckedRef.current;
      if (!phone.matches) next = false;
      else if (y > TUCK_AFTER) next = true;
      else if (y < DROP_BEFORE) next = false;
      if (next !== tuckedRef.current) {
        tuckedRef.current = next;
        setTucked(next);
      }
    };
    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    phone.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      phone.removeEventListener?.('change', update);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Single place that moves the rig. Keyed off the motion value itself (not a "done" ref) so
  // StrictMode's double effect run in development still performs the first drop.
  useEffect(() => {
    const target = ready && !tucked ? 0 : HIDDEN_Y;
    if (drop.get() === target) return undefined;
    if (!animated) {
      drop.set(target);
      return undefined;
    }
    // The very first drop waits for the preloader curtain to clear the top-right corner
    const delay = target === 0 && !hasDropped.current ? 650 : 0;
    const timer = setTimeout(() => {
      if (target === 0) {
        hasDropped.current = true;
        animate(drop, 0, { type: 'spring', stiffness: 210, damping: 13, mass: 0.9 });
        animate(sway, 0, { type: 'spring', stiffness: 140, damping: 7, velocity: -60 });
      } else {
        animate(drop, target, { type: 'spring', stiffness: 260, damping: 30 });
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [ready, tucked, animated, drop, sway]);

  // Cord length changes at breakpoints (CSS variable), so measure instead of hard-coding
  useEffect(() => {
    const measure = () => {
      if (cordRef.current) cordLength.current = cordRef.current.offsetHeight || 84;
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  const switchTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    // Touch devices: a tiny haptic "click", like a real pull switch (no-op where unsupported, e.g. iOS)
    if (animated && window.matchMedia('(pointer: coarse)').matches && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(8);
      } catch {
        /* vibration blocked: ignore */
      }
    }

    const commit = () => {
      flushSync(() => onToggle());
      // The transition snapshots the DOM as soon as this callback returns, so apply the theme here too
      root.setAttribute('data-theme', next);
      root.classList.remove('dark', 'light');
      root.classList.add(next);
    };

    if (!animated || typeof document.startViewTransition !== 'function') {
      commit();
      return;
    }

    const box = knobRef.current?.getBoundingClientRect();
    const x = box ? box.left + box.width / 2 : window.innerWidth - 40;
    const y = box ? box.top + box.height / 2 : 96;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add('lamp-vt');
    const cleanup = () => root.classList.remove('lamp-vt');

    let transition;
    try {
      transition = document.startViewTransition(commit);
    } catch {
      cleanup();
      commit();
      return;
    }

    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 760,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});
    transition.finished.then(cleanup, cleanup);
  }, [theme, onToggle, animated]);

  // Click / Enter / Space: a quick tug, flip the theme at the bottom of the pull, then let it spring back
  const tug = useCallback(() => {
    if (!animated) {
      switchTheme();
      return;
    }
    animate(raw, 34, { duration: 0.14, ease: [0.33, 1, 0.68, 1] }).then(() => {
      switchTheme();
      animate(raw, 0, { type: 'spring', stiffness: 520, damping: 14 });
    });
  }, [animated, raw, switchTheme]);

  // Each press is decided exactly once: a tap tugs; a pull flips the theme only if it went far enough.
  // Framer reports drag end on the next frame (after the browser's click event), so both paths
  // funnel through `settle` and whichever runs first wins.
  const settle = (press, pullPx) => {
    if (!press || press.settled) return;
    press.settled = true;
    if (resist(Math.max(0, pullPx)) >= SWITCH_AT) switchTheme();
  };

  const handlePointerDown = (event) => {
    interacted.current = true;
    setHinting(false);
    gesture.current = { x: event.clientX, y: event.clientY, settled: false };
  };

  const handleClick = (event) => {
    const press = gesture.current;
    // Keyboard (Enter / Space) and assistive-tech activation arrive as clicks with detail 0
    if (event.detail === 0 || !press) {
      tug();
      return;
    }
    const dy = event.clientY - press.y;
    if (Math.hypot(event.clientX - press.x, dy) < 6) {
      press.settled = true;
      tug();
      return;
    }
    // It was a pull: normally the drag-end handler settles it within a frame; this is the fallback
    setTimeout(() => settle(press, dy), 250);
  };

  const handleDrag = (_, info) => {
    if (!animated) return;
    sway.set(Math.max(-9, Math.min(9, info.offset.x * 0.1)));
  };

  const handleDragEnd = (_, info) => {
    if (animated) {
      animate(sway, 0, { type: 'spring', stiffness: 160, damping: 9, velocity: -info.velocity.x * 0.04 });
    } else {
      sway.set(0);
    }
    settle(gesture.current, info.offset.y);
  };

  // Swing whenever the theme flips, whichever control flipped it
  useEffect(() => {
    if (prevTheme.current === theme) return;
    prevTheme.current = theme;
    if (!animated) return;
    animate(sway, 0, { type: 'spring', stiffness: 150, damping: 6.5, velocity: theme === 'light' ? 140 : -140 });
  }, [theme, animated, sway]);

  // One gentle tug per browser session so visitors notice the cord
  useEffect(() => {
    if (!animated || !ready) return undefined;
    let seen = false;
    try {
      seen = sessionStorage.getItem(HINT_KEY) === '1';
    } catch {
      seen = true;
    }
    if (seen) return undefined;

    const show = setTimeout(() => {
      // Skip (and try again next visit) if they've already used it or the cord is tucked away
      if (interacted.current || tuckedRef.current) return;
      try {
        sessionStorage.setItem(HINT_KEY, '1');
      } catch {
        /* storage unavailable: the hint simply repeats next visit */
      }
      setHinting(true);
      animate(raw, 18, { duration: 0.22, ease: [0.33, 1, 0.68, 1] }).then(() =>
        animate(raw, 0, { type: 'spring', stiffness: 420, damping: 10 })
      );
      animate(sway, 0, { type: 'spring', stiffness: 140, damping: 6, velocity: 90 });
    }, 4200);
    const hide = setTimeout(() => setHinting(false), 7400);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [animated, ready, raw, sway]);

  const actionLabel = isLight ? 'Switch to dark mode' : 'Switch to light mode';

  // While tucked away on phones the cord is off-screen, so `inert` takes it out of tab order and hit-testing
  return (
    <div className={`lamp ${isLight ? 'is-on' : 'is-off'} ${hinting ? 'is-hinting' : ''}`} inert={tucked}>
      <motion.div className="lamp-rig" style={{ rotate: sway, y: drop }}>
        <span className="lamp-mount" aria-hidden="true" />
        <motion.span ref={cordRef} className="lamp-cord" style={{ scaleY: cordScale }} aria-hidden="true" />

        <motion.button
          type="button"
          className="lamp-pull"
          style={{ y: raw }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 1 }}
          dragTransition={
            animated
              ? { bounceStiffness: 600, bounceDamping: 15 }
              : { bounceStiffness: 1200, bounceDamping: 80 }
          }
          onPointerDown={handlePointerDown}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onClick={handleClick}
          aria-label={actionLabel}
          title={actionLabel}
        >
          <motion.span className="lamp-bead" style={{ y: knobCounter }}>
            <span ref={knobRef} className="lamp-knob" aria-hidden="true" />
            <span className="lamp-label" aria-hidden="true">
              Pull · {isLight ? 'lights off' : 'lights on'}
            </span>
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
