import { useState, useEffect } from 'react'

export default function MidnightPopup() {
  const [show, setShow] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const h = now.getHours()
      const m = now.getMinutes()

      // Show at midnight (00:00 - 00:05)
      if (h === 0 && m < 5) {
        setShow(true)
      }

      // Countdown to midnight
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = midnight - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const secs = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`)
    }

    check()
    const interval = setInterval(check, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!show) return (
    <div style={s.countdown}>
      <span style={s.countdownLabel}>🌙 Midnight surprise in</span>
      <span style={s.countdownTime}>{timeLeft}</span>
    </div>
  )

  return (
    <div style={s.overlay} onClick={() => setShow(false)}>
      <div style={s.popup} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌙✨</div>
        <h2 style={s.title}>It's Midnight!</h2>
        <p style={s.msg}>
          Even at this hour, my first thought is you.<br /><br />
          <strong style={{ color: '#ffb3c6' }}>
            You are the last thing I think of before I sleep,<br />
            and the first when I wake up. 💖
          </strong>
        </p>
        <p style={s.sub}>Happy Valentine's Day, my love 🌹</p>
        <button onClick={() => setShow(false)} style={s.btn}>
          Close with love ✕
        </button>
      </div>
      <style>{`
        @keyframes popupIn {
          from { transform: scale(0.8) translateY(40px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 2000,
    background: 'rgba(0,0,20,0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  popup: {
    background: 'linear-gradient(135deg, #1a2f6e, #2145a0)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 28, padding: '3rem 2.5rem',
    maxWidth: 420, width: '90%', textAlign: 'center',
    animation: 'popupIn 0.6s cubic-bezier(0.34,1.56,0.64,1)',
    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  },
  title: { color: 'white', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' },
  msg: { color: '#c0d0ff', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1rem' },
  sub: { color: '#ff85a1', fontSize: '0.9rem', marginBottom: '1.5rem' },
  btn: {
    padding: '0.8rem 2rem', background: '#e8315a',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600,
  },
  countdown: {
    position: 'fixed', bottom: '80px', left: '20px', zIndex: 1000,
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
    padding: '8px 16px', display: 'flex', flexDirection: 'column',
    alignItems: 'center',
  },
  countdownLabel: { color: '#a0b4ff', fontSize: '0.7rem', marginBottom: '2px' },
  countdownTime: { color: 'white', fontSize: '1rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' },
}