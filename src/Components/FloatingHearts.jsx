import { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev.slice(-15), {
        id: Date.now(),
        left: 5 + Math.random() * 90,
        size: 0.8 + Math.random() * 1.4,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 1,
        emoji: ['💖','💗','💕','💝','🌸','✨'][Math.floor(Math.random() * 6)],
        opacity: 0.4 + Math.random() * 0.5,
      }])
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {hearts.map(h => (
        <span key={h.id} style={{
          position: 'absolute', left: `${h.left}%`, bottom: '-30px',
          fontSize: `${h.size}rem`, opacity: h.opacity,
          animation: `heartUp ${h.duration}s ease-out ${h.delay}s forwards`,
        }}>{h.emoji}</span>
      ))}
      <style>{`@keyframes heartUp { 0%{transform:translateY(0) scale(1);opacity:0.8} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }`}</style>
    </div>
  )
}