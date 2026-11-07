import React from 'react';

/**
 * Generative line-art covers for project cards.
 * Drawn with `currentColor` (theme ink) + CSS variables, so they work in both themes.
 * `.glyph-flow` / `.glyph-scan` elements animate only while the card is hovered or focused.
 */

// Card cover content per project id (eyebrow = the headline credential, glyph = artwork)
export const PROJECT_VISUALS = {
  'zero-ops-autosre': { eyebrow: 'GDG Top 10 Finalist', glyph: 'telemetry' },
  'matcha-ai': { eyebrow: 'Multi-Agent System', glyph: 'pipeline' },
  cruisecontent: { eyebrow: 'AI Workflow', glyph: 'workflow' },
  sims: { eyebrow: 'SIH 2025 Internal Winner', glyph: 'qr' },
  'nova-sight': { eyebrow: 'Duality AI Hackathon', glyph: 'detection' },
};

const ink = { stroke: 'currentColor' };
const mono = { fontFamily: 'var(--font-mono)', fontSize: 8, fill: 'currentColor' };

function Telemetry() {
  const signal = 'M6 72 H66 L78 44 L90 100 L102 20 L114 84 L124 72 H234';
  return (
    <>
      <g {...ink} strokeOpacity="0.1">
        <line x1="6" y1="28" x2="234" y2="28" />
        <line x1="6" y1="72" x2="234" y2="72" strokeDasharray="2 4" />
        <line x1="6" y1="112" x2="234" y2="112" />
      </g>
      <path d={signal} stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.6" strokeLinejoin="round" />
      <path className="glyph-flow" d={signal} stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="102" cy="20" r="10" stroke="var(--accent)" strokeOpacity="0.35" />
      <circle cx="102" cy="20" r="3.5" fill="var(--accent)" />
      <text x="116" y="18" {...mono} fillOpacity="0.55">anomaly</text>
      <circle cx="234" cy="72" r="4" fill="var(--signal)" />
      <text x="190" y="92" {...mono} fillOpacity="0.55">self-healed</text>
    </>
  );
}

function Pipeline() {
  const nodes = [
    { x: 4, label: 'parse' },
    { x: 74, label: 'match' },
    { x: 144, label: 'score', accent: true },
  ];
  return (
    <>
      {nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y="44"
            width="48"
            height="32"
            rx="6"
            stroke={n.accent ? 'var(--accent)' : 'currentColor'}
            strokeOpacity={n.accent ? 1 : 0.35}
            fill={n.accent ? 'var(--accent-soft)' : 'none'}
          />
          <text x={n.x + 24} y="63" textAnchor="middle" {...mono} fillOpacity="0.8">{n.label}</text>
        </g>
      ))}
      <line className="glyph-flow" x1="52" y1="60" x2="74" y2="60" stroke="var(--accent)" strokeWidth="1.6" />
      <line className="glyph-flow" x1="122" y1="60" x2="144" y2="60" stroke="var(--accent)" strokeWidth="1.6" />
      <line x1="192" y1="60" x2="202" y2="60" {...ink} strokeOpacity="0.35" />
      {/* Fit-score gauge */}
      <circle cx="218" cy="60" r="15" {...ink} strokeOpacity="0.15" strokeWidth="3" />
      <path d="M218 45 A15 15 0 1 1 204.5 66.5" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
      {/* Inputs fanning into the first agent */}
      <path d="M28 44 V26 H60" {...ink} strokeOpacity="0.25" strokeDasharray="2 3" />
      <text x="64" y="29" {...mono} fillOpacity="0.5">resume + JD</text>
      <path d="M168 76 V96 H120" {...ink} strokeOpacity="0.25" strokeDasharray="2 3" />
      <text x="66" y="99" {...mono} fillOpacity="0.5">RAG · ChromaDB</text>
    </>
  );
}

function Workflow() {
  return (
    <>
      {/* Stacked content documents */}
      <rect x="18" y="30" width="54" height="68" rx="5" {...ink} strokeOpacity="0.18" />
      <rect x="10" y="22" width="54" height="68" rx="5" {...ink} strokeOpacity="0.3" fill="var(--bg-card)" />
      <rect x="2" y="14" width="54" height="68" rx="5" stroke="var(--accent)" fill="var(--bg-card)" />
      <g {...ink} strokeOpacity="0.4" strokeLinecap="round">
        <line x1="12" y1="30" x2="44" y2="30" />
        <line x1="12" y1="40" x2="38" y2="40" />
        <line x1="12" y1="50" x2="46" y2="50" />
        <line x1="12" y1="60" x2="30" y2="60" />
      </g>
      {/* Async queue: jobs travelling along the wave */}
      <path d="M58 48 C 96 12, 120 92, 160 52 S 214 30, 236 54" {...ink} strokeOpacity="0.25" strokeWidth="1.4" />
      <path className="glyph-flow" d="M58 48 C 96 12, 120 92, 160 52 S 214 30, 236 54" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="104" cy="44" r="4" fill="currentColor" fillOpacity="0.7" />
      <circle cx="160" cy="52" r="4" fill="currentColor" fillOpacity="0.7" />
      <circle cx="236" cy="54" r="4" fill="var(--signal)" />
      <text x="120" y="102" {...mono} fillOpacity="0.5">celery · redis queue</text>
    </>
  );
}

function QrCode() {
  // Deterministic module pattern (no randomness → stable between renders)
  const modules = [
    [40, 4], [48, 12], [56, 4], [40, 20], [56, 28], [48, 36], [4, 40], [12, 48], [28, 40], [20, 56],
    [40, 44], [48, 52], [56, 44], [64, 60], [72, 44], [80, 52], [88, 40], [96, 48], [44, 64], [60, 72],
    [76, 68], [92, 64], [48, 84], [64, 92], [80, 84], [96, 92], [88, 76], [40, 96], [72, 100], [100, 80],
  ];
  const finder = (x, y, accent) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="28" height="28" rx="3" stroke={accent ? 'var(--accent)' : 'currentColor'} strokeOpacity={accent ? 1 : 0.55} strokeWidth="2.4" />
      <rect x={x + 8} y={y + 8} width="12" height="12" rx="1.5" fill={accent ? 'var(--accent)' : 'currentColor'} fillOpacity={accent ? 1 : 0.55} />
    </g>
  );
  return (
    <g transform="translate(120 4)">
      {finder(0, 0, true)}
      {finder(76, 0)}
      {finder(0, 76)}
      {modules.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" rx="1" fill="currentColor" fillOpacity="0.4" />
      ))}
      <rect className="glyph-scan" x="-8" y="0" width="120" height="2" rx="1" fill="var(--accent)" style={{ '--scan-distance': '104px' }} />
      <text x="-112" y="98" {...mono} fillOpacity="0.5">laser-marked fittings</text>
    </g>
  );
}

function Detection() {
  const corners = (x, y, w, h, color, opacity = 1) => {
    const c = 10;
    return (
      <g stroke={color} strokeOpacity={opacity} strokeWidth="2" strokeLinecap="round">
        <path d={`M${x} ${y + c} V${y} H${x + c}`} />
        <path d={`M${x + w - c} ${y} H${x + w} V${y + c}`} />
        <path d={`M${x + w} ${y + h - c} V${y + h} H${x + w - c}`} />
        <path d={`M${x + c} ${y + h} H${x} V${y + h - c}`} />
      </g>
    );
  };
  return (
    <>
      {/* Primary detection */}
      <rect x="104" y="18" width="92" height="74" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="3 3" />
      {corners(104, 18, 92, 74, 'var(--accent)')}
      <rect x="104" y="6" width="70" height="12" fill="var(--accent)" />
      <text x="108" y="15" fontFamily="var(--font-mono)" fontSize="8" fill="#fff">oxygen_tank</text>
      <circle cx="150" cy="55" r="9" {...ink} strokeOpacity="0.55" strokeWidth="1.4" />
      <g {...ink} strokeOpacity="0.55" strokeWidth="1.4">
        <line x1="150" y1="38" x2="150" y2="46" />
        <line x1="150" y1="64" x2="150" y2="72" />
        <line x1="133" y1="55" x2="141" y2="55" />
        <line x1="159" y1="55" x2="167" y2="55" />
      </g>
      {/* Secondary detection */}
      {corners(20, 52, 58, 46, 'currentColor', 0.45)}
      <text x="22" y="47" {...mono} fillOpacity="0.5">toolbox</text>
      <rect className="glyph-scan" x="0" y="2" width="240" height="1.5" fill="var(--accent)" fillOpacity="0.6" style={{ '--scan-distance': '110px' }} />
    </>
  );
}

const GLYPHS = {
  telemetry: Telemetry,
  pipeline: Pipeline,
  workflow: Workflow,
  qr: QrCode,
  detection: Detection,
};

export default function ProjectGlyph({ kind }) {
  const Glyph = GLYPHS[kind] || Pipeline;
  return (
    <svg
      className="visual-glyph"
      viewBox="0 0 240 120"
      fill="none"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Glyph />
    </svg>
  );
}
