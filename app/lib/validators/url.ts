import z, { coerce } from "zod";

export const createUrlSchema = z.object({
  userId: z.string(),
  originalUrl: z.string().url(),
  slug: z.string(),
  password: z.string().optional(),
  expiresAt: z.coerce.date().optional(),
  maxClicks: z.coerce.number().optional(),
});

export type createUrlSchema = z.infer<typeof createUrlSchema>;
