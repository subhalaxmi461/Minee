import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [notes, setNotes] = useState([])
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/song.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 1.0
    return () => { audioRef.current.pause() }
  }, [])

  const toggle = () => {
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setPlaying(true)
      spawnNotes()
    }
  }

  const spawnNotes = () => {
    const symbols = ['♪','♫','♬','♩','🎵','🎶']
    setNotes(Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      left: 10 + Math.random() * 80,
      delay: Math.random() * 2,
    })))
    setTimeout(() => setNotes([]), 3500)
  }

  return (
    <div style={s.wrap}>
      <button style={{ ...s.btn, background: playing ? '#e8315a' : 'rgba(255,255,255,0.15)' }} onClick={toggle}>
        <span style={{ fontSize: '1.1rem' }}>{playing ? '⏸' : '▶'}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{playing ? 'Pause Music' : 'Play Music 🎵'}</span>
      </button>
      {notes.map(n => (
        <span key={n.id} style={{
          position: 'fixed',
          left: `${n.left}%`,
          bottom: '80px',
          fontSize: '1.4rem',
          pointerEvents: 'none',
          zIndex: 999,
          animationName: 'noteFloat',
          animationDuration: '3s',
          animationDelay: `${n.delay}s`,
          animationFillMode: 'forwards',
          animationTimingFunction: 'ease-out',
        }}>{n.symbol}</span>
      ))}
      <style>{`
        @keyframes noteFloat {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-200px) scale(0.3) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

const s = {
  wrap: { position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 },
  btn: {
    display: 'flex', alignItems: 'center', gap: '8px',
    padding: '10px 18px', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '100px', color: 'white', cursor: 'pointer',
    backdropFilter: 'blur(10px)', transition: 'all 0.3s',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  }
}   