import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function ymdLocal(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

// GET /api/availability/week?instructorId=...&start=YYYY-MM-DD  (start = lunedì, locale)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const instructorId = searchParams.get('instructorId')
    const startStr = searchParams.get('start')
    if (!instructorId || !startStr) return NextResponse.json({ days: {} })

    // range locale [lun 00:00 → dom 23:59:59.999]
    const start = new Date(`${startStr}T00:00:00`)
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    end.setHours(23, 59, 59, 999)

    const bookings = await prisma.booking.findMany({
      where: { instructorId, date: { gte: start, lte: end } },
      select: { date: true },
      orderBy: { date: 'asc' },
    })

    const days: Record<string, string[]> = {}
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      days[ymdLocal(d)] = []
    }

    for (const b of bookings) {
      const d = new Date(b.date) // istante in UTC → convertito in locale
      const key = ymdLocal(d)
      const hh = String(d.getHours()).padStart(2, '0') + ':00'
      if (!days[key]) days[key] = []
      if (!days[key].includes(hh)) days[key].push(hh)
    }

    return NextResponse.json({ days })
  } catch (e) {
    console.error('availability/week error', e)
    return NextResponse.json({ days: {} })
  }
}
