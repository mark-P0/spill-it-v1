import {
  useAccessTokenMutation,
  useAccessTokenQuery,
} from "../../features/queries/access-tokens";
import { useOwnUser } from "../queries/own-user";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

function UserDisplay() {
  const ownUser = useOwnUser();

  return <pre>{JSON.stringify(ownUser)}</pre>;
}

function UserDisplay2() {
  const { data: accessToken } = useAccessTokenQuery();
  const accessTokenMutation = useAccessTokenMutation();

  function logAccessToken() {
    console.warn({ accessToken });
  }

  function removeAccessToken() {
    console.warn("Removing access token...");
    accessTokenMutation.mutate({ accessToken: undefined });
    console.warn("Access token removed.");
  }

  return (
    <div>
      <button onClick={logAccessToken}>Log access token</button>
      <button onClick={removeAccessToken}>Remove access token</button>
    </div>
  );
}

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();

  const hasAccessToken = accessToken !== undefined;

  return (
    <main>
      {!hasAccessToken && <SignInWithGoogleButton />}

      {hasAccessToken && <UserDisplay />}
      {/* {hasAccessToken && <UserDisplay2 />} */}
    </main>
  );
}
