'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events',   href: '/events' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
];

const EASING   = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = '450ms';

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Fixed header — full-width at top → floating pill on scroll ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        style={{
          paddingTop:   scrolled ? '12px' : '0',
          paddingLeft:  scrolled ? '16px' : '0',
          paddingRight: scrolled ? '16px' : '0',
          transition: `padding ${DURATION} ${EASING}`,
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{
            maxWidth:     scrolled ? '1100px' : '100%',
            height:       scrolled ? '72px' : '100px',
            paddingLeft:  scrolled ? '20px' : 'clamp(20px, 4vw, 56px)',
            paddingRight: scrolled ? '20px' : 'clamp(20px, 4vw, 56px)',
            borderRadius: scrolled ? '9999px' : '0',
            background:   scrolled
              ? 'rgba(13,18,64,0.96)'
              : 'transparent',
            backdropFilter:      scrolled ? 'blur(24px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
            border: scrolled
              ? '1px solid rgba(236,233,76,0.10)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 16px 56px rgba(0,0,0,0.60), 0 4px 16px rgba(0,0,0,0.30)'
              : 'none',
            transition: [
              `max-width ${DURATION} ${EASING}`,
              `height ${DURATION} ${EASING}`,
              `padding ${DURATION} ${EASING}`,
              `border-radius ${DURATION} ${EASING}`,
              `background ${DURATION} ${EASING}`,
              `border-color ${DURATION} ${EASING}`,
              `box-shadow ${DURATION} ${EASING}`,
            ].join(', '),
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0" aria-label="GCG3 Home">
            <div className="relative flex-shrink-0" style={{ width: scrolled ? 64 : 96, height: scrolled ? 40 : 60, transition: `width ${DURATION} ${EASING}, height ${DURATION} ${EASING}` }}>
              <Image src="https://gcg3official.com/wp-content/uploads/2021/04/GCG3-New-Site-Logo.gif" alt="GCG3" fill className="object-cover" unoptimized />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className="relative px-3 py-1.5 rounded-lg font-syne font-medium transition-colors duration-200"
                  style={{
                    fontSize: 13,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? '#ece94c' : 'rgba(242,240,252,0.55)',
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(242,240,252,0.95)'; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(242,240,252,0.55)'; }}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent" style={{ borderRadius: '50%' }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <Link
              href="/events"
              className="font-syne font-bold inline-flex items-center transition-all duration-300"
              style={{
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: scrolled ? '7px 18px' : '9px 22px',
                borderRadius: '9999px',
                background: '#ece94c',
                color: '#0c0c14',
              }}
            >
              Register Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-9 h-9 z-[110] relative flex-shrink-0"
          >
            <span className="block h-px bg-text" style={{ width: 22, transform: menuOpen ? 'rotate(45deg) translate(0px, 5.5px)' : 'none', transition: `transform 0.3s ${EASING}` }} />
            <span className="block h-px bg-text" style={{ width: 16, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
            <span className="block h-px bg-text" style={{ width: 22, transform: menuOpen ? 'rotate(-45deg) translate(0px, -5.5px)' : 'none', transition: `transform 0.3s ${EASING}` }} />
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        className="fixed inset-0 z-[100] md:hidden flex flex-col"
        style={{
          background: 'rgba(8,9,14,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: `opacity 0.35s ${EASING}, transform 0.4s ${EASING}`,
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 flex-shrink-0" style={{ height: 72 }}>
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <div className="relative w-28 h-18">
              <Image src="https://gcg3official.com/wp-content/uploads/2021/04/GCG3-New-Site-Logo.gif" alt="GCG3" fill className="object-cover" unoptimized />
            </div>
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center relative">
            <span className="absolute block w-5 h-px bg-text" style={{ transform: 'rotate(45deg)' }} />
            <span className="absolute block w-5 h-px bg-text" style={{ transform: 'rotate(-45deg)' }} />
          </button>
        </div>

        {/* Nav links — Fraunces italic large */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-0" aria-label="Mobile navigation">
          {navLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display italic font-light text-text hover:text-accent transition-colors block"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 3.75rem)',
                  lineHeight: 1.1,
                  color: active ? '#ece94c' : undefined,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.45s ${EASING} ${0.08 + i * 0.05}s, transform 0.45s ${EASING} ${0.08 + i * 0.05}s`,
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div
            className="mt-8"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.45s ${EASING} 0.38s, transform 0.45s ${EASING} 0.38s`,
            }}
          >
            <Link href="/events" className="btn-primary" onClick={() => setMenuOpen(false)}>
              Register Now →
            </Link>
          </div>
        </nav>

        {/* Contact strip */}
        <div
          className="px-8 pb-10 border-t"
          style={{ borderTopColor: 'rgba(242,240,252,0.06)', paddingTop: 20, opacity: menuOpen ? 1 : 0, transition: `opacity 0.45s ${EASING} 0.44s` }}
        >
          <a href="mailto:gcg3official@gmail.com" className="font-syne text-muted hover:text-accent transition-colors block" style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            gcg3official@gmail.com
          </a>
          <a href="tel:4168584455" className="font-syne text-muted hover:text-accent transition-colors block mt-1.5" style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            416-858-4455
          </a>
        </div>
      </div>
    </>
  );
}
