export const NAME: string = "Clause";
export const DEPLOYMENT_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  process.env.BETTER_AUTH_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");
