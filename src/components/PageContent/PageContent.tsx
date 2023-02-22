import { ReactNode } from "react";
import { cx } from "utils";
import "./styles.scss";

export default function PageContent({
  children,
  className,
  ...rest
}: { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div className={cx("page-content", className)} {...rest}>
      {children}
    </div>
  );
}
