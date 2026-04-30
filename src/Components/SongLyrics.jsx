import { useState, useEffect, useRef } from 'react'

const SONG = {
  title: "Him & I",
  artist: "G-Eazy & Halsey",
  lyrics: [
    { time: 0,  text: "🎵 He said, tell me your secrets..." },
    { time: 3,  text: "I said, where do I begin?" },
    { time: 6,  text: "He said, open your heart up..." },
    { time: 9,  text: "I said, let me let you in 💕" },
    { time: 12, text: "He said, I got your back babe..." },
    { time: 15, text: "I said, I got you too..." },
    { time: 18, text: "He said, nobody else babe..." },
    { time: 21, text: "I said, it's only you 💖" },
    { time: 24, text: "Him and I, we don't do it like the others do..." },
    { time: 27, text: "Him and I, nobody in the world like us two 🌍" },
    { time: 30, text: "We built this love from the bottom baby..." },
    { time: 33, text: "You and me against the world 💫" },
    { time: 36, text: "Him and I, nobody else, just us two..." },
    { time: 39, text: "Till I die it's only him and I 💝" },
    { time: 42, text: "He said, I'll never leave you..." },
    { time: 45, text: "I said, promise me that's true..." },
    { time: 48, text: "He said, cross my heart babe..." },
    { time: 51, text: "I said, I believe in you 🌸" },
    { time: 54, text: "Him and I, we don't do it like the others do..." },
    { time: 57, text: "Him and I, nobody in the world like us two 💖" },
    { time: 60, text: "We built this love from the bottom baby..." },
    { time: 63, text: "You and me against the world 🌍" },
    { time: 66, text: "Till I die it's only him and I 💕" },
  ]
}

export default function SongLyrics() {
  const [playing, setPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          const next = e + 1
          const line = SONG.lyrics.filter(l => l.time <= next).length - 1
          setCurrentLine(Math.max(0, line))
          if (next >= SONG.lyrics[SONG.lyrics.length - 1].time + 4) {
            setPlaying(false)
            setElapsed(0)
            setCurrentLine(0)
            clearInterval(intervalRef.current)
          }
          return next
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing])

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Our song</span>
      <h2 className="section-title">🎵 {SONG.title}</h2>
      <p style={s.artist}>by {SONG.artist}</p>

      <div style={s.player}>
        <div style={s.vinyl}>
          <div style={{
            ...s.disc,
            animation: playing ? 'spin 4s linear infinite' : 'none',
          }}>🎵</div>
        </div>

        <div style={s.lyricsBox}>
          {SONG.lyrics.map((line, i) => (
            <p key={i} style={{
              ...s.lyricLine,
              opacity: Math.abs(i - currentLine) > 2 ? 0.15 : 1 - Math.abs(i - currentLine) * 0.3,
              transform: i === currentLine ? 'scale(1.08)' : 'scale(1)',
              color: i === currentLine ? '#ffffff' : '#8090c0',
              fontWeight: i === currentLine ? 700 : 400,
              fontSize: i === currentLine ? '1.1rem' : '0.9rem',
              transition: 'all 0.5s ease',
            }}>
              {line.text}
            </p>
          ))}
        </div>

        <button onClick={() => setPlaying(!playing)} style={s.playBtn}>
          {playing ? '⏸ Pause' : '▶ Play Lyrics'}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  artist: { color: '#a0b4ff', marginBottom: '2rem', fontSize: '0.9rem' },
  player: {
    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24,
    padding: '2rem', maxWidth: 460, margin: '0 auto',
  },
  vinyl: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  disc: {
    width: 80, height: 80, borderRadius: '50%',
    background: 'linear-gradient(135deg,#1a1a2e,#e8315a)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '2rem', boxShadow: '0 0 30px rgba(232,49,90,0.5)',
  },
  lyricsBox: { maxHeight: 220, overflow: 'hidden', marginBottom: '1.5rem', padding: '0 1rem' },
  lyricLine: { margin: '0.6rem 0', transition: 'all 0.5s ease', cursor: 'default' },
  playBtn: {
    padding: '0.8rem 2.5rem', background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.4)',
  },
}