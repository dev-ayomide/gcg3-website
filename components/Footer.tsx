'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const groups = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Programs', href: '/programs' },
      { label: 'Events', href: '/events' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Talent Show', href: '/events/gcg3-christian-musical-talent-show' },
      { label: 'Teens Mentorship', href: '/events/gcg3-teen-mentorship-program' },
      { label: 'Leadership', href: '/events/teen-leadership-program' },
      { label: 'Reading Club', href: '/events/reading-club' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/gcg3canada' },
      { label: 'Instagram', href: 'https://www.instagram.com/gcg3canada/' },
      { label: 'YouTube', href: 'https://www.youtube.com/channel/UCcfJ_NkOPpXolDENWTnQchg' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '416-858-4455', href: 'tel:4168584455' },
      { label: 'gcg3official@gmail.com', href: 'mailto:gcg3official@gmail.com' },
      { label: 'Suite 201a, 7581 Jane St', href: '#' },
      { label: 'Ontario, Canada', href: '#' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="relative overflow-hidden" style={{ background: '#08090e', fontFamily: '"Syne", sans-serif' }}>

      {/* Top accent line */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(236,233,76,0.35) 25%, rgba(236,233,76,0.35) 75%, transparent)' }} />

      {/* Yellow glow at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: 220, background: 'linear-gradient(to top, rgba(236,233,76,0.055), transparent)', zIndex: 0 }}
      />

      {/* Massive GCG3 watermark */}
      <p
        aria-hidden
        className="pointer-events-none select-none absolute left-1/2 -translate-x-1/2 font-syne font-bold uppercase"
        style={{
          bottom: '-0.12em',
          fontSize: 'clamp(48px, 15vw, 160px)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'rgba(242,240,252,0.04)',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        GCG3
      </p>

      {/* Main grid */}
      <div
        className="relative"
        style={{ zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: 'clamp(56px, 7vw, 96px) clamp(20px, 4vw, 56px) 0' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-14 lg:gap-20">

          {/* ── Left: brand + headline + email ── */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-10 group w-fit">
              <div
                className="relative flex-shrink-0"
                style={{ width: 84, height: 84 }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 10,
                    background: 'radial-gradient(circle at 30% 30%, rgba(236,233,76,0.12), rgba(8,9,14,0) 45%)',
                    filter: 'blur(10px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
                <Image
                  src="/GCG3-logo.png"
                  alt="GCG3 logo"
                  fill
                  className="object-contain"
                  style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.45))', zIndex: 1 }}
                />
              </div>
            </Link>

            {/* Headline */}
            <h2
              className="font-syne font-bold text-text leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', marginBottom: 16 }}
            >
              Stay in{' '}
              <em className="not-italic" style={{ color: '#ece94c' }}>faith.</em>
            </h2>
            <p
              className="font-body leading-relaxed"
              style={{ fontSize: 14, color: 'rgba(242,240,252,0.50)', maxWidth: '34ch', marginBottom: 36 }}
            >
              News, events &amp; inspiration for the GCG3 community — delivered to your inbox.
            </p>

            {/* Email — underline only */}
            {submitted ? (
              <p
                className="font-syne font-semibold"
                style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ece94c' }}
              >
                ✓ You&apos;re on the list
              </p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex items-center gap-3 pb-2.5"
                style={{ borderBottom: '1px solid rgba(242,240,252,0.18)' }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 min-w-0 bg-transparent outline-none font-body text-text"
                  style={{
                    fontSize: 15,
                    color: '#f2f0fc',
                    caretColor: '#ece94c',
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex-shrink-0 font-syne font-bold text-muted hover:text-accent transition-colors"
                  style={{ fontSize: 16, lineHeight: 1 }}
                >
                  →
                </button>
              </form>
            )}

            {/* Social */}
            <div className="flex gap-2 mt-8">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/gcg3canada', icon: 'facebook' },
                { label: 'YouTube', href: 'https://www.youtube.com/channel/UCcfJ_NkOPpXolDENWTnQchg', icon: 'youtube' },
                { label: 'Instagram', href: 'https://www.instagram.com/gcg3canada/', icon: 'instagram' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border flex items-center justify-center text-muted hover:text-accent hover:border-accent/40 transition-all duration-200"
                  style={{ borderColor: 'rgba(242,240,252,0.10)', borderRadius: 6 }}
                >
                  {icon === 'facebook' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                  {icon === 'youtube' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )}
                  {icon === 'instagram' && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: 4-column link groups ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h3
                  className="font-syne font-semibold uppercase text-text"
                  style={{ fontSize: 14, letterSpacing: '0.18em', marginBottom: 18, opacity: 0.9 }}
                >
                  {group.title}
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body transition-colors"
                        style={{ fontSize: 14, color: 'rgba(242,240,252,0.50)', lineHeight: 1.4 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(242,240,252,0.90)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(242,240,252,0.50)'; }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-14"
          style={{ borderTop: '1px solid rgba(242,240,252,0.06)', paddingTop: 24, paddingBottom: 28 }}
        >
          <p
            className="font-syne"
            style={{ fontSize: 14, color: 'rgba(242,240,252,0.28)', letterSpacing: '0.04em' }}
          >
            © {new Date().getFullYear()} GCG3 — God&apos;s Children Got Great Gifts. All rights reserved.
          </p>
          <p
            className="font-syne font-semibold uppercase"
            style={{ fontSize: 12, letterSpacing: '0.24em', color: 'rgba(242,240,252,0.18)' }}
          >
            Faith · Talent · Community
          </p>
        </div>
      </div>
    </footer>
  );
}
