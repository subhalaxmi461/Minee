import { useEffect, useRef, useState } from 'react'

const events = [
  { date: 'Feb 14, 2024', title: 'The day we met 💫', desc: 'The moment everything changed forever.', emoji: '🌟' },
  { date: 'Mar 04, 2024', title: 'Our first date 🌹', desc: 'Nervous smiles and endless conversations.', emoji: '🌹' },
  { date: 'Apr 14, 2024', title: 'First "I love you" 💖', desc: 'Three words that changed everything.', emoji: '💖' },
  { date: 'Jul 4 , 2024', title: 'Our first trip 🗺️', desc: 'Adventures are better with you.', emoji: '✈️' },
  { date: 'Dec 31, 2025', title: 'New Year together 🎆', desc: 'Counting down with you was magical.', emoji: '🎆' },
  { date: 'Feb 14, 2025', title: 'First Valentine\'s 💝', desc: 'A day I will never forget.', emoji: '💝' },
  { date: 'Today 💕', title: 'Forever begins now', desc: 'Every day with you is my favorite day.', emoji: '🌸' },
]

function TimelineItem({ event, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: 'flex',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      marginBottom: '2rem',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(30px)`,
      transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
    }}>
      <div style={{
        ...s.item,
        marginLeft: isLeft ? '0' : 'auto',
        marginRight: isLeft ? 'auto' : '0',
        borderLeft: isLeft ? '3px solid #ff6b8a' : 'none',
        borderRight: isLeft ? 'none' : '3px solid #a0b4ff',
        paddingLeft: isLeft ? '1.2rem' : '1rem',
        paddingRight: isLeft ? '1rem' : '1.2rem',
        textAlign: isLeft ? 'left' : 'right',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{event.emoji}</div>
        <p style={s.date}>{event.date}</p>
        <h3 style={s.title}>{event.title}</h3>
        <p style={s.desc}>{event.desc}</p>
      </div>
    </div>
  )
}

export default function OurTimeline() {
  return (
    <section style={s.section}>
      <span className="section-eyebrow">Our journey</span>
      <h2 className="section-title">Our Story 💑</h2>

      <div style={s.timeline}>
        <div style={s.line} />
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', position: 'relative', zIndex: 1 },
  timeline: { maxWidth: 600, margin: '0 auto', position: 'relative', padding: '1rem 0' },
  line: {
    position: 'absolute', left: '50%', top: 0, bottom: 0,
    width: 2, background: 'linear-gradient(180deg, #ff6b8a, #a0b4ff)',
    transform: 'translateX(-50%)',
  },
  item: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16,
    padding: '1.2rem', width: '44%',
  },
  date: { color: '#a0b4ff', fontSize: '0.75rem', marginBottom: '0.3rem', letterSpacing: '0.05em' },
  title: { color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' },
  desc: { color: '#c0d0ff', fontSize: '0.85rem', lineHeight: 1.5 },
}