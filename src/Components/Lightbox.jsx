import React, { useEffect } from 'react'

export default function Lightbox({ photos, index, onClose, onChange }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange(i => Math.min(i + 1, photos.length - 1))
      if (e.key === 'ArrowLeft') onChange(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const photo = photos[index]

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose}>✕</button>
      <button
        className="lightbox__arrow lightbox__arrow--left"
        onClick={e => { e.stopPropagation(); onChange(Math.max(index - 1, 0)) }}
        disabled={index === 0}
      >‹</button>
      <div className="lightbox__content" onClick={e => e.stopPropagation()}>
        <img src={photo.src} alt={photo.caption} />
        <p className="lightbox__caption">{photo.caption}</p>
      </div>
      <button
        className="lightbox__arrow lightbox__arrow--right"
        onClick={e => { e.stopPropagation(); onChange(Math.min(index + 1, photos.length - 1)) }}
        disabled={index === photos.length - 1}
      >›</button>
    </div>
  )
}