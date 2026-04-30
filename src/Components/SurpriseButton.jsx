import { useState } from 'react'

const surprises = [
  { type: 'msg', content: "You are the most beautiful person I have ever seen 💖" },
  { type: 'msg', content: "I fall in love with you more every single day 🌸" },
  { type: 'msg', content: "You are my favorite human in the entire universe ✨" },
  { type: 'emoji', content: "💖💗💕💝💖💗💕💝💖" },
  { type: 'msg', content: "If loving you is wrong, I never want to be right 🌹" },
  { type: 'msg', content: "You are my sunshine, my moon, and all my stars ⭐" },
  { type: 'emoji', content: "🌸🌺🌼🌻🌷🌸🌺🌼🌻🌷" },
  { type: 'msg', content: "Every moment with you is my favorite moment 💫" },
  { type: 'msg', content: "I am so lucky to have you in my life 🍀" },
  { type: 'emoji', content: "😍🥰😘💑👫💕💖💗💝" },
]

export default function SurpriseButton() {
  const [current, setCurrent] = useState(null)
  const [animKey, setAnimKey] = useState(0)
  const [spinning, setSpinning] = useState(false)

  const surprise = () => {
    setSpinning(true)
    setTimeout(() => {
      const s = surprises[Math.floor(Math.random() * surprises.length)]
      setCurrent(s)
      setAnimKey(k => k + 1)
      setSpinning(false)
    }, 600)
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Feeling lucky?</span>
      <h2 className="section-title">Surprise Me! 🎪</h2>

      <div style={s.wrap}>
        <button onClick={surprise} style={{
          ...s.btn,
          animation: spinning ? 'spin 0.6s ease' : 'surprisePulse 2s ease-in-out infinite',
        }}>
          {spinning ? '✨' : '🎪'}
          <span style={{ marginLeft: '0.5rem' }}>
            {spinning ? 'Generating...' : 'Give me a surprise!'}
          </span>
        </button>

        {current && !spinning && (
          <div key={animKey} style={s.result}>
            {current.type === 'emoji' ? (
              <div style={s.emojiResult}>{current.content}</div>
            ) : (
              <p style={s.msgResult}>"{current.content}"</p>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes surprisePulse {
          0%,100% { transform: scale(1); box-shadow: 0 4px 20px rgba(232,49,90,0.4); }
          50%      { transform: scale(1.05); box-shadow: 0 8px 40px rgba(232,49,90,0.7); }
        }
        @keyframes spin {
          from { transform: rotate(0deg) scale(0.9); }
          to   { transform: rotate(360deg) scale(1); }
        }
        @keyframes resultIn {
          from { opacity:0; transform:scale(0.8) translateY(20px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  wrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' },
  btn: {
    display: 'flex', alignItems: 'center', padding: '1.2rem 3rem',
    background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.4)',
  },
  result: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20,
    padding: '2rem', maxWidth: 400,
    animation: 'resultIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
  },
  emojiResult: { fontSize: '2rem', letterSpacing: '0.3rem' },
  msgResult: {
    color: 'white', fontSize: '1.1rem', lineHeight: 1.7,
    fontFamily: 'Georgia, serif', fontStyle: 'italic',
  },
}