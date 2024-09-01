import { GetUserDocument } from "@spill-it-v1/gql/codegen/ui/graphql";
import { useAsync } from "./features/react/use-async";
import { SignInWithGoogleButton } from "./SignInWithGoogleButton";
import { gqlFetch } from "./utils/gql-fetch";

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
