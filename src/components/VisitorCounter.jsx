import React, { useEffect, useState } from 'react';

/**
 * VisitorCounter:
 * Clean native pill rendered directly in HTML/CSS matching the footer's design tokens.
 * Zero external black badge boxes or mismatched fonts.
 * Uses countapi with CORS support + sessionStorage caching to avoid local increment spam.
 */
const COUNTER_KEY = 'akshitsharma_dev_visitors';
const BASE_COUNT = 24; // Baseline from previous hits

export default function VisitorCounter() {
  const [count, setCount] = useState(() => {
    try {
      const cached = sessionStorage.getItem('as_visitor_count') || localStorage.getItem('as_last_known_count');
      return cached ? parseInt(cached, 10) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    let isMounted = true;
    let timerId = null;

    const doFetch = () => {
      try {
        // In a session, only hit once to increment; subsequent reloads only fetch latest
        const hasHit = sessionStorage.getItem('as_has_hit_counter');
        const endpoint = hasHit
          ? `https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`
          : `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`;

        fetch(endpoint)
          .then((res) => {
            if (!res.ok) throw new Error('Counter unavailable');
            return res.json();
          })
          .then((data) => {
            if (!isMounted) return;
            if (typeof data?.value === 'number') {
              const total = data.value + BASE_COUNT;
              setCount(total);
              sessionStorage.setItem('as_has_hit_counter', '1');
              sessionStorage.setItem('as_visitor_count', String(total));
              localStorage.setItem('as_last_known_count', String(total));
            }
          })
          .catch(() => {
            // Fallback to cached or baseline gracefully
            if (!count && isMounted) {
              setCount(BASE_COUNT);
            }
          });
      } catch {
        if (!count && isMounted) {
          setCount(BASE_COUNT);
        }
      }
    };

    // Defer network call so footer hit counter never blocks hero LCP or initial render
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(doFetch, { timeout: 4000 });
      return () => {
        isMounted = false;
        window.cancelIdleCallback(handle);
      };
    }
    timerId = setTimeout(doFetch, 2500);
    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div
      className="footer-visitor-counter"
      role="status"
      aria-label={`Total website visitors: ${count ?? '...'}`}
    >
      <span className="counter-dot" aria-hidden="true" />
      <span className="counter-label">Total Visitors</span>
      <span className="counter-value">{count ? count.toLocaleString() : '...'}</span>
    </div>
  );
}
