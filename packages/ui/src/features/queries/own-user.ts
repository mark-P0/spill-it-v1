import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import {
  triggerLogoutEvent,
  useAccessTokenQuery,
  useLogoutEvent,
} from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";

export function useOwnUserQuery() {
  const { data: accessToken } = useAccessTokenQuery();

  const hasAccessToken = accessToken !== undefined && accessToken !== null;
  const canQueryOwnUser = hasAccessToken;
  const ownUserQuery = useQuery({
    queryKey: ["own-user", accessToken],
    retryDelay: 500,

    queryFn: !canQueryOwnUser
      ? skipToken
      : () =>
          gqlFetch({
            document: GetOwnUserDocument,
            variables: { accessToken },
          }),
  });

  useLogoutEvent();
  const { status, fetchStatus } = ownUserQuery;
  const isUserNotAvailable = status === "error" && fetchStatus !== "fetching";
  if (isUserNotAvailable) {
    triggerLogoutEvent();
  }

  return ownUserQuery;
}
