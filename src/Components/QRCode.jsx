export default function QRCode() {
  const siteUrl = '' // ← apna link yahan

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(siteUrl)}&color=ff6b8a&bgcolor=1a2f6e`

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Share the love</span>
      <h2 className="section-title">Scan to Open 📱</h2>
      <p style={s.sub}>Scan this QR code to open this website!</p>

      <div style={s.card}>
        <img src={qrUrl} alt="QR Code" style={s.qr} />
        <p style={s.link}>{siteUrl}</p>
        <a href={qrUrl} download="valentine-qr.png" style={s.downloadBtn}>
          Download QR Code ⬇️
        </a>
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  sub: { color: '#a0b4ff', marginBottom: '2rem', fontSize: '0.9rem' },
  card: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem', maxWidth: 300, margin: '0 auto',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
  },
  qr: { width: 200, height: 200, borderRadius: 12, border: '3px solid rgba(232,49,90,0.5)' },
  link: { color: '#a0b4ff', fontSize: '0.75rem', wordBreak: 'break-all' },
  downloadBtn: {
    padding: '0.8rem 1.5rem', background: '#e8315a',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
    textDecoration: 'none', display: 'inline-block',
  },
}