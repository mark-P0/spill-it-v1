import type { Resolvers } from "@spill-it-v1/gql/codegen/api/types";
import { accessTokenQueryResolver } from "../access-tokens/resolver";
import { ownUserQueryResolver } from "../users/own-user";

export const resolvers: Resolvers = {};

resolvers.Query = {
  accessToken: accessTokenQueryResolver,

  async user(...params) {
    const [, args, context] = params;
    const { db } = context;
    const { id } = args;

    const user = await db.users.getUserById(id);

    return user;
  },
  ownUser: ownUserQueryResolver,
};

resolvers.Mutation = {
  async createUser(...params) {
    const [, args, context] = params;
    const { db } = context;
    const { email, password } = args;

    const newUser = await db.users.createUser(email, password);

    return newUser;
  },
};

resolvers.User = {};
