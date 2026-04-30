import { useEffect, useRef } from 'react'

export default function ShootingStars() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.5 + Math.random() * 1.5,
      opacity: Math.random(),
      speed: 0.002 + Math.random() * 0.005,
    }))

    const shooters = []
    const addShooter = () => {
      shooters.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.4,
        len: 80 + Math.random() * 120,
        speed: 8 + Math.random() * 6,
        opacity: 1,
        angle: Math.PI / 4,
      })
    }

    const shootInterval = setInterval(addShooter, 2500)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Static stars
      stars.forEach(s => {
        s.opacity += s.speed * (Math.random() > 0.5 ? 1 : -1)
        s.opacity = Math.max(0.1, Math.min(1, s.opacity))
        ctx.save()
        ctx.globalAlpha = s.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        ctx.save()
        ctx.globalAlpha = s.opacity
        const grad = ctx.createLinearGradient(
          s.x, s.y,
          s.x - Math.cos(s.angle) * s.len,
          s.y - Math.sin(s.angle) * s.len
        )
        grad.addColorStop(0, 'rgba(255,255,255,0.9)')
        grad.addColorStop(0.3, 'rgba(255,200,220,0.6)')
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len)
        ctx.stroke()
        ctx.restore()

        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed
        s.opacity -= 0.018

        if (s.opacity <= 0) shooters.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      clearInterval(shootInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0,
      width: '100%', height: '100%',
    }} />
  )
}