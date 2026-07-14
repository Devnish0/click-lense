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

export const deleteUrlSchema = z.object({
  id: z.string(),
});

export type deleteUrlSchema = z.infer<typeof deleteUrlSchema>;

export const updateUrlSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export type updateUrlSchema = z.infer<typeof updateUrlSchema>;

export const slugCheck = z.object({
  slug: z.string(),
});

export type slugCheck = z.infer<typeof slugCheck>;

export const unlockUrl = z.object({
  slug: z.string(),
  Password: z.string(),
});

export type unlockUrl = z.infer<typeof unlockUrl>;
