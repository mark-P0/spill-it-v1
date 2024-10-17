import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import {
  useAccessTokenMutation,
  useAccessTokenQuery,
} from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";

export function useOwnUserQuery() {
  const { data: accessToken } = useAccessTokenQuery();
  const accessTokenMutation = useAccessTokenMutation();

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

  const isUserNotAvailable =
    ownUserQuery.status === "error" && ownUserQuery.fetchStatus !== "fetching";
  const isLogoutOngoing = accessTokenMutation.status === "pending";

  if (isUserNotAvailable && !isLogoutOngoing) {
    accessTokenMutation.mutate({ action: "remove" });
  }

  return ownUserQuery;
}
