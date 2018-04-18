let codeCache = {};

export default function warning(message, code) {
  // This ensures that each warning type is only logged out one time
  if (code) {
    if (codeCache[code]) {
      return;
    }

    codeCache[code] = true;
  }

  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {
    // Intentionally blank
  }
}

export function resetCodeCache() {
  codeCache = {};
}
