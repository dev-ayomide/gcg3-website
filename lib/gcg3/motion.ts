'use client';
import { useEffect, useRef } from 'react';

/** Adds `.in` class when element enters viewport — triggers CSS reveal animations */
export function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px', ...opts }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/** Magnetic button effect — subtle cursor-following movement */
export function magneticHandlers(strength = 0.22) {
  if (typeof window === 'undefined') return {};
  return {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * strength;
      const y = (e.clientY - rect.top  - rect.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translate(0, 0)';
    },
  };
}
