// Configurazione del pannello di gestione contenuti (Keystatic).
// Il pannello si apre su /keystatic.
//
// - In locale (npm run dev) le modifiche vengono salvate direttamente nei file.
// - Online si entra con Keystatic Cloud (login con l'email, niente account GitHub):
//   le modifiche diventano un commit su GitHub e Vercel ripubblica il sito.
//   Gli utenti si invitano da keystatic.cloud → team "scuolasci" → Members.
import { config, collection, fields, singleton } from "@keystatic/core";
import { interruttore, trBloccato } from "./src/keystatic/bloccati";

// progetto su keystatic.cloud (si può cambiare con NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT)
const cloudProject = process.env.NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT || "scuolasci/ski-school";

const storage =
  process.env.NODE_ENV === "development"
    ? ({ kind: "local" } as const)
    : ({ kind: "cloud" } as const);

/**
 * Testo in tre lingue: tre caselle Italiano / English / Français.
 * Se EN o FR restano vuote, sul sito compare il testo italiano.
 */
function tr(
  label: string,
  opts: { multiline?: boolean; description?: string; defaultValue?: string; richiesto?: boolean } = {},
) {
  const { multiline, description, defaultValue, richiesto } = opts;
  return fields.object(
    {
      it: fields.text({
        label: "IT · Italiano",
        multiline,
        defaultValue,
        ...(richiesto ? { validation: { length: { min: 1 } } } : {}),
      }),
      en: fields.text({ label: "EN · English", multiline }),
      fr: fields.text({ label: "FR · Français", multiline }),
    },
    { label, description },
  );
}

// Ogni pagina ha una sua cartella di foto, gestita interamente dal pannello.
const homeMedia = {
  directory: "public/foto/home",
  publicPath: "/foto/home/",
} as const;
const lezioniMedia = {
  directory: "public/foto/lezioni",
  publicPath: "/foto/lezioni/",
} as const;
const snowcareMedia = {
  directory: "public/foto/lezioni/snowcare",
  publicPath: "/foto/lezioni/snowcare/",
} as const;

const anteprima = (v: string) => (v.length > 60 ? v.slice(0, 60) + "…" : v || "Paragrafo vuoto");

const paragrafiField = fields.array(tr("Paragrafo", { multiline: true }), {
  label: "Paragrafi",
  itemLabel: (props) => anteprima(props.fields.it.value),
});

/** Paragrafi dei testi principali: ognuno con il lucchetto */
const paragrafiBloccati = fields.array(trBloccato("Paragrafo", { multiline: true }), {
  label: "Paragrafi",
  itemLabel: (props) => anteprima(props.value.it),
});

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
      nome: tr("Nome"),
      date: tr("Date", { description: "Ogni riga va a capo sul sito.", multiline: true }),
      nomeBreve: tr("Nome breve", { description: "Usato nelle colonne dei prezzi e nella nota dei supplementi." }),
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
  cloud: { project: cloudProject },

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
      columns: ["disciplina", "ordine", "attivo"],
      schema: {
        nome: fields.slug({
          name: {
            label: "Nome e cognome",
            validation: { isRequired: true },
          },
        }),
        ruolo: tr("Ruolo", { description: 'Es. "Maestro di SCI ALPINO". Appare sotto il nome.' }),
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
        attivo: interruttore("Stagione", {
          acceso: "Acceso – compare sul sito",
          spento: "Spento – nascosto dalla pagina Maestri",
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
            sopratitolo1: trBloccato("Scritta sopra il titolo – prima parte", {
              description: "Su telefono le due parti vanno su due righe.",
            }),
            sopratitolo2: trBloccato("Scritta sopra il titolo – seconda parte"),
            titolo: trBloccato("Titolo"),
          },
          { label: "In alto (titolo principale)" },
        ),
        intro: fields.object(
          {
            titolo: trBloccato("Titolo", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            testo: trBloccato("Testo", { multiline: true }),
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
            titolo: trBloccato("Titolo"),
            testo: trBloccato("Testo", { description: "Facoltativo.", multiline: true }),
            foto: fields.image({ label: "Foto (orizzontale)", ...homeMedia }),
            link: fields.text({
              label: "Link",
              description:
                'Facoltativo. Pagina del sito (es. "/lezioni#lezioni-collettive") o indirizzo esterno (es. "https://…", si apre in una nuova scheda).',
            }),
            pulsante: trBloccato("Scritta del pulsante", {
              description: 'Facoltativa, es. "Scopri" o "Guarda". Compare in azzurro con la freccia se c\'è un link.',
            }),
            mostraPreventivo: fields.checkbox({
              label: 'Mostra "Richiedi il tuo preventivo"',
              description: "Link email per richiedere un preventivo.",
            }),
            scrittaSuFoto: trBloccato("Scritta sulla foto", {
              description: 'Facoltativa, es. "Cogne – Webcam Live".',
            }),
            etichettaLive: fields.checkbox({
              label: 'Mostra etichetta rossa "LIVE" sulla foto',
            }),
          }),
          {
            label: "Riquadri servizi",
            itemLabel: (props) => props.fields.titolo.value.it || "Riquadro",
          },
        ),
        eventi: fields.object(
          {
            titolo: tr("Titolo", { defaultValue: "Bacheca eventi" }),
            lista: fields.array(
              fields.object({
                foto: fields.image({
                  label: "Foto",
                  validation: { isRequired: true },
                  directory: "public/foto/eventi",
                  publicPath: "/foto/eventi/",
                }),
                data: fields.date({
                  label: "Data",
                  description:
                    "Facoltativa. Compare sul post-it nell'angolo (senza data il post-it dice \"? presto\"); il giorno dopo l'evento sparisce da solo dalla bacheca.",
                }),
                titolo: tr("Titolo", { description: "Facoltativo." }),
                testo: tr("Testo", { description: "Facoltativo.", multiline: true }),
                scritta: tr("Scritta a mano", {
                  description: 'Facoltativa, es. "vi aspettiamo!".',
                }),
              }),
              {
                label: "Eventi",
                itemLabel: (props) =>
                  [props.fields.data.value, props.fields.titolo.fields.it.value || props.fields.scritta.fields.it.value]
                    .filter(Boolean)
                    .join(" · ") || "Evento",
              },
            ),
          },
          {
            label: "Bacheca eventi",
            description: "Sotto la barra del meteo. Se non ci sono eventi la bacheca non compare.",
          },
        ),
        linkUtili: fields.array(
          fields.object({
            titolo: trBloccato("Titolo"),
            logo: fields.image({
              label: "Logo",
              description: "Compare nel pallino bianco: meglio un'immagine quadrata.",
              directory: "public/foto/link",
              publicPath: "/foto/link/",
            }),
            link: fields.url({ label: "Link", validation: { isRequired: true } }),
          }),
          {
            label: "Link utili",
            description: "Tessere sotto la bacheca eventi; si aprono in una nuova scheda.",
            itemLabel: (props) => props.fields.titolo.value.it || "Link",
          },
        ),
        sicurezza: fields.object(
          {
            titolo: trBloccato("Titolo", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            testo: trBloccato("Testo", { multiline: true }),
            galleria: fields.array(
              fields.object({
                foto: fields.image({
                  label: "Foto",
                  validation: { isRequired: true },
                  ...homeMedia,
                }),
                descrizione: tr("Descrizione breve", {
                  description: "Per motori di ricerca e non vedenti.",
                }),
              }),
              {
                label: "Galleria foto",
                itemLabel: (props) =>
                  props.fields.descrizione.fields.it.value || "Foto",
              },
            ),
          },
          { label: "Sicurezza e galleria foto" },
        ),
        contatti: fields.object(
          {
            titolo: trBloccato("Titolo"),
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
            instagram: fields.url({
              label: "Pagina Instagram",
              description: 'Link completo (es. "https://www.instagram.com/…"). Vuoto = icona nascosta.',
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
        titolo: trBloccato("Titolo in alto"),
        heroVideo: fields.file({
          label: "Video in alto (mp4, orizzontale)",
          description: "Video in loop dietro il titolo, senza audio. Meglio sotto i 5 MB.",
          ...lezioniMedia,
        }),
        heroFoto: fields.image({
          label: "Immagine in alto",
          description: "Si vede mentre il video carica, o al posto del video se non c'è.",
          ...lezioniMedia,
        }),
        individuali: fields.object(
          {
            titolo: trBloccato("Titolo", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            testo: trBloccato("Testo", { multiline: true }),
            discipline: disciplineField,
            foto: fields.image({ label: "Foto", ...lezioniMedia }),
          },
          { label: "Lezioni individuali" },
        ),
        stagioni: fields.object(
          {
            altissima: stagioneField("Altissima stagione"),
            alta: stagioneField("Alta stagione"),
            bassa: stagioneField("Bassa stagione"),
          },
          {
            label: "Periodi di stagione e date",
            description:
              "I nomi brevi delle stagioni sono usati anche come colonne della tabella prezzi.",
          },
        ),
        private: fields.object(
          {
            titolo: trBloccato("Titolo tabella"),
            testo: trBloccato("Testo sotto il titolo", { multiline: true }),
            righe: fields.array(
              fields.object({
                disciplina: tr("Disciplina"),
                orario: tr("Orario / dettaglio"),
                prezzoAltissima: fields.text({ label: "Prezzo Altissima stagione" }),
                prezzoAlta: fields.text({ label: "Prezzo Alta stagione" }),
                prezzoBassa: fields.text({ label: "Prezzo Bassa stagione" }),
              }),
              {
                label: "Righe tabella",
                itemLabel: (props) =>
                  `${props.fields.disciplina.fields.it.value} – ${props.fields.orario.fields.it.value}`,
              },
            ),
            personaAggiuntaTitolo: trBloccato("Persona aggiunta – titolo", {
              description:
                "I prezzi sono quelli di ogni stagione (vedi Periodi di stagione).",
            }),
            personaAggiuntaSottotitolo: trBloccato("Persona aggiunta – sottotitolo"),
            maestroTitolo: trBloccato("Maestro richiesto – titolo"),
            maestroTesto: tr("Maestro richiesto – testo", {
              description: "Le parole tra **due asterischi** diventano azzurre.",
              multiline: true,
            }),
          },
          { label: "Prezzi lezioni private" },
        ),
        collettive: fields.object(
          {
            titolo: trBloccato("Titolo", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            testo: trBloccato("Testo", { multiline: true }),
            discipline: disciplineField,
            foto: fields.image({ label: "Foto", ...lezioniMedia }),
            tariffeTitolo: trBloccato("Titolo tariffe"),
            tariffeTesto: trBloccato("Testo tariffe", { multiline: true }),
            corsi: fields.array(
              fields.object({
                nome: tr("Disciplina", { description: 'Es. "Sci alpino".' }),
                orari: tr("Luogo e orari", {
                  description: "Ogni riga va a capo sul sito.",
                  multiline: true,
                }),
                prezzi: fields.array(
                  fields.object({
                    pacchetto: tr("Pacchetto", { description: 'Es. "3 giorni".' }),
                    prezzo: fields.text({ label: "Prezzo", description: 'Es. "165 €".' }),
                  }),
                  {
                    label: "Prezzi",
                    itemLabel: (props) =>
                      `${props.fields.pacchetto.fields.it.value} – ${props.fields.prezzo.value}`,
                  },
                ),
              }),
              {
                label: "Schede corsi",
                itemLabel: (props) =>
                  `${props.fields.nome.fields.it.value} – ${props.fields.orari.fields.it.value.split("\n")[0]}`,
              },
            ),
            nota: tr("Nota sotto le schede", { multiline: true }),
          },
          { label: "Lezioni collettive" },
        ),
        corsiAnnuali: fields.object(
          {
            titolo: trBloccato("Titolo (bianco)"),
            titoloColorato: trBloccato("Titolo (parte azzurra)"),
            testo: trBloccato("Testo", { multiline: true }),
            corsi: fields.array(
              fields.object({
                nome: tr("Nome corso"),
                disciplina: tr("Disciplina (etichetta)"),
                periodo: tr("Periodo (azzurro)"),
                orari: tr("Giorni e orari"),
                prezzo: fields.text({ label: "Prezzo" }),
              }),
              {
                label: "Corsi",
                itemLabel: (props) =>
                  `${props.fields.nome.fields.it.value} (${props.fields.disciplina.fields.it.value}) – ${props.fields.prezzo.value}`,
              },
            ),
            pacchettiTitolo: trBloccato("Titolo pacchetti (bianco)"),
            pacchettiTitoloColorato: trBloccato("Titolo pacchetti (parte azzurra)"),
            pacchetti: fields.array(
              fields.object({
                nome: tr("Nome"),
                disciplina: tr("Disciplina (etichetta)"),
                descrizione: tr("Descrizione"),
                prezzo: fields.text({ label: "Prezzo" }),
              }),
              {
                label: "Pacchetti",
                itemLabel: (props) =>
                  `${props.fields.nome.fields.it.value} (${props.fields.disciplina.fields.it.value}) – ${props.fields.prezzo.value}`,
              },
            ),
            sconto: fields.object(
              {
                titolo: tr("Titolo", { description: "Lascia vuoto (in italiano) per nascondere la fascia." }),
                testo: tr("Testo piccolo"),
                percentuale: fields.text({ label: "Sconto", description: 'Es. "-30%".' }),
              },
              { label: "Fascia sconto" },
            ),
          },
          { label: "Corsi annuali" },
        ),
        snowcare: fields.object(
          {
            titolo: trBloccato("Titolo (bianco)", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            titoloColorato: trBloccato("Titolo (parte colorata)", { multiline: true }),
            paragrafi: paragrafiBloccati,
            foto: fields.image({
              label: "Foto",
              description: "Compare solo se non c'è la scheda Snowcare.",
              ...lezioniMedia,
            }),
            // scheda Snowcare per lingua: sul sito si vede l'immagine, cliccandola si apre il PDF
            scheda: fields.object(
              {
                ita: fields.file({ label: "Italiano", ...snowcareMedia }),
                eng: fields.file({ label: "English", description: "Se manca si usa quella italiana.", ...snowcareMedia }),
                fra: fields.file({ label: "Français", description: "Se manca si usa quella italiana.", ...snowcareMedia }),
              },
              {
                label: "Scheda Snowcare (PDF)",
                description: "Si apre cliccando la scheda. Una per lingua, es. quella della nuova stagione.",
              },
            ),
            schedaImmagine: fields.object(
              {
                ita: fields.image({ label: "Italiano", ...snowcareMedia }),
                eng: fields.image({ label: "English", description: "Se manca si usa quella italiana.", ...snowcareMedia }),
                fra: fields.image({ label: "Français", description: "Se manca si usa quella italiana.", ...snowcareMedia }),
              },
              {
                label: "Immagine della scheda",
                description: "La scheda come immagine (verticale): è quella che si vede sul sito al posto della foto.",
              },
            ),
          },
          { label: "Assicurazione Snowcare" },
        ),
        pagamenti: fields.object(
          {
            titolo: trBloccato("Titolo"),
            paragrafi: paragrafiBloccati,
          },
          { label: "Cancellazioni e pagamenti" },
        ),
        ritrovo: fields.object(
          {
            titolo: trBloccato("Titolo", { description: "Ogni riga va a capo sul sito.", multiline: true }),
            testo: trBloccato("Testo", { multiline: true }),
            punti: fields.array(
              fields.object({
                nome: fields.text({ label: "Nome", validation: { length: { min: 1 } } }),
                luogo: fields.text({ label: "Località", description: 'Es. "Cogne" o "Lillaz".' }),
                tipo: fields.select({
                  label: "Disciplina",
                  description: "Decide l'icona. Il colore lo prende dalla posizione nella lista (azzurro, verde, giallo, rosa).",
                  options: [
                    { label: "Sci alpino e snowboard", value: "alpino" },
                    { label: "Sci di fondo", value: "fondo" },
                  ],
                  defaultValue: "alpino",
                }),
                nota: tr("Nota", { description: "Facoltativa, es. per quali corsi." }),
                coordinate: fields.text({
                  label: "Posizione (coordinate)",
                  description:
                    'Latitudine e longitudine, es. "45.605352, 7.357820". In Google Maps: clic destro sul punto e clic sulle coordinate per copiarle.',
                  validation: { length: { min: 3 } },
                }),
              }),
              {
                label: "Punti di ritrovo",
                description: "Tessere con il pulsante \"Portami qui\"; sotto si vede la mappa del punto scelto.",
                itemLabel: (props) => props.fields.nome.value || "Punto",
              },
            ),
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
        titolo: tr("Titolo in alto", { defaultValue: "Maestri" }),
        heroVideo: fields.file({
          label: "Video in alto (mp4, orizzontale)",
          description: "Video in loop dietro il titolo, senza audio. Meglio sotto i 5 MB.",
          directory: "public/foto/pagina-maestri",
          publicPath: "/foto/pagina-maestri/",
        }),
        heroFoto: fields.image({
          label: "Immagine in alto",
          description: "Si vede mentre il video carica, o al posto del video se non c'è.",
          directory: "public/foto/pagina-maestri",
          publicPath: "/foto/pagina-maestri/",
        }),
        slogan: tr("Slogan", { description: "Ogni riga va a capo sul sito.", multiline: true }),
        paragrafi: paragrafiField,
        foto: fields.image({
          label: "Foto accanto al testo",
          directory: "public/foto/pagina-maestri",
          publicPath: "/foto/pagina-maestri/",
        }),
      },
    }),
  },
});
