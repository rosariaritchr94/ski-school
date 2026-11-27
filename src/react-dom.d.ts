// react-dom non ha i tipi installati (@types/react-dom va in conflitto con i tipi di React
// usati da Keystatic): qui basta dichiarare createPortal, usato dalla galleria della home.
declare module "react-dom" {
  import type { ReactNode, ReactPortal } from "react";
  export function createPortal(children: ReactNode, container: Element | DocumentFragment, key?: string | null): ReactPortal;
}
