import { GetUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { useEffect, useState } from "react";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";
import { gqlFetch } from "./utils/gql-fetch";

function useAsync<TData, TError = unknown>(fn: () => Promise<TData>) {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  useEffect(() => {
    fn()
      .then((data) => setData(data))
      .catch((error) => setError(error));
  });

  return { data, error };
}

export function App() {
  const { data: res } = useAsync(() =>
    gqlFetch({
      document: GetUserDocument,
      variables: { userId: 0 },
    })
  );

  return (
    <div>
      <main>{JSON.stringify(res)}</main>
      <SignInWithGoogleButton />
    </div>
  );
}
