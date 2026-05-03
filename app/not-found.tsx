import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4 bg-bg">
      <div>
        <p
          className="font-heading font-extrabold text-accent leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 12rem)' }}
        >
          404
        </p>
        <h1 className="font-heading font-bold text-2xl text-text mb-3">Page not found</h1>
        <p className="text-muted mb-8 text-sm">
          This page doesn&apos;t exist — but there&apos;s still plenty to explore.
        </p>
        <Link href="/" className="btn-primary">Back to Home →</Link>
      </div>
    </section>
  );
}
