import { useAccessTokenQuery } from "../../features/queries/access-tokens";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";

export function HomeScreen() {
  const { data: accessToken } = useAccessTokenQuery();

  return (
    <main>
      {accessToken === undefined ? (
        <SignInWithGoogleButton />
      ) : (
        <pre>{accessToken}</pre>
      )}
    </main>
  );
}
