import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
import EventCard from '@/components/EventCard';
import ProgramsGrid from '@/components/ProgramsGrid';
import { Fade, RevealLine } from '@/components/Reveal';
import { getUpcomingEvents } from '@/lib/wordpress';

/* ── Gallery photos ── */
const galleryPhotos = [
  { src: '/gcg3-winner-check.jpeg',      alt: 'GCG3 winner receiving $3,000 prize check', w: 300, h: 420 },
  { src: '/gcg3-host-stage.jpeg',        alt: 'GCG3 host on stage',                        w: 400, h: 280 },
  { src: '/gcg3-contestants-stage.jpeg', alt: 'GCG3 contestants on stage',                 w: 290, h: 400 },
  { src: '/gcg3-mc-stage.jpeg',          alt: 'GCG3 MC presenting on stage',               w: 360, h: 260 },
  { src: '/gcg3-audience.jpeg',          alt: 'GCG3 audience at talent show',              w: 290, h: 420 },
];


export default async function HomePage() {
  const events = await getUpcomingEvents();

  const upcomingEvents = events.slice(0, 4);

  return (
    <>
      {/* ════════════════════════════════
          1 — HERO (near-black)
      ════════════════════════════════ */}
      <HeroSection />

      {/* ════════════════════════════════
          2 — STATEMENT (pure white)
      ════════════════════════════════ */}
      <section style={{ background: '#ffffff', paddingTop: 120, paddingBottom: 0, overflow: 'hidden', position: 'relative' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Fade>
            <p className="eyebrow-dark" style={{ marginBottom: 52 }}>A quick look at what we do</p>
          </Fade>

          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr]" style={{ gap: 'clamp(48px, 5vw, 80px)', alignItems: 'start' }}>
            {/* Left: quote + horizontal stats */}
            <div style={{ paddingBottom: 80 }}>
              <Fade delay={0.15}>
                <div style={{ marginBottom: 40 }}>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.85, color: '#3a3a5c', marginBottom: 20 }}
                  >
                    God&rsquo;s Children Got Great Gift is a divine project for the enhancement of the
                    kingdom of God. The main idea is to encourage children to fully utilize those
                    wonderful talents that God has given to them.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.85, color: '#3a3a5c', marginBottom: 20 }}
                  >
                    In accordance with Matthew 25:20, we believe strongly that every child has a variety
                    of talents in them. It is our utmost desire to bring life to those talents.
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', lineHeight: 1.85, color: '#3a3a5c' }}
                  >
                    Apart from talent shows that occur annually, we also have programs that support
                    our children&rsquo;s holistic development — mentorship, leadership, and reading clubs.
                  </p>
                </div>
              </Fade>

              {/* Stats — horizontal 4-column row */}
              <Fade delay={0.4}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 'clamp(16px, 2vw, 28px)',
                    paddingTop: 40,
                    borderTop: '1px solid rgba(12,12,20,0.08)',
                  }}
                >
                  {[
                    { num: '200+', label: 'Children Served' },
                    { num: '4',    label: 'Programs'        },
                    { num: '$3K',  label: 'Grand Prize'     },
                    { num: '5+',   label: 'Years Active'    },
                  ].map((s) => (
                    <div key={s.label}>
                      <p
                        className="font-display italic nums kern"
                        style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1, color: '#0d1240', letterSpacing: '-0.03em' }}
                      >
                        {s.num}
                      </p>
                      <p
                        className="font-label"
                        style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#6b6b8a', marginTop: 8 }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Fade>
            </div>

            {/* Right: community photo — no bottom rounding, bleeds to section edge */}
            <Fade y={32} delay={0.2}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '12px 12px 0 0',
                  overflow: 'hidden',
                  height: 'clamp(440px, 52vw, 620px)',
                  boxShadow: '0 -8px 40px rgba(12,12,20,0.08), 0 24px 64px rgba(12,12,20,0.10)',
                }}
              >
                <Image
                  src="/gcg3-host-stage.jpeg"
                  alt="GCG3 host on stage"
                  fill
                  className="object-cover object-center"
                />
                {/* Subtle scrim at bottom for text */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(8,9,14,0.65) 0%, rgba(8,9,14,0.15) 45%, transparent 70%)',
                  }}
                />
                {/* Info badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 24, left: 24,
                    background: 'rgba(8,9,14,0.55)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: 6,
                    padding: '10px 16px',
                    border: '1px solid rgba(236,233,76,0.18)',
                  }}
                >
                  <p
                    className="font-label"
                    style={{ fontSize: 15, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#ece94c', marginBottom: 3 }}
                  >
                    Est. 2021
                  </p>
                  <p className="font-body" style={{ fontSize: 15, color: '#f2f0fc', fontWeight: 500 }}>
                    Ontario, Canada
                  </p>
                </div>
                {/* Matthew 25 badge top-right */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20, right: 20,
                    background: '#ece94c',
                    borderRadius: 4,
                    padding: '5px 12px',
                  }}
                >
                  <p
                    className="font-label font-bold"
                    style={{ fontSize: 15, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0c0c14' }}
                  >
                    Matthew 25
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          3 — ABOUT (Apple canvas gray)
      ════════════════════════════════ */}
      <section style={{ background: '#f5f5f7', paddingTop: 112, paddingBottom: 112, overflow: 'hidden' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(40px, 6vw, 88px)', alignItems: 'center' }}>

            {/* Left: photo composition */}
            <div className="order-last lg:order-first">
            <Fade y={48} delay={0.05}>
              <div style={{ position: 'relative', height: 520 }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '80%', height: '68%',
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(12,12,20,0.12), 0 4px 16px rgba(12,12,20,0.08)',
                  }}
                >
                  <Image
                    src="/gcg3-contestants-stage.jpeg"
                    alt="GCG3 contestants on stage"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: 0, right: 0,
                    width: '54%', height: '46%',
                    borderRadius: 10,
                    overflow: 'hidden',
                    boxShadow: '0 24px 64px rgba(12,12,20,0.16)',
                  }}
                >
                  <Image
                    src="/gcg3-mc-stage.jpeg"
                    alt="GCG3 MC presenting on stage"
                    fill
                    className="object-cover"
                  />
                </div>

                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: '28%', left: '22%',
                    width: 40, height: 40,
                    background: '#ece94c',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '36%', left: '26%',
                    background: '#ffffff',
                    borderRadius: 8,
                    padding: '12px 16px',
                    boxShadow: '0 4px 24px rgba(12,12,20,0.12)',
                    border: '1px solid rgba(12,12,20,0.06)',
                  }}
                >
                  <p
                    className="font-label"
                    style={{ fontSize: 15, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#222b64' }}
                  >
                    Est. 2021
                  </p>
                  <p
                    className="font-body"
                    style={{ fontSize: 15, color: '#3a3a5c', marginTop: 3, fontWeight: 500 }}
                  >
                    Ontario, Canada
                  </p>
                </div>
              </div>
            </Fade>
            </div>

            {/* Right: narrative */}
            <div className="order-first lg:order-last" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <Fade>
                <p className="eyebrow-dark">Our Story</p>
              </Fade>

              <RevealLine delay={0.12}>
                <h2
                  className="font-display italic kern text-balance"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    lineHeight: 0.96,
                    letterSpacing: '-0.025em',
                    color: '#0c0c14',
                    fontWeight: 300,
                  }}
                >
                  A Community Built<br />
                  on Faith &amp;{' '}
                  <span style={{ color: '#222b64' }}>Talent</span>
                </h2>
              </RevealLine>

              <Fade delay={0.2}>
                <p
                  className="font-body font-light"
                  style={{ fontSize: 16, color: '#6b6b8a', lineHeight: 1.85 }}
                >
                  GCG3 was founded on one truth: every child carries
                  a God-given gift waiting to be discovered. We create a
                  platform where young people can fully express who God
                  made them to be.
                </p>
              </Fade>

              <Fade delay={0.28}>
                <dl style={{ borderTop: '1px solid rgba(12,12,20,0.08)' }}>
                  {[
                    { dt: 'Integrity',   dd: 'We do the right thing, always.'       },
                    { dt: 'Community',   dd: 'Every child gets an equal platform.'   },
                    { dt: 'Excellence',  dd: 'We celebrate every unique expression.' },
                  ].map((v) => (
                    <div
                      key={v.dt}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 20,
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(12,12,20,0.07)',
                      }}
                    >
                      <dt
                        className="font-label font-bold"
                        style={{ fontSize: 16, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0c0c14', minWidth: 100, flexShrink: 0 }}
                      >
                        {v.dt}
                      </dt>
                      <dd className="font-body" style={{ fontSize: 15, color: '#6b6b8a', lineHeight: 1.7 }}>
                        {v.dd}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Fade>

              <Fade delay={0.36}>
                <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                  <Link href="/about" className="btn-dark">Read Our Story →</Link>
                  <Link href="/programs" className="btn-outline-dark">Programs</Link>
                </div>
              </Fade>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          4 — PROGRAMS (deep indigo)
      ════════════════════════════════ */}
      <section style={{ background: '#0d1240', paddingTop: 96, paddingBottom: 72, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div className="wrap" style={{ marginBottom: 48 }}>
            <Fade>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, paddingBottom: 20, borderBottom: '1px solid rgba(242,240,252,0.07)' }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: 12 }}>What We Offer</p>
                  <h2
                    className="font-display italic kern"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 0.96, letterSpacing: '-0.025em', color: '#f2f0fc', fontWeight: 300 }}
                  >
                    Our Programs
                  </h2>
                </div>
                <Link href="/programs" className="btn-ghost hidden md:inline-flex" style={{ flexShrink: 0 }}>
                  View All →
                </Link>
              </div>
            </Fade>
          </div>

          <ProgramsGrid />

          <div className="text-center mt-6 md:hidden" style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Link href="/programs" className="btn-outline">View All Programs</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          5 — GALLERY (pure white)
      ════════════════════════════════ */}
      <section style={{ background: '#ffffff', paddingTop: 96, paddingBottom: 56, overflow: 'hidden' }}>
        <div className="wrap" style={{ marginBottom: 40 }}>
          <Fade>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <p className="eyebrow-dark" style={{ marginBottom: 12 }}>Our Community</p>
                <h2
                  className="font-display italic kern"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#0c0c14', fontWeight: 300 }}
                >
                  Real Moments.<br />Real Impact.
                </h2>
              </div>
              <p
                className="font-label hidden md:block"
                style={{ fontSize: 15, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(12,12,20,0.25)' }}
              >
                2024 Talent Show · Toronto
              </p>
            </div>
          </Fade>
        </div>

        {/* Photo strip — anchored left, reaches viewport edge */}
        <div
          className="scrollbar-hide"
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 4,
            paddingLeft:  'clamp(20px, 4vw, 64px)',
            paddingRight: 20,
            alignItems: 'flex-end',
          }}
        >
          {galleryPhotos.map((photo) => (
            <div
              key={photo.src}
              className="group"
              style={{
                flexShrink: 0,
                width: photo.w,
                height: photo.h,
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(12,12,20,0.14)',
                position: 'relative',
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                className="object-cover w-full h-full group-hover:scale-[1.06] transition-transform duration-700"
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(8,9,14,0.55) 0%, transparent 50%)',
                  opacity: 0,
                  transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
                className="group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          6 — EVENTS (canvas/cream)
      ════════════════════════════════ */}
      <section style={{ background: '#f5f5f7', paddingTop: 96, paddingBottom: 96, overflow: 'hidden', position: 'relative' }}>
        <span
          aria-hidden
          style={{
            position: 'absolute',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(8rem, 20vw, 14rem)',
            color: 'rgba(34,43,100,0.04)',
            top: -20, left: -10,
            letterSpacing: '-0.04em',
            userSelect: 'none', pointerEvents: 'none',
          }}
        >
          {/* 03 */}
        </span>

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <Fade>
            <div className="ruled-header-dark" style={{ marginBottom: 48 }}>
              <div style={{ flex: 1 }}>
                <p className="eyebrow-dark" style={{ marginBottom: 12 }}>Live from GCG3</p>
                <h2
                  className="font-display italic kern"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', lineHeight: 0.96, letterSpacing: '-0.025em', color: '#0c0c14', fontWeight: 300 }}
                >
                  Upcoming Events
                </h2>
              </div>
              <Link href="/events" className="btn-outline-dark hidden md:inline-flex" style={{ flexShrink: 0 }}>
                View All →
              </Link>
            </div>
          </Fade>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {upcomingEvents.map((event, i) => (
                <Fade key={event.id} delay={i * 0.07}>
                  <EventCard event={event} variant="light" />
                </Fade>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: '#ffffff',
                borderRadius: 16,
                border: '1px solid rgba(12,12,20,0.07)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <p className="font-display italic select-none" style={{ fontSize: '3.5rem', color: 'rgba(34,43,100,0.10)' }}>
                GCG3
              </p>
              <p className="font-body" style={{ fontSize: 15, color: '#6b6b8a', marginTop: 12 }}>
                Events coming soon — check back shortly.
              </p>
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link href="/events" className="btn-outline-dark">View All Events →</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          7 — CTA (electric yellow)
      ════════════════════════════════ */}
      <section style={{ background: '#ece94c', paddingTop: 96, paddingBottom: 96, overflow: 'hidden', position: 'relative' }}>
        <span
          aria-hidden
          className="font-display italic"
          style={{
            position: 'absolute',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            color: 'rgba(8,9,14,0.06)',
            top: '50%',
            left: '-2%',
            transform: 'translateY(-50%)',
            letterSpacing: '-0.03em',
            lineHeight: 0.85,
            whiteSpace: 'nowrap',
            fontWeight: 300,
            userSelect: 'none', pointerEvents: 'none',
          }}
        >
          God&apos;s Children
        </span>

        <div
          className="wrap"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 48,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p
                className="font-label font-bold"
                style={{ fontSize: 15, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(8,9,14,0.50)', marginBottom: 16 }}
              >
                Join Us in 2026
              </p>
              <h2
                className="font-display italic kern text-balance"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.035em',
                  color: '#08090e',
                  fontWeight: 300,
                }}
              >
                Your child&apos;s gifts<br />deserve a stage.
              </h2>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
              <Link
                href="/events"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  background: '#08090e',
                  color: '#ece94c',
                  whiteSpace: 'nowrap',
                  borderRadius: 4,
                }}
              >
                Register Now →
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '12px 24px',
                  background: 'transparent',
                  color: '#08090e',
                  border: '1px solid rgba(8,9,14,0.28)',
                  whiteSpace: 'nowrap',
                  borderRadius: 4,
                }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
