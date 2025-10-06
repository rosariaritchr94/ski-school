'use client'
import { Fragment, useMemo } from 'react'

function ymdLocal(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

type Props = {
  weekStart: string
  hours: string[]
  occupiedByDay: Record<string, string[]>
  selected?: { date: string; time: string } | null
  onSelect: (slot: { date: string; time: string }) => void
}

export default function WeeklyCalendar({ weekStart, hours, occupiedByDay, selected, onSelect }: Props) {
  const days = useMemo(() => {
    const start = new Date(`${weekStart}T00:00:00`)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [weekStart])

  const dayKeys = days.map(ymdLocal)
  const dayLabels = days.map(d =>
    new Intl.DateTimeFormat('it-IT', { weekday: 'short', day: '2-digit', month: '2-digit' }).format(d)
  )

  return (
    <div className="w-full overflow-hidden">
      {/* header giorni */}
      <div className="grid gap-2 mb-3 [grid-template-columns:80px_repeat(7,minmax(0,1fr))]">
        <div />
        {dayLabels.map((l, i) => (
          <div
            key={i}
            className="text-center text-xs md:text-sm font-semibold text-slate-700 select-none"
          >
            {l}
          </div>
        ))}
      </div>

      {/* righe orarie */}
      {hours.map(h => (
        <Fragment key={h}>
          <div className="grid gap-2 mb-2 items-center [grid-template-columns:80px_repeat(7,minmax(0,1fr))]">
            <div className="text-right pr-2 text-[10px] md:text-xs text-slate-500 select-none">
              {h}
            </div>
            {dayKeys.map((dateKey) => {
              const busy = occupiedByDay[dateKey]?.includes(h)
              const isSel = selected?.date === dateKey && selected?.time === h
              const base = 'slot-btn w-full'
              const cls = busy ? 'slot-busy' : 'slot-free'
              const sel = isSel ? 'slot-selected' : ''
              return (
                <button
                  key={`${dateKey}-${h}`}
                  disabled={busy}
                  onClick={() => !busy && onSelect({ date: dateKey, time: h })}
                  className={`${base} ${cls} ${sel}`}
                  title={busy ? 'Occupato' : 'Libero'}
                >
                  {h}
                </button>
              )
            })}
          </div>
        </Fragment>
      ))}
    </div>
  )
}
