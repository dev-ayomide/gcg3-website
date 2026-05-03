export default function EventDetailLoading() {
  return (
    <div style={{ minHeight: '100vh', background: '#1d1719' }}>
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-14" style={{ paddingTop: 108, paddingBottom: 64 }}>
        <div className="animate-pulse" style={{ height: 14, width: 300, background: 'rgba(255,255,255,0.16)', borderRadius: 6, marginBottom: 18 }} />

        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-8">
          <div style={{ height: 620, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }} className="animate-pulse" />

          <div style={{ borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', padding: 28 }}>
            <div className="animate-pulse" style={{ height: 30, width: '70%', background: 'rgba(255,255,255,0.16)', borderRadius: 8, marginBottom: 14 }} />
            <div className="animate-pulse" style={{ height: 64, width: '90%', background: 'rgba(255,255,255,0.12)', borderRadius: 8, marginBottom: 20 }} />
            <div className="animate-pulse" style={{ height: 180, width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 12, marginBottom: 20 }} />
            <div className="animate-pulse" style={{ height: 420, width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 16 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
