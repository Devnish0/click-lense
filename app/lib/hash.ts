import { createHash } from "crypto";

/**
 * Hash a string using SHA-256.
 * Used to anonymize IP addresses before storing them.
 */
export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}
