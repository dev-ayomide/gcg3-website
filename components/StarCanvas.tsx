'use client';
import { useEffect, useRef } from 'react';

interface Star {
  x: number; y: number;
  r: number;
  max: number;
  speed: number;
  phase: number;
}

export default function StarCanvas({ count = 200 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Generate stars
    const stars: Star[] = Array.from({ length: count }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.1 + 0.25,
      max:   Math.random() * 0.65 + 0.08,
      speed: Math.random() * 0.0045 + 0.0008,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf: number;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const op = s.max * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(
          s.x * canvas.width,
          s.y * canvas.height,
          s.r,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(242,240,252,${op.toFixed(3)})`; // ivory
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}
