import EventCard from '@/components/EventCard';
import { getUpcomingEvents, getFeaturedImage, getEventPrice, getEventDate, getEventLocation } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Events - GCG3',
  description: 'Browse upcoming GCG3 events - talent shows, mentorship programs, and more.',
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();
  const featured = events[0] ?? null;
  const rest = events.slice(1);

  return (
    <>
      <section
        style={{
          background: 'linear-gradient(180deg, #0b1035 0%, #121a4a 100%)',
          paddingTop: 132,
          paddingBottom: 72,
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-14">
          <p className="font-label font-bold" style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ece94c', marginBottom: 18 }}>
            GCG3 Events
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8 items-end">
            <h1 className="font-display italic" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#f2f0fc', lineHeight: 0.95 }}>
              Upcoming Events
            </h1>
            <p className="font-body" style={{ color: 'rgba(242,240,252,0.78)', fontSize: 18, lineHeight: 1.7 }}>
              Discover upcoming opportunities for children to grow in talent, confidence, and faith.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: '#f6f7fb', padding: '56px 0 84px' }}>
        <div className="max-w-[1320px] mx-auto px-5 md:px-10 lg:px-14">
          {featured && (() => {
            const img = getFeaturedImage(featured);
            const price = getEventPrice(featured);
            const date = getEventDate(featured);
            const location = getEventLocation(featured);
            return (
              <Link
                href={`/events/${featured.slug}`}
                className="block"
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid rgba(12,12,20,0.08)',
                  boxShadow: '0 10px 32px rgba(12,12,20,0.08)',
                  marginBottom: 36,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
                  <div className="relative" style={{ minHeight: 390, background: '#0f1644' }}>
                    {img ? (
                      <Image
                        src={img}
                        alt={featured.title.rendered.replace(/<[^>]+>/g, '')}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        priority
                      />
                    ) : null}
                    {price && (
                      <span className="font-label font-bold" style={{ position: 'absolute', left: 16, top: 16, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: 999, background: '#ece94c', color: '#0c0c14' }}>
                        {price}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: 'clamp(24px,3vw,38px)' }}>
                    <p className="font-label font-bold" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6b6b8a', marginBottom: 10 }}>
                      Featured Event
                    </p>
                    <h2 className="font-heading font-bold" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#0c0c14', lineHeight: 1.1, marginBottom: 18 }} dangerouslySetInnerHTML={{ __html: featured.title.rendered }} />
                    <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
                      {date && <p className="font-body" style={{ color: '#3a3a5c', fontSize: 16 }}>{date}</p>}
                      {location && <p className="font-body" style={{ color: '#3a3a5c', fontSize: 16 }}>{location}</p>}
                    </div>
                    <span className="font-label font-bold inline-block" style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', borderRadius: 8, padding: '12px 18px', background: '#222b64', color: '#fff' }}>
                      View Details 
                    </span>
                  </div>
                </div>
              </Link>
            );
          })()}

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold" style={{ fontSize: 22, color: '#0c0c14' }}>More Upcoming Events</h3>
            <span className="font-label font-bold" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6b6b8a' }}>{events.length} total</span>
          </div>

          {rest.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((event) => (
                <EventCard key={event.id} event={event} variant="light" />
              ))}
            </div>
          ) : (
            <div style={{ borderRadius: 14, background: '#fff', border: '1px solid rgba(12,12,20,0.08)', padding: '44px 24px', textAlign: 'center' }}>
              <p className="font-display italic" style={{ fontSize: '3.5rem', color: 'rgba(34,43,100,0.08)', textAlign: 'center', lineHeight: 1 }}>GCG3</p>
              <p className="font-body" style={{ color: '#6b6b8a', marginTop: 12, textAlign: 'center' }}>More events are on the way — check back soon or <a href="/contact" style={{ color: '#222b64', fontWeight: 600 }}>get in touch</a> to stay updated.</p>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#ffffff', padding: '72px 0 96px' }}>
        <div className="max-w-[760px] mx-auto px-5 md:px-10 text-center">
          <h2 className="font-display italic" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', color: '#0c0c14', lineHeight: 1.05, marginBottom: 14 }}>
            Need Help Choosing an Event?
          </h2>
          <p className="font-body" style={{ color: '#6b6b8a', fontSize: 17, lineHeight: 1.75, marginBottom: 30 }}>
            Reach out and we will help you find the best fit for your child.
          </p>
          <Link href="/contact" className="btn-dark">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
