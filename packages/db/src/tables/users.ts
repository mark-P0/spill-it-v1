import { db } from "../db";

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
