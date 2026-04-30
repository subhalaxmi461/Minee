import { useState } from 'react'

const SECRET_PASSWORD = "iloveyou"

export default function PasswordLock({ onUnlock }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [hint, setHint] = useState(false)

  const tryUnlock = () => {
    if (input.toLowerCase().trim() === SECRET_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => { setShake(false); setError(false); setInput('') }, 1000)
    }
  }

  return (
    <div style={s.overlay}>
      <div style={{ ...s.box, animation: shake ? 'shake 0.5s ease' : 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
        <h2 style={s.title}>Enter the secret password</h2>
        <p style={s.sub}>Only you know this 💕</p>

        <input
          type="password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && tryUnlock()}
          placeholder="Type password..."
          style={{ ...s.input, border: error ? '2px solid #ff4466' : '2px solid rgba(255,255,255,0.2)' }}
          autoFocus
        />

        {error && <p style={s.errorMsg}>❌ Wrong password, try again!</p>}

        <button onClick={tryUnlock} style={s.btn}>Unlock 💖</button>

        <p onClick={() => setHint(!hint)} style={s.hintToggle}>
          {hint ? '🤫 Hint: "i" + "love" + "you"' : 'Need a hint? 💭'}
        </p>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.8) translateY(30px); opacity: 0; }
          to   { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-12px); }
          40%     { transform: translateX(12px); }
          60%     { transform: translateX(-8px); }
          80%     { transform: translateX(8px); }
        }
      `}</style>
    </div>
  )
}

const s = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 3000,
    background: 'linear-gradient(135deg, #0a1628 0%, #1a2f6e 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem',
  },
  box: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 28,
    padding: '3rem 2.5rem', maxWidth: 400, width: '100%',
    textAlign: 'center',
    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
  },
  title: { color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' },
  sub: { color: '#a0b4ff', fontSize: '0.9rem', marginBottom: '2rem' },
  input: {
    width: '100%', padding: '0.9rem 1.2rem',
    background: 'rgba(255,255,255,0.08)', borderRadius: 12,
    color: 'white', fontSize: '1rem', outline: 'none',
    marginBottom: '0.75rem', textAlign: 'center',
    letterSpacing: '0.2em',
  },
  errorMsg: { color: '#ff6b8a', fontSize: '0.85rem', marginBottom: '0.75rem' },
  btn: {
    width: '100%', padding: '0.9rem',
    background: 'linear-gradient(135deg, #e8315a, #ff6b8a)',
    border: 'none', borderRadius: 12, color: 'white',
    fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
    marginBottom: '1rem', boxShadow: '0 4px 20px rgba(232,49,90,0.4)',
    transition: 'transform 0.2s',
  },
  hintToggle: { color: '#a0b4ff', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' },
}