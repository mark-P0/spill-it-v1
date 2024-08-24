import { z } from "zod";
import { db } from "../db";
import { UsersTable } from "../schema";

export async function getUserById(id: number) {
  const users = await db.query.UsersTable.findMany({
    where: (UsersTable, { eq }) => eq(UsersTable.id, id),
  });
  if (users.length > 1) {
    throw new Error("Multiple users for an ID...?");
  }

  const user = users[0] ?? null;

  return user;
}

export async function createUser(possibleEmail: string, password: string) {
  const { data: email } = z.string().email().safeParse(possibleEmail);
  if (email === undefined) {
    throw new Error("Invalid new user email");
  }

  const newUsers = await db
    .insert(UsersTable)
    .values({ email, password })
    .returning();
  if (newUsers.length > 1) {
    throw new Error("Multiple users created...?");
  }

  const newUser = newUsers[0];
  if (newUser === undefined) {
    throw new Error("Created user does not exist...?");
  }

  return newUser;
}
