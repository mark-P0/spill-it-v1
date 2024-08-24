import { z } from "zod";
import type { Resolvers } from "../codegen/types";
import { ResponseError } from "./utils/response-error";

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
    const { password } = args;

    const possibleEmail = args.email;
    const { data: email } = z.string().email().safeParse(possibleEmail);
    if (email === undefined) {
      throw new ResponseError("BAD_REQUEST", "Invalid email");
    }

    const newUser = await db.users.createUser(email, password);

    return newUser;
  },
};

resolvers.User = {};
