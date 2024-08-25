import { GetUserDocument } from "@spill-it-v1/graphql/codegen/ui/graphql";
import { useEffect, useState } from "react";
import { gqlFetch } from "./utils/gql-fetch";

export function App() {
  const [res, setRes] = useState<unknown>(null);

  useEffect(() => {
    async function doSomething() {
      const res = await gqlFetch({
        document: GetUserDocument,
        variables: { userId: 1 },
      });

      setRes(res);
    }

    doSomething();
  }, []);

  return <main>{JSON.stringify(res)}</main>;
}
