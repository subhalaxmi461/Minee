import React, { useEffect, useState } from 'react'

const START_DATE = new Date('2023-02-14T00:00:00')

function getElapsed() {
  const diff = Math.max(0, Date.now() - START_DATE.getTime())
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const secs  = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, mins, secs }
}

export default function Countdown() {
  const [time, setTime] = useState(getElapsed())

  useEffect(() => {
    const id = setInterval(() => setTime(getElapsed()), 1000)
    return () => clearInterval(id)
  }, [])

  const boxes = [
    { label: 'Days',    value: String(time.days).padStart(3, '0') },
    { label: 'Hours',   value: String(time.hours).padStart(2, '0') },
    { label: 'Minutes', value: String(time.mins).padStart(2, '0') },
    { label: 'Seconds', value: String(time.secs).padStart(2, '0') },
  ]

  return (
    <section className="countdown">
      <span className="section-eyebrow">Every second counts</span>
      <h2 className="section-title">Time since we met 🕰️</h2>
      <div className="countdown__grid">
        {boxes.map(({ label, value }) => (
          <div key={label} className="countdown__box">
            <span className="countdown__num">{value}</span>
            <span className="countdown__unit">{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown__note">…and every single one has been a gift 💝</p>
    </section>
  )
}