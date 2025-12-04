// src/app/(site)/contatti/page.tsx
import { redirect } from "next/navigation";

export default function ContattiPage() {
  // Reindirizza alla home scrollata sulla sezione contatti
  redirect("/#contatti");
}
