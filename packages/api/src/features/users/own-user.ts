import type { QueryResolvers } from "@spill-it-v1/gql/codegen/api/types";
import { safeAsync } from "../../utils/safe";
import { zAccessTokenClaims } from "../access-tokens/validation";
import { ResponseError } from "../graphql/response-error";
import { parseToken } from "../tokens";

export const ownUserQueryResolver: QueryResolvers["ownUser"] = async (
  ...params
) => {
  const [, args, context] = params;
  const { db } = context;
  const { accessToken: accessTokenStr } = args;

  const accessTokenObj = await safeAsync(() => parseToken(accessTokenStr));
  if (accessTokenObj.data === undefined) {
    console.error(accessTokenObj.error);

    throw new ResponseError("BAD_REQUEST");
  }

  const accessToken = zAccessTokenClaims.safeParse(accessTokenObj.data.payload);
  if (accessToken.data === undefined) {
    console.error(accessToken.error);

    throw new ResponseError("BAD_REQUEST");
  }

  const user = await safeAsync(() => db.users.getUserById(accessToken.data.id));
  if (user.data === undefined) {
    console.error(user.error);

    throw new ResponseError("BAD_GATEWAY");
  }
  if (user.data === null) {
    console.error("Access token has no associated user");

    throw new ResponseError("NOT_FOUND");
  }

  return user.data;
};
