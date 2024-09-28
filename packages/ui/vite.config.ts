import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { z } from "zod";

const zEnv = z.object({
  UI_PORT: z.coerce.number(),
});

/**
 * - https://vitejs.dev/config/
 * - https://vitejs.dev/config/#using-environment-variables-in-config
 */
const config = defineConfig(({ mode }) => {
  const envRaw = loadEnv(mode, process.cwd(), "");
  const env = zEnv.parse(envRaw);

  return {
    plugins: [react()],
    server: { port: env.UI_PORT },
  };
});

export default config;
