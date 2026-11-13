import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SmoothScroll
 * Provides butter-smooth inertia scrolling powered by Lenis, tightly coupled to GSAP ScrollTrigger.
 * - Respects prefers-reduced-motion and the site's explicit motion toggle.
 * - Mobile UI touch-safe: leaves native gestures intuitive while maintaining frame-perfect ScrollTrigger sync.
 * - Resets on route changes and refreshes ScrollTrigger coordinates.
 */
export default function SmoothScroll({ children, motionEnabled = true }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldSmooth = motionEnabled && !prefersReduced;

    if (!shouldSmooth) {
      if (window.__lenis) {
        window.__lenis.destroy();
        window.__lenis = null;
      }
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Connect Lenis scroll event to GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Drive Lenis through GSAP ticker for synchronized 60/120fps animation loop
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) {
        window.__lenis = null;
      }
    };
  }, [motionEnabled]);

  // Synchronize route transitions
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const timer = setTimeout(() => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        const target = document.getElementById(id);
        if (target) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(target, { offset: -64, immediate: false });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return <>{children}</>;
}
