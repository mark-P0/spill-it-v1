import { TypedDocumentString } from "@spill-it-v1/gql/codegen/ui/graphql";
import { z } from "zod";
import { env } from "../env";

const zGraphQLResponse = z.object({
  data: z.unknown().optional(),
  errors: z.unknown().optional(),
});

export class GraphQLResponseError extends Error {
  constructor(public errors: unknown) {
    super("GraphQL responded with error(s)");
  }
}

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
}) {
  const {
    document,
    variables,
    method = "POST",
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
    const resJson = await res.json();

    const { data: resGraphQL } = zGraphQLResponse.safeParse(resJson);
    if (resGraphQL === undefined) {
      throw new Error("Response shape is non-GraphQL");
    }

    const { data, errors } = resGraphQL;
    if (errors !== undefined) {
      throw new GraphQLResponseError(errors);
    }
    if (data === undefined) {
      throw new Error("GraphQL responded with unexpected shape");
    }

    const result = data as TResult;

    return result;
  }

  if (method === "POST") {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const resJson = await res.json();

    const { data: resGraphQL } = zGraphQLResponse.safeParse(resJson);
    if (resGraphQL === undefined) {
      throw new Error("Response shape is non-GraphQL");
    }

    const { data, errors } = resGraphQL;
    if (errors !== undefined) {
      throw new GraphQLResponseError(errors);
    }
    if (data === undefined) {
      throw new Error("GraphQL responded with unexpected shape");
    }

    const result = data as TResult;

    return result;
  }

  method satisfies never;
  return method;
}
