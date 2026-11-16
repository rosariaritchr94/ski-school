// Pannello di gestione contenuti: ha un layout tutto suo,
// senza menu e footer del sito.
import KeystaticApp from "./keystatic";

export const metadata = {
  title: "Gestione contenuti – Gran Paradiso",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  return (
    <html lang="it">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
