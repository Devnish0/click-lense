import z from "zod";

export const createDemoUser = z.object({
  isGuest: true,
});

export type createDemoUser = z.infer<typeof createDemoUser>;

export const createUser = z.object({
  email: z.string(),
  password: z.string(),
  isGuest: false,
});
