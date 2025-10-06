// src/lib/utils.ts
// Unisce stringhe di classi CSS (utile per Tailwind)
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
