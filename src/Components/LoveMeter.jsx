import { useState } from 'react'

export default function LoveMeter() {
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)

  const calculate = () => {
    if (!name1.trim() || !name2.trim()) return
    setAnimating(true)
    setResult(null)

    setTimeout(() => {
      // Fun algorithm
      const combined = (name1 + name2).toLowerCase()
      let score = 0
      'love'.split('').forEach(l => {
        combined.split('').forEach(c => { if (c === l) score++ })
      })
      const base = ((name1.length + name2.length) * 7 + score * 13) % 40
      const final = Math.min(99, Math.max(75, base + 65))

      setResult(final)
      setAnimating(false)
    }, 2000)
  }

  const getMsg = (score) => {
    if (score >= 95) return { e: '💖', m: 'PERFECT MATCH! Made for each other! 🥰' }
    if (score >= 88) return { e: '💕', m: 'Amazing compatibility! True love! 😍' }
    if (score >= 80) return { e: '💗', m: 'Great match! Love is in the air! 🌸' }
    return { e: '💝', m: 'Beautiful connection! Love grows stronger! 💫' }
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Are we meant to be?</span>
      <h2 className="section-title">💘 Love Meter</h2>

      <div style={s.card}>
        <div style={s.inputRow}>
          <input
            placeholder="Your name 💕"
            value={name1}
            onChange={e => setName1(e.target.value)}
            style={s.input}
          />
          <div style={s.heart}>💖</div>
          <input
            placeholder="Their name 🌸"
            value={name2}
            onChange={e => setName2(e.target.value)}
            style={s.input}
          />
        </div>

        <button onClick={calculate} style={s.btn} disabled={animating}>
          {animating ? 'Calculating... 💫' : 'Check Love 💘'}
        </button>

        {animating && (
          <div style={s.loading}>
            <div style={s.loadingBar}>
              <div style={{ ...s.loadingFill, animation: 'fillUp 2s ease forwards' }} />
            </div>
            <p style={s.loadingText}>Measuring love... 💕</p>
          </div>
        )}

        {result && !animating && (
          <div style={s.result}>
            <div style={s.scoreWrap}>
              <svg viewBox="0 0 100 100" style={{ width: 150, height: 150 }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="45" fill="none"
                  stroke="url(#grad)" strokeWidth="8"
                  strokeDasharray={`${result * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8315a" />
                    <stop offset="100%" stopColor="#ff6b8a" />
                  </linearGradient>
                </defs>
                <text x="50" y="45" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">{result}%</text>
                <text x="50" y="62" textAnchor="middle" fill="#a0b4ff" fontSize="8">LOVE SCORE</text>
              </svg>
            </div>
            <div style={{ fontSize: '3rem', margin: '0.5rem 0' }}>{getMsg(result).e}</div>
            <p style={s.names}>{name1} & {name2}</p>
            <p style={s.msg}>{getMsg(result).m}</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fillUp {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  card: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem 2rem', maxWidth: 480, margin: '0 auto',
  },
  inputRow: { display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' },
  input: {
    flex: 1, minWidth: 130, padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 12, color: 'white', fontSize: '0.9rem', outline: 'none', textAlign: 'center',
  },
  heart: { fontSize: '1.5rem' },
  btn: {
    width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 12, color: 'white',
    fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.3)', marginBottom: '1.5rem',
  },
  loading: { marginBottom: '1rem' },
  loadingBar: { height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: '0.5rem' },
  loadingFill: { height: '100%', background: 'linear-gradient(90deg,#e8315a,#ff6b8a)', borderRadius: 100 },
  loadingText: { color: '#a0b4ff', fontSize: '0.85rem' },
  result: { textAlign: 'center', animation: 'popIn 0.5s ease' },
  scoreWrap: { display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' },
  names: { color: 'white', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' },
  msg: { color: '#c0d0ff', fontSize: '0.95rem', lineHeight: 1.6 },
}