'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const programs = [
  {
    title: 'Christian Musical Talent Show',
    tag: 'Flagship · Ages 9–15',
    description: 'The signature GCG3 stage — singing, dancing, spoken word, acting. Grand prize: $3,000.',
    href: '/events/gcg3-christian-musical-talent-show',
    // image: 'https://gcg3official.com/wp-content/uploads/2025/10/GCG3_talent_show.png',
    image: 'https://cms.gcg3official.com/wp-content/uploads/2026/05/GCG3-1.png',
    featured: true,
  },
  {
    title: 'Teens Mentorship',
    tag: 'Ages 12–17',
    description: 'Boot camp, mentoring, and peer community for teenagers finding their identity in Christ.',
    href: '/events/gcg3-teen-mentorship-program',
    image: 'https://gcg3official.com/wp-content/uploads/2023/09/GCG3-small-1.png',
    featured: false,
  },
  {
    title: 'Leadership Program',
    tag: 'Ages 10–17',
    description: 'Self-leadership, emotional intelligence, and real-world skills.',
    href: '/events/teen-leadership-program',
    image: 'https://gcg3official.com/wp-content/uploads/2021/06/14BE131A-B03B-470E-9A80-030B4D5354C9.png',
    featured: false,
  },
  {
    title: 'Reading Club',
    tag: 'All Ages',
    description: 'Zoom-based book discussions that expand minds and build a love of learning.',
    href: '/events/reading-club',
    image: 'https://gcg3official.com/wp-content/uploads/2021/04/pexels-mael-balland-3457273.jpg',
    featured: false,
  },
];

const gridClasses = ['prog-grid-flagship', 'prog-grid-b', 'prog-grid-c', 'prog-grid-d'];

function TiltCard({
  href, gridClass, staggerDelay, featured, children,
}: {
  href: string;
  gridClass: string;
  staggerDelay: number;
  featured: boolean;
  children: React.ReactNode;
}) {
  const wrapRef   = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Staggered entrance animation via IntersectionObserver
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          if (!el) return;
          el.style.transition = `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${staggerDelay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${staggerDelay}s`;
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0)';
          // Clear entrance transition after it plays so tilt can work cleanly
          setTimeout(() => { if (el) el.style.transition = ''; }, (staggerDelay + 0.9) * 1000);
        }, 60);
        io.disconnect();
      }
    }, { threshold: 0.06 });

    io.observe(el);
    return () => io.disconnect();
  }, [staggerDelay]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }

    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left)  / rect.width;   // 0–1
    const y = (e.clientY - rect.top)   / rect.height;  // 0–1
    const tX = (y - 0.5) * -14;   // -7° to +7°
    const tY = (x - 0.5) *  14;

    // No transition during tracking — pure JS responsiveness
    wrap.style.transition = 'box-shadow 0.2s ease';
    wrap.style.transform  = `perspective(1000px) rotateX(${tX}deg) rotateY(${tY}deg) translateY(-7px) scale(1.018)`;
    // Shadow shifts to mimic a top-left light source responding to tilt angle
    wrap.style.boxShadow  = `${tY * 3}px ${(-tX * 3) + 24}px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(236,233,76,0.22)`;
  };

  const handleMouseLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.65s cubic-bezier(0.16,1,0.3,1)';
    wrap.style.transform  = 'translateY(0)';
    wrap.style.boxShadow  = '';
    leaveTimer.current = setTimeout(() => { if (wrap) wrap.style.transition = ''; }, 650);
  };

  return (
    <div
      ref={wrapRef}
      className={gridClass}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', opacity: 0, transform: 'translateY(40px)' }}
    >
      <Link href={href} className="prog-card-g" style={{ display: 'block', height: '100%' }}>
        {children}
      </Link>
    </div>
  );
}

export default function ProgramsGrid() {
  return (
    <div
      className="prog-grid"
      style={{
        paddingLeft:  'clamp(20px, 4vw, 64px)',
        paddingRight: 'clamp(20px, 4vw, 64px)',
        paddingBottom: 8,
      }}
    >
      {programs.map((prog, i) => (
        <TiltCard
          key={prog.title}
          href={prog.href}
          gridClass={gridClasses[i]}
          staggerDelay={i * 0.10}
          featured={prog.featured}
        >
          {prog.image && (
            <div className="prog-card-g-img">
              <Image src={prog.image} alt={prog.title} fill className="object-cover" />
            </div>
          )}
          <div className="prog-card-g-overlay" />
          {prog.featured && <span className="prog-card-g-badge">Flagship</span>}
          <div className="prog-card-g-content">
            <p className="prog-card-g-tag">{prog.tag}</p>
            <h3 className="prog-card-g-title">{prog.title}</h3>
            <span className="prog-card-g-divider" />
            <p className="prog-card-g-desc">{prog.description}</p>
            <span className="prog-card-g-cta">Learn More →</span>
          </div>
        </TiltCard>
      ))}
    </div>
  );
}
