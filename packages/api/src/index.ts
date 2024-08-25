import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GetUserDocument } from "../codegen/DELETEME/graphql";
import { env } from "./config/env";
import { context } from "./context";
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

console.warn({ GetUserDocument });

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    context,
    listen: { port: env.PORT },
  });

  console.warn({ url });
}

startServer();
