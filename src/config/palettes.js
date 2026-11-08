/**
 * Colour palettes the visitor can switch between (header swatch menu + ⌘K).
 * Each one has a light and a dark variant; the actual tokens live in src/theme.css
 * under `html[data-palette='<id>']`. `swatch` is only used to draw the picker.
 */
export const PALETTES = [
  { id: 'crimson', label: 'Crimson editorial', swatch: ['#FAF8F5', '#141414', '#D7263D'] },
  { id: 'cobalt', label: 'Electric cobalt', swatch: ['#F7F8FA', '#0B1020', '#2F5BFF'] },
  { id: 'lime', label: 'Ink and lime', swatch: ['#F4F4EF', '#111111', '#C6F432'] },
  { id: 'orange', label: 'Warm signal orange', swatch: ['#FBF7F2', '#1C1917', '#FF5A1F'] },
];

export const DEFAULT_PALETTE = 'crimson';
export const PALETTE_KEY = 'akshit-portfolio-palette';
/** Only an explicit toggle is stored; without it the site follows the OS colour scheme. */
export const THEME_CHOICE_KEY = 'akshit-portfolio-theme-choice';

export const isPalette = (id) => PALETTES.some((p) => p.id === id);
