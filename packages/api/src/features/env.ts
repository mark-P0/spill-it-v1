import { z } from "zod";

const zEnv = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number(),
  TOKEN_KEY: z.string(),
});

export const env = zEnv.parse(process.env);
