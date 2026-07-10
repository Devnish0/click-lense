import { z } from "zod";

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
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
