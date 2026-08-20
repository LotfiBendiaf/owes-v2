import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.url().startsWith("postgresql://"),
});

const parsed = serverEnvSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!parsed.success) {
  const variables = Object.keys(parsed.error.flatten().fieldErrors).join(", ");
  throw new Error(`Invalid or missing server environment variables: ${variables}`);
}

export const env = parsed.data;

const authEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export function getAuthEnv() {
  const authEnv = authEnvSchema.safeParse({
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  });

  if (!authEnv.success) {
    const variables = Object.keys(authEnv.error.flatten().fieldErrors).join(", ");
    throw new Error(`Invalid or missing authentication environment variables: ${variables}`);
  }

  return authEnv.data;
}
