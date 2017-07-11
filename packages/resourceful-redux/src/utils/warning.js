export default function warning(message) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message)
  }

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message)
  } catch (e) {
    // Intentionally blank
  }
}
