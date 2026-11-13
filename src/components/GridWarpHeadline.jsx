import React, { useEffect, useRef } from 'react';

/**
 * Grid Warp: the footer headline read through a coarse grid that the pointer drags.
 * Cells shift as solid blocks, so the letters shear into stepped slices along the
 * pointer's path, then spring back and knit together.
 *
 * The real <h2> stays in the DOM (SEO / screen readers / layout); with the effect on, its
 * text turns transparent and a canvas redraws it in grid slices on top. Motion off or
 * touch-only devices: just the plain headline.
 */
const CELL = 30; // px, grid cell size
const RADIUS = 110; // px, pointer influence
const MAX_SHIFT = 34; // px

export default function GridWarpHeadline({ lines, motionEnabled }) {
  const wrapRef = useRef(null);
  const h2Ref = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!motionEnabled || !canHover) return undefined;
    const wrap = wrapRef.current;
    const h2 = h2Ref.current;
    const canvas = canvasRef.current;
    if (!wrap || !h2 || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const src = document.createElement('canvas');
    const sctx = src.getContext('2d');
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let dx = new Float32Array(0);
    let dy = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    const PAD = MAX_SHIFT;

    // Render the headline text once into an offscreen canvas, matching the h2's layout
    const paintSource = () => {
      // Layout sizes (offset*), not getBoundingClientRect: the wrapper may be mid scroll-scale
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.ceil(wrap.offsetWidth) + PAD * 2;
      h = Math.ceil(wrap.offsetHeight) + PAD * 2;
      for (const c of [canvas, src]) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = `${-PAD}px`;
      canvas.style.top = `${-PAD}px`;

      const cs = getComputedStyle(h2);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sctx.clearRect(0, 0, w, h);
      sctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      sctx.fillStyle = getComputedStyle(wrap).getPropertyValue('--block-fg').trim() || cs.color;
      sctx.textBaseline = 'middle';
      const letter = parseFloat(cs.letterSpacing) || 0;
      if ('letterSpacing' in sctx) sctx.letterSpacing = `${letter}px`;
      [...h2.querySelectorAll('[data-line]')].forEach((span) => {
        sctx.fillText(span.textContent, span.offsetLeft + PAD, span.offsetTop + span.offsetHeight / 2 + PAD);
      });

      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      dx = new Float32Array(cols * rows);
      dy = new Float32Array(cols * rows);
      vx = new Float32Array(cols * rows);
      vy = new Float32Array(cols * rows);
      draw();
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const c = CELL * dpr;
      for (let r = 0; r < rows; r += 1) {
        for (let k = 0; k < cols; k += 1) {
          const i = r * cols + k;
          // Snap to whole pixels so slices read as solid blocks
          const ox = Math.round(dx[i] * dpr);
          const oy = Math.round(dy[i] * dpr);
          const sx = k * c;
          const sy = r * c;
          ctx.drawImage(src, sx, sy, c, c, sx + ox, sy + oy, c, c);
        }
      }
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      let moving = false;
      for (let i = 0; i < dx.length; i += 1) {
        // Spring back to rest
        vx[i] = (vx[i] - dx[i] * 0.09) * 0.8;
        vy[i] = (vy[i] - dy[i] * 0.09) * 0.8;
        dx[i] += vx[i];
        dy[i] += vy[i];
        if (Math.abs(dx[i]) > 0.15 || Math.abs(dy[i]) > 0.15 || Math.abs(vx[i]) > 0.15) moving = true;
        else {
          dx[i] = 0;
          dy[i] = 0;
          vx[i] = 0;
          vy[i] = 0;
        }
      }
      draw();
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    let last = null;
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const k = rect.width / w || 1; // undo any scale on the wrapper
      const x = (e.clientX - rect.left) / k;
      const y = (e.clientY - rect.top) / k;
      if (last) {
        const mx = x - last.x;
        const my = y - last.y;
        const r2 = RADIUS * RADIUS;
        for (let r = 0; r < rows; r += 1) {
          for (let k = 0; k < cols; k += 1) {
            const cx = k * CELL + CELL / 2;
            const cy = r * CELL + CELL / 2;
            const d2 = (cx - x) ** 2 + (cy - y) ** 2;
            if (d2 > r2) continue;
            const f = 1 - d2 / r2;
            const i = r * cols + k;
            dx[i] = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dx[i] + mx * f * 0.9));
            dy[i] = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, dy[i] + my * f * 0.9));
          }
        }
        kick();
      }
      last = { x, y };
    };
    const onLeave = () => {
      last = null;
    };

    let ready = false;
    const start = () => {
      if (ready) return;
      ready = true;
      wrap.classList.add('is-warping');
      paintSource();
    };

    // Defer canvas rendering until the footer approaches the viewport
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          (document.fonts?.ready || Promise.resolve()).then(start);
          io.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => ready && paintSource());
    ro.observe(wrap);
    const mo = new MutationObserver(() => ready && paintSource());
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'data-theme'] });
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.classList.remove('is-warping');
    };
  }, [motionEnabled, lines]);

  return (
    <div className="grid-warp" ref={wrapRef}>
      <h2 className="footer-headline" ref={h2Ref}>
        {lines.map((line) => (
          <span key={line} data-line>
            {line}
          </span>
        ))}
      </h2>
      <canvas ref={canvasRef} className="grid-warp-canvas" aria-hidden="true" />
    </div>
  );
}
