import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  PORT: z.coerce.number(),
  TOKEN_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
