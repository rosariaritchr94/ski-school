export default function TestVideoPage() {
  return (
    <main className="min-h-screen grid place-items-center p-10 bg-black text-white">
      <div className="w-[360px] md:w-[420px] max-w-[440px] aspect-[2/3] bg-neutral-900 rounded-xl overflow-hidden">
        <video
          src="/assets/intro/reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-4 opacity-70">Se qui vedi il video, il file è servito correttamente.</p>
    </main>
  );
}
