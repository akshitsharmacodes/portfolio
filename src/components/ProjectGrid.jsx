import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGsapContext } from '../hooks/useScrollAnimation';
import ProjectGlyph, { PROJECT_VISUALS } from './ProjectGlyph';
import { isValidContent } from '../config/site';

/**
 * Selected Work as a Halo Carousel (after Scrolltide's component): square project tiles
 * ride the rim of a huge wheel whose hub sits below the section, forming a shallow arch over
 * a centred headline. It drifts on its own, turns under a drag (with momentum) and steps with
 * the arrow buttons. The tile nearest the apex is "in focus" and described under the headline;
 * clicking a tile opens its case-study dialog.
 */
const SLOTS = 10; // tiles on the visible part of the wheel (projects repeat around it)
const DRIFT = 0.1; // slots per second while idle

const tileSize = (W) => Math.max(118, Math.min(210, W * 0.15));

export default function ProjectGrid({ projects, onSelectProject, motionEnabled = true }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const tileRefs = useRef([]);
  const state = useRef({ off: 0, vel: 0, dragging: false, hover: false, lastX: 0, lastT: 0, moved: 0, snap: undefined });
  const [focus, setFocus] = useState(0);
  const n = projects.length;
  const slots = Math.max(SLOTS, Math.ceil(SLOTS / n) * n);

  useGsapContext(
    sectionRef,
    (ctx, mm) => {
      mm.add('(min-width: 769px)', () => {
        gsap.from(['.halo-title', '.halo-caption', '.halo-focus'], {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      });

      mm.add('(max-width: 768px)', () => {
        gsap.from(['.halo-title', '.halo-caption', '.halo-focus'], {
          y: 18,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    [],
    motionEnabled
  );

  const layout = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const W = stage.clientWidth;
    const tile = tileSize(W);
    const gap = tile * 0.16;
    const R = Math.max(W * 0.82, 420);
    const step = (tile + gap) / R; // radians between tiles
    const apexY = tile * 0.62;
    stage.style.setProperty('--tile', `${tile}px`);
    const { off } = state.current;
    let best = 0;
    let bestDist = Infinity;
    for (let k = 0; k < slots; k += 1) {
      let p = k - off;
      p = ((((p + slots / 2) % slots) + slots) % slots) - slots / 2; // wrap into [-slots/2, slots/2)
      const th = p * step;
      const x = W / 2 + R * Math.sin(th);
      const y = apexY + R * (1 - Math.cos(th));
      const el = tileRefs.current[k];
      if (!el) continue;
      const vis = Math.abs(th) < 1.25 ? 1 - Math.max(0, Math.abs(th) - 0.9) / 0.35 : 0;
      el.style.transform = `translate(${x - tile / 2}px, ${y - tile / 2}px) rotate(${th}rad)`;
      el.style.opacity = String(Math.max(0, Math.min(1, vis)));
      el.style.zIndex = String(100 - Math.round(Math.abs(p) * 4));
      if (Math.abs(p) < bestDist) {
        bestDist = Math.abs(p);
        best = k % n;
      }
    }
    setFocus((f) => (f === best ? f : best));
  }, [n, slots]);

  // Animation loop: idle drift, momentum after a drag, and snapping for the arrow buttons
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let onScreen = true;
    const loop = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const s = state.current;
      if (!s.dragging) {
        if (Math.abs(s.vel) > 0.002) {
          s.off += s.vel * dt;
          s.vel *= Math.pow(0.04, dt); // friction
        } else if (s.snap !== undefined) {
          const d = s.snap - s.off;
          s.off += d * Math.min(1, dt * 8);
          if (Math.abs(d) < 0.001) s.snap = undefined;
        } else if (motionEnabled && !s.hover && !document.hidden && onScreen) {
          s.off += DRIFT * dt;
        }
      }
      layout();
      raf = requestAnimationFrame(loop);
    };
    layout();
    raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(layout);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    if (stageRef.current) {
      ro.observe(stageRef.current);
      io.observe(stageRef.current);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [layout, motionEnabled]);

  const pxPerSlot = () => tileSize(stageRef.current?.clientWidth || 1000) * 1.16;

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('.halo-center')) return;
    const s = state.current;
    s.dragging = true;
    s.snap = undefined;
    s.vel = 0;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.moved = 0;
  };
  const onPointerMove = (e) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const now = performance.now();
    s.off -= dx / pxPerSlot();
    s.vel = -dx / pxPerSlot() / Math.max((now - s.lastT) / 1000, 0.008);
    s.lastX = e.clientX;
    s.lastT = now;
    s.moved += Math.abs(dx);
  };
  const onPointerUp = () => {
    const s = state.current;
    if (!s.dragging) return;
    s.dragging = false;
    s.vel = Math.max(-6, Math.min(6, s.vel));
  };

  const stepBy = (d) => {
    const s = state.current;
    s.vel = 0;
    s.snap = Math.round(s.off) + d;
  };

  const openTile = (project, e) => {
    if (state.current.moved > 6) return; // it was a drag, not a click
    onSelectProject(project, e.currentTarget);
  };

  const current = projects[focus];
  const visual = PROJECT_VISUALS[current.id] || { eyebrow: current.category };

  return (
    <section ref={sectionRef} className="section-padding halo-section" id="work" aria-label="Selected projects">
      <div
        className="halo-stage"
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => {
          state.current.hover = true;
        }}
        onMouseLeave={() => {
          state.current.hover = false;
          onPointerUp();
        }}
      >
        {Array.from({ length: slots }, (_, k) => {
          const p = projects[k % n];
          const v = PROJECT_VISUALS[p.id] || { eyebrow: p.category, glyph: 'pipeline' };
          const real = k < n;
          return (
            <button
              key={k}
              type="button"
              ref={(el) => {
                tileRefs.current[k] = el;
              }}
              className={`halo-tile halo-tile--${k % 5}`}
              onClick={(e) => openTile(p, e)}
              tabIndex={real ? 0 : -1}
              aria-hidden={real ? undefined : true}
              aria-label={real ? `Open case study: ${p.title}` : undefined}
              aria-haspopup={real ? 'dialog' : undefined}
              draggable={false}
            >
              <span className="halo-tile-eyebrow">{v.eyebrow}</span>
              <span className="halo-tile-glyph">
                <ProjectGlyph kind={v.glyph} />
              </span>
              <span className="halo-tile-title">{p.title}</span>
            </button>
          );
        })}

        <div className="halo-center">
          <div className="section-meta halo-meta">
            <span className="section-num" aria-hidden="true" />
            <span className="section-tag">Featured engineering</span>
          </div>
          <h2 className="section-title halo-title">Selected Work</h2>
          <p className="halo-caption">{n} production AI systems. Drag the arc, or let it turn on its own.</p>

          <div className="halo-focus">
            <span className="halo-focus-meta">
              {current.category} · {current.year} · {visual.eyebrow}
            </span>
            <span className="halo-focus-title">{current.title}</span>
            <p className="halo-focus-summary">{current.summary}</p>
            <div className="halo-actions">
              <button type="button" className="halo-arrow" onClick={() => stepBy(-1)} aria-label="Previous project">
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => onSelectProject(current, e.currentTarget)}
                aria-haspopup="dialog"
              >
                <span>Case study</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
              {isValidContent(current.liveUrl) && (
                <a className="btn btn-secondary" href={current.liveUrl} target="_blank" rel="noopener noreferrer">
                  <span className="live-pulse-dot" aria-hidden="true" />
                  <span>Live</span>
                </a>
              )}
              <button type="button" className="halo-arrow" onClick={() => stepBy(1)} aria-label="Next project">
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
