import { useEffect, useState } from "react";
import { gqlFetch } from "./utils/gql-fetch";

export function App() {
  const [res, setRes] = useState<unknown>(null);

  useEffect(() => {
    async function doSomething() {
      const res = await gqlFetch({
        method: "POST",
        query: `
          query GetUser($userId: Int!) {
            user(id: $userId) {
              email
              id
            }
          }
        `,
        variables: { userId: 1 },
      });

      setRes(res);
    }

    doSomething();
  }, []);

  return <main>{JSON.stringify(res)}</main>;
}
