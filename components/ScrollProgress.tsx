'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 2,
        zIndex: 99990,
        background: 'rgba(236,233,76,0.10)',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #ece94c, rgba(236,233,76,0.75))',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}
