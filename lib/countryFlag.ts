export function isoCountryFlag(code: string) {
  const normalized = code.trim().toUpperCase();

  // Ensure it's exactly two uppercase letters
  if (!/^[A-Z]{2}$/.test(normalized)) {
    return "";
  }

  return [...normalized]
    .map((char) =>
      String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - "A".charCodeAt(0)),
    )
    .join("");
}
