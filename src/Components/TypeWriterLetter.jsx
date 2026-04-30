import { useState, useEffect, useRef } from 'react'

const LINES = [
  "My dearest,",
  "",
  "From the very first moment I saw you, something shifted inside me —",
  "like a quiet song I had forgotten I knew.",
  "",
  "Every morning I wake up grateful — for your laugh,",
  "for the way your eyes crinkle when you smile,",
  "for every little thing that makes you, you.",
  "",
  "You are not just my Valentine.",
  "You are my favorite person, my safe place, my home.",
  "",
  "I choose you — today, tomorrow, and every day after.",
  "",
  "Forever yours,",
  " sonaa 💖",
]

export default function TypewriterLetter() {
  const [displayed, setDisplayed] = useState([''])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || done) return
    if (lineIdx >= LINES.length) { setDone(true); return }

    const currentLine = LINES[lineIdx]

    if (charIdx < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const updated = [...prev]
          updated[lineIdx] = currentLine.slice(0, charIdx + 1)
          return updated
        })
        setCharIdx(c => c + 1)
      }, 30)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1)
        setCharIdx(0)
        setDisplayed(prev => [...prev, ''])
      }, currentLine === '' ? 80 : 280)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx, done])

  return (
    <section ref={ref} style={s.section}>
      <span className="section-eyebrow">Written just for you</span>
      <h2 className="section-title">A letter from my heart 💌</h2>

      <div style={s.paper}>
        <p style={s.date}>March 4 th 💕</p>

        {displayed.map((line, i) => (
          <p key={i} style={{
            ...s.line,
            fontWeight: i === 0 || i >= LINES.length - 2 ? 600 : 400,
            minHeight: '1.5em',
            color: i === 0 ? '#9b1535' : '#444',
          }}>
            {line || '\u00A0'}
            {i === displayed.length - 1 && !done && (
              <span style={s.cursor}>|</span>
            )}
          </p>
        ))}

        {done && (
          <div style={s.seal}>
            <span style={{ fontSize: '2.5rem' }}>💌</span>
            <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Sealed with love
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: {
    padding: '6rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  paper: {
    background: 'rgba(255,255,255,0.97)',
    borderRadius: 20,
    padding: '2.5rem 2.5rem',
    maxWidth: 520,
    margin: '0 auto',
    textAlign: 'left',
    boxShadow: '0 20px 60px rgba(65,105,225,0.3)',
    border: '1px solid rgba(255,255,255,0.3)',
  },
  date: {
    fontSize: '0.8rem',
    color: '#bbb',
    marginBottom: '1.5rem',
    textAlign: 'right',
  },
  line: {
    color: '#444',
    lineHeight: 1.9,
    fontSize: '0.95rem',
    fontFamily: "'Playfair Display', Georgia, serif",
    marginBottom: '0.1rem',
  },
  cursor: {
    display: 'inline-block',
    color: '#e8315a',
    fontWeight: 300,
    animation: 'cursorBlink 0.8s steps(1) infinite',
  },
  seal: {
    textAlign: 'center',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: '1px dashed #eee',
  },
}