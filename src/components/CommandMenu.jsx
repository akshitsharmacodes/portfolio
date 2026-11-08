import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Copy,
  Check,
  Github,
  Linkedin,
  FileText,
  MessageCircle,
  Code2,
  Briefcase,
  Sun,
  Moon,
  Palette,
  Pause,
  Play,
  Search,
  CornerDownLeft,
} from 'lucide-react';
import { siteConfig, isValidContent } from '../config/site';
import { PALETTES } from '../config/palettes';

const SECTIONS = [
  { id: 'hire-me', label: 'Services', show: true },
  { id: 'work', label: 'Work', show: true },
  { id: 'about', label: 'About', show: true },
  { id: 'skills', label: 'Skills', show: true },
  { id: 'experience', label: 'Experience', show: siteConfig.preferences.showExperience },
  { id: 'awards', label: 'Recognition', show: siteConfig.preferences.showAwards },
  { id: 'side-hustles', label: 'Ventures', show: siteConfig.preferences.showVentures },
  { id: 'contact', label: 'Contact', show: true },
];

/**
 * ⌘K / Ctrl+K command menu: jump to sections, run actions, open profiles.
 * Accessible combobox pattern: the input keeps focus; arrow keys move the active option
 * (aria-activedescendant), Enter runs it, Escape closes and focus returns to the opener.
 */
export default function CommandMenu({
  onClose,
  returnFocusTo,
  theme,
  onToggleTheme,
  palette,
  onSetPalette,
  motionEnabled,
  onToggleMotion,
  onOpenCalModal,
}) {
  const { contact, identity } = siteConfig;
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const openUrl = (url) => window.open(url, '_blank', 'noopener,noreferrer');
  const goTo = (id) => {
    onClose();
    // Let the dialog unmount (and scroll lock release) before scrolling
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    });
  };

  const groups = useMemo(() => {
    const links = [
      { label: 'GitHub', hint: 'akshitsharmacodes', icon: Github, url: contact.github },
      { label: 'LinkedIn', hint: 'Profile', icon: Linkedin, url: contact.linkedin },
      { label: 'Resume', hint: 'Google Drive', icon: FileText, url: identity.resume },
      { label: 'LeetCode', hint: 'Problem solving', icon: Code2, url: contact.leetcode },
      { label: 'Upwork', hint: 'Hire me', icon: Briefcase, url: contact.upwork },
      { label: 'WhatsApp', hint: 'Message me', icon: MessageCircle, url: contact.whatsapp },
    ].filter((l) => isValidContent(l.url));

    return [
      {
        name: 'Actions',
        items: [
          {
            id: 'book',
            label: 'Book a discovery call',
            icon: Calendar,
            keywords: 'cal meeting schedule hire',
            run: () => {
              onClose();
              onOpenCalModal?.(returnFocusTo);
            },
          },
          isValidContent(contact.email) && {
            id: 'copy-email',
            label: copied ? 'Email copied' : 'Copy email address',
            hint: contact.email,
            icon: copied ? Check : Copy,
            keywords: 'mail contact gmail',
            keepOpen: true,
            run: async () => {
              try {
                await navigator.clipboard.writeText(contact.email);
              } catch {
                window.location.href = `mailto:${contact.email}`;
                return;
              }
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            },
          },
          {
            id: 'theme',
            label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
            icon: theme === 'dark' ? Sun : Moon,
            keywords: 'theme dark light mode appearance',
            keepOpen: true,
            run: onToggleTheme,
          },
          ...(onSetPalette
            ? PALETTES.map((p) => ({
                id: `palette-${p.id}`,
                label: `Palette: ${p.label}${palette === p.id ? ' (current)' : ''}`,
                icon: Palette,
                keywords: `palette colour color theme ${p.id} ${p.label}`,
                keepOpen: true,
                run: () => onSetPalette(p.id),
              }))
            : []),
          {
            id: 'motion',
            label: motionEnabled ? 'Turn animations off' : 'Turn animations on',
            icon: motionEnabled ? Pause : Play,
            keywords: 'motion animation reduce accessibility',
            keepOpen: true,
            run: onToggleMotion,
          },
        ].filter(Boolean),
      },
      {
        name: 'Go to',
        items: SECTIONS.filter((sct) => sct.show).map((sct) => ({
          id: `go-${sct.id}`,
          label: sct.label,
          icon: ArrowRight,
          keywords: 'section jump navigate',
          run: () => goTo(sct.id),
        })),
      },
      {
        name: 'Links',
        items: links.map((l) => ({
          id: `link-${l.label.toLowerCase()}`,
          label: l.label,
          hint: l.hint,
          icon: l.icon,
          external: true,
          keywords: 'open profile link',
          run: () => {
            onClose();
            openUrl(l.url);
          },
        })),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, motionEnabled, copied, palette, onSetPalette]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) => `${it.label} ${it.hint || ''} ${it.keywords || ''} ${g.name}`.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length);
  }, [groups, query]);

  const flat = filtered.flatMap((g) => g.items);
  const activeIndex = Math.min(active, Math.max(flat.length - 1, 0));
  const activeItem = flat[activeIndex];

  useEffect(() => setActive(0), [query]);

  // Focus the input on open, lock page scroll, restore focus on close
  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
      if (returnFocusTo && document.contains(returnFocusTo)) returnFocusTo.focus({ preventScroll: true });
    };
  }, [returnFocusTo]);

  // Keep the active option in view
  useEffect(() => {
    if (!activeItem) return;
    document.getElementById(`cmd-${activeItem.id}`)?.scrollIntoView({ block: 'nearest' });
  }, [activeItem]);

  const runItem = (item) => {
    if (!item) return;
    item.run();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(flat.length - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(activeItem);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'Tab') {
      // Single focus stop: keep focus on the input
      e.preventDefault();
    }
  };

  const Overlay = motionEnabled ? motion.div : 'div';
  const Panel = motionEnabled ? motion.div : 'div';
  const overlayMotion = motionEnabled
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : {};
  const panelMotion = motionEnabled
    ? {
        initial: { opacity: 0, y: -8, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -6, scale: 0.98 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }
    : {};

  let optionIndex = -1;

  return (
    <Overlay
      className="cmdk-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      {...overlayMotion}
    >
      <Panel className="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command menu" {...panelMotion}>
        <div className="cmdk-search">
          <Search size={16} aria-hidden="true" />
          <input
            ref={inputRef}
            className="cmdk-input"
            type="text"
            placeholder="Search sections, actions and links…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={activeItem ? `cmd-${activeItem.id}` : undefined}
            aria-autocomplete="list"
            spellCheck="false"
            autoComplete="off"
          />
          <kbd className="cmdk-esc">Esc</kbd>
        </div>

        <div className="cmdk-list" id="cmdk-list" role="listbox" ref={listRef} aria-label="Commands">
          {flat.length === 0 && <p className="cmdk-empty">No results for “{query}”</p>}
          {filtered.map((group) => (
            <div key={group.name} role="group" aria-labelledby={`cmdk-g-${group.name}`} className="cmdk-group">
              <div className="cmdk-group-label" id={`cmdk-g-${group.name}`} role="presentation">
                {group.name}
              </div>
              {group.items.map((item) => {
                optionIndex += 1;
                const index = optionIndex;
                const isActive = index === activeIndex;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    id={`cmd-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    className={`cmdk-item${isActive ? ' is-active' : ''}`}
                    onMouseMove={() => active !== index && setActive(index)}
                    onClick={() => runItem(item)}
                  >
                    <Icon size={15} className="cmdk-item-icon" aria-hidden="true" />
                    <span className="cmdk-item-label">{item.label}</span>
                    {item.hint && <span className="cmdk-item-hint">{item.hint}</span>}
                    {item.external && <ArrowUpRight size={14} className="cmdk-item-ext" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="cmdk-footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd><CornerDownLeft size={11} /></kbd> select</span>
          <span className="cmdk-footer-brand">akshitsharma.dev</span>
        </div>
      </Panel>
    </Overlay>
  );
}
