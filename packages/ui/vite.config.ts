import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { z } from "zod";

const zEnv = z.object({
  UI_PORT: z.coerce.number(),
});
const env = zEnv.parse(process.env);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: env.UI_PORT },
});
