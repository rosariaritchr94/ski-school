import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <Container>
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-semibold">Scuola <span className="text-blue-600">Sci</span></div>
            <p className="mt-2 text-sm text-slate-600">
              Lezioni di sci e snowboard per tutti i livelli.
            </p>
            <div className="mt-3 badge">P.IVA 00000000000</div>
          </div>
          <div>
            <div className="font-medium">Contatti</div>
            <p className="mt-2 text-sm text-slate-600">
              +39 0123 456789<br/> info@scuola-sci.it
            </p>
          </div>
          <div>
            <div className="font-medium">Sede</div>
            <p className="mt-2 text-sm text-slate-600">
              Via delle Piste 1, 11000 Montagna (AO)
            </p>
          </div>
          <div>
            <div className="font-medium">Orari</div>
            <p className="mt-2 text-sm text-slate-600">08:30–17:00 (lun–dom)</p>
          </div>
        </div>
        <div className="border-t py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Scuola Sci
        </div>
      </Container>
    </footer>
  );
}
