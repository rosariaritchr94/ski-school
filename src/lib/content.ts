// Lettura dei contenuti gestiti dal pannello (Keystatic).
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export const reader = createReader(process.cwd(), keystaticConfig);
