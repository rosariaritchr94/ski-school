// src/app/(site)/layout.tsx
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
