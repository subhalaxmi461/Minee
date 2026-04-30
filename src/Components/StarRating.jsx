import { useState } from 'react'

const categories = [
  { label: 'How much I love you', max: 100 },
  { label: 'How beautiful you are', max: 100 },
  { label: 'How lucky I am', max: 100 },
  { label: 'How special you make me feel', max: 100 },
]

export default function StarRating() {
  const [ratings, setRatings] = useState({})
  const [hover, setHover] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const setRating = (cat, val) => setRatings(prev => ({ ...prev, [cat]: val }))
  const setHoverVal = (cat, val) => setHover(prev => ({ ...prev, [cat]: val }))

  const allRated = categories.every(c => ratings[c.label])

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Rate our love</span>
      <h2 className="section-title">⭐ Love Rating</h2>

      {!submitted ? (
        <div style={s.card}>
          {categories.map((cat) => (
            <div key={cat.label} style={s.row}>
              <p style={s.label}>{cat.label}</p>
              <div style={s.stars}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(star => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverVal(cat.label, star)}
                    onMouseLeave={() => setHoverVal(cat.label, 0)}
                    onClick={() => setRating(cat.label, star)}
                    style={{
                      ...s.star,
                      color: star <= (hover[cat.label] || ratings[cat.label] || 0)
                        ? '#ffd700' : 'rgba(255,255,255,0.2)',
                      transform: star <= (hover[cat.label] || 0) ? 'scale(1.3)' : 'scale(1)',
                    }}
                  >★</button>
                ))}
                {ratings[cat.label] && (
                  <span style={s.ratingNum}>{ratings[cat.label]}/10</span>
                )}
              </div>
            </div>
          ))}

          {allRated && (
            <button onClick={() => setSubmitted(true)} style={s.submitBtn}>
              Submit My Love ⭐
            </button>
          )}
        </div>
      ) : (
        <div style={s.result}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💖</div>
          <h3 style={s.resultTitle}>My Love Report Card</h3>
          {categories.map(cat => (
            <div key={cat.label} style={s.resultRow}>
              <span style={s.resultLabel}>{cat.label}</span>
              <div style={s.resultBar}>
                <div style={{ ...s.resultFill, width: `${ratings[cat.label] * 10}%` }} />
              </div>
              <span style={s.resultScore}>{ratings[cat.label]}/10</span>
            </div>
          ))}
          <p style={s.totalMsg}>
            Overall Love Score: {Math.round(Object.values(ratings).reduce((a, b) => a + b, 0) / categories.length * 10)}% 💖
          </p>
          <button onClick={() => { setRatings({}); setSubmitted(false) }} style={s.retryBtn}>
            Rate Again 🔄
          </button>
        </div>
      )}
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  card: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem 2rem', maxWidth: 500, margin: '0 auto',
  },
  row: { marginBottom: '1.5rem' },
  label: { color: '#c0d0ff', fontSize: '0.9rem', marginBottom: '0.5rem' },
  stars: { display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'center' },
  star: {
    fontSize: '1.6rem', background: 'none', border: 'none',
    cursor: 'pointer', transition: 'all 0.15s', padding: '0 2px',
  },
  ratingNum: { color: '#ffd700', fontSize: '0.85rem', marginLeft: '0.5rem', fontWeight: 600 },
  submitBtn: {
    width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 12, color: 'white',
    fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem',
  },
  result: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem 2rem', maxWidth: 500, margin: '0 auto',
    animation: 'popIn 0.5s ease',
  },
  resultTitle: { color: 'white', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' },
  resultRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
  resultLabel: { color: '#c0d0ff', fontSize: '0.8rem', flex: 1, textAlign: 'left' },
  resultBar: { width: 120, height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden' },
  resultFill: { height: '100%', background: 'linear-gradient(90deg,#e8315a,#ffd700)', borderRadius: 100, transition: 'width 1s ease' },
  resultScore: { color: '#ffd700', fontSize: '0.8rem', fontWeight: 600, width: 35 },
  totalMsg: { color: '#ffb3c6', fontWeight: 700, fontSize: '1rem', margin: '1.5rem 0 1rem' },
  retryBtn: {
    padding: '0.8rem 2rem', background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
    color: 'white', fontSize: '0.9rem', cursor: 'pointer',
  },
}