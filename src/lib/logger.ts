/**
 * Scoped logger utility.
 *
 * Wraps the existing console.error("[scope] …") convention into a
 * structured, swappable interface. Console calls live in one place
 * behind eslint-disable so application code stays lint-clean.
 */

interface ScopedLogger {
  warn(msg: string, detail?: unknown): void;
  error(msg: string, detail?: unknown): void;
}

export function createLogger(scope: string): ScopedLogger {
  const tag = `[${scope}]`;
  return {
    /* eslint-disable no-console */
    warn: (msg, detail) =>
      detail !== undefined ? console.warn(tag, msg, detail) : console.warn(tag, msg),
    error: (msg, detail) =>
      detail !== undefined ? console.error(tag, msg, detail) : console.error(tag, msg),
    /* eslint-enable no-console */
  };
}
