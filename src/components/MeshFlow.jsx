import React, { useEffect, useRef } from 'react';

/**
 * Hero background: a faint dot-and-line grid that the pointer pulls into a soft
 * "singularity", bending the mesh like a rubber sheet under a weight (one Gaussian, Canvas 2D).
 * Idle → no animation loop at all. Motion off → a still grid. Colours follow the palette tokens.
 */
const GAP = 30;
const SIGMA = 130;
const PULL = 0.42;

export default function MeshFlow({ motionEnabled }) {
  const canvasRef = useRef(null);
  const motionRef = useRef(motionEnabled);
  motionRef.current = motionEnabled;
  const kickRef = useRef(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let dpr = 1;
    let colors = { ink: '20,20,20', accent: '215,38,61' };

    const toRgb = (value) => {
      const probe = document.createElement('span');
      probe.style.color = value;
      document.body.appendChild(probe);
      const rgb = getComputedStyle(probe).color.match(/\d+(\.\d+)?/g) || ['0', '0', '0'];
      probe.remove();
      return rgb.slice(0, 3).join(',');
    };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        ink: toRgb(cs.getPropertyValue('--text').trim() || '#141414'),
        accent: toRgb(cs.getPropertyValue('--accent').trim() || '#d7263d'),
      };
    };

    // Pointer target (t*) and smoothed position / strength
    const p = { x: -9999, y: -9999, tx: -9999, ty: -9999, s: 0, ts: 0 };
    let isVisible = true;
    let cachedRect = host.getBoundingClientRect();
    const updateRect = () => {
      if (isVisible) cachedRect = host.getBoundingClientRect();
    };

    const draw = () => {
      if (!isVisible) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const ox = (w - (cols - 1) * GAP) / 2;
      const two = 2 * SIGMA * SIGMA;
      const xs = new Float32Array(cols * rows);
      const ys = new Float32Array(cols * rows);
      const gs = new Float32Array(cols * rows);

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const i = r * cols + c;
          let x = ox + c * GAP;
          let y = r * GAP;
          let g = 0;
          if (p.s > 0.001) {
            const dx = p.x - x;
            const dy = p.y - y;
            g = Math.exp(-(dx * dx + dy * dy) / two) * p.s;
            x += dx * g * PULL;
            y += dy * g * PULL;
          }
          xs[i] = x;
          ys[i] = y;
          gs[i] = g;
        }
      }

      // Mesh lines (very faint), bent by the same displacement
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${colors.ink},0.05)`;
      ctx.beginPath();
      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const i = r * cols + c;
          if (c === 0) ctx.moveTo(xs[i], ys[i]);
          else ctx.lineTo(xs[i], ys[i]);
        }
      }
      for (let c = 0; c < cols; c += 1) {
        for (let r = 0; r < rows; r += 1) {
          const i = r * cols + c;
          if (r === 0) ctx.moveTo(xs[i], ys[i]);
          else ctx.lineTo(xs[i], ys[i]);
        }
      }
      ctx.stroke();

      // Dots: ink at rest, accent and larger near the pull
      for (let i = 0; i < xs.length; i += 1) {
        const g = gs[i];
        const rad = 1.1 + g * 1.6;
        ctx.fillStyle = g > 0.05 ? `rgba(${colors.accent},${0.25 + g * 0.65})` : `rgba(${colors.ink},0.2)`;
        ctx.beginPath();
        ctx.arc(xs[i], ys[i], rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    const tick = () => {
      raf = 0;
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      p.s += (p.ts - p.s) * 0.08;
      draw();
      const settled = Math.abs(p.tx - p.x) < 0.3 && Math.abs(p.ty - p.y) < 0.3 && Math.abs(p.ts - p.s) < 0.002;
      if (!settled) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    kickRef.current = () => {
      if (!motionRef.current) {
        p.ts = 0;
        p.s = 0;
      }
      draw();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      updateRect();
      draw();
    };

    const onMove = (e) => {
      if (!motionRef.current || !isVisible || e.pointerType === 'touch') return;
      const inside =
        e.clientX >= cachedRect.left &&
        e.clientX <= cachedRect.right &&
        e.clientY >= cachedRect.top &&
        e.clientY <= cachedRect.bottom;

      if (!inside) {
        if (p.ts !== 0) {
          p.ts = 0;
          kick();
        }
        return;
      }

      const x = e.clientX - cachedRect.left;
      const y = e.clientY - cachedRect.top;
      if (p.s < 0.01) {
        // Start the pull where the pointer is, not from the last spot
        p.x = x;
        p.y = y;
      }
      p.tx = x;
      p.ty = y;
      p.ts = 1;
      kick();
    };
    const onLeave = () => {
      if (p.ts !== 0) {
        p.ts = 0;
        kick();
      }
    };

    readColors();
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // Pause rendering entirely when the hero is scrolled out of the viewport
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible) {
          updateRect();
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(host);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    // Recolour when the palette or theme changes
    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-palette', 'data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', updateRect);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    kickRef.current();
  }, [motionEnabled]);

  return <canvas ref={canvasRef} className="mesh-flow" aria-hidden="true" />;
}
