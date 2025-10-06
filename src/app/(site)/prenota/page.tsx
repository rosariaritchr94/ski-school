'use client';

import { useEffect, useMemo, useState } from 'react';
import Container from '@/components/Container';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import SkiFillLoader from '@/components/SkiFillLoader';
import SkiSplash from '@/components/SkiSplash';
import GoToDayPicker from '@/components/GoToDayPicker';

type Instructor = { id: string; firstName: string | null; lastName: string | null };
type LessonType = { id: string; name: string; priceCents: number };

const WORKING_HOURS = { start: 9, end: 17 }; // 9-17

function ymdLocal(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function toWeekStart(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const day = (d.getDay() + 6) % 7; // 0=lun
  d.setDate(d.getDate() - day);
  return ymdLocal(d); // <-- NO toISOString: restiamo in locale
}

export default function PrenotaPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [lessonTypes, setLessonTypes] = useState<LessonType[]>([]);
  const [instructorId, setInstructorId] = useState('');
  const [lessonTypeId, setLessonTypeId] = useState('');
  const [date, setDate] = useState<string>(''); // "YYYY-MM-DD"
  const [weekStart, setWeekStart] = useState<string>(() => toWeekStart(ymdLocal(new Date())));
  const [occupiedByDay, setOccupiedByDay] = useState<Record<string, string[]>>({});
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingWeek, setLoadingWeek] = useState(false);

  // Carica maestri + tipi lezione
  useEffect(() => {
    (async () => {
      const [insRes, ltRes] = await Promise.all([fetch('/api/instructors'), fetch('/api/lesson-types')]);
      const [ins, lt] = await Promise.all([insRes.json(), ltRes.json()]);
      setInstructors(Array.isArray(ins) ? ins : []);
      setLessonTypes(Array.isArray(lt) ? lt : []);
    })();
  }, []);

  // Aggiorna weekStart quando cambi "date"
  useEffect(() => {
    if (date) setWeekStart(toWeekStart(date));
  }, [date]);

  // Carica disponibilità settimanale (mostra loader almeno 600ms)
  useEffect(() => {
    if (!instructorId || !weekStart) return;
    setLoadingWeek(true);
    setSelectedSlot(null);
    (async () => {
      const started = Date.now();
      const res = await fetch(`/api/availability/week?instructorId=${instructorId}&start=${weekStart}`);
      const data = await res.json();
      setOccupiedByDay(data?.days ?? {});
      const elapsed = Date.now() - started;
      const MIN = 600;
      if (elapsed < MIN) await new Promise((r) => setTimeout(r, MIN - elapsed));
      setLoadingWeek(false);
    })();
  }, [instructorId, weekStart]);

  const hours = useMemo(() => {
    const arr: string[] = [];
    for (let h = WORKING_HOURS.start; h <= WORKING_HOURS.end; h++) {
      arr.push(`${String(h).padStart(2, '0')}:00`);
    }
    return arr;
  }, []);

  async function handleSubmit() {
    setMessage(null);
    if (!instructorId || !lessonTypeId || !selectedSlot) {
      setMessage('Seleziona maestro, tipo e uno slot disponibile.');
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instructorId,
          lessonTypeId,
          date: selectedSlot.date,
          time: selectedSlot.time,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessage((data && data.error) || `Errore HTTP ${res.status}`);
        return;
      }
      setMessage('✅ Prenotazione creata!');
      const r = await fetch(`/api/availability/week?instructorId=${instructorId}&start=${weekStart}`);
      const d = await r.json();
      setOccupiedByDay(d?.days ?? {});
      setSelectedSlot(null);
    } catch {
      setMessage('Errore di rete.');
    } finally {
      setCreating(false);
    }
  }

  function goPrevWeek() {
    const s = new Date(`${weekStart}T00:00:00`);
    s.setDate(s.getDate() - 7);
    setWeekStart(ymdLocal(s));
  }
  function goNextWeek() {
    const s = new Date(`${weekStart}T00:00:00`);
    s.setDate(s.getDate() + 7);
    setWeekStart(ymdLocal(s));
  }

  return (
    <section className="py-16 bg-snow">
      <Container>
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold">Prenota una lezione</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Colonna sinistra: form */}
          <div className="frost-card p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">Maestro</label>
              <select
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                className="mt-1 w-full rounded-xl border p-3 focus:border-brand-600 focus:ring-brand-600"
              >
                <option value="">Seleziona un maestro</option>
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>
                    {[i.firstName, i.lastName].filter(Boolean).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Tipo lezione</label>
              <select
                value={lessonTypeId}
                onChange={(e) => setLessonTypeId(e.target.value)}
                className="mt-1 w-full rounded-xl border p-3 focus:border-brand-600 focus:ring-brand-600"
              >
                <option value="">Seleziona una lezione</option>
                {lessonTypes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {(l.priceCents / 100).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Vai a giorno</label>
              <div className="mt-1">
                <GoToDayPicker
                  id="goto-day"
                  value={date || null}
                  onChange={(v) => setDate(v ?? '')}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Usa questo per saltare alla settimana del giorno selezionato.
              </p>
            </div>
          </div>

          {/* Colonna destra: calendario settimanale */}
          <div className="frost-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-medium">
                Settimana che inizia il {new Date(`${weekStart}T00:00:00`).toLocaleDateString('it-IT')}
              </div>
              <div className="flex gap-2">
                <button onClick={goPrevWeek} className="btn btn-ghost border px-3 py-2 rounded-xl">
                  ← Sett. prec
                </button>
                <button onClick={goNextWeek} className="btn btn-ghost border px-3 py-2 rounded-xl">
                  Sett. succ →
                </button>
              </div>
            </div>

            {!instructorId ? (
              <p className="text-sm text-slate-600">Seleziona prima un maestro.</p>
            ) : loadingWeek ? (
              <div className="py-6 flex items-center gap-3 text-sm text-slate-600">
                <SkiFillLoader /> Carico disponibilità…
              </div>
            ) : (
              <WeeklyCalendar
                weekStart={weekStart}
                hours={hours}
                occupiedByDay={occupiedByDay}
                selected={selectedSlot}
                onSelect={setSelectedSlot}
              />
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={creating || !instructorId || !lessonTypeId || !selectedSlot}
                className="rounded-xl bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {creating ? 'Prenoto...' : 'Conferma prenotazione'}
              </button>
              {message && <div className="text-sm">{message}</div>}
            </div>
          </div>
        </div>
      </Container>
      <SkiSplash durationMs={2000} />
    </section>
  );
}
