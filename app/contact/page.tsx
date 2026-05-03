export const metadata = {
  title: 'Contact — GCG3',
  description: "Get in touch with GCG3. We'd love to hear from you.",
};

const contactCards = [
  {
    title: 'Phone',
    value: '416-858-4455',
    href: 'tel:4168584455',
    external: false,
  },
  {
    title: 'Email',
    value: 'gcg3official@gmail.com',
    href: 'mailto:gcg3official@gmail.com',
    external: false,
  },
  {
    title: 'Address',
    value: 'Suite 201a, 7581 Jane Street, Ontario, Canada',
    href: 'https://maps.google.com/?q=7581+Jane+Street+Concord+Ontario+Canada',
    external: true,
  },
];

export default function ContactPage() {
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
        <div className="relative z-10 max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
          <p className="eyebrow" style={{ marginBottom: 24 }}>Reach Out</p>
          <h1
            className="font-display italic font-light text-text kern"
            style={{
              fontSize: 'clamp(52px, 8vw, 110px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              maxWidth: '16ch',
              marginBottom: 28,
            }}
          >
            Contact Us
          </h1>
          <p
            className="font-body font-light"
            style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.75, color: '#8e95c8', maxWidth: '44ch' }}
          >
            We&apos;d love to hear from you — reach out any time.
          </p>
        </div>
      </section>

      {/* ── Contact cards — white ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card-light group block"
                style={{ textDecoration: 'none', padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <div>
                  <p
                    className="font-label font-bold uppercase"
                    style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 6 }}
                  >
                    {card.title}
                  </p>
                  <p className="font-body" style={{ fontSize: 18, color: '#6b6b8a', lineHeight: 1.65 }}>
                    {card.value}
                  </p>
                </div>
                {/* <span
                  className="font-label font-bold"
                  style={{
                    fontSize: 15,
                    letterSpacing: '0.20em',
                    textTransform: 'uppercase',
                    color: '#222b64',
                  }}
                >
                  →
                </span> */}
              </a>
            ))}
          </div>

          {/* Office hours */}
          <div
            className="card-light"
            style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}
          >
            <div>
              <p className="font-heading font-bold" style={{ fontSize: 18, color: '#0c0c14', marginBottom: 2 }}>
                Office Hours
              </p>
              <p className="font-body" style={{ fontSize: 17, color: '#6b6b8a' }}>
                Monday – Friday: 9:00 AM – 6:00 PM &nbsp;·&nbsp; Saturday – Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map — canvas ── */}
      <section style={{ background: '#f5f5f7', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
          <p
            className="font-label font-bold uppercase"
            style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 24 }}
          >
            Find Us
          </p>
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(12,12,20,0.07)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.6!2d-79.5293!3d43.8005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2f5aad85a5ab%3A0x5e9d1d8a1a0e5f70!2s7581%20Jane%20St%2C%20Concord%2C%20ON%20L4K%201X3%2C%20Canada!5e0!3m2!1sen!2sca!4v1700000000000"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GCG3 Location"
            />
          </div>
        </div>
      </section>

      {/* ── Contact form — white ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div className="max-w-[1760px] mx-auto px-5 md:px-10 lg:px-16">
          <p
            className="font-label font-bold uppercase"
            style={{ fontSize: 16, letterSpacing: '0.22em', color: '#222b64', marginBottom: 16 }}
          >
            Send a Message
          </p>
          <h2
            className="font-heading font-bold"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: '#0c0c14', marginBottom: 32 }}
          >
            Get In Touch
          </h2>
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid rgba(12,12,20,0.07)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <iframe
              src="https://gcg3official.com/contact-us/"
              className="w-full border-0 bg-white"
              style={{ minHeight: 600, display: 'block' }}
              title="Contact Form"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
