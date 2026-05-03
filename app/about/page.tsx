import Link from 'next/link';
import { Fade, RevealLine } from '@/components/Reveal';

export const metadata = {
  title: 'About Us — GCG3',
  description: "Learn about GCG3's mission, vision, values, and the community we're building for young people.",
};

const coreValues = [
  { num: '01', label: 'Integrity',  description: 'We do the right thing, always — on stage and off.' },
  { num: '02', label: 'Fairness',   description: 'Every child gets an equal platform, no matter their background.' },
  { num: '03', label: 'Fun',        description: 'Joy is built into everything we do. If it isn\'t joyful, we rethink it.' },
  { num: '04', label: 'Creativity', description: 'We celebrate every unique expression — no two gifts look alike.' },
  { num: '05', label: 'Equality',   description: 'All gifts matter, all children belong.' },
];

const objectives = [
  {
    title: 'Promote the Kingdom of God',
    description: 'Every program, event, and interaction points young people back to their Creator.',
  },
  {
    title: "Enhance Children's Self-Esteem",
    description: 'We build confidence by giving children a stage, a voice, and a community that believes in them.',
  },
  {
    title: 'Radiate the Glory of God',
    description: 'Every gift expressed becomes an act of worship and a light to the world.',
  },
];

const PAD = '0 clamp(20px, 4vw, 64px)';

export default function AboutPage() {
  return (
    <>
      {/* ── Hero — near-black ── */}
      <section
        className="grain relative overflow-hidden"
        style={{ background: '#08090e', paddingTop: 140, paddingBottom: 96 }}
      >
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '60%',
            background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(34,43,100,0.30), transparent)',
          }}
        />
        <div className="relative z-10" style={{ maxWidth: 1760, margin: '0 auto', padding: PAD }}>
          <Fade>
            <p className="eyebrow" style={{ marginBottom: 24 }}>Who We Are</p>
          </Fade>
          <RevealLine delay={0.15}>
            <h1
              className="font-display italic font-light text-text kern"
              style={{
                fontSize: 'clamp(64px, 11vw, 140px)',
                lineHeight: 0.93,
                letterSpacing: '-0.03em',
                maxWidth: '16ch',
                marginBottom: 32,
              }}
            >
              About GCG3
            </h1>
          </RevealLine>
          <Fade delay={0.35}>
            <p
              className="font-body font-light"
              style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.75, color: '#8e95c8', maxWidth: '44ch' }}
            >
              God&apos;s Children Got Great Gifts — a community built on faith, talent, and love for every young heart.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Mission & Vision — white, full-width editorial ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px, 9vw, 120px) 0' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: PAD }}>
          <Fade>
            <p
              className="font-label font-bold uppercase"
              style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 56 }}
            >
              Our Foundation
            </p>
          </Fade>

          {/* Side-by-side Mission / Vision — no cards, just columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 6vw, 96px)' }}
               className="grid-cols-1 md:grid-cols-2">
            <Fade delay={0.1}>
              <div style={{ borderTop: '2px solid #0c0c14', paddingTop: 32 }}>
                <p
                  className="font-label font-bold uppercase"
                  style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 20 }}
                >
                  Our Mission
                </p>
                <h2
                  className="font-display italic font-light kern"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1, color: '#0c0c14', marginBottom: 20 }}
                >
                  Why We Exist
                </h2>
                <p className="font-body" style={{ fontSize: 18, lineHeight: 1.85, color: '#6b6b8a' }}>
                  To create a platform where young children can fully express their individual talents —
                  because every child carries something God placed inside them that the world needs to see.
                </p>
              </div>
            </Fade>

            <Fade delay={0.22}>
              <div style={{ borderTop: '2px solid #ece94c', paddingTop: 32 }}>
                <p
                  className="font-label font-bold uppercase"
                  style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 20 }}
                >
                  Our Vision
                </p>
                <h2
                  className="font-display italic font-light kern"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.1, color: '#0c0c14', marginBottom: 20 }}
                >
                  Where We&apos;re Going
                </h2>
                <p className="font-body" style={{ fontSize: 18, lineHeight: 1.85, color: '#6b6b8a' }}>
                  To showcase the talents God has deposited in young children — building a generation
                  that knows who they are, whose they are, and what they carry.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── Scripture — yellow ── */}
      <section style={{ background: '#ece94c', padding: 'clamp(64px, 8vw, 112px) 0', overflow: 'hidden', position: 'relative' }}>
        <span
          aria-hidden
          className="font-display italic select-none"
          style={{
            position: 'absolute', top: '50%', left: '-2%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(8rem, 20vw, 16rem)',
            color: 'rgba(8,9,14,0.05)',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          Matthew 25
        </span>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: PAD, position: 'relative', zIndex: 1 }}>
          <blockquote
            className="font-display italic font-light kern"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              lineHeight: 1.5,
              color: '#0c0c14',
              maxWidth: '30ch',
              marginBottom: 24,
            }}
          >
            &ldquo;So he who had received five talents came and brought five other talents,
            saying, &lsquo;Lord, you delivered to me five talents; look, I have gained
            five more talents besides them.&rsquo;&rdquo;
          </blockquote>
          <cite
            className="font-label font-bold not-italic"
            style={{ fontSize: 16, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(12,12,20,0.50)' }}
          >
            Matthew 25:20
          </cite>
        </div>
      </section>

      {/* ── Objectives — canvas, editorial numbered list ── */}
      <section style={{ background: '#f5f5f7', padding: 'clamp(72px, 9vw, 120px) 0' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: PAD }}>
          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 64, borderBottom: '1px solid rgba(12,12,20,0.10)', paddingBottom: 24 }}>
            <div>
              <p
                className="font-label font-bold uppercase"
                style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 12 }}
              >
                What We Do
              </p>
              <h2
                className="font-display italic font-light kern"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.96, letterSpacing: '-0.025em', color: '#0c0c14' }}
              >
                Our Objectives
              </h2>
            </div>
            <span
              className="font-heading font-extrabold select-none"
              style={{ fontSize: 'clamp(4rem, 9vw, 7rem)', lineHeight: 1, color: 'rgba(34,43,100,0.07)', letterSpacing: '-0.04em', flexShrink: 0 }}
            >
              {/* 03 */}
            </span>
          </div>

          {/* Numbered rows — full width, editorial */}
          <div>
            {objectives.map((obj, i) => (
              <Fade key={obj.title} delay={i * 0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr',
                  gap: 'clamp(24px, 5vw, 64px)',
                  alignItems: 'start',
                  padding: 'clamp(28px, 4vw, 48px) 0',
                  borderBottom: '1px solid rgba(12,12,20,0.08)',
                }}
              >
                {/* Number */}
                <div
                  className="font-display italic"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    lineHeight: 1,
                    color: 'rgba(34,43,100,0.15)',
                    letterSpacing: '-0.04em',
                    fontWeight: 300,
                    paddingTop: 4,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Title */}
                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: '#0c0c14', lineHeight: 1.2, paddingTop: 6 }}
                >
                  {obj.title}
                </h3>
                {/* Description */}
                <p
                  className="font-body"
                  style={{ fontSize: 18, lineHeight: 1.85, color: '#6b6b8a' }}
                >
                  {obj.description}
                </p>
              </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values — white, bold stacked list ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(72px, 9vw, 120px) 0' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: PAD }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, marginBottom: 64 }}>
            <div style={{ flex: 1 }}>
              <p
                className="font-label font-bold uppercase"
                style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 12 }}
              >
                What We Stand For
              </p>
              <h2
                className="font-display italic font-light kern"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.96, letterSpacing: '-0.025em', color: '#0c0c14' }}
              >
                Core Values
              </h2>
            </div>
          </div>

          {/* Values — horizontal rows, full width, no cards */}
          <div style={{ borderTop: '1px solid rgba(12,12,20,0.09)' }}>
            {coreValues.map((val, i) => (
              <Fade key={val.label} delay={i * 0.08}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '52px 1fr 1fr',
                  gap: 'clamp(20px, 4vw, 56px)',
                  alignItems: 'center',
                  padding: 'clamp(20px, 3vw, 32px) 0',
                  borderBottom: '1px solid rgba(12,12,20,0.08)',
                }}
              >
                {/* Number */}
                <span
                  className="font-label font-bold"
                  style={{ fontSize: 16, letterSpacing: '0.12em', color: 'rgba(34,43,100,0.25)' }}
                >
                  {val.num}
                </span>
                {/* Label */}
                <h3
                  className="font-heading font-bold"
                  style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)', color: '#0c0c14', letterSpacing: '-0.01em' }}
                >
                  {val.label}
                </h3>
                {/* Description */}
                <p
                  className="font-body"
                  style={{ fontSize: 18, lineHeight: 1.8, color: '#6b6b8a' }}
                >
                  {val.description}
                </p>
              </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — near-black ── */}
      <section
        className="grain"
        style={{ background: '#08090e', padding: 'clamp(72px, 9vw, 120px) 0', overflow: 'hidden', position: 'relative' }}
      >
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: PAD }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 40 }}>
            <div>
              <p
                className="font-label font-bold uppercase"
                style={{ fontSize: 16, letterSpacing: '0.28em', color: 'rgba(242,240,252,0.35)', marginBottom: 16 }}
              >
                Get Involved
              </p>
              <h2
                className="font-display italic font-light text-text kern"
                style={{ fontSize: 'clamp(2.75rem, 6vw, 4.5rem)', lineHeight: 0.96, letterSpacing: '-0.03em' }}
              >
                Ready to participate?
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0, justifyContent: 'center' }}>
              <Link href="/events" className="btn-primary">Explore Events →</Link>
              <Link href="/contact" className="btn-ghost">Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
