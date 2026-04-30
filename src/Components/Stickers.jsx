import React, { useState } from 'react'

const STICKERS = ['💖', '🌸', '🥰', '💝', '✨', '🌹', '💌', '🦋', '🍓', '💫']

export default function Stickers() {
  const [placed, setPlaced] = useState([])

  const handleClick = (e) => {
    const sticker = STICKERS[Math.floor(Math.random() * STICKERS.length)]
    setPlaced(prev => [...prev, {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      sticker
    }])
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 999 }}
    >
      {placed.map(s => (
        <span
          key={s.id}
          style={{
            position: 'fixed',
            left: s.x,
            top: s.y,
            fontSize: '1.5rem',
            pointerEvents: 'none',
            animation: 'stickerPop 0.3s ease',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {s.sticker}
        </span>
      ))}
      <style>{`
        @keyframes stickerPop {
          from { transform: translate(-50%,-50%) scale(0); opacity: 0; }
          to   { transform: translate(-50%,-50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}