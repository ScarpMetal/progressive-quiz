import { cx } from "utils";
import "./Input.scss";

export default function Input({
  label,
  direction = "vertical",
  containerProps = {},
  ...rest
}: {
  label?: string;
  direction?: "vertical" | "horizontal";
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div className={cx("input", direction)} {...containerProps}>
      {label && <div>{label}</div>}
      <input type="text" {...rest} />
    </div>
  );
}
