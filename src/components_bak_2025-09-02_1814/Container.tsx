type Props = React.PropsWithChildren<{ className?: string }>;
export default function Container({ className = "", children }: Props) {
  return <div className={`mx-auto w-full max-w-[1120px] px-4 ${className}`}>{children}</div>;
}
