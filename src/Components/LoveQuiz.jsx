import { useState } from 'react'

const questions = [
  {
    q: "What is my favorite color?",
    options: ["Blue 💙", "Red ❤️", "Pink 🩷", "Purple 💜"],
    answer: 1,
  },
  {
    q: "Where would I love to take you on a date?",
    options: ["Beach 🏖️", "Mountains 🏔️", "Paris 🗼", "Home 🏠"],
    answer: 1,
  },
  {
    q: "What do I love most about you?",
    options: ["Your smile 😊", "Your laugh 😂", "Your heart 💖", "Everything ✨"],
    answer: 4,
  },
  {
    q: "What is our song?",
    options: ["Rabba 🎵", " khat  🎶", "zulfe 🎼", "All of Me 🎹"],
    answer: 1,
  },
  {
    q: "How long have I loved you?",
    options: ["Since day one 💫", "Always 🌙", "Forever ♾️", "Since forever 💝"],
    answer: 3,
  },
]

export default function LoveQuiz() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === questions[current].answer) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setFinished(true)
      } else {
        setCurrent(c => c + 1)
        setSelected(null)
        setAnswered(false)
      }
    }, 1200)
  }

  const reset = () => {
    setCurrent(0); setSelected(null)
    setScore(0); setFinished(false); setAnswered(false)
  }

  const getEmoji = () => {
    if (score === 5) return { e: '💖', msg: "You know me perfectly! Soulmates confirmed! 🥰" }
    if (score >= 3) return { e: '💕', msg: "You know me so well! I love you! 😊" }
    return { e: '💝', msg: "Still learning, but I love you anyway! 😄" }
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Just for fun</span>
      <h2 className="section-title">How well do you know me? 💭</h2>

      <div style={s.card}>
        {!finished ? (
          <>
            <div style={s.progress}>
              {questions.map((_, i) => (
                <div key={i} style={{
                  ...s.dot,
                  background: i < current ? '#ff6b8a' : i === current ? '#fff' : 'rgba(255,255,255,0.2)',
                  transform: i === current ? 'scale(1.3)' : 'scale(1)',
                }} />
              ))}
            </div>

            <p style={s.qNum}>Question {current + 1} of {questions.length}</p>
            <h3 style={s.question}>{questions[current].q}</h3>

            <div style={s.options}>
              {questions[current].options.map((opt, i) => {
                let bg = 'rgba(255,255,255,0.08)'
                let border = '1px solid rgba(255,255,255,0.15)'
                if (answered) {
                  if (i === questions[current].answer) { bg = 'rgba(100,220,100,0.3)'; border = '1px solid #6adb6a' }
                  else if (i === selected) { bg = 'rgba(220,80,80,0.3)'; border = '1px solid #e05555' }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    ...s.optBtn, background: bg, border,
                    transform: answered && i === questions[current].answer ? 'scale(1.03)' : 'scale(1)',
                  }}>
                    {opt}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div style={s.result}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{getEmoji().e}</div>
            <h3 style={s.score}>{score}/{questions.length}</h3>
            <p style={s.resultMsg}>{getEmoji().msg}</p>
            <button onClick={reset} style={s.retryBtn}>Try Again 🔄</button>
          </div>
        )}
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  card: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem 2rem', maxWidth: 500, margin: '0 auto',
  },
  progress: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '1.5rem' },
  dot: { width: 10, height: 10, borderRadius: '50%', transition: 'all 0.3s' },
  qNum: { color: '#a0b4ff', fontSize: '0.8rem', marginBottom: '0.5rem' },
  question: { color: 'white', fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.4 },
  options: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  optBtn: {
    padding: '0.85rem 1.2rem', borderRadius: 12, color: 'white',
    fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left',
    transition: 'all 0.3s', fontWeight: 500,
  },
  result: { textAlign: 'center', padding: '1rem' },
  score: { fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1rem' },
  resultMsg: { color: '#c0d0ff', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 },
  retryBtn: {
    padding: '0.8rem 2rem', background: '#e8315a', border: 'none',
    borderRadius: 100, color: 'white', fontSize: '0.9rem',
    cursor: 'pointer', fontWeight: 600,
  },
}