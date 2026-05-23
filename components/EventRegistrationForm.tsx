'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PERFORMANCE_TYPES = [
  'Singing',
  'Dancing',
  'Spoken Word / Poetry',
  'Instrumental Music',
  'Drama / Acting',
  'Stand-up / Comedy',
  'Other',
];

const AGE_GROUPS = ['Under 5', '5 – 8', '9 – 12', '13 – 16', '17+'];

const field: React.CSSProperties = {
  width: '100%',
  padding: '13px 15px',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'inherit',
  color: '#f2f0fc',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const label: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: 'rgba(242,240,252,0.70)',
  marginBottom: 7,
  fontFamily: 'inherit',
};

function Field({
  id,
  labelText,
  required,
  children,
}: {
  id: string;
  labelText: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} style={label}>
        {labelText}{required && <span style={{ color: '#ece94c', marginLeft: 4 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function EventRegistrationForm({ eventName }: { eventName: string }) {
  const [form, setForm] = useState({
    childName: '',
    parentName: '',
    email: '',
    phone: '',
    performanceType: '',
    ageGroup: '',
    notes: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  function set(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setServerMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, eventName }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setServerMessage(data.message ?? "You're registered! We'll be in touch with details.");
        setForm({ childName: '', parentName: '', email: '', phone: '', performanceType: '', ageGroup: '', notes: '' });
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
      <div style={{ padding: '36px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(236,233,76,0.15)',
            border: '1.5px solid rgba(236,233,76,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#ece94c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-heading font-semibold" style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>
          Registration Submitted!
        </h3>
        <p className="font-body" style={{ color: 'rgba(242,240,252,0.72)', fontSize: 14, lineHeight: 1.7, marginBottom: 6 }}>
          {serverMessage}
        </p>
        <p className="font-body" style={{ color: 'rgba(236,233,76,0.85)', fontSize: 13, lineHeight: 1.6 }}>
          We&apos;ll be in touch with next steps and any payment details if required.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <Field id="childName" labelText="Child's Full Name" required>
          <input
            id="childName"
            type="text"
            required
            value={form.childName}
            onChange={(e) => set('childName', e.target.value)}
            placeholder="Child's full name"
            style={field}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          />
        </Field>
        <Field id="parentName" labelText="Parent / Guardian Name" required>
          <input
            id="parentName"
            type="text"
            required
            value={form.parentName}
            onChange={(e) => set('parentName', e.target.value)}
            placeholder="Parent or guardian name"
            style={field}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <Field id="email" labelText="Email" required>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com"
            style={field}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          />
        </Field>
        <Field id="phone" labelText="Phone Number" required>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="416-000-0000"
            style={field}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
        <Field id="performanceType" labelText="Performance Type">
          <select
            id="performanceType"
            value={form.performanceType}
            onChange={(e) => set('performanceType', e.target.value)}
            style={{ ...field, cursor: 'pointer' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          >
            <option value="" style={{ background: '#181922', color: '#f2f0fc' }}>Select type…</option>
            {PERFORMANCE_TYPES.map((t) => (
              <option key={t} value={t} style={{ background: '#181922', color: '#f2f0fc' }}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id="ageGroup" labelText="Child's Age Group">
          <select
            id="ageGroup"
            value={form.ageGroup}
            onChange={(e) => set('ageGroup', e.target.value)}
            style={{ ...field, cursor: 'pointer' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
          >
            <option value="" style={{ background: '#181922', color: '#f2f0fc' }}>Select age group…</option>
            {AGE_GROUPS.map((g) => (
              <option key={g} value={g} style={{ background: '#181922', color: '#f2f0fc' }}>{g}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="notes" labelText="Additional Notes">
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Anything we should know…"
          style={{ ...field, resize: 'vertical', minHeight: 80 }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#ece94c')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)')}
        />
      </Field>

      {status === 'error' && (
        <div
          style={{
            padding: '10px 14px',
            background: 'rgba(220,50,50,0.12)',
            border: '1px solid rgba(220,50,50,0.28)',
            borderRadius: 8,
          }}
        >
          <p className="font-body" style={{ fontSize: 13, color: '#ff8080' }}>{serverMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '13px 28px',
          background: status === 'submitting' ? 'rgba(236,233,76,0.5)' : '#ece94c',
          color: '#0c0c14',
          border: 'none',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
          width: '100%',
        }}
      >
        {status === 'submitting' ? (
          <>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ animation: 'spin 0.8s linear infinite' }}
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Submitting…
          </>
        ) : (
          'Complete Registration →'
        )}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}
