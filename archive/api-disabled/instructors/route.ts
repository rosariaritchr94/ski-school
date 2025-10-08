import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const instructors = await prisma.instructor.findMany({
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
      select: { id: true, firstName: true, lastName: true },
    });
    return NextResponse.json(instructors);
  } catch (e) {
    console.error('Errore /api/instructors:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
