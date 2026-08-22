import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...rest }: SelectProps) {
  return (
    <select
      className={[
        "rounded-lg border border-border bg-surface-raised px-3 py-1.5 text-sm text-ink",
        "focus:outline-none focus:ring-2 focus:ring-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </select>
  );
}
