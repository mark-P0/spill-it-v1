import { pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
  deletedAt: timestamp("deleted_at"),
});
