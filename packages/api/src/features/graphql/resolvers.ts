import type { Resolvers } from "@spill-it-v1/gql/codegen/api/types";
import { accessTokenQueryResolver } from "../access-tokens/resolver";

export const resolvers: Resolvers = {};

resolvers.Query = {
  accessToken: accessTokenQueryResolver,

  async user(parent, args, context, info) {
    const { db } = context;
    const { id } = args;

    const user = await db.users.getUserById(id);

    return user;
  },
};

resolvers.Mutation = {
  async createUser(parent, args, context, info) {
    const { db } = context;
    const { email, password } = args;

    const newUser = await db.users.createUser(email, password);

    return newUser;
  },
};

resolvers.User = {};
