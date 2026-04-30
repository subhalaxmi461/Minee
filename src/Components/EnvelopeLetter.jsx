import { useState } from 'react'

export default function EnvelopeLetter() {
  const [phase, setPhase] = useState('closed') // closed, opening, open

  const open = () => {
    if (phase !== 'closed') return
    setPhase('opening')
    setTimeout(() => setPhase('open'), 1000)
  }

  const close = () => setPhase('closed')

  return (
    <section style={s.section}>
      <span className="section-eyebrow">A letter sealed with love</span>
      <h2 className="section-title">💌 Open Your Letter</h2>

      <div style={s.wrap}>
        {phase !== 'open' ? (
          <div onClick={open} style={s.envelope}>
            {/* Flap */}
            <div style={{
              ...s.flap,
              transform: phase === 'opening' ? 'rotateX(180deg)' : 'rotateX(0deg)',
              transition: 'transform 0.8s ease',
            }} />

            {/* Body */}
            <div style={s.envBody}>
              <div style={s.seal}>💖</div>
              {phase === 'closed' && <p style={s.tapHint}>Tap to open 💌</p>}
              {phase === 'opening' && <p style={s.tapHint}>Opening... ✨</p>}
            </div>

            {/* Left triangle */}
            <div style={s.leftFold} />
            {/* Right triangle */}
            <div style={s.rightFold} />
            {/* Bottom triangle */}
            <div style={s.bottomFold} />
          </div>
        ) : (
          <div style={s.letterWrap}>
            <div style={s.letter}>
              <p style={s.letterDate}>February 14th 💕</p>
              <p style={s.salutation}>My dearest love,</p>
              <p style={s.para}>From the moment you came into my life, everything changed. The world became brighter, days became lighter, and my heart became fuller.</p>
              <p style={s.para}>You are my favorite person, my safe place, and my greatest adventure. Every day with you is a gift I never want to return.</p>
              <p style={s.para}>I love you not just for who you are, but for who I become when I am with you.</p>
              <p style={s.closing}>Forever and always yours,</p>
              <p style={s.signature}>Your person 💖</p>
            </div>
            <button onClick={close} style={s.closeBtn}>Close Letter 💌</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes letterReveal {
          from { opacity:0; transform:translateY(-30px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes envFloat {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  wrap: { display: 'flex', justifyContent: 'center' },
  envelope: {
    position: 'relative', width: 300, height: 200,
    cursor: 'pointer', animation: 'envFloat 3s ease-in-out infinite',
  },
  flap: {
    position: 'absolute', top: 0, left: 0, right: 0,
    height: '50%', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    borderRadius: '4px 4px 0 0', transformOrigin: 'top center',
    zIndex: 3, transformStyle: 'preserve-3d',
  },
  envBody: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg,rgba(232,49,90,0.3),rgba(255,107,138,0.2))',
    border: '2px solid rgba(232,49,90,0.5)', borderRadius: 8,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', zIndex: 2,
    backdropFilter: 'blur(10px)',
  },
  seal: { fontSize: '2.5rem', marginBottom: '0.5rem' },
  tapHint: { color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' },
  leftFold: {
    position: 'absolute', bottom: 0, left: 0,
    width: 0, height: 0, zIndex: 1,
    borderStyle: 'solid',
    borderWidth: '100px 0 0 150px',
    borderColor: 'transparent transparent transparent rgba(232,49,90,0.4)',
  },
  rightFold: {
    position: 'absolute', bottom: 0, right: 0,
    width: 0, height: 0, zIndex: 1,
    borderStyle: 'solid',
    borderWidth: '0 0 100px 150px',
    borderColor: 'transparent transparent rgba(232,49,90,0.4) transparent',
  },
  bottomFold: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: '45%', background: 'rgba(200,40,80,0.3)',
    borderRadius: '0 0 8px 8px', zIndex: 1,
  },
  letterWrap: { animation: 'letterReveal 0.6s ease', textAlign: 'center' },
  letter: {
    background: 'rgba(255,255,255,0.97)', borderRadius: 20,
    padding: '2.5rem', maxWidth: 480, margin: '0 auto 1rem',
    textAlign: 'left', boxShadow: '0 20px 60px rgba(232,49,90,0.3)',
  },
  letterDate: { color: '#bbb', fontSize: '0.8rem', marginBottom: '1rem', textAlign: 'right' },
  salutation: { color: '#c0307a', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' },
  para: { color: '#444', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1rem', fontFamily: 'Georgia, serif' },
  closing: { color: '#666', marginTop: '1rem', fontSize: '0.9rem' },
  signature: { color: '#e8315a', fontWeight: 700, fontSize: '1rem', marginTop: '0.3rem' },
  closeBtn: {
    padding: '0.8rem 2rem', background: '#e8315a',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
  },
}