import { useRef, useState, useEffect } from 'react'

const COLORS = ['#ff6b8a','#ffffff','#ffd700','#a0b4ff','#4aff80','#ff85a1','#ffb3c6','#e8315a']

export default function DrawingCanvas() {
  const canvasRef = useRef(null)
  const [drawing, setDrawing] = useState(false)
  const [color, setColor] = useState('#ff6b8a')
  const [size, setSize] = useState(4)
  const [tool, setTool] = useState('pen')
  const lastPos = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    ctx.fillStyle = 'rgba(15,27,61,0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e) => {
    setDrawing(true)
    lastPos.current = getPos(e)
  }

  const draw = (e) => {
    if (!drawing) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)

    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(15,27,61,1)' : color
    ctx.lineWidth = tool === 'eraser' ? size * 4 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }

  const stopDraw = () => { setDrawing(false); lastPos.current = null }

  const clear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(15,27,61,0.8)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const download = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = 'our-drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  const addHeart = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.font = '40px serif'
    ctx.fillText('💖', Math.random() * (canvas.width - 60) + 20, Math.random() * (canvas.height - 60) + 40)
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Create together</span>
      <h2 className="section-title">🎨 Draw For Me</h2>
      <p style={s.hint}>Draw something beautiful for your love!</p>

      <div style={s.wrap}>
        {/* Toolbar */}
        <div style={s.toolbar}>
          <div style={s.colorRow}>
            {COLORS.map(c => (
              <button key={c} onClick={() => { setColor(c); setTool('pen') }} style={{
                ...s.colorBtn,
                background: c,
                border: color === c && tool === 'pen' ? '3px solid white' : '2px solid transparent',
                transform: color === c && tool === 'pen' ? 'scale(1.2)' : 'scale(1)',
              }} />
            ))}
          </div>

          <div style={s.toolRow}>
            <button onClick={() => setTool('pen')} style={{ ...s.toolBtn, background: tool === 'pen' ? '#e8315a' : 'rgba(255,255,255,0.1)' }}>✏️ Pen</button>
            <button onClick={() => setTool('eraser')} style={{ ...s.toolBtn, background: tool === 'eraser' ? '#e8315a' : 'rgba(255,255,255,0.1)' }}>🧹 Erase</button>
            <button onClick={addHeart} style={s.toolBtn}>💖 Heart</button>
            <button onClick={clear} style={s.toolBtn}>🗑️ Clear</button>
            <button onClick={download} style={{ ...s.toolBtn, background: '#4169e1' }}>⬇️ Save</button>
          </div>

          <div style={s.sizeRow}>
            <span style={{ color: '#a0b4ff', fontSize: '0.8rem' }}>Size:</span>
            <input type="range" min="1" max="20" value={size} onChange={e => setSize(+e.target.value)} style={s.slider} />
            <span style={{ color: 'white', fontSize: '0.8rem' }}>{size}px</span>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={s.canvas}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  hint: { color: '#a0b4ff', marginBottom: '1.5rem', fontSize: '0.9rem' },
  wrap: { maxWidth: 560, margin: '0 auto' },
  toolbar: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px 16px 0 0',
    padding: '1rem',
  },
  colorRow: { display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' },
  colorBtn: { width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', transition: 'all 0.2s' },
  toolRow: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' },
  toolBtn: {
    padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.1)',
    border: 'none', borderRadius: 8, color: 'white',
    fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s',
  },
  sizeRow: { display: 'flex', gap: '0.75rem', alignItems: 'center', justifyContent: 'center' },
  slider: { width: 120, accentColor: '#e8315a' },
  canvas: {
    width: '100%', height: 320, display: 'block',
    borderRadius: '0 0 16px 16px', cursor: 'crosshair',
    border: '1px solid rgba(255,255,255,0.1)', borderTop: 'none',
    touchAction: 'none',
  },
}