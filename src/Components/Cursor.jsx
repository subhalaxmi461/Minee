import React, { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
      const heart = document.createElement('span')
      heart.className = 'cursor-trail'
      heart.textContent = '💗'
      heart.style.left = e.clientX + 'px'
      heart.style.top  = e.clientY + 'px'
      document.body.appendChild(heart)
      setTimeout(() => heart.remove(), 700)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div className="cursor" ref={cursorRef}>💖</div>
}