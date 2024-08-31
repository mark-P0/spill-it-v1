import type {
  QueryResolvers,
  Resolver,
} from "@spill-it-v1/gql/codegen/api/types";
import { ResponseError } from "../../utils/response-error";
import { safeAsync } from "../../utils/safe";
import { generateToken } from "../tokens";
import { parseGoogleToken } from "./google";

type AccessTokenQueryResolver = Exclude<
  NonNullable<QueryResolvers["accessToken"]>,
  { resolve: unknown }
>;

async function resolveGoogleTokenToAccessToken(
  googleToken: string,
  params: Parameters<AccessTokenQueryResolver>
) {
  const [parent, args, context, info] = params;

  const payload = await safeAsync(() => parseGoogleToken(googleToken));
  if (payload.data === undefined) {
    console.error(payload.error);

    throw new ResponseError("BAD_REQUEST");
  }

  const user = await safeAsync(async () => {
    const { db } = context;
    const { email } = payload.data;

    const existingUser = await db.users.getUserByEmail(email);
    if (existingUser !== null) return existingUser;

    const newUser = await db.users.createUser(email);
    return newUser;
  });
  if (user.data === undefined) {
    console.error(user.error);

    throw new ResponseError("BAD_GATEWAY");
  }

  const accessToken = await safeAsync(() =>
    generateToken({ id: user.data.id })
  );
  if (accessToken.data === undefined) {
    console.error(accessToken.error);

    throw new ResponseError("INTERNAL_SERVER_ERROR");
  }

  return accessToken.data;
}

export const accessTokenQueryResolver: AccessTokenQueryResolver = async (
  ...params
) => {
  const [parent, args, context, info] = params;

  const googleToken = args.input.googleToken ?? null;
  if (googleToken !== null) {
    const token = await resolveGoogleTokenToAccessToken(googleToken, params);

    return token;
  }

  throw new ResponseError("BAD_REQUEST");
};
