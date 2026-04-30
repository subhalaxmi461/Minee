import { useState, useEffect } from 'react'

export default function ProposalAnimation() {
  const [phase, setPhase] = useState(0)
  const [started, setStarted] = useState(false)

  const phases = [
    { emoji: '🌹', text: "Close your eyes...", sub: "Something magical is about to happen" },
    { emoji: '💫', text: "I've been thinking...", sub: "About you, about us, about forever" },
    { emoji: '🌟', text: "Every moment with you...", sub: "Has been the best moment of my life" },
    { emoji: '💍', text: "So I have one question...", sub: "The most important one I'll ever ask" },
    { emoji: '💍', text: "Will you be mine?", sub: "Forever and always? 💖" },
    { emoji: '💖', text: "I Love You!", sub: "Today, tomorrow, and every day after ♾️" },
  ]

  const start = () => {
    setStarted(true)
    setPhase(0)
    phases.forEach((_, i) => {
      setTimeout(() => setPhase(i), i * 2000)
    })
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">A special moment</span>
      <h2 className="section-title">💍 A Proposal Just For You</h2>

      <div style={s.stage}>
        {!started ? (
          <div style={s.startWrap}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'proposalFloat 2s ease-in-out infinite' }}>💍</div>
            <p style={s.startText}>Ready for something special?</p>
            <button onClick={start} style={s.startBtn}>Begin 💖</button>
          </div>
        ) : (
          <div style={{ ...s.phaseWrap, key: phase }}>
            <div style={{
              fontSize: phase === 3 || phase === 4 ? '6rem' : '4rem',
              marginBottom: '1.5rem',
              animation: phase === 3 || phase === 4
                ? 'ringShine 1s ease-in-out infinite'
                : 'proposalFloat 2s ease-in-out infinite',
              filter: phase === 3 || phase === 4 ? 'drop-shadow(0 0 20px gold)' : 'none',
              transition: 'all 0.5s ease',
            }}>
              {phases[phase].emoji}
            </div>
            <h3 style={s.phaseText}>{phases[phase].text}</h3>
            <p style={s.phaseSub}>{phases[phase].sub}</p>

            {phase === 4 && (
              <div style={s.answerBtns}>
                <button onClick={() => setPhase(5)} style={s.yesBtn}>
                  Yes! 💖
                </button>
                <button onClick={() => setPhase(4)} style={s.noBtn}>
                  Ask me again 🥺
                </button>
              </div>
            )}

            {phase === 5 && (
              <div style={s.finalMsg}>
                <p style={s.finalText}>You just made everything perfect 💖</p>
                <button onClick={start} style={s.replayBtn}>Watch Again 🔄</button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes proposalFloat {
          0%,100% { transform: translateY(0) rotate(-5deg); }
          50%      { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes ringShine {
          0%,100% { transform: scale(1) rotate(-5deg); filter: drop-shadow(0 0 15px gold); }
          50%      { transform: scale(1.1) rotate(5deg); filter: drop-shadow(0 0 30px gold); }
        }
        @keyframes phaseIn {
          from { opacity:0; transform:translateY(20px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  stage: {
    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 28,
    padding: '4rem 2rem', maxWidth: 480, margin: '0 auto',
    minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  startWrap: { textAlign: 'center' },
  startText: { color: '#c0d0ff', marginBottom: '1.5rem', fontSize: '1rem' },
  startBtn: {
    padding: '1rem 3rem', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.5)',
  },
  phaseWrap: { textAlign: 'center', animation: 'phaseIn 0.6s ease' },
  phaseText: { color: 'white', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.8rem' },
  phaseSub: { color: '#c0d0ff', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' },
  answerBtns: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' },
  yesBtn: {
    padding: '0.9rem 2.5rem', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.5)',
    animation: 'proposalFloat 1.5s ease-in-out infinite',
  },
  noBtn: {
    padding: '0.9rem 2rem', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
    color: 'white', fontSize: '0.9rem', cursor: 'pointer',
  },
  finalMsg: { textAlign: 'center' },
  finalText: { color: '#ffb3c6', fontSize: '1.1rem', marginBottom: '1rem' },
  replayBtn: {
    padding: '0.7rem 2rem', background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100,
    color: 'white', fontSize: '0.85rem', cursor: 'pointer',
  },
}