import z from "zod";

export const createUrlSchema = z.object({
    id: z.string(),
    originalUrl: z.string().url(),
    slug: z.string(),
});

export type createUrlSchema = z.infer<typeof createUrlSchema>;
