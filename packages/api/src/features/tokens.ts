import { type JWTPayload, SignJWT, importJWK, jwtVerify } from "jose";
import { z } from "zod";
import { env } from "./env";

const zAlg = z.string();

/**
 * This function is used to create a key, in string format, for use in signing tokens
 *
 * ---
 *
 * `jose` docs use `HS256` algorithm for symmetric key example
 *
 * https://github.com/panva/jose/blob/main/docs/classes/jwt_sign.SignJWT.md
 *
 * ---
 *
 * Key-like objects accepted by `jose` include `CryptoKey` (browser, Node) and `KeyObject` (Node)
 *
 * `CryptoKey` is chosen as its more of a standard (also available in browser)
 *
 * `CryptoKey` instances are created via the Subtle Crypto API
 *
 * - https://github.com/panva/jose/blob/main/docs/classes/jwt_sign.SignJWT.md#sign
 * - https://github.com/panva/jose/blob/main/docs/types/types.KeyLike.md
 * - https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/generateKey
 */
export async function generateKey() {
  const key = await crypto.subtle.generateKey(
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    true,
    ["sign"]
  );

  const jwk = await crypto.subtle.exportKey("jwk", key);
  const jwkStr = JSON.stringify(jwk);

  return jwkStr;
}

export async function parseKey(jwkStr: string) {
  const jwk = JSON.parse(jwkStr); // TODO Make this type-safe?

  const key = await importJWK(jwk);
  const alg = zAlg.parse(jwk.alg);

  return { key, alg };
}

export async function generateToken(
  claims: JWTPayload,
  keyStr = env.TOKEN_KEY
) {
  const { key, alg } = await parseKey(keyStr);
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg })
    .setExpirationTime("3s")
    .sign(key);

  return token;
}

export async function parseToken(token: string, keyStr = env.TOKEN_KEY) {
  const { key } = await parseKey(keyStr);
  const parsed = await jwtVerify(token, key);

  return parsed;
}
