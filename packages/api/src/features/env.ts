import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  TOKEN_KEY: z.string(),
});
export const env = envSchema.parse(process.env);
