'use client';

import Link from 'next/link';
import Image from 'next/image';
import { WPEvent } from '@/types/wp';
import { getFeaturedImage, getEventPrice, getEventDate, getEventLocation, isEventPast } from '@/lib/wordpress';

interface EventCardProps {
  event: WPEvent;
  variant?: 'light' | 'dark';
}

export default function EventCard({ event, variant = 'light' }: EventCardProps) {
  const image    = getFeaturedImage(event);
  const price    = getEventPrice(event);
  const date     = getEventDate(event);
  const location = getEventLocation(event);
  const ended    = isEventPast(event);
  const isFree   = price?.toLowerCase() === 'free';
  const isLight  = variant === 'light';

  return (
    <div
      className="group overflow-hidden"
      style={{
        background:   isLight ? '#ffffff' : '#1a1f60',
        borderRadius: 14,
        border:       isLight ? '1px solid rgba(12,12,20,0.08)' : '1px solid rgba(242,240,252,0.07)',
        boxShadow:    isLight ? 'var(--shadow-sm)' : 'none',
        transition:   'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform   = 'translateY(-5px)';
        el.style.boxShadow   = isLight
          ? '0 12px 40px rgba(12,12,20,0.11), 0 4px 12px rgba(12,12,20,0.07)'
          : '0 16px 48px rgba(0,0,0,0.55)';
        el.style.borderColor = isLight
          ? 'rgba(12,12,20,0.14)'
          : 'rgba(236,233,76,0.30)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform   = 'translateY(0)';
        el.style.boxShadow   = isLight ? 'var(--shadow-sm)' : 'none';
        el.style.borderColor = isLight
          ? 'rgba(12,12,20,0.08)'
          : 'rgba(242,240,252,0.07)';
      }}
    >
      {/* ── Image ── */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: 252, background: isLight ? '#0d1240' : '#0d1240' }}
      >
        {image ? (
          <Image
            src={image}
            alt={event.title.rendered}
            fill
            className="object-contain"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: isLight
                ? 'linear-gradient(135deg, #eeeef5 0%, #d8d8ec 100%)'
                : 'linear-gradient(135deg, #0d1240 0%, #1c2460 100%)',
            }}
          >
            <span
              className="font-display italic select-none"
              style={{
                fontSize: 40,
                color: isLight ? 'rgba(34,43,100,0.10)' : 'rgba(236,233,76,0.07)',
                letterSpacing: '-0.02em',
              }}
            >
              GCG3
            </span>
          </div>
        )}

        {/* Price badge — only shown when price is known */}
        {price && (
          <span
            className="absolute top-3 left-3 font-label font-bold"
            style={{
              fontSize: 14,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '5px 13px',
              borderRadius: 100,
              background: isFree ? 'rgba(16,185,129,0.92)' : (isLight ? '#222b64' : '#ece94c'),
              color:      isFree ? '#ffffff'               : (isLight ? '#ffffff' : '#0c0c14'),
              boxShadow:  '0 2px 8px rgba(0,0,0,0.22)',
            }}
          >
            {price}
          </span>
        )}
      </div>

      {/* ── Accent stripe ── */}
      <div style={{
        height: 3,
        background: isLight
          ? 'linear-gradient(to right, #222b64 0%, rgba(34,43,100,0) 100%)'
          : 'linear-gradient(to right, #ece94c 0%, rgba(236,233,76,0) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{ padding: 24 }}>
        <h3
          className="font-heading font-semibold line-clamp-2"
          style={{
            fontSize: 15,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color:       isLight ? '#0c0c14' : '#f2f0fc',
            marginBottom: 14,
          }}
          dangerouslySetInnerHTML={{ __html: event.title.rendered }}
        />

        {/* Meta pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 22 }}>
          {date && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 11px',
              borderRadius: 100,
              width: 'fit-content',
              background: isLight ? 'rgba(34,43,100,0.07)' : 'rgba(236,233,76,0.08)',
              border:     isLight ? '1px solid rgba(34,43,100,0.11)' : '1px solid rgba(236,233,76,0.16)',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2"
                   stroke={isLight ? '#222b64' : '#ece94c'}>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: isLight ? '#3a3a5c' : '#b8bde4' }}>
                {date}
              </span>
            </span>
          )}
          {location && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '5px 11px',
              borderRadius: 100,
              width: 'fit-content',
              background: isLight ? 'rgba(34,43,100,0.07)' : 'rgba(236,233,76,0.08)',
              border:     isLight ? '1px solid rgba(34,43,100,0.11)' : '1px solid rgba(236,233,76,0.16)',
            }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" strokeWidth="2"
                   stroke={isLight ? '#222b64' : '#ece94c'}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="font-body" style={{ fontSize: 15, fontWeight: 500, color: isLight ? '#3a3a5c' : '#b8bde4' }}>
                {location}
              </span>
            </span>
          )}
        </div>

        {/* CTA button */}
        {ended ? (
          <span
            className="font-label font-bold inline-flex items-center"
            style={{
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '11px 22px',
              borderRadius: 6,
              background: isLight ? 'rgba(108,108,128,0.18)' : 'rgba(255,255,255,0.18)',
              color: isLight ? '#5f5f7b' : 'rgba(242,240,252,0.75)',
              display: 'inline-block',
              cursor: 'not-allowed',
            }}
          >
            Event Ended
          </span>
        ) : (
          <Link
            href={`/events/${event.slug}`}
            className="font-label font-semibold inline-flex items-center"
            style={{
              fontSize:        13,
              letterSpacing:   '0.14em',
              textTransform:   'uppercase',
              padding:         '11px 22px',
              borderRadius:    6,
              background:      isLight ? '#222b64' : '#ece94c',
              color:           isLight ? '#ffffff'  : '#0c0c14',
              transition:      'opacity 0.2s',
              display:         'inline-block',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            Register Now →
          </Link>
        )}
      </div>
    </div>
  );
}
