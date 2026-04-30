import { useEffect, useRef, useState } from 'react'

const FLOWERS = ['🌸', '🌺', '🌼', '🌻', '🌹', '💐', '🌷']

export default function FlowerBloom() {
  const [flowers, setFlowers] = useState([])

  const bloom = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newFlowers = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x, y,
      emoji: FLOWERS[Math.floor(Math.random() * FLOWERS.length)],
      angle: (i / 8) * 360,
      distance: 40 + Math.random() * 60,
      size: 1 + Math.random() * 1.5,
    }))
    setFlowers(prev => [...prev.slice(-40), ...newFlowers])
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => !newFlowers.find(nf => nf.id === f.id)))
    }, 1500)
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Touch the garden</span>
      <h2 className="section-title">Flower Garden 🌸</h2>
      <p style={s.hint}>Click anywhere in the garden to bloom flowers!</p>

      <div style={s.garden} onClick={bloom}>
        <p style={s.gardenText}>🌱 Click here to grow flowers 🌱</p>
        {flowers.map(f => (
          <div key={f.id} style={{
            position: 'absolute',
            left: f.x,
            top: f.y,
            fontSize: `${f.size}rem`,
            transform: `translate(-50%, -50%)`,
            animation: `bloomOut 1.5s ease-out forwards`,
            '--angle': `${f.angle}deg`,
            '--dist': `${f.distance}px`,
            pointerEvents: 'none',
          }}>
            {f.emoji}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bloomOut {
          0%   { transform: translate(-50%,-50%) scale(0) rotate(0deg); opacity: 1; }
          60%  { transform: translate(
                  calc(-50% + cos(var(--angle)) * var(--dist)),
                  calc(-50% + sin(var(--angle)) * var(--dist))
                ) scale(1) rotate(180deg); opacity: 1; }
          100% { transform: translate(
                  calc(-50% + cos(var(--angle)) * var(--dist)),
                  calc(-50% + sin(var(--angle)) * var(--dist))
                ) scale(0.5) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  hint: { color: '#a0b4ff', marginBottom: '1.5rem', fontSize: '0.9rem' },
  garden: {
    position: 'relative', height: 300, overflow: 'hidden',
    background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24,
    maxWidth: 500, margin: '0 auto', cursor: 'crosshair',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  gardenText: { color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem', pointerEvents: 'none' },
}