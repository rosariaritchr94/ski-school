'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Container from './Container';

const links = [
  { href: '/', label: 'Home' },
  { href: '/lezioni', label: 'Lezioni' },
  { href: '/maestri', label: 'Maestri' },
  { href: '/contatti', label: 'Contatti' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Scuola <span className="text-blue-600">Sci</span>
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Apri menu"
            aria-expanded={open}
          >
            ☰
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`transition-colors hover:text-blue-600 ${
                    pathname === l.href ? 'text-blue-600 font-medium' : 'text-slate-700'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/prenota" className="btn-primary">
                Prenota
              </Link>
            </li>
          </ul>
        </nav>

        {open && (
          <div className="md:hidden border-t py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`block px-3 py-3 ${
                  pathname === l.href ? 'text-blue-600 font-medium' : 'text-slate-700'
                } hover:bg-slate-50`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/prenota"
              className="mx-3 mt-2 block btn-primary text-center"
              onClick={() => setOpen(false)}
            >
              Prenota
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
