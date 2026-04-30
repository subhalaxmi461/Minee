import { useState } from 'react'

const gifts = [
  { emoji: '💌', title: 'A Love Letter', desc: 'My heart written in words, just for you forever.' },
  { emoji: '⭐', title: 'A Star Named After You', desc: 'Somewhere in the sky, a star shines only for you.' },
  { emoji: '🌹', title: 'Infinite Roses', desc: 'Every day deserves a rose, and so do you, always.' },
  { emoji: '🎵', title: 'Our Song', desc: 'Every note reminds me of you and only you.' },
  { emoji: '💖', title: 'My Heart', desc: 'It has always been yours, from day one.' },
  { emoji: '🌍', title: 'The World', desc: 'I would give you everything if I could.' },
]

export default function GiftBox() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(null)
  const [shaking, setShaking] = useState(false)

  const shake = () => {
    if (opened) return
    setShaking(true)
    setTimeout(() => setShaking(false), 600)
  }

  const open = () => {
    if (opened) return
    setOpened(true)
    const gift = gifts[Math.floor(Math.random() * gifts.length)]
    setRevealed(gift)
  }

  const reset = () => { setOpened(false); setRevealed(null) }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Something special</span>
      <h2 className="section-title">A Gift For You 🎁</h2>
      <p style={s.sub}>Tap the box to reveal your surprise!</p>

      <div style={s.wrap}>
        {!opened ? (
          <div
            onClick={open}
            onMouseEnter={shake}
            style={{
              ...s.box,
              animation: shaking ? 'giftShake 0.6s ease' : 'giftFloat 3s ease-in-out infinite',
            }}
          >
            <div style={s.ribbon} />
            <div style={s.ribbonH} />
            <div style={s.bow}>🎀</div>
            <div style={s.boxBody}>
              <span style={{ fontSize: '3rem' }}>🎁</span>
              <p style={s.tapHint}>Tap to open!</p>
            </div>
          </div>
        ) : (
          <div style={s.revealed}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>
              {revealed?.emoji}
            </div>
            <h3 style={s.giftTitle}>{revealed?.title}</h3>
            <p style={s.giftDesc}>{revealed?.desc}</p>
            <button onClick={reset} style={s.resetBtn}>Open Another 🎁</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes giftFloat {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes giftShake {
          0%,100% { transform: rotate(0deg); }
          20%     { transform: rotate(-8deg); }
          40%     { transform: rotate(8deg); }
          60%     { transform: rotate(-5deg); }
          80%     { transform: rotate(5deg); }
        }
        @keyframes popIn {
          from { transform: scale(0) rotate(-10deg); opacity: 0; }
          to   { transform: scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  sub: { color: '#a0b4ff', marginBottom: '3rem', fontSize: '0.9rem' },
  wrap: { display: 'flex', justifyContent: 'center' },
  box: { cursor: 'pointer', position: 'relative', display: 'inline-block' },
  ribbon: {
    position: 'absolute', top: 0, bottom: 0, left: '50%',
    width: 4, background: '#ff6b8a', transform: 'translateX(-50%)', zIndex: 2,
  },
  ribbonH: {
    position: 'absolute', left: 0, right: 0, top: '35%',
    height: 4, background: '#ff6b8a', zIndex: 2,
  },
  bow: { position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: '2rem', zIndex: 3 },
  boxBody: {
    width: 160, height: 160,
    background: 'linear-gradient(135deg,rgba(232,49,90,0.3),rgba(255,107,138,0.2))',
    border: '2px solid rgba(232,49,90,0.5)', borderRadius: 16,
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  tapHint: { color: '#ffb3c6', fontSize: '0.8rem', marginTop: '0.5rem' },
  revealed: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '3rem 2rem', maxWidth: 380, animation: 'popIn 0.5s ease',
  },
  giftTitle: { color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' },
  giftDesc: { color: '#c0d0ff', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' },
  resetBtn: {
    padding: '0.8rem 2rem', background: '#e8315a',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
  },
}