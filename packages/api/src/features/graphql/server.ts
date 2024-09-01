import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { context } from "@spill-it-v1/gql/context";
import { typeDefs } from "@spill-it-v1/gql/definitions.graphql";
import { env } from "../env";
import { resolvers } from "./resolvers";

export async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: env.PORT },
  });

  console.warn({ url });
}
