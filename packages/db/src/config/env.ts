import { z } from "zod";

const zEnv = z.object({
  POSTGRES_CONNECTION_STRING: z.string(),
});

export const env = zEnv.parse(process.env);
