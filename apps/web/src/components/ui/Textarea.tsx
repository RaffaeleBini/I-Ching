import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...rest }: TextareaProps) {
  return (
    <textarea
      className={[
        "w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-ink",
        "placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-accent",
        "min-h-[8rem] resize-y",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    />
  );
}
