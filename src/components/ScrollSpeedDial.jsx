import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

/**
 * ScrollSpeedDial
 * Floating quick-scroll action button in the bottom-right corner.
 * Near the top: jumps down to contact & footer.
 * Once scrolled: quickly returns back to the top.
 */
export default function ScrollSpeedDial({ motionEnabled = true }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 480);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const reduce = !motionEnabled || document.documentElement.getAttribute('data-motion') === 'off';
    const behavior = reduce ? 'auto' : 'smooth';

    if (isScrolled) {
      window.scrollTo({ top: 0, behavior });
    } else {
      const contactEl = document.getElementById('contact') || document.querySelector('footer');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior, block: 'start' });
      } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
      }
    }
  };

  const label = isScrolled ? 'Back to top' : 'Jump to contact & footer';

  const Btn = motionEnabled ? motion.button : 'button';
  const motionProps = motionEnabled
    ? {
        whileHover: { scale: 1.08 },
        whileTap: { scale: 0.94 },
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }
    : {};

  return (
    <Btn
      type="button"
      className="scroll-speed-dial"
      onClick={handleClick}
      aria-label={label}
      data-tooltip={label}
      data-tooltip-pos="left"
      {...motionProps}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isScrolled ? (
          <motion.span
            key="up"
            initial={motionEnabled ? { opacity: 0, rotate: -45, scale: 0.8 } : false}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={motionEnabled ? { opacity: 0, rotate: 45, scale: 0.8 } : undefined}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowUp size={18} aria-hidden="true" />
          </motion.span>
        ) : (
          <motion.span
            key="down"
            initial={motionEnabled ? { opacity: 0, rotate: 45, scale: 0.8 } : false}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={motionEnabled ? { opacity: 0, rotate: -45, scale: 0.8 } : undefined}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowDown size={18} aria-hidden="true" />
          </motion.span>
        )}
      </AnimatePresence>
    </Btn>
  );
}

