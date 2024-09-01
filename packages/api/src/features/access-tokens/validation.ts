import { z } from "zod";

export const zAccessTokenClaims = z.object({
  id: z.number(),
});
export type AccessTokenClaims = z.infer<typeof zAccessTokenClaims>;
