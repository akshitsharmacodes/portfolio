import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useGsapContext
 * SSR-safe, memory-safe hook that runs GSAP animations scoped to a ref.
 * Automatically cleans up tweens and ScrollTriggers on unmount or dependency update.
 * Provides `matchMedia` for separating desktop and mobile viewport animations.
 */
export function useGsapContext(scopeRef, buildFn, deps = [], motionEnabled = true) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!motionEnabled || prefersReduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();
      buildFn(self, mm);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
  }, [motionEnabled, ...deps]);
}
