'use client';
import { type CSSProperties, type ReactNode } from 'react';
import { useInView } from '@/lib/gcg3/motion';

/**
 * RevealLine — clip-path slide-up reveal for headlines.
 * Wraps text in overflow:hidden parent + translateY(110%) child.
 * Adding `.in` class triggers the CSS animation.
 */
export function RevealLine({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={`reveal-wrap ${className}`}>
      <span
        className="reveal-inner"
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * Fade — opacity + translateY fade-in on scroll enter.
 */
export function Fade({
  children,
  delay = 0,
  y = 28,
  className = '',
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={
        {
          ...style,
          '--fy': `${y}px`,
          '--fd': `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
