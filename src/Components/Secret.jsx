import { useState, useEffect, useRef } from 'react'

const secrets = [
  "You are the best thing that ever happened to me.",
  "I think about you every single day.",
  "The way you smile makes everything better.",
  "I would choose you in every lifetime.",
  "You make me want to be a better person.",
  "Being loved by you is my greatest gift.",
  "You are my home, wherever we are.",
]

export default function Secret() {
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [animKey, setAnimKey] = useState(0)
  const ref = useRef(null)

  const reveal = () => {
    setRevealed(true)
    setAnimKey(k => k + 1)
  }

  const next = () => {
    setIdx(i => (i + 1) % secrets.length)
    setAnimKey(k => k + 1)
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.style.opacity = '1' },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ ...s.section, opacity: 0, transition: 'opacity 1s ease' }}>
      <span className="section-eyebrow">Psst… a secret</span>
      <h2 className="section-title">Tap to reveal</h2>

      {!revealed ? (
        <div style={s.sealed} onClick={reveal}>
          <div style={s.sealIcon}>🔒</div>
          <p style={s.sealText}>Tap to unlock a secret message</p>
        </div>
      ) : (
        <div style={s.revealed} key={animKey}>
          <p style={s.message}>&ldquo;{secrets[idx]}&rdquo;</p>
          <button style={s.nextBtn} onClick={next}>
            Another one ♥
          </button>
        </div>
      )}

      <style>{`
        @keyframes popReveal {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: {
    padding: '6rem 2rem',
    textAlign: 'center',
    maxWidth: 640,
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  sealed: {
    background: 'rgba(255,255,255,0.08)',
    border: '2px dashed rgba(255,255,255,0.25)',
    borderRadius: 20,
    padding: '3rem 2rem',
    cursor: 'pointer',
    maxWidth: 400,
    margin: '0 auto',
    transition: 'background 0.3s, transform 0.2s',
    backdropFilter: 'blur(10px)',
  },
  sealIcon: { fontSize: '3rem', marginBottom: '1rem' },
  sealText: { color: '#a0b4ff', fontSize: '0.95rem' },
  revealed: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: '3rem 2rem',
    maxWidth: 460,
    margin: '0 auto',
    boxShadow: '0 4px 40px rgba(232,49,90,0.2)',
    border: '1px solid rgba(255,255,255,0.2)',
    animation: 'popReveal 0.4s ease',
    backdropFilter: 'blur(10px)',
  },
  message: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    fontStyle: 'italic',
    color: '#ffffff',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  nextBtn: {
    padding: '0.7rem 1.8rem',
    background: 'transparent',
    border: '1.5px solid #e8315a',
    borderRadius: 100,
    color: '#ff85a1',
    fontSize: '0.85rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}