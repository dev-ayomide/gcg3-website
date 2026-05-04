'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  background: '#f5f5f7',
  border: '1px solid rgba(12,12,20,0.10)',
  borderRadius: 8,
  fontSize: 15,
  fontFamily: 'inherit',
  color: '#0c0c14',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#0c0c14',
  marginBottom: 8,
  fontFamily: 'inherit',
};

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setServerMessage(data.message ?? 'Message sent! We\'ll be in touch shortly.');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setServerMessage(data.error ?? 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setServerMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '64px 40px',
          background: '#f5f5f7',
          borderRadius: 12,
          border: '1px solid rgba(12,12,20,0.07)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#222b64',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#ece94c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="font-heading font-bold"
          style={{ fontSize: 20, color: '#0c0c14', marginBottom: 10 }}
        >
          Message Received
        </h3>
        <p className="font-body" style={{ fontSize: 15, color: '#6b6b8a', lineHeight: 1.7 }}>
          {serverMessage}
        </p>
        <button
          onClick={() => setStatus('idle')}
          style={{
            marginTop: 24,
            padding: '10px 24px',
            background: '#222b64',
            color: '#ffffff',
            border: 'none',
            borderRadius: 6,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>
            Full Name <span style={{ color: '#e55' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Your full name"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#222b64')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(12,12,20,0.10)')}
          />
        </div>
        <div>
          <label style={labelStyle}>
            Email <span style={{ color: '#e55' }}>*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#222b64')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(12,12,20,0.10)')}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="416-000-0000"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#222b64')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(12,12,20,0.10)')}
          />
        </div>
        <div>
          <label style={labelStyle}>Subject</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => set('subject', e.target.value)}
            placeholder="How can we help?"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#222b64')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(12,12,20,0.10)')}
          />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>
          Message <span style={{ color: '#e55' }}>*</span>
        </label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Tell us about your inquiry…"
          style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#222b64')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(12,12,20,0.10)')}
        />
      </div>

      {status === 'error' && (
        <div
          style={{
            marginBottom: 20,
            padding: '12px 16px',
            background: '#fff0f0',
            border: '1px solid rgba(220,50,50,0.18)',
            borderRadius: 8,
          }}
        >
          <p className="font-body" style={{ fontSize: 14, color: '#c0392b' }}>
            {serverMessage}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 32px',
          background: status === 'submitting' ? '#444' : '#0d1240',
          color: '#ffffff',
          border: 'none',
          borderRadius: 6,
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.20em',
          textTransform: 'uppercase',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
        }}
      >
        {status === 'submitting' ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ animation: 'spin 0.8s linear infinite' }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Sending…
          </>
        ) : (
          'Send Message →'
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
