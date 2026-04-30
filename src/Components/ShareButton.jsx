import { useState } from 'react'

export default function ShareButton() {
  const [copied, setCopied] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const url = window.location.href
  const msg = encodeURIComponent("💖 I made something special just for you! Open this 👉 " + url)

  const shareWhatsApp = () => window.open(`https://wa.me/?text=${msg}`, '_blank')
  const shareTelegram = () => window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent("💖 Something special for you!")}`, '_blank')

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'My Valentine 💖', text: 'I made something special for you!', url })
    } else {
      setShowMenu(!showMenu)
    }
  }

  return (
    <div style={s.wrap}>
      <button onClick={nativeShare} style={s.mainBtn}>
        📱 Share with your Valentine
      </button>

      {showMenu && (
        <div style={s.menu}>
          <button onClick={shareWhatsApp} style={{ ...s.menuBtn, background: '#25D366' }}>
            💬 WhatsApp
          </button>
          <button onClick={shareTelegram} style={{ ...s.menuBtn, background: '#0088cc' }}>
            ✈️ Telegram
          </button>
          <button onClick={copyLink} style={{ ...s.menuBtn, background: '#e8315a' }}>
            {copied ? '✅ Copied!' : '🔗 Copy Link'}
          </button>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const s = {
  wrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '2rem', position: 'relative', zIndex: 1 },
  mainBtn: {
    padding: '1rem 2.5rem',
    background: 'linear-gradient(135deg,#25D366,#128C7E)',
    border: 'none', borderRadius: 100, color: 'white',
    fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
    transition: 'transform 0.2s',
  },
  menu: {
    display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
    justifyContent: 'center', animation: 'slideDown 0.3s ease',
  },
  menuBtn: {
    padding: '0.7rem 1.5rem', border: 'none', borderRadius: 100,
    color: 'white', fontSize: '0.9rem', fontWeight: 600,
    cursor: 'pointer', transition: 'transform 0.2s',
  },
}