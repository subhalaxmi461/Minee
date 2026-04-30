import { useState, useEffect } from 'react'

const themes = [
  { name: 'Midnight Blue', key: 'blue', bg: 'linear-gradient(135deg,#0f1b3d,#1a2f6e,#2145a0)', accent: '#4169e1', star: '#a0b4ff' },
  { name: 'Rose Gold', key: 'rose', bg: 'linear-gradient(135deg,#2d0a1a,#6b1a35,#a0304d)', accent: '#e8315a', star: '#ffb3c6' },
  { name: 'Forest Night', key: 'forest', bg: 'linear-gradient(135deg,#0a2010,#1a4020,#2a6030)', accent: '#4aaa60', star: '#a0ffb0' },
  { name: 'Purple Galaxy', key: 'purple', bg: 'linear-gradient(135deg,#1a0a3d,#3a1a7a,#5a2ab0)', accent: '#9b59b6', star: '#d0a0ff' },
  { name: 'Sunset', key: 'sunset', bg: 'linear-gradient(135deg,#2d1000,#7a2a00,#c05010)', accent: '#e67e22', star: '#ffcc80' },
  { name: 'Ocean', key: 'ocean', bg: 'linear-gradient(135deg,#001a2d,#003a5a,#005a8a)', accent: '#0099cc', star: '#80d4ff' },
]

export default function ThemeChanger() {
  const [current, setCurrent] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const theme = themes[current]
    document.body.style.background = theme.bg
    document.documentElement.style.setProperty('--accent', theme.accent)
    document.documentElement.style.setProperty('--star', theme.star)
  }, [current])

  return (
    <>
      <button onClick={() => setShow(!show)} style={s.toggleBtn}>
        🎨
      </button>

      {show && (
        <div style={s.panel}>
          <p style={s.panelTitle}>Choose Theme</p>
          {themes.map((t, i) => (
            <button
              key={t.key}
              onClick={() => { setCurrent(i); setShow(false) }}
              style={{
                ...s.themeBtn,
                background: t.bg,
                border: i === current ? '2px solid white' : '2px solid transparent',
                transform: i === current ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </>
  )
}

const s = {
  toggleBtn: {
    position: 'fixed', top: '20px', right: '20px', zIndex: 1001,
    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50%', width: 44, height: 44, fontSize: '1.3rem',
    cursor: 'pointer', backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
  },
  panel: {
    position: 'fixed', top: '72px', right: '20px', zIndex: 1001,
    background: 'rgba(15,27,61,0.95)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16,
    padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
    animation: 'slideDown 0.3s ease',
  },
  panelTitle: { color: '#a0b4ff', fontSize: '0.75rem', textAlign: 'center', marginBottom: '0.3rem', letterSpacing: '0.1em' },
  themeBtn: {
    padding: '0.6rem 1rem', borderRadius: 10, cursor: 'pointer',
    transition: 'all 0.3s', minWidth: 140,
  },
}