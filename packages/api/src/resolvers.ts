import type { Resolvers } from "../codegen/types";

export const resolvers: Resolvers = {};

resolvers.Query = {
  async user(parent, args, context, info) {
    const { db } = context;
    const { id } = args;

    const user = await db.users.getUserById(id);

    return user;
  },
};

resolvers.User = {};
