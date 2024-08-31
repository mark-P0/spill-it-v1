import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "@spill-it-v1/gql/type-defs";
import { env } from "./config/env";
import { context } from "./context";
import { resolvers } from "./resolvers";

console.warn({ typeDefs });

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: env.PORT },
  });

  console.warn({ url });
}

// startServer();
