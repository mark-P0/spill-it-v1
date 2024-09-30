import { useAccessTokenQuery } from "../../features/queries/access-tokens";
import { useOwnUserQuery } from "../queries/own-user";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

function UserDisplay() {
  const { data: ownUser } = useOwnUserQuery();

  return <pre>{JSON.stringify(ownUser)}</pre>;
}

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();

  return (
    <main>
      {accessToken === undefined ? <SignInWithGoogleButton /> : <UserDisplay />}
    </main>
  );
}
