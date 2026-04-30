import { useState, useRef } from 'react'

export default function PhotoUpload() {
  const [photos, setPhotos] = useState([])
  const [captions, setCaptions] = useState({})
  const inputRef = useRef(null)

  const handleUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          src: ev.target.result,
          name: file.name,
        }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const updateCaption = (id, val) => {
    setCaptions(prev => ({ ...prev, [id]: val }))
  }

  return (
    <section style={s.section}>
      <span className="section-eyebrow">Add your memories</span>
      <h2 className="section-title">Our Photo Wall 📸</h2>

      <div style={s.uploadBox} onClick={() => inputRef.current.click()}>
        <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>📷</div>
        <p style={s.uploadText}>Click to add your photos</p>
        <p style={s.uploadSub}>Add your favorite memories together</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
      </div>

      {photos.length > 0 && (
        <div style={s.grid}>
          {photos.map(photo => (
            <div key={photo.id} style={s.photoCard}>
              <div style={s.imgWrap}>
                <img src={photo.src} alt={photo.name} style={s.img} />
                <button
                  onClick={() => removePhoto(photo.id)}
                  style={s.removeBtn}
                >✕</button>
              </div>
              <input
                placeholder="Add a caption 💕"
                value={captions[photo.id] || ''}
                onChange={e => updateCaption(photo.id, e.target.value)}
                style={s.captionInput}
              />
            </div>
          ))}
        </div>
      )}

      {photos.length === 0 && (
        <p style={s.hint}>Your photos will appear here 🌸</p>
      )}
    </section>
  )
}

const s = {
  section: { padding: '6rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 },
  uploadBox: {
    background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)',
    border: '2px dashed rgba(255,255,255,0.25)', borderRadius: 20,
    padding: '3rem 2rem', maxWidth: 400, margin: '0 auto 2rem',
    cursor: 'pointer', transition: 'all 0.3s',
  },
  uploadText: { color: 'white', fontWeight: 600, fontSize: '1rem', marginBottom: '0.3rem' },
  uploadSub: { color: '#a0b4ff', fontSize: '0.85rem' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem', maxWidth: 700, margin: '0 auto',
  },
  photoCard: {
    background: 'rgba(255,255,255,0.08)', borderRadius: 16,
    overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)',
  },
  imgWrap: { position: 'relative', aspectRatio: '1', overflow: 'hidden' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  removeBtn: {
    position: 'absolute', top: 8, right: 8,
    background: 'rgba(232,49,90,0.85)', border: 'none',
    borderRadius: '50%', width: 28, height: 28,
    color: 'white', cursor: 'pointer', fontSize: '0.8rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  captionInput: {
    width: '100%', background: 'transparent', border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    color: 'white', padding: '0.6rem 0.8rem', fontSize: '0.85rem',
    outline: 'none',
  },
  hint: { color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginTop: '1rem' },
}