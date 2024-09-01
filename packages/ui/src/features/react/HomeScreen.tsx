import { SignInWithGoogleButton } from "../../SignInWithGoogleButton";
import { useAccessTokenQuery } from "../../features/queries/access-tokens";

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
