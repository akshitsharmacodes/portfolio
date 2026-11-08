import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import SectionHeader from './SectionHeader';

/**
 * Philosophy & Background as a Quote Deck (after Scrolltide's component): five working
 * principles in my own words, fanned across the width. The focused card stands upright;
 * the rest lean away, shrink and dim with distance. Autoplays and loops (pausing on hover
 * or focus); arrows, keys and a swipe step through it.
 */
const PRINCIPLES = [
  {
    tag: 'On verification',
    quote: 'Never trust the model blindly. Every agent I ship has checks, evals and a trace you can actually read.',
  },
  {
    tag: 'On architecture',
    quote: 'Small, specialised agents beat one giant prompt. Each job isolated, checkpointed and easy to inspect.',
  },
  {
    tag: 'On grounding',
    quote: "If the system can't cite your data, it shouldn't say it. Retrieval is how AI earns your team's trust.",
  },
  {
    tag: 'On discipline',
    quote: 'Officer training at OTA Gaya taught me to decide under pressure and own the outcome. I run projects the same way.',
  },
  {
    tag: 'On shipping',
    quote: 'Production is the only demo that counts: fast APIs, queues, caching and monitoring from day one.',
  },
];

const AUTOPLAY_MS = 5500;

export default function About({ motionEnabled = true }) {
  const n = PRINCIPLES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef(null);

  const go = (d) => setActive((a) => (a + d + n) % n);

  useEffect(() => {
    if (!motionEnabled || paused) return undefined;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, motionEnabled]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  // Shortest signed distance on the loop, so cards fan both ways around the focused one
  const dist = (i) => {
    let d = i - active;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section className="section-padding" id="about" aria-label="About Akshit Sharma">
      <div className="container">
        <div className="qd-head">
          <SectionHeader
            motionEnabled={motionEnabled}
            tag="Philosophy & Background"
            title="Five principles I build by."
            description={siteConfig.identity.about}
          />
          <div className="qd-nav">
            <button type="button" className="halo-arrow" onClick={() => go(-1)} aria-label="Previous principle">
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" className="halo-arrow" onClick={() => go(1)} aria-label="Next principle">
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          className="qd-deck"
          role="region"
          aria-roledescription="carousel"
          aria-label="Working principles"
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={(e) => {
            drag.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (drag.current === null) return;
            const dx = e.clientX - drag.current;
            drag.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {PRINCIPLES.map((p, i) => {
            const d = dist(i);
            const ad = Math.abs(d);
            return (
              <figure
                key={p.tag}
                className={`qd-card qd-card--${i}${d === 0 ? ' is-active' : ''}`}
                style={{ '--d': d, '--ad': ad }}
                aria-hidden={d !== 0}
                onClick={() => d !== 0 && setActive(i)}
              >
                <div className="qd-top">
                  <span className="qd-tag">{p.tag}</span>
                  <span className="qd-count">
                    {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                  </span>
                </div>
                <blockquote className="qd-quote">“{p.quote}”</blockquote>
                <figcaption className="qd-by">
                  <span className="qd-avatar" aria-hidden="true">
                    AS
                  </span>
                  <span>
                    <b>{siteConfig.identity.fullName}</b>
                    <small>{siteConfig.identity.profession}</small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="qd-dots" role="tablist" aria-label="Choose a principle">
          {PRINCIPLES.map((p, i) => (
            <button
              key={p.tag}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={p.tag}
              className={`qd-dot${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              {i === active && motionEnabled && !paused && <i key={active} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
