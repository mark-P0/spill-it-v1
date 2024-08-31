import { type JWTPayload, SignJWT, importJWK, jwtVerify } from "jose";
import { z } from "zod";
import { env } from "../config/env";

/**
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
  const keyObj = await crypto.subtle.generateKey(
    {
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    true,
    ["sign"]
  );

  const jwkObj = await crypto.subtle.exportKey("jwk", keyObj);
  const jwk = JSON.stringify(jwkObj);

  return jwk;
}

export async function parseKey(keyStr: string) {
  const jwk = JSON.parse(keyStr); // TODO Make this type-safe?

  const key = await importJWK(jwk);
  const alg = z.string().parse(jwk.alg);

  return { key, alg };
}

export async function generateToken(
  claims: JWTPayload,
  keyStr = env.TOKEN_KEY
) {
  const { key, alg } = await parseKey(keyStr);
  const token = await new SignJWT(claims).setProtectedHeader({ alg }).sign(key);

  return token;
}

export async function parseToken(token: string, keyStr = env.TOKEN_KEY) {
  const { key } = await parseKey(keyStr);
  const parsed = await jwtVerify(token, key);

  return parsed;
}
