import { GetAccessTokenDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { useEffect, useRef } from "react";
import { env } from "./config/env";
import { useAccessTokenMutation } from "./features/queries/access-tokens";
import { gqlFetch } from "./utils/gql-fetch";

async function exchangeGoogleTokenForAccessToken(googleToken: string) {
  const res = await gqlFetch({
    document: GetAccessTokenDocument,
    variables: { input: { googleToken } },
  });

  const accessToken = res.data?.accessToken;
  if (accessToken === undefined) {
    throw new Error("Failed exchanging Google token for access token");
  }

  return accessToken;
}

// TODO Exchange google token for access token
// TODO Create React Query mutation for storing access token
/**
 * - https://developers.google.com/identity/gsi/web/guides/display-button#button_rendering
 * - https://stackoverflow.com/a/72228707
 * - https://www.npmjs.com/package/@types/gsi
 */
export function SignInWithGoogleButton() {
  const accessTokenMutation = useAccessTokenMutation();

  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const div = divRef.current;
    if (div === null) return;

    google.accounts.id.initialize({
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      async callback(res) {
        const { credential } = res;

        const accessToken = await exchangeGoogleTokenForAccessToken(credential);

        accessTokenMutation.mutate({ accessToken });

        console.warn({ credential, accessToken });
      },
    });

    google.accounts.id.renderButton(div, {
      type: "standard",
      shape: "pill",
      theme: "outline",
      text: "continue_with",
      size: "large",
      logo_alignment: "center",
    });

    /**
     * One-Tap dialog
     *
     * Only visible on HTTPS
     */
    // google.accounts.id.prompt();
  }, [accessTokenMutation]);

  return <div ref={divRef}></div>;
}
