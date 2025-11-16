import Container from '@/components/Container';

export default function ContattiPage() {
  return (
    <section className="py-16">
      <Container>
        <h1 className="text-3xl font-semibold">Contatti</h1>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <form className="rounded-2xl border p-6 shadow-sm space-y-4">
            <input className="w-full rounded-xl border p-3" placeholder="Nome" />
            <input className="w-full rounded-xl border p-3" placeholder="Email" type="email" />
            <textarea className="w-full rounded-xl border p-3" placeholder="Messaggio" rows={5} />
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700" type="button">
              Invia
            </button>
          </form>
          <div className="rounded-2xl border p-6 shadow-sm">
            <div className="font-medium">Sede</div>
            <p className="mt-2 text-sm text-gray-600">Via delle Piste 1, 11000 Montagna (AO)</p>
            <div className="mt-4 aspect-video w-full rounded-xl bg-gray-200" />
          </div>
        </div>
      </Container>
    </section>
  );
}
