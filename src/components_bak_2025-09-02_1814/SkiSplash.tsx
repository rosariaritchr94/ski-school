'use client'
import { useEffect, useState } from 'react'

export default function SkiSplash({ durationMs = 2000, speedMs = 2200 }: { durationMs?: number; speedMs?: number }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), durationMs)
    return () => clearTimeout(t)
  }, [durationMs])

  if (!show) return null

  return (
    <div className="splash-overlay">
      <div className="splash-clock">
        {/* mano/lancetta: i tuoi sci al centro che ruotano */}
        <img
          src="/img/skis.png"
          alt="Caricamento"
          className="splash-hand"
          style={{ animationDuration: `${speedMs}ms` }}
        />
      </div>
    </div>
  )
}
