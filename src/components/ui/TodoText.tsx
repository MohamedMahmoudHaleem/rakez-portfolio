import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isTodo, SHOW_TODO_PLACEHOLDERS } from "@/lib/content";

type TodoTextProps = {
  value: string | undefined;
  as?: ElementType;
  className?: string;
  /** Rendered instead when the value is real content (e.g. a link). Defaults to the value itself. */
  children?: ReactNode;
};

/**
 * Shows unfinished content as a visible, muted placeholder in development,
 * and hides it in production when NEXT_PUBLIC_SHOW_TODO_PLACEHOLDERS is "false".
 */
export function TodoText({ value, as: Tag = "span", className, children }: TodoTextProps) {
  if (!isTodo(value)) {
    return <Tag className={className}>{children ?? value}</Tag>;
  }

  if (!SHOW_TODO_PLACEHOLDERS) return null;

  return (
    <Tag className={cn(className, "text-silver/70 italic underline decoration-dashed decoration-steel underline-offset-4")}>
      {value || "[TODO]"}
    </Tag>
  );
}
