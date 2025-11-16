import { PropsWithChildren } from "react";

interface Props { className?: string }

/** Wrapper standard con la classe .container-site definita in globals.css */
export default function Container({ children, className = "" }: PropsWithChildren<Props>) {
  return <div className={`container-site ${className}`}>{children}</div>;
}
