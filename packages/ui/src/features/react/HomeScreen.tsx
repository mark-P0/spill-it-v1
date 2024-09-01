import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  useAccessTokenMutation,
  useAccessTokenQuery,
} from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

function useOwnUser(accessToken?: string) {
  const hasAccessToken = accessToken !== undefined;
  const { data: gqlResp } = useQuery({
    queryKey: ["own-user", accessToken],
    queryFn: !hasAccessToken
      ? skipToken
      : () =>
          gqlFetch({
            document: GetOwnUserDocument,
            variables: { accessToken },
          }),
  });
  console.warn({ gqlResp });

  const accessTokenMutation = useAccessTokenMutation();
  useEffect(() => {
    if (gqlResp?.errors !== undefined) return;

    accessTokenMutation.mutate({ accessToken: undefined });
  }, [gqlResp, accessTokenMutation]);

  const ownUser = gqlResp?.data?.ownUser;

  return ownUser;
}

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();
  const ownUser = useOwnUser(accessToken);

  return (
    <main>
      {accessToken === undefined ? (
        <SignInWithGoogleButton />
      ) : (
        <pre>{JSON.stringify(ownUser)}</pre>
      )}
    </main>
  );
}
