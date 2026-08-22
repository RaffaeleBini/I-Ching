import type { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...rest }: TextInputProps) {
  return (
    <input
      className={[
        "w-full rounded-xl border border-border bg-surface-raised px-4 py-2.5 text-ink",
        "placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
