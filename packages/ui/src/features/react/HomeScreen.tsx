import { GetOwnUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { skipToken, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAccessTokenQuery } from "../../features/queries/access-tokens";
import { gqlFetch } from "../graphql/gql-fetch";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

function UserDisplay() {
  const { data: accessToken } = useAccessTokenQuery();

  const [isEnabled, setIsEnabled] = useState(false);

  const hasAccessToken = accessToken !== undefined;
  const canQueryOwnUser = hasAccessToken && isEnabled;
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

  const { data: ownUser } = ownUserQuery;

  return (
    <div>
      <button onClick={() => setIsEnabled((isEnabled) => !isEnabled)}>
        {JSON.stringify({ isEnabled })}
      </button>

      <pre>{JSON.stringify(ownUser ?? null)}</pre>
      <pre>{JSON.stringify(ownUserQuery, undefined, 2)}</pre>
    </div>
  );
}

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();

  return (
    <main style={{ backgroundColor: "gray", color: "white", padding: "1rem" }}>
      {accessToken === undefined ? <SignInWithGoogleButton /> : <UserDisplay />}
    </main>
  );
}
