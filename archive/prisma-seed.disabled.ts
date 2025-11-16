import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Lesson types
  await prisma.lessonType.upsert({
    where: { name: 'Privata 1h' },
    update: {},
    create: { name: 'Privata 1h', description: 'Lezione individuale con maestro', priceCents: 6000 },
  });
  await prisma.lessonType.upsert({
    where: { name: 'Privata 2h' },
    update: {},
    create: { name: 'Privata 2h', description: 'Pacchetto risparmio 2 ore', priceCents: 11000 },
  });
  await prisma.lessonType.upsert({
    where: { name: 'Collettiva 2h' },
    update: {},
    create: { name: 'Collettiva 2h', description: 'Gruppi max 6 persone', priceCents: 4500 },
  });
  await prisma.lessonType.upsert({
    where: { name: 'Bambini' },
    update: {},
    create: { name: 'Bambini', description: 'Dai 4 ai 10 anni', priceCents: 4000 },
  });

  // Instructors
  await prisma.instructor.upsert({
    where: { userId: 'instructor-001' },
    update: {},
    create: { userId: 'instructor-001', firstName: 'Anna', lastName: 'Rossi', bio: 'Specializzata in principianti e bambini.' },
  });
  await prisma.instructor.upsert({
    where: { userId: 'instructor-002' },
    update: {},
    create: { userId: 'instructor-002', firstName: 'Luca', lastName: 'Bianchi', bio: 'Snowboard, freestyle e carving.' },
  });

  console.log('✅ Seed completato');
}

main().finally(() => prisma.$disconnect());
