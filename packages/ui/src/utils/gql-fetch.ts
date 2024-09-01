import { TypedDocumentString } from "@spill-it-v1/gql/codegen/ui/graphql";
import { env } from "../features/env";

type GraphQLResponse<TData = unknown, TError = unknown> =
  | {
      data: TData;
      errors?: never;
    }
  | {
      data?: never;
      errors: TError[];
    };

/**
 * Heavily inspired by `graphql-request`
 *
 * https://www.npmjs.com/package/graphql-request
 *
 * ---
 *
 * - https://graphql.org/learn/serving-over-http/
 * - https://www.apollographql.com/docs/apollo-server/workflow/requests
 * - https://the-guild.dev/graphql/codegen/docs/guides/vanilla-typescript
 */
export async function gqlFetch<TResult, TVariables>(args: {
  document: TypedDocumentString<TResult, TVariables>;
  variables: TVariables;
  url?: string;
  method?: "GET" | "POST";
}): Promise<GraphQLResponse<TResult>> {
  const {
    document,
    variables,
    method = "GET",
    url = env.VITE_GRAPHQL_SERVER_URL,
  } = args;
  const query = document.toString();

  if (method === "GET") {
    const urlObj = new URL(url);
    urlObj.searchParams.set("query", query);
    urlObj.searchParams.set("variables", JSON.stringify(variables));

    const res = await fetch(urlObj, {
      headers: { "Content-Type": "application/json" }, // Used for mitigating CSRF
    });
    const gqlResponse = await res.json();

    return gqlResponse;
  }

  if (method === "POST") {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const gqlResponse = await res.json();

    return gqlResponse;
  }

  method satisfies never;
  return method;
}
