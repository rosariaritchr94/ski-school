export default function Contacts() {
  return (
    <section className="slice slice-white">
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
              Contatti
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
            <div>Scuola di Sci &amp; Snowboard Gran Paradiso</div>

            {/* INDIRIZZO CLICCABILE → GOOGLE MAPS */}
            <div>
              <a
                href="https://www.google.com/maps?q=Scuola+di+Sci+e+Snowboard+Gran+Paradiso,+Via+Bourgeois+33,+11012+Cogne+AO&hl=it"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                Via Bourgeois 33
                <br />
                11012 Cogne (AO) – Italia
              </a>
            </div>

            <div>
              Tel:{" "}
              <a
                href="tel:+39016574300"
                className="underline hover:no-underline"
              >
                +39 0165 74300
              </a>
            </div>
            <div>
              Mail:{" "}
              <a
                href="mailto:info@scuolascigranparadiso.it"
                className="underline hover:no-underline"
              >
                info@scuolascigranparadiso.it
              </a>
            </div>
          </div>
        </div>

        {/* MAPPA EMBED A TUTTA LARGHEZZA */}
        <div className="mt-8 w-full">
          <div className="aspect-[16/9] w-full rounded-[12px] overflow-hidden shadow-xl shadow-black/10">
            <iframe
              src="https://www.google.com/maps?q=Scuola+di+Sci+e+Snowboard+Gran+Paradiso,+Via+Bourgeois+33,+11012+Cogne+AO&output=embed"
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
