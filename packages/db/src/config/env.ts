import { z } from "zod";

const envSchema = z.object({
  POSTGRES_CONNECTION_STRING: z.string(),
});

export const env = envSchema.parse(process.env);
