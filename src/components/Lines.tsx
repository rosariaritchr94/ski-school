import { Fragment } from "react";

/** Mostra un testo del pannello andando a capo dove il cliente ha premuto Invio. */
export default function Lines({ text }: { text?: string | null }) {
  const righe = (text ?? "").split("\n");
  return (
    <>
      {righe.map((riga, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {riga}
        </Fragment>
      ))}
    </>
  );
}
