/** Calculate days between two ISO dates (or from date to now) */
export function daysBetween(start: string, end?: string | null): number {
  const s = new Date(start).getTime();
  const e = end ? new Date(end).getTime() : Date.now();
  return Math.max(0, Math.floor((e - s) / 86_400_000));
}

/** Merge class names (tiny utility, no dependency) */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format candidate name defensively */
export function formatName(
  first: string | null | undefined,
  last: string | null | undefined,
): string {
  const parts = [first, last].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "Unnamed";
}
