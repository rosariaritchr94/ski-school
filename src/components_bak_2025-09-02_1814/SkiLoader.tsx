'use client'
export default function SkiLoader({ label = 'Carico…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="ski-loader" aria-hidden="true" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  )
}
