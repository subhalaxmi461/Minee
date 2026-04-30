import React from 'react'
import './Strip.css'

const WORDS = ['I love you','You are my person','Forever yours','My Valentine','Always and forever','Just you and me']

export default function Strip() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="strip">
      <div className="strip__track">
        {items.map((w, i) => (
          <span key={i} className="strip__item">
            {w} <span className="strip__sep">💖</span>
          </span>
        ))}
      </div>
    </div>
  )
}