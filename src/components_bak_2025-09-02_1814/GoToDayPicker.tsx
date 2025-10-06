"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { it } from "date-fns/locale";

type Props = {
  /** Se vuoi controllarlo dall’esterno, passa value in "YYYY-MM-DD" */
  value?: string | null;
  /** Valore iniziale se NON lo controlli dall’esterno */
  defaultValue?: string | null;
  /** Callback quando cambia (ritorna "YYYY-MM-DD" oppure null) */
  onChange?: (v: string | null) => void;
  placeholder?: string;
  id?: string;
};

function toYmd(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export default function GoToDayPicker({
  value,
  defaultValue = null,
  onChange,
  placeholder = "gg/mm/aaaa",
  id,
}: Props) {
  const isControlled = value !== undefined;

  const [internal, setInternal] = useState<string | null>(defaultValue);
  const current = isControlled ? value! : internal;

  const [open, setOpen] = useState(false);
  const fieldRef = useRef<HTMLDivElement | null>(null);

  const selectedDate = useMemo(() => {
    if (!current) return undefined;
    const [y, m, d] = current.split("-").map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
  }, [current]);

  // chiudi con click fuori
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (fieldRef.current && !fieldRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function setValue(v: string | null) {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  }

  return (
    <div className="relative" ref={fieldRef}>
      {/* trigger stile input */}
      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white text-left text-sm leading-none flex items-center justify-between hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={selectedDate ? "text-slate-900" : "text-slate-400"}>
          {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
        </span>
        <span aria-hidden>📅</span>
      </button>

      {/* popover calendario */}
      {open && (
        <div
          role="dialog"
          className="absolute z-50 mt-2 bg-white rounded-xl shadow-xl border border-slate-300 p-2"
        >
          <DayPicker
  className="go-day"
  mode="single"
  selected={selectedDate}
  onSelect={(d) => {
    if (d) setValue(toYmd(d));
    setOpen(false);
  }}
  locale={it}
  weekStartsOn={1}
  showOutsideDays
/>

          <div className="flex items-center justify-between px-2 pb-2">
            <button
              type="button"
              onClick={() => {
                setValue(null);
                setOpen(false);
              }}
              className="text-sm text-slate-600 hover:underline"
            >
              Cancella
            </button>
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                setValue(toYmd(today));
                setOpen(false);
              }}
              className="text-sm text-sky-700 font-medium hover:underline"
            >
              Oggi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

