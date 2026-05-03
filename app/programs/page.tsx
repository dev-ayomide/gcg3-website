import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Programs - GCG3',
  description: 'Explore GCG3 programs - mentorship, book club, talent show, and leadership for young people.',
};

const programs = [
  {
    number: '01',
    title: 'Christian Musical Talent Show',
    ages: 'Ages 9-15',
    image: 'https://gcg3official.com/wp-content/uploads/2025/10/GCG3_talent_show.png',
    description:
      'The flagship GCG3 event - a stage for young performers to showcase God-given talents. Singing, dancing, spoken word, acting. Grand prize: $3,000.',
    href: '/events/gcg3-christian-musical-talent-show',
    highlights: ['Live performance', 'Multiple categories', 'Grand prize $3,000', 'Annual event'],
    featured: true,
  },
  {
    number: '02',
    title: 'Teens Mentorship Program',
    ages: 'Ages 12-17',
    image: 'https://gcg3official.com/wp-content/uploads/2023/09/GCG3-small-1.png',
    description:
      'Build strong relationships with mentors and peers while developing character, confidence, and God-given purpose. This program walks alongside teens through the critical years of identity formation.',
    href: '/events/gcg3-teen-mentorship-program',
    highlights: ['Weekly sessions', 'One-on-one mentoring', 'Group activities', 'Faith-based'],
    featured: false,
  },
  {
    number: '03',
    title: 'Teens Leadership Program',
    ages: 'Ages 10-17',
    image: 'https://gcg3official.com/wp-content/uploads/2021/06/14BE131A-B03B-470E-9A80-030B4D5354C9.png',
    description:
      'Developing self-leadership, intrapersonal intelligence, and self-awareness in young people. Equipping teens to lead themselves before leading others.',
    href: '/events/teen-leadership-program',
    highlights: ['Self-awareness', 'Emotional intelligence', 'Public speaking', 'Goal setting'],
    featured: false,
  },
  {
    number: '04',
    title: 'Reading Club',
    ages: 'All ages',
    image: 'https://gcg3official.com/wp-content/uploads/2021/04/pexels-mael-balland-3457273.jpg',
    description:
      'Holistic growth through books across genres. Zoom-based discussions that expand young minds and build a love for reading and critical thinking.',
    href: '/events/reading-club',
    highlights: ['Monthly selections', 'Zoom discussions', 'All ages welcome', 'Critical thinking'],
    featured: false,
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* -- Hero - near-black -- */}
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
        <div className="relative z-10 max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
          <p className="eyebrow" style={{ marginBottom: 24 }}>What We Offer</p>
          <h1
            className="font-display italic font-light text-text kern"
            style={{
              fontSize: 'clamp(44px, 8vw, 96px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              maxWidth: '18ch',
              marginBottom: 28,
            }}
          >
            Our Programs
          </h1>
          <p
            className="font-body font-light"
            style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.75, color: '#8e95c8', maxWidth: '44ch' }}
          >
            Purposeful programs designed to help children grow in faith, talent, and community.
          </p>
        </div>
      </section>

      {/* -- Programs list - alternating white/canvas -- */}
      {programs.map((prog, i) => (
        <section
          key={prog.title}
          style={{
            background: i % 2 === 0 ? '#ffffff' : '#f5f5f7',
            padding: 'clamp(56px, 7vw, 96px) 0',
          }}
        >
          <div className="max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
            {/* Featured badge */}
            {prog.featured && (
              <div style={{ marginBottom: 20 }}>
                <span
                  className="font-label font-bold uppercase"
                  style={{
                    fontSize: 15,
                    letterSpacing: '0.22em',
                    background: '#ece94c',
                    color: '#0c0c14',
                    padding: '5px 14px',
                    borderRadius: 3,
                  }}
                >
                  Flagship Program
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 lg:gap-16 items-start">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 'clamp(240px, 28vw, 400px)',
                  borderRadius: 12,
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <Image
                  src={prog.image}
                  alt={prog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              {/* Content */}
              <div style={{ paddingTop: 8 }}>
                <div className="flex items-baseline gap-3" style={{ marginBottom: 12 }}>
                  <span
                    className="font-heading font-extrabold select-none"
                    style={{ fontSize: 40, lineHeight: 1, color: 'rgba(34,43,100,0.08)' }}
                  >
                    {prog.number}
                  </span>
                  <span
                    className="font-label font-bold uppercase"
                    style={{
                      fontSize: 15,
                      letterSpacing: '0.20em',
                      padding: '4px 10px',
                      borderRadius: 4,
                      background: 'rgba(34,43,100,0.07)',
                      color: '#222b64',
                    }}
                  >
                    {prog.ages}
                  </span>
                </div>

                <h2
                  className="font-display italic font-light kern"
                  style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#0c0c14', marginBottom: 14 }}
                >
                  {prog.title}
                </h2>

                <p
                  className="font-body"
                  style={{ fontSize: 17, lineHeight: 1.85, color: '#6b6b8a', marginBottom: 24, maxWidth: '52ch' }}
                >
                  {prog.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3" style={{ marginBottom: 28 }}>
                  {prog.highlights.map((h) => (
                    <span
                      key={h}
                      className="font-body flex items-center gap-2"
                      style={{ fontSize: 16, color: '#3a3a5c' }}
                    >
                      <span
                        style={{ width: 4, height: 4, borderRadius: '50%', background: '#222b64', opacity: 0.4, flexShrink: 0 }}
                      />
                      {h}
                    </span>
                  ))}
                </div>

                {prog.featured ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={prog.href} className="btn-dark">Register Now →</Link>
                    {/* <Link href="/contact" className="btn-outline-dark">Ask a Question</Link> */}
                  </div>
                ) : (
                  <Link href={prog.href} className="btn-outline-dark">Learn More →</Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* -- CTA - near-black -- */}
      <section
        className="grain"
        style={{ background: '#08090e', padding: 'clamp(72px, 9vw, 120px) 0', textAlign: 'center' }}
      >
        <div className="max-w-2xl mx-auto px-5 md:px-10">
          <h2
            className="font-display italic font-light text-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}
          >
            Ready to participate?
          </h2>
          <p
            className="font-body font-light"
            style={{ fontSize: 16, lineHeight: 1.75, color: '#8e95c8', marginBottom: 40 }}
          >
            Register for an upcoming event or reach out to learn more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="btn-primary">View All Events →</Link>
            <Link href="/contact" className="btn-ghost" style={{ color: 'rgba(242,240,252,0.60)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
