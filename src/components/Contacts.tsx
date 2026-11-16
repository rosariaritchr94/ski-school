import Lines from "./Lines";

export type ContactsContent = {
  titolo: string;
  nome: string;
  indirizzo: string;
  mappa: string;
  telefono: string;
  email: string;
};

export default function Contacts({ titolo, nome, indirizzo, mappa, telefono, email }: ContactsContent) {
  const q = encodeURIComponent(mappa).replace(/%20/g, "+").replace(/%2C/g, ",");
  return (
    <section id="contatti" className="slice slice-white">
      <div className="container-site">
        {/* Titolo + testo contatti */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* TITOLO – SOFIA SANS come gli altri */}
          <div>
            <h2
              className="
                font-sofia
                mt-2
                text-[38px] sm:text-[48px] lg:text-[80px]
                leading-[1.05]
                font-extrabold
                uppercase
                text-[#0b0b0b]
              "
            >
              {titolo}
            </h2>
          </div>

          {/* DESCRIZIONE – OSWALD come le descrizioni */}
          <div
            className="
              font-oswald
              text-[#0b0b0b]
              text-[16px] sm:text-[18px] lg:text-[20px]
              leading-relaxed
              space-y-1
            "
          >
            <div>{nome}</div>

            {/* INDIRIZZO CLICCABILE → GOOGLE MAPS */}
            <div>
              <a
                href={`https://www.google.com/maps?q=${q}&hl=it`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                <Lines text={indirizzo} />
              </a>
            </div>

            <div>
              Tel:{" "}
              <a
                href={`tel:${telefono.replace(/[^+\d]/g, "")}`}
                className="underline hover:no-underline"
              >
                {telefono}
              </a>
            </div>
            <div>
              Mail:{" "}
              <a
                href={`mailto:${email}`}
                className="underline hover:no-underline"
              >
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* MAPPA EMBED A TUTTA LARGHEZZA */}
        <div className="mt-8 w-full">
          <div className="aspect-[16/9] w-full rounded-[12px] overflow-hidden shadow-xl shadow-black/10">
            <iframe
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
