import { useState, useEffect } from 'react'

const slides = [
  { emoji: '🌸', caption: 'The day we first met', color: '#ff6b8a', src: '/photo1.jpg' },
  { emoji: '🗺️', caption: 'Our first adventure', color: '#4169e1', src: '/photo2.jpg' },
  { emoji: '💫', caption: 'You looked perfect', color: '#9b59b6', src: '/photo3.jpg' },
  { emoji: '🌅', caption: 'My favorite memory', color: '#e67e22', src: '/photo4.jpg' },
  { emoji: '🌍', caption: 'Us against the world', color: '#27ae60', src: '/photo5.jpg' },
  { emoji: '💖', caption: 'Every moment with you', color: '#e8315a', src: '/photo6.jpg' },
]

export default function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const [imgError, setImgError] = useState({})

  useEffect(() => {
    const t = setInterval(() => goNext(), 3500)
    return () => clearInterval(t)
  }, [current])

  const goNext = () => {
    if (animating) return
    setDirection('next')
    setAnimating(true)
    setTimeout(() => { setCurrent(c => (c + 1) % slides.length); setAnimating(false) }, 400)
  }

  const goPrev = () => {
    if (animating) return
    setDirection('prev')
    setAnimating(true)
    setTimeout(() => { setCurrent(c => (c - 1 + slides.length) % slides.length); setAnimating(false) }, 400)
  }

  const slide = slides[current]

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Our story in pictures</span>
      <h2 className="section-title">Moments I treasure 📸</h2>

      <div style={s.wrap}>
        <button style={s.arrow} onClick={goPrev}>‹</button>

        <div style={{
          ...s.slide,
          background: `linear-gradient(135deg, ${slide.color}22, ${slide.color}44)`,
          border: `1px solid ${slide.color}66`,
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === 'next' ? '-30px' : '30px'}) scale(0.97)`
            : 'translateX(0) scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}>
          <div style={s.imgWrap}>
            {!imgError[current] ? (
              <img
                src={slide.src}
                alt={slide.caption}
                style={s.img}
                onError={() => setImgError(prev => ({ ...prev, [current]: true }))}
              />
            ) : (
              <div style={s.placeholder}>
                <span style={{ fontSize: '3rem' }}>{slide.emoji}</span>
                <small style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  Add photo to public folder
                </small>
              </div>
            )}
          </div>
          <p style={s.caption}>{slide.caption}</p>
        </div>

        <button style={s.arrow} onClick={goNext}>›</button>
      </div>

      <div style={s.dots}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            ...s.dot,
            background: i === current ? '#ff6b8a' : 'rgba(255,255,255,0.3)',
            transform: i === current ? 'scale(1.4)' : 'scale(1)',
          }} />
        ))}
      </div>

      <div style={s.grid}>
        {slides.map((sl, i) => (
          <div key={i} onClick={() => setCurrent(i)} style={{
            ...s.gridItem,
            border: i === current ? '2px solid #ff6b8a' : '1px solid rgba(255,255,255,0.1)',
            transform: i === current ? 'scale(1.06)' : 'scale(1)',
          }}>
            {!imgError[i] ? (
              <img
                src={sl.src}
                alt={sl.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={() => setImgError(prev => ({ ...prev, [i]: true }))}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', fontSize: '1.5rem' }}>
                {sl.emoji}
              </div>
            )}
            <div style={s.gridOverlay}>{sl.caption}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  wrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
  arrow: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '2rem', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  slide: { width: '100%', maxWidth: 260, borderRadius: 24, overflow: 'hidden', padding: '1rem' },
  imgWrap: { position: 'relative', aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', marginBottom: '0.8rem', background: 'rgba(255,255,255,0.05)' },
  img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  placeholder: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  caption: { color: 'white', fontWeight: 600, fontSize: '0.9rem' },
  dots: { display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' },
  dot: { width: 8, height: 8, borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', maxWidth: 400, margin: '0 auto' },
  gridItem: { position: 'relative', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' },
  gridOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.65rem', padding: '0.4rem 0.5rem' },
}