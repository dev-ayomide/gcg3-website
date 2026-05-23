import {
  getEvent,
  getFeaturedImage,
  getEventPrice,
  getEventDate,
  getEventLocation,
  getEventPageData,
  isDateTextPast,
  isEventPast,
} from '@/lib/wordpress';
import EventRegistrationForm from '@/components/EventRegistrationForm';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function parseDateParts(dateValue: string | null): { month: string; day: string; line1: string; line2: string | null } | null {
  if (!dateValue) return null;
  const raw = dateValue.trim();
  if (!raw) return null;

  const normalized = raw.replace(/\s+/g, ' ');
  const parsed = new Date(normalized);

  if (!Number.isNaN(parsed.getTime())) {
    const month = parsed.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = parsed.toLocaleString('en-US', { day: 'numeric' });
    const line1 = parsed.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const line2 = parsed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { month, day, line1, line2 };
  }

  const pieces = normalized.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})(?:\s+(\d{1,2}:\d{2}\s*(?:am|pm)?))?/i);
  if (!pieces) return { month: 'DATE', day: '-', line1: normalized, line2: null };

  const dd = Number(pieces[1]);
  const mm = Number(pieces[2]);
  const yyyy = Number(pieces[3].length === 2 ? `20${pieces[3]}` : pieces[3]);
  const time = pieces[4] || null;
  const fallbackDate = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(fallbackDate.getTime())) return { month: 'DATE', day: '-', line1: normalized, line2: null };

  const month = fallbackDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = fallbackDate.toLocaleString('en-US', { day: 'numeric' });
  const line1 = fallbackDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  return { month, day, line1, line2: time };
}


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) return { title: 'Event Not Found - GCG3' };
  const title = event.title?.rendered?.replace(/<[^>]+>/g, '') ?? 'Event';
  return {
    title: `${title} - GCG3`,
    description:
      event.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim().slice(0, 160) ??
      'View event details and register on GCG3.',
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  if (!event) notFound();

  const image = getFeaturedImage(event);
  const titleText = event.title.rendered.replace(/<[^>]+>/g, '');
  const pageData = await getEventPageData(event);
  const price = pageData.registrationFeeText || getEventPrice(event);

  const date = getEventDate(event) || pageData.dateText;
  const location = getEventLocation(event) || pageData.locationText;
  const dateParts = parseDateParts(date);

  const isPastByMetadata = isEventPast(event);
  const isPastByVisibleDate = isDateTextPast(date);
  const isPast = isPastByMetadata || isPastByVisibleDate;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(1200px 700px at 20% 0%, rgba(35, 72, 115, 0.22) 0%, rgba(22, 21, 27, 1) 60%), linear-gradient(180deg, #18171dff 0%, #181922ff 100%)',
      }}
    >
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-14" style={{ paddingTop: 108, paddingBottom: 64 }}>
        <div className="flex items-center gap-2" style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.62)' }}>Home</Link>
          <span>/</span>
          <Link href="/events" style={{ color: 'rgba(255,255,255,0.62)' }}>Events</Link>
          <span>/</span>
          <span style={{ color: '#fff' }}>{titleText}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-8" style={{ marginTop: 18 }}>
          <aside>
            <div
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="relative flex items-center justify-center" style={{ height: 620 }}>
                {image ? (
                  <Image src={image} alt={titleText} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 420px" priority />
                ) : (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#3f2b23,#1d1719)' }} />
                )}
              </div>
            </div>
          </aside>

          <main>
            <div
              style={{
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(6px)',
                padding: '20px clamp(16px,2.5vw,28px)',
              }}
            >
              <div style={{ marginBottom: 18 }}>
                <span
                  className="font-label font-semibold uppercase"
                  style={{
                    display: 'inline-block',
                    fontSize: 11,
                    letterSpacing: '0.18em',
                    borderRadius: 999,
                    padding: '6px 12px',
                    color: isPast ? 'rgba(255,255,255,0.85)' : '#1f1518',
                    background: isPast ? 'rgba(173,173,183,0.4)' : '#f7efe4',
                  }}
                >
                  {isPast ? 'Event Ended' : 'Upcoming Event'}
                </span>
                <h1 className="font-heading font-semibold" style={{ color: '#fff', fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)', lineHeight: 1.03, marginTop: 14 }}>
                  {titleText}
                </h1>
              </div>

              <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dateParts && (
                  <div className="flex items-start gap-4">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 8, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.78)', fontWeight: 600 }}>{dateParts.month}</span>
                      <span style={{ fontSize: 15, lineHeight: 1, color: '#fff', fontWeight: 600 }}>{dateParts.day}</span>
                    </div>
                    <div>
                      <p style={{ color: '#fff', fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)', fontWeight: 600, lineHeight: 1.25 }}>{dateParts.line1}</p>
                      {dateParts.line2 && <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 600 }}>{dateParts.line2}</p>}
                      {price && <p style={{ color: '#ece94c', fontSize: 16, fontWeight: 600, marginTop: 4 }}>{price}</p>}
                    </div>
                  </div>
                )}

                {location && (
                  <div className="flex items-start gap-4">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="#ffffff" aria-hidden>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#fff', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)', fontWeight: 600, lineHeight: 1.3 }}>{location}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* payment banner removed — events are handled as free or via registration flow */}

              {!isPast ? (
                <section id="registration-form" style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontWeight: 600, fontSize: 16 }}>
                    Registration
                  </div>
                  <div style={{ padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div
                      style={{
                        borderRadius: 8,
                        background: 'rgba(236,233,76,0.06)',
                        border: '1px solid rgba(236,233,76,0.18)',
                        padding: '12px 14px',
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="#ece94c" style={{ flexShrink: 0, marginTop: 2 }}>
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {/* e-transfer instructions removed — registration is free or handled separately */}
                    </div>
                    <EventRegistrationForm eventName={titleText} />
                  </div>
                </section>
              ) : (
                <section style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.05)', padding: 22, textAlign: 'center' }}>
                  <p style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Registration Closed</p>
                  <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: 16 }}>This event has ended. Please check upcoming events.</p>
                  <Link href="/events" style={{ display: 'inline-block', background: '#fff', color: '#231a1d', padding: '10px 18px', borderRadius: 10, fontWeight: 700 }}>
                    View All Events
                  </Link>
                </section>
              )}
            </div>

            {event.content?.rendered && (
              <section
                style={{
                  marginTop: 16,
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '22px 24px',
                }}
              >
                <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 600, marginBottom: 10 }}>About Event</h2>
                <div style={{ color: 'rgba(255,255,255,0.86)', lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: event.content.rendered }} />
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
