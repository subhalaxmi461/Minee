import { useState } from 'react'

const templates = [
  {
    label: "Romantic 🌹",
    generate: (name) => `My dearest ${name || 'love'},

Every morning the sun rises, but none of its warmth compares to the glow you bring into my life. You are not just someone I love — you are the reason I believe in magic.

Your laugh is my favorite sound. Your smile is my favorite sight. And your heart — your beautiful, kind heart — is my favorite place to be.

I choose you. Today, tomorrow, and in every lifetime that comes after.

Forever and always yours 💖`
  },
  {
    label: "Cute 🐻",
    generate: (name) => `Hey ${name || 'my love'} 🐻,

Okay so... I was thinking about you again (which is like, always) and I just had to write this down.

You make everything better. Like, EVERYTHING. Bad days? You fix them. Good days? You make them perfect. Boring days? Those don't exist when you're around.

I like you a WHOLE lot. Like, embarrassingly much. 🥺

Yours (obviously) 💕`
  },
  {
    label: "Poetic ✨",
    generate: (name) => `For ${name || 'you'},

In the quiet hours between dusk and dawn,
I find my thoughts returning to you —
like a compass always finding north,
like a river always finding sea.

You are the pause between heartbeats,
the warmth behind closed eyes,
the word I search for
when language fails me.

You are home. ✨

With all that I am 💝`
  },
]

export default function AILoveLetter() {
  const [name, setName] = useState('')
  const [selected, setSelected] = useState(0)
  const [letter, setLetter] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setLetter(templates[selected].generate(name))
  }

  const copy = () => {
    navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Just for you</span>
      <h2 className="section-title">Love Letter Generator 💌</h2>

      <div style={s.card}>
        <div style={s.inputRow}>
          <input
            placeholder="Their name (optional) 💕"
            value={name}
            onChange={e => setName(e.target.value)}
            style={s.input}
          />
        </div>

        <div style={s.styles}>
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                ...s.styleBtn,
                background: i === selected ? 'rgba(232,49,90,0.4)' : 'rgba(255,255,255,0.08)',
                border: i === selected ? '1px solid #ff6b8a' : '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button onClick={generate} style={s.genBtn}>
          Generate Letter ✨
        </button>

        {letter && (
          <div style={s.letterBox}>
            <pre style={s.letterText}>{letter}</pre>
            <button onClick={copy} style={s.copyBtn}>
              {copied ? '✅ Copied!' : '📋 Copy Letter'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  card: {
    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24,
    padding: '2.5rem 2rem', maxWidth: 520, margin: '0 auto',
  },
  inputRow: { marginBottom: '1.5rem' },
  input: {
    width: '100%', padding: '0.85rem 1.2rem',
    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 12, color: 'white', fontSize: '0.95rem', outline: 'none',
  },
  styles: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' },
  styleBtn: {
    padding: '0.6rem 1.2rem', borderRadius: 100, color: 'white',
    fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500, transition: 'all 0.3s',
  },
  genBtn: {
    width: '100%', padding: '0.9rem',
    background: 'linear-gradient(135deg,#e8315a,#ff6b8a)',
    border: 'none', borderRadius: 12, color: 'white',
    fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(232,49,90,0.3)',
    marginBottom: '1.5rem',
  },
  letterBox: {
    background: 'rgba(255,255,255,0.95)', borderRadius: 16,
    padding: '1.5rem', textAlign: 'left',
  },
  letterText: {
    color: '#333', fontSize: '0.9rem', lineHeight: 1.8,
    fontFamily: 'Georgia, serif', whiteSpace: 'pre-wrap',
    marginBottom: '1rem',
  },
  copyBtn: {
    padding: '0.6rem 1.5rem', background: '#e8315a',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600,
  },
}