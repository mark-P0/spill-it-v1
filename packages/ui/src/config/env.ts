import { z } from "zod";

const envSchema = z.object({
  VITE_GRAPHQL_SERVER_URL: z.string(),
});

export const env = envSchema.parse(import.meta.env);
