import { z } from "zod";

const isValidUrl = (value: string) => {
  try {
    const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;

    const url = new URL(normalized);

    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    // Require a dot in the hostname
    if (!url.hostname.includes(".")) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const createUrlSchema = z.object({
  userId: z.string(),
  originalUrl: z.string().url(),
  slug: z.string(),
  password: z.string().optional(),
  expiresAt: z.coerce.date().optional(),
  maxClicks: z.coerce.number().optional(),
});

export type createUrlSchema = z.infer<typeof createUrlSchema>;

export const createUrlSchemaClient = z.object({
  originalUrl: z.string().trim().refine(isValidUrl, {
    message: "Please enter a valid URL",
  }),
});

export type createUrlSchemaClient = z.infer<typeof createUrlSchemaClient>;

export const validPassword = z
  .string()
  .min(6, "Password must be at least 6 characters long");

export type validPassword = z.infer<typeof validPassword>;

export const validSlug = z
  .string()
  .min(3, { message: "Slug must be at least 3 characters long" })
  .max(30, { message: "Slug must be at most 30 characters long" })
  .regex(/^[a-zA-Z0-9-]+$/, {
    message: "Slug can only contain letters, numbers, and hyphens",
  });

export type validSlug = z.infer<typeof validSlug>;
