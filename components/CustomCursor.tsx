'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef      = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Only show custom cursor on pointer devices
    if (window.matchMedia('(hover: none)').matches) return;

    const dot       = dotRef.current!;
    const ringOuter = ringOuterRef.current!;

    let mx = 0, my = 0;   // mouse
    let rx = 0, ry = 0;   // ring (lerped)
    let visible  = false;
    let hovering = false;
    let rafId: number;

    const show = () => {
      dot.style.opacity       = '1';
      ringOuter.style.opacity = '1';
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!visible) { visible = true; rx = mx; ry = my; show(); }
    };

    // Event delegation — detect when pointer is over an interactive element
    const onOver = (e: MouseEvent) => {
      const isInteractive = !!(e.target as Element).closest('a, button, [role="button"], label, input, textarea');
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        if (hovering) {
          dot.dataset.hover       = '';
          ringOuter.dataset.hover = '';
        } else {
          delete dot.dataset.hover;
          delete ringOuter.dataset.hover;
        }
      }
    };

    const tick = () => {
      // Lerp ring toward mouse — lower factor = more lag = more dramatic trail
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ringOuter.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove,  { passive: true });
    document.addEventListener('mouseover', onOver,  { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Exact-follow dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden style={{ opacity: 0 }} />

      {/* Lagging ring — outer positions via JS lerp, inner handles visual size changes */}
      <div ref={ringOuterRef} className="cursor-ring-outer" aria-hidden style={{ opacity: 0 }}>
        <div className="cursor-ring-inner" />
      </div>
    </>
  );
}
