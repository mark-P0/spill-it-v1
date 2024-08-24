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

resolvers.Mutation = {
  async createUser(parent, args, context, info) {
    const { db } = context;
    const { email, password } = args;

    const newUser = await db.users.createUser(email, password);

    return newUser;
  },
};

resolvers.User = {};
