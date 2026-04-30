import { useState, useEffect } from 'react'

// Apni anniversary date yahan change karo
const ANNIVERSARY_DATE = new Date('2024-03-04T00:00:00')

function getTimeLeft() {
  const now = new Date()
  let target = new Date(ANNIVERSARY_DATE)
  target.setFullYear(now.getFullYear())
  if (target < now) target.setFullYear(now.getFullYear() + 1)
  const diff = target - now
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs:  Math.floor((diff % (1000 * 60)) / 1000),
  }
}

export default function AnniversaryCountdown() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const boxes = [
    { label: 'Days',    value: String(time.days).padStart(3, '0') },
    { label: 'Hours',   value: String(time.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(time.mins).padStart(2, '0') },
    { label: 'Seconds', value: String(time.secs).padStart(2, '0') },
  ]

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Mark your calendar</span>
      <h2 className="section-title">Next Anniversary 📅</h2>
      <p style={s.date}>March 4th 💕</p>

      <div style={s.grid}>
        {boxes.map(({ label, value }) => (
          <div key={label} style={s.box}>
            <div style={s.ring}>
              <span style={s.num}>{value}</span>
            </div>
            <span style={s.unit}>{label}</span>
          </div>
        ))}
      </div>

      <p style={s.note}>Every day closer is a gift 🎁</p>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  date: { color: '#ff85a1', marginBottom: '2.5rem', fontSize: '1rem', fontWeight: 500 },
  grid: { display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' },
  box: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' },
  ring: {
    width: 90, height: 90, borderRadius: '50%',
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
    border: '2px solid rgba(232,49,90,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 20px rgba(232,49,90,0.2)',
  },
  num: { fontSize: '1.8rem', fontWeight: 800, color: 'white', fontVariantNumeric: 'tabular-nums' },
  unit: { fontSize: '0.72rem', color: '#a0b4ff', textTransform: 'uppercase', letterSpacing: '0.1em' },
  note: { color: '#c0d0ff', fontSize: '0.95rem' },
}