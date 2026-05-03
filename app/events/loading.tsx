/* Skeleton that matches the real events page:
   dark hero → light canvas grid with matching EventCard structure */
export default function Loading() {
  return (
    <>
      {/* ── Hero skeleton — dark, matches real page ── */}
      <section style={{ background: '#08090e', paddingTop: 140, paddingBottom: 96 }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: '0 clamp(20px,4vw,64px)' }}>
          <div className="animate-pulse">
            <div style={{ height: 10, width: 64, background: 'rgba(236,233,76,0.20)', borderRadius: 4, marginBottom: 24 }} />
            <div style={{ height: 68, width: '42%', background: 'rgba(242,240,252,0.07)', borderRadius: 8, marginBottom: 16 }} />
            <div style={{ height: 68, width: '28%', background: 'rgba(242,240,252,0.04)', borderRadius: 8, marginBottom: 28 }} />
            <div style={{ height: 18, width: '36%', background: 'rgba(242,240,252,0.05)', borderRadius: 4 }} />
          </div>
        </div>
      </section>

      {/* ── Grid skeleton — light, matches real page ── */}
      <section style={{ background: '#f5f5f7', padding: 'clamp(56px,7vw,96px) 0' }}>
        <div style={{ maxWidth: 1760, margin: '0 auto', padding: '0 clamp(20px,4vw,64px)' }}>

          {/* Payment notice skeleton */}
          <div
            className="animate-pulse"
            style={{
              height: 72, background: '#ffffff', borderRadius: 10,
              border: '1px solid rgba(12,12,20,0.07)',
              boxShadow: '0 1px 3px rgba(12,12,20,0.06)',
              marginBottom: 40,
            }}
          />

          {/* Card grid — 3 columns, matching real EventCard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  background: '#ffffff', borderRadius: 14,
                  border: '1px solid rgba(12,12,20,0.07)',
                  boxShadow: '0 1px 3px rgba(12,12,20,0.06)',
                  overflow: 'hidden',
                  animationDelay: `${i * 80}ms`,
                }}
              >
                {/* Image area */}
                <div style={{ height: 252, background: '#eeeef5', position: 'relative' }}>
                  {/* Price badge placeholder */}
                  <div style={{
                    position: 'absolute', top: 12, left: 12,
                    height: 26, width: 60, borderRadius: 100, background: 'rgba(12,12,20,0.08)',
                  }} />
                </div>

                {/* Accent stripe */}
                <div style={{ height: 3, background: '#e4e4ed' }} />

                {/* Content */}
                <div style={{ padding: 24 }}>
                  {/* Title */}
                  <div style={{ height: 20, background: '#ebebf2', borderRadius: 4, marginBottom: 8, width: '82%' }} />
                  <div style={{ height: 20, background: '#ebebf2', borderRadius: 4, marginBottom: 20, width: '56%' }} />

                  {/* Date pill */}
                  <div style={{ height: 34, background: '#ebebf2', borderRadius: 100, width: 148, marginBottom: 8 }} />
                  {/* Location pill */}
                  <div style={{ height: 34, background: '#ebebf2', borderRadius: 100, width: 118, marginBottom: 22 }} />

                  {/* CTA button */}
                  <div style={{ height: 40, background: '#dddde8', borderRadius: 6, width: 144 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
