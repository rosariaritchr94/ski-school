import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET (facoltativo): lista prenotazioni
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: { instructor: true, lessonType: true, payment: true },
      orderBy: { date: 'desc' },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

// POST /api/bookings  { instructorId, lessonTypeId, date: "YYYY-MM-DD", time: "HH:00" }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) return NextResponse.json({ error: 'Bad JSON' }, { status: 400 })

    const { instructorId, lessonTypeId, date, time } = body
    if (!instructorId || !lessonTypeId || !date || !time) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }



    // Recupera LessonType e deduce durata (es. "Privata 1h" -> 60)
    const lt = await prisma.lessonType.findUnique({ where: { id: lessonTypeId } })
    if (!lt) return NextResponse.json({ error: 'Lesson type not found' }, { status: 404 })
    const match = lt.name.match(/(\d+)\s*h/i)
    const durationMin = match ? parseInt(match[1], 10) * 60 : 60

    // Costruisci data/ora d'inizio in UTC (semplice); se vuoi TZ locale lo cambiamo dopo
    const start = new Date(`${date}T${time}:00`) // locale → salvato in UTC


    const created = await prisma.booking.create({
      data: {
        instructorId,
        lessonTypeId,
        date: start,
        durationMin,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
