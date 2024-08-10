/**
 * While local Compose is running,
 *
 * docker exec -it spill-it-v1-api-1 pnpm --filter=db exec drizzle-kit push
 *
 * https://orm.drizzle.team/kit-docs/commands#prototype--push
 * https://orm.drizzle.team/kit-docs/commands#prototype--push
 */

import { defineConfig } from "drizzle-kit";
import { env } from "./src/config/env";

const config = defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: env.POSTGRES_CONNECTION_STRING,
  },
});

export default config;
