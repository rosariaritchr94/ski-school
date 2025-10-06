"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/lezioni", label: "Lezioni" },
  { href: "/maestri", label: "Maestri" },
  { href: "/contatti", label: "Contatti" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-[100] bg-black">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logos/logo-navbar.png" alt="Logo" width={28} height={28} />
        </Link>
        <nav className="hidden md:flex items-center gap-6 font-sofia uppercase tracking-wide text-sm">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:opacity-80 ${pathname === n.href ? "text-white" : "text-white/80"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/prenota" className="btn btn-accent">Prenota</Link>
      </div>
      <div className="h-px w-full bg-white/15" />
    </header>
  );
}
