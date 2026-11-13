import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PALETTES } from '../config/palettes';

function Chip({ swatch }) {
  return (
    <span className="palette-chip" aria-hidden="true">
      {swatch.map((c) => (
        <i key={c} style={{ background: c }} />
      ))}
    </span>
  );
}

function Option({ p, checked, onSelect, ...rest }) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={checked}
      className="palette-option"
      onClick={() => onSelect(p.id)}
      {...rest}
    >
      <Chip swatch={p.swatch} />
      <span className="palette-option-label">{p.label}</span>
      <Check size={14} className="palette-option-check" aria-hidden="true" />
    </button>
  );
}

/** Inline list of palettes (mobile drawer) */
export function PaletteRow({ palette, onSetPalette }) {
  return (
    <div className="palette-row" role="radiogroup" aria-label="Colour palette">
      {PALETTES.map((p) => (
        <button
          key={p.id}
          type="button"
          role="radio"
          aria-checked={palette === p.id}
          className="palette-option"
          onClick={() => onSetPalette(p.id)}
        >
          <Chip swatch={p.swatch} />
          <span className="palette-option-label">{p.label.split(' ').slice(-1)[0]}</span>
        </button>
      ))}
    </div>
  );
}

/**
 * Navbar swatch button that springs open into a small palette menu.
 * Arrow keys move between options, Escape / outside click closes, focus returns to the trigger.
 */
export default function PalettePicker({ palette, onSetPalette, motionEnabled }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const triggerRef = useRef(null);
  const current = PALETTES.find((p) => p.id === palette) || PALETTES[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = [...wrapRef.current.querySelectorAll('[role="menuitemradio"]')];
        const idx = items.indexOf(document.activeElement);
        const next = e.key === 'ArrowDown' ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
        items[next]?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    // Focus the checked option when the menu opens
    requestAnimationFrame(() => wrapRef.current?.querySelector('[aria-checked="true"]')?.focus());
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const select = (id) => {
    onSetPalette(id);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const Menu = motionEnabled ? motion.div : 'div';
  const menuMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: -6, scale: 0.96, filter: 'blur(4px)' },
        animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -4, scale: 0.98, filter: 'blur(2px)' },
        transition: { type: 'spring', stiffness: 520, damping: 34 },
        style: { transformOrigin: 'top right' },
      }
    : {};

  return (
    <div className="palette-picker" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className="palette-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Colour palette: ${current.label}`}
        data-tooltip="Color palettes"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="palette-dots" aria-hidden="true">
          {PALETTES.map((p) => (
            <i key={p.id} style={{ background: p.swatch[2] }} />
          ))}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <Menu className="palette-menu" role="menu" aria-label="Colour palette" {...menuMotion}>
            <div className="palette-menu-title" aria-hidden="true">
              Palette
            </div>
            {PALETTES.map((p) => (
              <Option key={p.id} p={p} checked={palette === p.id} onSelect={select} />
            ))}
          </Menu>
        )}
      </AnimatePresence>
    </div>
  );
}
