import { useAccessTokenQuery } from "../../features/queries/access-tokens";
import { useOwnUserQuery } from "../queries/own-user";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

function UserDisplay() {
  const { data: ownUser } = useOwnUserQuery();

  return <pre>{JSON.stringify(ownUser)}</pre>;
}

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();

  const hasAccessToken = accessToken !== undefined && accessToken !== null;

  return (
    <main>
      {!hasAccessToken ? <SignInWithGoogleButton /> : <UserDisplay />}
    </main>
  );
}
