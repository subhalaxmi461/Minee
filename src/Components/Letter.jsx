import React, { useState } from 'react'

export default function Letter() {
  const [open, setOpen] = useState(false)
  return (
    <section className="letter-section">
      <span className="section-eyebrow">Written just for you</span>
      <h2 className="section-title">A letter from my heart 💌</h2>
      <div className={`envelope ${open ? 'envelope--open' : ''}`} onClick={() => setOpen(true)}>
        {!open && (
          <>
            <div className="envelope__flap" />
            <div className="envelope__body">
              <span className="envelope__hint">Click to open 💌</span>
            </div>
          </>
        )}
        {open && (
          <div className="letter__paper">
            <p className="letter__date">February 14th, 2025</p>
            <p className="letter__salutation">My dearest,</p>
            <p>From the very first moment I saw you, something shifted inside me — like a quiet song I had forgotten I knew.</p>
            <p>Every morning I wake up grateful — for your laugh, for the way your eyes crinkle when you smile, for every little thing that makes you, you.</p>
            <p>You are not just my Valentine. You are my favorite person, my safe place, my home. I choose you — today, tomorrow, and every day after.</p>
            <p className="letter__closing">Forever yours,<br /><strong>Your person 💖</strong></p>
          </div>
        )}
      </div>
    </section>
  )
}