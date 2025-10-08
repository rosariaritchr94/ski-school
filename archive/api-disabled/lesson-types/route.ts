import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.lessonType.findMany({
      orderBy: { priceCents: 'asc' },
      select: { id: true, name: true, priceCents: true },
    });
    return NextResponse.json(items);
  } catch (e) {
    console.error('Errore /api/lesson-types:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
