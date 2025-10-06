export default function Contacts() {
  return (
    <section className="slice slice-white">
      <div className="container-site">
        <h2 className="text-[#0b0b0b] uppercase text-2xl md:text-[26px]">Contatti</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-10 items-start">
          <div className="text-[#0b0b0b] text-[13px] space-y-1">
            <div>Scuola di Sci &amp; Snowboard Gran Paradiso</div>
            <div>CODE: indirizzo ————, cap (AO)</div>
            <div>Tel: ————</div>
            <div>Mail: ————</div>
          </div>

          <div className="w-full">
            <div className="aspect-[16/9] w-full rounded-[12px] bg-[#86D4E4] shadow-xl shadow-black/10" />
            <p className="mt-1 text-center text-[10px] tracking-[0.22em] text-black/60 uppercase">
              Mappa / embed Google Maps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
