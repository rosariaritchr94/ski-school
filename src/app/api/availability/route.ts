import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/availability?instructorId=...&date=YYYY-MM-DD
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const instructorId = searchParams.get('instructorId')
    const dateStr = searchParams.get('date')

    if (!instructorId || !dateStr) {
      return NextResponse.json({ occupied: [] }, { status: 200 })
    }

    const dayStart = new Date(`${dateStr}T00:00:00.000Z`)
    const dayEnd = new Date(`${dateStr}T23:59:59.999Z`)

    const bookings = await prisma.booking.findMany({
      where: { instructorId, date: { gte: dayStart, lte: dayEnd } },
      select: { date: true },
      orderBy: { date: 'asc' },
    })

    // estrae 'HH:00' dagli start
    const occupied = bookings.map((b) => new Date(b.date).toISOString().substring(11, 13) + ':00')

    return NextResponse.json({ occupied })
  } catch (e) {
    console.error('Errore /api/availability:', e)
    return NextResponse.json({ occupied: [] }, { status: 200 })
  }
}
