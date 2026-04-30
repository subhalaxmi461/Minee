import { useState } from 'react'

const predictions = [
  { emoji: '🏠', title: 'Our Home', desc: 'A cozy little house with a garden full of flowers, where we will grow old together watching sunsets.' },
  { emoji: '✈️', title: 'World Travelers', desc: 'Hand in hand, we will explore Paris, Santorini, Bali, and every magical place in between.' },
  { emoji: '👶', title: 'Our Family', desc: 'Little footsteps in the hallway, tiny laughs filling our home — our greatest adventure yet.' },
  { emoji: '🌅', title: 'Growing Old Together', desc: 'Still holding hands at 80, still laughing at the same jokes, still choosing each other every day.' },
  { emoji: '💍', title: 'Forever Committed', desc: 'A promise made under the stars — to love, to cherish, and to never let go.' },
  { emoji: '🌟', title: 'Our Legacy', desc: 'A love story so beautiful, it will be told for generations to come.' },
]

export default function FuturePredictions() {
  const [revealed, setRevealed] = useState([])
  const [current, setCurrent] = useState(null)

  const reveal = (i) => {
    if (!revealed.includes(i)) setRevealed(prev => [...prev, i])
    setCurrent(i)
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">What lies ahead</span>
      <h2 className="section-title">🔮 Our Future</h2>
      <p style={s.hint}>Tap each crystal ball to reveal our future!</p>

      <div style={s.grid}>
        {predictions.map((p, i) => (
          <div key={i} onClick={() => reveal(i)} style={{
            ...s.ball,
            background: revealed.includes(i)
              ? 'linear-gradient(135deg,rgba(232,49,90,0.3),rgba(255,107,138,0.2))'
              : 'rgba(255,255,255,0.06)',
            border: revealed.includes(i)
              ? '1px solid rgba(232,49,90,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            transform: current === i ? 'scale(1.05)' : 'scale(1)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {revealed.includes(i) ? p.emoji : '🔮'}
            </div>
            <p style={s.ballTitle}>
              {revealed.includes(i) ? p.title : '???'}
            </p>
          </div>
        ))}
      </div>

      {current !== null && (
        <div style={s.detail}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{predictions[current].emoji}</div>
          <h3 style={s.detailTitle}>{predictions[current].title}</h3>
          <p style={s.detailDesc}>{predictions[current].desc}</p>
        </div>
      )}

      <p style={s.progress}>{revealed.length}/{predictions.length} futures revealed 🌟</p>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  hint: { color: '#a0b4ff', marginBottom: '2rem', fontSize: '0.9rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: 480, margin: '0 auto 2rem' },
  ball: {
    borderRadius: 16, padding: '1.2rem 0.8rem', cursor: 'pointer',
    transition: 'all 0.3s', backdropFilter: 'blur(10px)',
  },
  ballTitle: { color: 'white', fontSize: '0.8rem', fontWeight: 600 },
  detail: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20,
    padding: '2rem', maxWidth: 420, margin: '0 auto 1.5rem',
    animation: 'popIn 0.4s ease',
  },
  detailTitle: { color: 'white', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.8rem' },
  detailDesc: { color: '#c0d0ff', lineHeight: 1.7, fontSize: '0.95rem' },
  progress: { color: '#a0b4ff', fontSize: '0.85rem' },
}