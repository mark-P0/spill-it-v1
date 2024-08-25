type GraphQLRequestArgs = {
  /** According to specs */
  query: string;
  operationName?: string;
  variables?: Record<string, string | number | boolean | null>;
} & {
  /** Additional args */
  url?: string;
  method?: "GET" | "POST";
};

type GraphQLResponse =
  | {
      data: Record<string, unknown>;
      errors: never;
    }
  | {
      data: never;
      errors: unknown[];
    };

// TODO Create class encapsulation?
export class GraphQLQuery {
  constructor(public args: GraphQLRequestArgs) {}

  async fetch() {
    // const {} = this.args;
  }
}
/**
 * Workflow:
 * - Write query in Apollo Sandbox
 * - Copy-paste query (and variables) into client code as string
 * - Pass through fetcher
 *
 * ---
 *
 * - https://graphql.org/learn/serving-over-http/
 * - https://www.apollographql.com/docs/apollo-server/workflow/requests
 * - https://the-guild.dev/graphql/codegen/docs/guides/vanilla-typescript
 */
export async function gqlFetch(
  args: GraphQLRequestArgs
): Promise<GraphQLResponse> {
  const {
    query,
    operationName,
    variables,
    method = "GET",
    url = "http://localhost:4000",
  } = args;

  if (method === "GET") {
    const urlObj = new URL(url);
    urlObj.searchParams.set("query", query);
    if (operationName !== undefined) {
      urlObj.searchParams.set("operationName", operationName);
    }
    urlObj.searchParams.set("variables", JSON.stringify(variables));

    const res = await fetch(urlObj, {
      headers: { "Content-Type": "application/json" },
    });
    const gqlResponse = await res.json();

    return gqlResponse;
  }

  if (method === "POST") {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, operationName, variables }),
    });
    const gqlResponse = await res.json();

    return gqlResponse;
  }

  method satisfies never;
  return method;
}
