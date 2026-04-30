import { useState, useEffect } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  const messages = [
    "Preparing something special... 💖",
    "Adding love and magic... ✨",
    "Almost ready for you... 🌸",
    "Opening your surprise... 💝",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressInterval); return 100 }
        return p + 1
      })
    }, 30)

    const phaseInterval = setInterval(() => {
      setPhase(p => Math.min(p + 1, messages.length - 1))
    }, 800)

    const timer = setTimeout(() => {
      onDone()
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(phaseInterval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div style={s.overlay}>
      <div style={s.content}>
        <div style={s.heartsWrap}>
          {['💖', '💝', '💗', '💕'].map((h, i) => (
            <div key={i} style={{
              ...s.floatHeart,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${1.5 + i * 0.3}rem`,
            }}>{h}</div>
          ))}
        </div>

        <div style={s.mainHeart}>💖</div>
        <h1 style={s.title}>For You</h1>
        <p style={s.msg}>{messages[phase]}</p>

        <div style={s.progressWrap}>
          <div style={{ ...s.progressBar, width: `${progress}%` }} />
        </div>
        <p style={s.percent}>{progress}%</p>
      </div>

      <style>{`
        @keyframes loadFloat {
          0%,100% { transform: translateY(0) rotate(-10deg); }
          50%      { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes heartPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.2); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: 'linear-gradient(135deg,#0f1b3d,#1a2f6e,#2145a0)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  content: { textAlign: 'center', padding: '2rem' },
  heartsWrap: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' },
  floatHeart: { animation: 'loadFloat 2s ease-in-out infinite' },
  mainHeart: {
    fontSize: '5rem', marginBottom: '1rem',
    animation: 'heartPulse 1s ease-in-out infinite',
    display: 'block',
  },
  title: {
    fontSize: '3rem', fontWeight: 800, color: 'white',
    marginBottom: '0.5rem', animation: 'fadeInUp 0.8s ease',
  },
  msg: {
    color: '#a0b4ff', fontSize: '1rem', marginBottom: '2rem',
    minHeight: '1.5rem', transition: 'all 0.5s ease',
  },
  progressWrap: {
    width: 280, height: 6, background: 'rgba(255,255,255,0.1)',
    borderRadius: 100, overflow: 'hidden', margin: '0 auto 0.5rem',
  },
  progressBar: {
    height: '100%', background: 'linear-gradient(90deg,#e8315a,#ff6b8a)',
    borderRadius: 100, transition: 'width 0.03s linear',
  },
  percent: { color: '#a0b4ff', fontSize: '0.8rem' },
}