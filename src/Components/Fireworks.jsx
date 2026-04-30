import { useEffect, useRef } from 'react'

export default function Fireworks({ active }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const colors = ['#ff6b8a','#ffd700','#a0b4ff','#ff85a1','#ffffff','#4169e1']

    const createBurst = (x, y) => {
      const color = colors[Math.floor(Math.random() * colors.length)]
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2
        const speed = 2 + Math.random() * 5
        particles.current.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color, size: 2 + Math.random() * 3, gravity: 0.08 })
      }
    }

    let burstCount = 0
    const burstInterval = setInterval(() => {
      if (burstCount >= 8) { clearInterval(burstInterval); return }
      createBurst(100 + Math.random() * (canvas.width - 200), 80 + Math.random() * (canvas.height * 0.5))
      burstCount++
    }, 400)

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.98; p.alpha -= 0.012
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color
        ctx.shadowBlur = 6; ctx.shadowColor = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      })
      particles.current = particles.current.filter(p => p.alpha > 0)
      if (particles.current.length > 0 || burstCount < 8) animRef.current = requestAnimationFrame(draw)
      else ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    animRef.current = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animRef.current); clearInterval(burstInterval) }
  }, [active])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 997, width: '100%', height: '100%' }} />
}