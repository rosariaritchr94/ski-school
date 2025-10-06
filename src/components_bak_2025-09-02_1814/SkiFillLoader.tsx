'use client'

type Props = {
  label?: string
  /** 0..100 per loader a percentuale; se omesso → indeterminato */
  progress?: number | null
  /** colore del riempimento */
  color?: string
  /** larghezza in px; l’altezza si adatta */
  width?: number
}

export default function SkiFillLoader({ label = 'Carico…', progress = null, color = '#0f172a', width = 120 }: Props) {
  const style: React.CSSProperties = {
    color,
    width,
    height: Math.round(width * 0.36), // rapporto comodo; cambia se vuoi
    // se progress è definito, impostiamo la variabile CSS --p
    ...(typeof progress === 'number' ? ({ ['--p' as any]: `${Math.max(0, Math.min(100, progress))}%` } as any) : {}),
  }

  return (
    <div className="flex items-center gap-3">
      <div
        className={`ski-fill ${progress == null ? 'ski-fill--indeterminate' : ''}`}
        style={style}
        aria-label={label}
        role="status"
      />
      {label ? <span className="text-sm text-slate-500">{label}</span> : null}
    </div>
  )
}
