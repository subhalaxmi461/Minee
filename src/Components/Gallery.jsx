import React, { useState } from 'react'
import Lightbox from './Lightbox'

const photos = [
  { src: '/photo2.jpg', caption: 'The day we first met 🌸' },
  { src: '/photo2.jpg', caption: 'Our first adventure 🗺️' },
  { src: '/photo3.jpg', caption: 'You looked perfect 💫' },
  { src: '/photo4.jpg', caption: 'My favorite memory 🌅' },
  { src: '/photo5.jpg', caption: 'Us against the world 🌍' },
  { src: '/photo6.jpg', caption: 'Every moment with you 💖' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <section className="gallery-section">
      <span className="section-eyebrow">Our story in pictures</span>
      <h2 className="section-title">Moments I treasure 📸</h2>
      <div className="gallery__grid">
        {photos.map((p, i) => (
          <div key={i} className="gallery__card" onClick={() => setLightbox(i)}>
            <div className="gallery__img-wrap">
              <img src={p.src} alt={p.caption} onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
              <div className="gallery__placeholder"><span>📷</span><small>Add photo</small></div>
            </div>
            <p className="gallery__caption">{p.caption}</p>
          </div>
        ))}
      </div>
      {lightbox !== null && <Lightbox photos={photos} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />}
    </section>
  )
}