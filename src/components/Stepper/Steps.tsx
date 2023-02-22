import { ReactNode } from "react";
import { cx } from "utils";
import "./Steps.scss";

export default function Steps({
  children,
  className,
  ...rest
}: { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={cx("steps", className)} {...rest}>
      {children}
    </div>
  );
}
