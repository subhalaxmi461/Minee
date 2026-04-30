import { useState } from 'react'

const defaultWishes = [
  { id: 1, text: "Travel the world together 🌍", done: false },
  { id: 2, text: "Watch the sunset from a mountain 🌅", done: false },
  { id: 3, text: "Dance in the rain together 🌧️", done: false },
  { id: 4, text: "Cook our favorite meal together 🍳", done: false },
  { id: 5, text: "Write letters to each other 💌", done: false },
  { id: 6, text: "Plant a tree together 🌱", done: false },
  { id: 7, text: "Watch all our favorite movies 🎬", done: false },
  { id: 8, text: "Take a photo every month 📸", done: false },
]

export default function WishList() {
  const [wishes, setWishes] = useState(defaultWishes)
  const [newWish, setNewWish] = useState('')

  const toggle = (id) => {
    setWishes(prev => prev.map(w => w.id === id ? { ...w, done: !w.done } : w))
  }

  const addWish = () => {
    if (!newWish.trim()) return
    setWishes(prev => [...prev, { id: Date.now(), text: newWish, done: false }])
    setNewWish('')
  }

  const remove = (id) => setWishes(prev => prev.filter(w => w.id !== id))

  const done = wishes.filter(w => w.done).length

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Dreams together</span>
      <h2 className="section-title">Our Wish List 🌟</h2>

      <div style={s.progress}>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${(done / wishes.length) * 100}%` }} />
        </div>
        <p style={s.progressText}>{done}/{wishes.length} dreams fulfilled 💫</p>
      </div>

      <div style={s.list}>
        {wishes.map(w => (
          <div key={w.id} style={{
            ...s.item,
            background: w.done ? 'rgba(100,220,100,0.15)' : 'rgba(255,255,255,0.06)',
            border: w.done ? '1px solid rgba(100,220,100,0.3)' : '1px solid rgba(255,255,255,0.1)',
          }}>
            <button onClick={() => toggle(w.id)} style={s.check}>
              {w.done ? '✅' : '⭕'}
            </button>
            <span style={{
              ...s.wishText,
              textDecoration: w.done ? 'line-through' : 'none',
              opacity: w.done ? 0.6 : 1,
            }}>{w.text}</span>
            <button onClick={() => remove(w.id)} style={s.del}>🗑️</button>
          </div>
        ))}
      </div>

      <div style={s.addRow}>
        <input
          placeholder="Add a new wish 💕"
          value={newWish}
          onChange={e => setNewWish(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addWish()}
          style={s.input}
        />
        <button onClick={addWish} style={s.addBtn}>+ Add</button>
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  progress: { maxWidth: 500, margin: '0 auto 2rem' },
  progressBar: { height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 100, overflow: 'hidden', marginBottom: '0.5rem' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg,#e8315a,#ff6b8a)', borderRadius: 100, transition: 'width 0.5s ease' },
  progressText: { color: '#a0b4ff', fontSize: '0.85rem' },
  list: { maxWidth: 500, margin: '0 auto 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  item: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', borderRadius: 12, transition: 'all 0.3s' },
  check: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', flexShrink: 0 },
  wishText: { color: 'white', fontSize: '0.92rem', flex: 1, textAlign: 'left', transition: 'all 0.3s' },
  del: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', opacity: 0.5 },
  addRow: { display: 'flex', gap: '0.75rem', maxWidth: 500, margin: '0 auto' },
  input: {
    flex: 1, padding: '0.8rem 1.2rem',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 12, color: 'white', fontSize: '0.9rem', outline: 'none',
  },
  addBtn: {
    padding: '0.8rem 1.5rem', background: '#e8315a',
    border: 'none', borderRadius: 12, color: 'white',
    fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
  },
}