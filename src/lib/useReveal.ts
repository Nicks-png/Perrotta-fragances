'use client';

import { useEffect } from 'react';

/**
 * Observes elements with `.reveal` class and adds `.is-visible`
 * once they enter the viewport. Pair with the `.reveal` and `.reveal-N`
 * classes from globals.css.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '-40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
