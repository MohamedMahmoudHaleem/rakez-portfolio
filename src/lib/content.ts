const TODO_MARKER = "[TODO]";

/** "false" in production hides placeholders, unfinished projects and unnamed team members. */
export const SHOW_TODO_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_TODO_PLACEHOLDERS !== "false";

/** True when a content value is missing or still contains the [TODO] marker. */
export function isTodo(value: string | null | undefined): boolean {
  return !value || value.includes(TODO_MARKER);
}

/** Returns the value only when it is real content, otherwise undefined. */
export function realOrUndefined(value: string | null | undefined): string | undefined {
  return isTodo(value) ? undefined : (value ?? undefined);
}

/** "Mohamed Haleem" → "MH". Used by image placeholders. */
export function initials(name: string, max = 2): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}
