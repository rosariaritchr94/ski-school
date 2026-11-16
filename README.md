# Scuola di Sci Gran Paradiso

Sito Next.js 14 + Tailwind, pubblicato su Vercel.

## Avvio in locale

```bash
npm install
npm run dev
```

Sito: http://localhost:3001 · Pannello contenuti: http://localhost:3001/keystatic

## Pannello di gestione contenuti (Keystatic)

I contenuti modificabili dal cliente stanno nella cartella `content/` (file YAML)
e le relative foto in `public/foto/<sezione>/`: queste cartelle sono gestite dal
pannello, non metterci altri file a mano. Cosa è modificabile è definito in
[`keystatic.config.ts`](keystatic.config.ts).

| Sezione | File | Foto |
|---|---|---|
| Home (titolo, presentazione e video, riquadri servizi, sicurezza e galleria, contatti) | `content/home.yaml` | `public/foto/home/` |
| Lezioni (testi, stagioni e date, tabelle prezzi, Snowcare, pagamenti, ritrovo) | `content/lezioni.yaml` | `public/foto/lezioni/` |
| Maestri (elenco) | `content/maestri/*.yaml` | `public/foto/maestri/<nome>/` |
| Testi pagina Maestri | `content/pagina-maestri.yaml` | `public/foto/pagina-maestri/` |

- **In locale** il pannello salva direttamente nei file.
- **Online** ogni salvataggio diventa un commit su GitHub e Vercel ripubblica il sito
  in 1–2 minuti. Serve una di queste configurazioni nelle variabili d'ambiente di Vercel:
  - Keystatic Cloud (login via email, consigliato per il cliente):
    `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT=team/progetto`
  - GitHub (il cliente deve avere un account GitHub con accesso al repo):
    `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`,
    `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

  Senza configurazione il sito funziona normalmente e `/keystatic` risponde
  "non ancora configurato".
