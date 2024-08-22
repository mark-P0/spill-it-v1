import * as users from "./src/tables/users";

const db = {
  users,
};

export type { User } from "./src/schema";
export default db;
