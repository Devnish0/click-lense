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
  originalUrl: z.string().trim().refine(isValidUrl, {
    message: "Please enter a valid URL",
  }),
});

export type createUrlSchema = z.infer<typeof createUrlSchema>;
