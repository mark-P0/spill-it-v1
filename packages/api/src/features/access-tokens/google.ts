import { createRemoteJWKSet, jwtVerify } from "jose";
import { z } from "zod";

/**
 * JWT
 * - Header
 * - Payload
 *   - Registered claims (e.g. `iss`, `exp`, `sub`)
 *   - Public claims (common properties, e.g. `email`, `name`)
 *   - Private claims (properties agreed on beforehand by token issuer and receiver)
 * - Signature
 *
 * https://jwt.io/introduction
 */
const zGoogleTokenClaimsPrivate = z.object({
  email: z.string(),
  name: z.string(),
});

/**
 * - https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
 * - https://github.com/panva/jose/blob/main/docs/functions/jwt_verify.jwtVerify.md
 */
export async function parseGoogleToken(
  token: string,
  keySetUrl = "https://www.googleapis.com/oauth2/v3/certs"
) {
  const keySetUrlObj = new URL(keySetUrl);
  const keySet = createRemoteJWKSet(keySetUrlObj);
  const parsedToken = await jwtVerify(token, keySet);

  const parsedPayload = zGoogleTokenClaimsPrivate.parse(parsedToken.payload);

  return parsedPayload;
}
