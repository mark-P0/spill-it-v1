import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useAccessTokenQuery } from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";

export function useOwnUserQuery() {
  const { data: accessToken } = useAccessTokenQuery();

  const hasAccessToken = accessToken !== undefined;
  const canQueryOwnUser = hasAccessToken;
  const ownUserQuery = useQuery({
    queryKey: ["own-user", accessToken],
    queryFn: !canQueryOwnUser
      ? skipToken
      : () =>
          gqlFetch({
            document: GetOwnUserDocument,
            variables: { accessToken },
          }),
  });

  return ownUserQuery;
}
