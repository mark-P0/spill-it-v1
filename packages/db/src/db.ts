import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./config/env";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: env.POSTGRES_CONNECTION_STRING,
});

export const db = drizzle(pool, { schema });
