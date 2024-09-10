import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  useAccessTokenMutation,
  useAccessTokenQuery,
} from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";

export function useOwnUser() {
  const { data: accessToken } = useAccessTokenQuery();
  const accessTokenMutation = useAccessTokenMutation();

  const hasAccessToken = accessToken !== undefined;
  const canQueryOwnUser = hasAccessToken;
  const { data, error, status, fetchStatus } = useQuery({
    queryKey: ["own-user", accessToken],
    queryFn: !canQueryOwnUser
      ? skipToken
      : () =>
          gqlFetch({
            document: GetOwnUserDocument,
            variables: { accessToken },
          }),

    retry: 2,
  });

  console.warn({ data, error, status, fetchStatus });

  return null;

  const gqlResp = data ?? error ?? null;

  //   useEffect(() => {
  //     console.warn("effect", { gqlResp, error, status, fetchStatus });
  //
  //     return () => {
  //       console.warn("cleanup", { gqlResp, error, status, fetchStatus });
  //     };
  //   });

  //   useEffect(() => {
  //     if (status !== "error") return;
  //
  //     console.warn("effect if error");
  //     accessTokenMutation.mutate({ accessToken: undefined });
  //   }, [status, accessTokenMutation]);

  useEffect(() => {
    const errors = gqlResp?.errors ?? [];
    if (errors.length === 0) return;

    console.warn("effect if error");
  });

  const ownUser = gqlResp?.data?.ownUser ?? null;

  return ownUser;
}
