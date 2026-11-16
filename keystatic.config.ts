// Configurazione del pannello di gestione contenuti (Keystatic).
// Il pannello si apre su /keystatic.
//
// - In locale (npm run dev) le modifiche vengono salvate direttamente nei file.
// - Online le modifiche diventano un commit su GitHub e Vercel ripubblica il sito.
//   Se è impostata NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT si usa Keystatic Cloud
//   (login via email, il cliente non ha bisogno di un account GitHub),
//   altrimenti il login avviene con GitHub.
import { config, collection, fields, singleton } from "@keystatic/core";

const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT;

const storage =
  process.env.NODE_ENV === "development"
    ? ({ kind: "local" } as const)
    : cloudProject
      ? ({ kind: "cloud" } as const)
      : ({
          kind: "github",
          repo: { owner: "rosariaritchr94", name: "ski-school" },
        } as const);

// Ogni pagina ha una sua cartella di foto, gestita interamente dal pannello.
const homeMedia = {
  directory: "public/foto/home",
  publicPath: "/foto/home/",
} as const;
const lezioniMedia = {
  directory: "public/foto/lezioni",
  publicPath: "/foto/lezioni/",
} as const;

const paragrafiField = fields.array(
  fields.text({ label: "Paragrafo", multiline: true }),
  {
    label: "Paragrafi",
    itemLabel: (props) =>
      props.value.length > 60
        ? props.value.slice(0, 60) + "…"
        : props.value || "Paragrafo vuoto",
  },
);

const disciplineField = fields.multiselect({
  label: "Discipline (icone)",
  options: [
    { label: "Sci alpino", value: "alpino" },
    { label: "Snowboard", value: "snowboard" },
    { label: "Sci nordico", value: "nordico" },
  ],
});

function stagioneField(label: string) {
  return fields.object(
    {
      nome: fields.text({ label: "Nome" }),
      date: fields.text({
        label: "Date",
        description: "Ogni riga va a capo sul sito.",
        multiline: true,
      }),
      nomeBreve: fields.text({
        label: "Nome breve",
        description: "Usato nella nota dei supplementi.",
      }),
      supplemento: fields.text({
        label: "Supplemento per ogni persona aggiunta",
        description: 'Es. "18 €".',
      }),
    },
    { label },
  );
}

export default config({
  storage,
  ...(cloudProject ? { cloud: { project: cloudProject } } : {}),

  ui: {
    brand: { name: "Scuola Sci Gran Paradiso" },
    navigation: {
      Pagine: ["home", "lezioni"],
      Maestri: ["maestri", "paginaMaestri"],
    },
  },

  collections: {
    maestri: collection({
      label: "Maestri",
      slugField: "nome",
      path: "content/maestri/*",
      format: { data: "yaml" },
      columns: ["disciplina", "ordine"],
      schema: {
        nome: fields.slug({
          name: {
            label: "Nome e cognome",
            validation: { isRequired: true },
          },
        }),
        ruolo: fields.text({
          label: "Ruolo",
          description: 'Es. "Maestro di SCI ALPINO". Appare sotto il nome.',
        }),
        disciplina: fields.select({
          label: "Disciplina",
          description: "Appare sul retro della card.",
          options: [
            { label: "Sci Alpino", value: "Sci Alpino" },
            { label: "Sci Nordico", value: "Sci Nordico" },
            { label: "Snowboard", value: "Snowboard" },
            { label: "Nessuna", value: "" },
          ],
          defaultValue: "Sci Alpino",
        }),
        foto: fields.image({
          label: "Foto",
          description:
            "Foto verticale (formato 3:4). Se manca, vengono mostrate le iniziali.",
          directory: "public/foto/maestri",
          publicPath: "/foto/maestri/",
        }),
        ordine: fields.integer({
          label: "Posizione",
          description:
            "I maestri sono mostrati dal numero più basso al più alto. Per inserirne uno tra il 30 e il 40, usa ad esempio 35.",
          defaultValue: 1000,
        }),
      },
    }),
  },

  singletons: {
    home: singleton({
      label: "Home",
      path: "content/home",
      format: { data: "yaml" },
      schema: {
        hero: fields.object(
          {
            sopratitolo1: fields.text({
              label: "Scritta sopra il titolo – prima parte",
              description: "Su telefono le due parti vanno su due righe.",
            }),
            sopratitolo2: fields.text({
              label: "Scritta sopra il titolo – seconda parte",
            }),
            titolo: fields.text({ label: "Titolo" }),
          },
          { label: "In alto (titolo principale)" },
        ),
        intro: fields.object(
          {
            titolo: fields.text({
              label: "Titolo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            testo: fields.text({ label: "Testo", multiline: true }),
            video: fields.file({
              label: "Video (mp4, verticale)",
              description: "Meglio sotto i 20 MB.",
              ...homeMedia,
            }),
          },
          { label: "Presentazione con video" },
        ),
        servizi: fields.array(
          fields.object({
            titolo: fields.text({ label: "Titolo" }),
            testo: fields.text({
              label: "Testo",
              description: "Facoltativo.",
              multiline: true,
            }),
            foto: fields.image({ label: "Foto (orizzontale)", ...homeMedia }),
            link: fields.text({
              label: "Link",
              description:
                'Facoltativo. Pagina del sito (es. "/lezioni#lezioni-collettive") o indirizzo esterno (es. "https://…", si apre in una nuova scheda).',
            }),
            mostraPreventivo: fields.checkbox({
              label: 'Mostra "Richiedi il tuo preventivo"',
              description: "Link email per richiedere un preventivo.",
            }),
            scrittaSuFoto: fields.text({
              label: "Scritta sulla foto",
              description: 'Facoltativa, es. "Cogne – Webcam Live".',
            }),
            etichettaLive: fields.checkbox({
              label: 'Mostra etichetta rossa "LIVE" sulla foto',
            }),
          }),
          {
            label: "Riquadri servizi",
            itemLabel: (props) => props.fields.titolo.value || "Riquadro",
          },
        ),
        sicurezza: fields.object(
          {
            titolo: fields.text({
              label: "Titolo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            testo: fields.text({ label: "Testo", multiline: true }),
            galleria: fields.array(
              fields.object({
                foto: fields.image({
                  label: "Foto",
                  validation: { isRequired: true },
                  ...homeMedia,
                }),
                descrizione: fields.text({
                  label: "Descrizione breve",
                  description: "Per motori di ricerca e non vedenti.",
                }),
              }),
              {
                label: "Galleria foto",
                itemLabel: (props) =>
                  props.fields.descrizione.value || "Foto",
              },
            ),
          },
          { label: "Sicurezza e galleria foto" },
        ),
        contatti: fields.object(
          {
            titolo: fields.text({ label: "Titolo", defaultValue: "Contatti" }),
            nome: fields.text({ label: "Nome scuola" }),
            indirizzo: fields.text({
              label: "Indirizzo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            mappa: fields.text({
              label: "Ricerca per Google Maps",
              description:
                "Il testo che Google Maps usa per trovare la scuola (mappa e link dell'indirizzo).",
            }),
            telefono: fields.text({ label: "Telefono" }),
            email: fields.text({
              label: "Email",
              description:
                'Usata anche per i link "Richiedi il tuo preventivo".',
            }),
          },
          { label: "Contatti" },
        ),
      },
    }),

    lezioni: singleton({
      label: "Lezioni",
      path: "content/lezioni",
      format: { data: "yaml" },
      schema: {
        titolo: fields.text({ label: "Titolo in alto", defaultValue: "Lezioni" }),
        individuali: fields.object(
          {
            titolo: fields.text({
              label: "Titolo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            testo: fields.text({ label: "Testo", multiline: true }),
            discipline: disciplineField,
            foto: fields.image({ label: "Foto", ...lezioniMedia }),
          },
          { label: "Lezioni individuali" },
        ),
        stagioni: fields.object(
          {
            natale: stagioneField("Stagione 1 (rossa)"),
            alta: stagioneField("Stagione 2 (azzurra)"),
            bassa: stagioneField("Stagione 3 (blu)"),
          },
          {
            label: "Stagioni e date",
            description:
              "I nomi delle stagioni sono usati anche come colonne della tabella prezzi.",
          },
        ),
        private: fields.object(
          {
            titolo: fields.text({ label: "Titolo tabella" }),
            righe: fields.array(
              fields.object({
                disciplina: fields.text({ label: "Disciplina" }),
                orario: fields.text({ label: "Orario / dettaglio" }),
                prezzoNatale: fields.text({ label: "Prezzo stagione 1 (rossa)" }),
                prezzoAlta: fields.text({ label: "Prezzo stagione 2 (azzurra)" }),
                prezzoBassa: fields.text({ label: "Prezzo stagione 3 (blu)" }),
              }),
              {
                label: "Righe tabella",
                itemLabel: (props) =>
                  `${props.fields.disciplina.value} – ${props.fields.orario.value}`,
              },
            ),
            notaSupplemento: fields.text({
              label: "Inizio nota supplemento",
              description:
                "Seguono i supplementi di ogni stagione (vedi Stagioni e date).",
            }),
          },
          { label: "Prezzi lezioni private" },
        ),
        collettive: fields.object(
          {
            titolo: fields.text({
              label: "Titolo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            testo: fields.text({ label: "Testo", multiline: true }),
            discipline: disciplineField,
            foto: fields.image({ label: "Foto", ...lezioniMedia }),
            tariffeTitolo: fields.text({ label: "Titolo tariffe" }),
            tariffeTesto: fields.text({ label: "Testo tariffe", multiline: true }),
            tabellaTitolo: fields.text({ label: "Titolo tabella" }),
            righe: fields.array(
              fields.object({
                disciplina: fields.text({ label: "Disciplina" }),
                orario: fields.text({ label: "Orario / dettaglio" }),
                pacchetto: fields.text({ label: "Pacchetto" }),
                tariffa: fields.text({ label: "Tariffa" }),
              }),
              {
                label: "Righe tabella",
                itemLabel: (props) =>
                  `${props.fields.disciplina.value} – ${props.fields.pacchetto.value}`,
              },
            ),
            nota: fields.text({ label: "Nota sotto la tabella", multiline: true }),
          },
          { label: "Lezioni collettive" },
        ),
        snowcare: fields.object(
          {
            titolo: fields.text({
              label: "Titolo (bianco)",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            titoloColorato: fields.text({
              label: "Titolo (parte colorata)",
              multiline: true,
            }),
            paragrafi: paragrafiField,
            foto: fields.image({ label: "Foto", ...lezioniMedia }),
          },
          { label: "Assicurazione Snowcare" },
        ),
        pagamenti: fields.object(
          {
            titolo: fields.text({ label: "Titolo" }),
            paragrafi: paragrafiField,
          },
          { label: "Cancellazioni e pagamenti" },
        ),
        ritrovo: fields.object(
          {
            titolo: fields.text({
              label: "Titolo",
              description: "Ogni riga va a capo sul sito.",
              multiline: true,
            }),
            testo: fields.text({ label: "Testo", multiline: true }),
          },
          { label: "Orari e luoghi di ritrovo" },
        ),
      },
    }),

    paginaMaestri: singleton({
      label: "Testi pagina Maestri",
      path: "content/pagina-maestri",
      format: { data: "yaml" },
      schema: {
        titolo: fields.text({
          label: "Titolo in alto",
          defaultValue: "Maestri",
        }),
        slogan: fields.text({
          label: "Slogan",
          description: "Ogni riga va a capo sul sito.",
          multiline: true,
        }),
        paragrafi: fields.array(
          fields.text({ label: "Paragrafo", multiline: true }),
          {
            label: "Paragrafi",
            itemLabel: (props) =>
              props.value.length > 60
                ? props.value.slice(0, 60) + "…"
                : props.value || "Paragrafo vuoto",
          },
        ),
        foto: fields.image({
          label: "Foto accanto al testo",
          directory: "public/foto/pagina-maestri",
          publicPath: "/foto/pagina-maestri/",
        }),
      },
    }),
  },
});
