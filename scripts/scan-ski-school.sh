#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
REPORT="scan-report-${STAMP}.txt"

log() { printf "\n====== %s ======\n" "$1"; }

{
  log "Project root"
  echo "$PROJECT_ROOT"

  log "Node & npm versions"
  node -v || true
  npm -v || true

  log "Package.json name & scripts"
  if [[ -f package.json ]]; then
    node -e "const p=require('./package.json'); console.log({name:p.name, version:p.version, type:p.type, scripts:p.scripts});"
  else
    echo "package.json NOT FOUND"
  fi

  log "Key dependency versions (installed)"
  npm ls --depth=0 next react react-dom typescript prisma @prisma/client tailwindcss postcss autoprefixer @tailwindcss/forms tailwindcss-animate 2>/dev/null || true

  log ".env keys (valori nascosti)"
  if [[ -f .env ]]; then
    sed -E 's/^(#.*)$/\1/; t; s/=.*/=***hidden***/' .env
  else
    echo ".env not found"
  fi

  log "Config files presence"
  for f in tailwind.config.js tailwind.config.ts postcss.config.js next.config.mjs next.config.js next.config.ts tsconfig.json; do
    [[ -f "$f" ]] && echo "✓ $f" || echo "— $f (missing)"
  done

  log "Tailwind config (first 80 lines if present)"
  for f in tailwind.config.ts tailwind.config.js; do
    if [[ -f "$f" ]]; then
      echo "--- $f ---"
      sed -n '1,80p' "$f"
    fi
  done

  log "PostCSS config"
  [[ -f postcss.config.js ]] && sed -n '1,80p' postcss.config.js || echo "postcss.config.js missing"

  log "Next config (first 120 lines)"
  for f in next.config.mjs next.config.js next.config.ts; do
    if [[ -f "$f" ]]; then
      echo "--- $f ---"
      sed -n '1,120p' "$f"
    fi
  done

  log "TS config (first 120 lines)"
  [[ -f tsconfig.json ]] && sed -n '1,120p' tsconfig.json || echo "tsconfig.json missing"

  log "Prisma schema (first 200 lines)"
  [[ -f prisma/schema.prisma ]] && sed -n '1,200p' prisma/schema.prisma || echo "prisma/schema.prisma missing"

  log "Project tree (key folders)"
  if command -v tree >/dev/null 2>&1; then
    tree -a -L 3 -I "node_modules|.git|.next|*.log"
  else
    echo "(tip: install 'tree' for nicer output: sudo apt install tree)"
    find . -maxdepth 3 -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" -type d -print
  fi

  log "API routes under src/app/api (up to 3 levels)"
  if [[ -d src/app/api ]]; then
    find src/app/api -maxdepth 3 -type f -name "route.*" -print
  else
    echo "src/app/api missing"
  fi

  log "(site) pages"
  if [[ -d "src/app/(site)" ]]; then
    find "src/app/(site)" -maxdepth 3 -type f -name "page.*" -print
  else
    echo "src/app/(site) missing"
  fi

  log "globals.css presence & size"
  if [[ -f src/app/globals.css ]]; then
    wc -l src/app/globals.css
    echo "--- first 80 lines ---"
    sed -n '1,80p' src/app/globals.css
  else
    echo "src/app/globals.css missing"
  fi

  log "Root layout import of globals.css (grep)"
  if [[ -f src/app/layout.tsx ]]; then
    grep -n "globals.css" src/app/layout.tsx || echo "import not found in src/app/layout.tsx"
  else
    echo "src/app/layout.tsx missing"
  fi

  log "(site) layout presence"
  if [[ -f "src/app/(site)/layout.tsx" ]]; then
    head -n 40 "src/app/(site)/layout.tsx"
  else
    echo "src/app/(site)/layout.tsx missing"
  fi

  log "Check for /api/bookings route"
  ls -la src/app/api/bookings 2>/dev/null || echo "src/app/api/bookings missing"

  log "Instructors & Lesson Types handlers (first 60 lines)"
  for f in src/app/api/instructors/route.* src/app/api/lesson-types/route.*; do
    [[ -f "$f" ]] && { echo "--- $f ---"; sed -n '1,60p' "$f"; }
  done

  log "Availability & Bookings handlers (first 80 lines)"
  for f in src/app/api/availability/route.* src/app/api/bookings/route.*; do
    [[ -f "$f" ]] && { echo "--- $f ---"; sed -n '1,80p' "$f"; }
  done

  log "Git status (if repo)"
  if [[ -d .git ]]; then
    git status -sb || true
  else
    echo "Not a git repo"
  fi
} | tee "$REPORT"

echo
echo "✅ Report salvato in: $REPORT"
