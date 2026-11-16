import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Finché online mancano le credenziali (GitHub o Keystatic Cloud), il pannello
// risponde "non configurato" invece di bloccare la pubblicazione del sito.
function createHandlers() {
  try {
    return makeRouteHandler({ config });
  } catch (error) {
    console.warn("[keystatic] pannello non configurato:", (error as Error).message);
    const notConfigured = () =>
      new Response("Pannello di gestione non ancora configurato.", { status: 503 });
    return { GET: notConfigured, POST: notConfigured };
  }
}

export const { GET, POST } = createHandlers();
