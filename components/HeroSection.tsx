'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import StarCanvas from '@/components/StarCanvas';
import { magneticHandlers } from '@/lib/gcg3/motion';

const marqueeItems = [
  'Christian Musical Talent Show',
  'Teens Mentorship Program',
  'Leadership Program',
  'Reading Club',
  'Grand Prize $3,000',
  'Ontario, Canada',
  'Ages 9 – 17',
  'Matthew 25 · Est. 2021',
];

export default function HeroSection() {
  const mag    = magneticHandlers(0.22);
  const bgRef  = useRef<HTMLDivElement>(null);

  // Background parallax — image drifts slower than scroll, creating depth
  useEffect(() => {
    const update = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.14) translateY(${window.scrollY * 0.12}px)`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden grain"
      style={{ height: '100svh', minHeight: 660, background: '#08090e' }}
    >
      {/* ── Background photo — real community moment ── */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ zIndex: 0, willChange: 'transform', transform: 'scale(1.14) translateY(0px)' }}
      >
        <Image
          src="https://gcg3official.com/wp-content/uploads/2024/04/IMG-20240402-WA0063.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ opacity: 0.30 }}
        />
      </div>

      {/* ── Dark gradient overlay — preserves photo depth, keeps text crisp ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(135deg, rgba(8,9,14,0.82) 0%, rgba(8,9,14,0.60) 50%, rgba(8,9,14,0.80) 100%)',
        }}
      />

      {/* ── Star field — above photo, below content ── */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <StarCanvas count={240} />
      </div>

      {/* ── Celestial glow — subtle indigo crown at top ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 pointer-events-none hidden sm:block"
        style={{
          zIndex: 3,
          height: '45%',
          background:
            'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(34,43,100,0.40), transparent)',
        }}
      />

      {/* ── Ember glow — electric gold breathing up from bottom ── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140vw',
          height: '70vh',
          background:
            'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(236,233,76,0.14) 0%, rgba(236,233,76,0.04) 40%, transparent 68%)',
          animation: 'ember-rise 3s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        }}
      />

      {/* ── Photo vignette — feathers the photo edges into the void ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(8,9,14,0.60) 100%)',
        }}
      />

      {/* ── Thin horizontal rule — architectural frame ── */}
      <div
        aria-hidden
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          zIndex: 4,
          bottom: 40,
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(236,233,76,0.08) 20%, rgba(236,233,76,0.08) 80%, transparent)',
        }}
      />

      {/* ── Content — left-anchored, vertically centered ── */}
      <div
        className="relative h-full flex flex-col justify-center wrap"
        style={{ zIndex: 10, paddingTop: 80 }}
      >
        {/* Eyebrow */}
        <p
          className="eyebrow animate-fade-in"
          style={{ animationDelay: '0.15s', marginBottom: 28 }}
        >
          Matthew 25 · Est. 2021 · Ontario, Canada
        </p>

        {/* ── HEADLINE — Fraunces italic, viewport-filling ── */}
        <h1
          className="font-display italic font-light text-text text-balance kern"
          style={{
            fontSize: 'clamp(64px, 11vw, 160px)',
            lineHeight: 0.93,
            letterSpacing: '-0.03em',
            maxWidth: '14ch',
          }}
        >
          <span className="reveal-wrap in">
            <span className="reveal-inner" style={{ animationDelay: '0.35s' }}>
              God&apos;s Children
            </span>
          </span>
          <span className="reveal-wrap in" style={{ marginTop: '0.04em' }}>
            <span className="reveal-inner" style={{ animationDelay: '0.5s' }}>
              Got{' '}
              <em
                className="not-italic"
                style={{
                  color: '#ece94c',
                  fontStyle: 'normal',
                  textShadow: '0 0 60px rgba(236,233,76,0.55), 0 0 120px rgba(236,233,76,0.20)',
                }}
              >
                Great
              </em>{' '}
              Gifts
            </span>
          </span>
        </h1>

        {/* Accent line */}
        <span
          aria-hidden
          className="block bg-accent origin-left"
          style={{
            width: 56,
            height: 1,
            marginTop: 28,
            marginBottom: 28,
            animation: 'scaleX-in 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s both',
          }}
        />

        {/* Sub-copy */}
        <p
          className="font-body font-light animate-fade-in"
          style={{
            fontSize: 'clamp(18px, 1.8vw, 22px)',
            lineHeight: 1.75,
            color: '#8e95c8',
            maxWidth: '38ch',
            animationDelay: '1.3s',
          }}
        >
          Revealing the gifts God planted in every young heart —
          through talent, community, and faith.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5 animate-fade-in"
          style={{ marginTop: 40, animationDelay: '1.55s' }}
        >
          <Link href="/events" className="btn-primary magnetic" {...mag}>
            Register for 2026 →
          </Link>
          {/* Vertical rule — desktop only */}
          <span
            aria-hidden
            className="hidden sm:block flex-shrink-0"
            style={{ width: 1, height: 20, background: 'rgba(242,240,252,0.15)' }}
          />
          <Link href="/programs" className="btn-ghost magnetic" {...mag}>
            Explore Programs
          </Link>
        </div>

        {/* Scroll indicator — mouse icon with bouncing dot */}
        <div
          className="absolute left-1/2"
          style={{
            bottom: 56,
            transform: 'translateX(-50%)',
            opacity: 0,
            animation: 'fade-in 0.6s ease 2.1s forwards',
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span
              style={{
                fontFamily: 'var(--font-outfit), sans-serif',
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(242,240,252,0.28)',
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width: 22,
                height: 36,
                border: '1.5px solid rgba(236,233,76,0.30)',
                borderRadius: 11,
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: 6,
                boxSizing: 'border-box',
              }}
            >
              <span
                style={{
                  width: 3,
                  height: 8,
                  borderRadius: 2,
                  background: '#ece94c',
                  animation: 'scroll-wheel 2s cubic-bezier(0.45,0,0.55,1) 2.4s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee strip — absolutely at bottom ── */}
      <div
        className="marquee-wrap absolute bottom-0 left-0 right-0 overflow-hidden border-t"
        style={{
          zIndex: 10,
          borderTopColor: 'rgba(242,240,252,0.05)',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <div className="marquee-track flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 font-label font-bold uppercase"
              style={{
                fontSize: '9px',
                letterSpacing: '0.26em',
                color: 'rgba(242,240,252,0.20)',
              }}
            >
              {item}
              <span
                aria-hidden
                className="inline-block flex-shrink-0"
                style={{ width: 3, height: 3, background: 'rgba(236,233,76,0.35)', borderRadius: '50%' }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
