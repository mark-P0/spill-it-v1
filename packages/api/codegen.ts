/**
 * pnpm graphql-codegen
 * pnpm graphql-codegen --watch
 */

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/type-defs.ts",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        useTypeImports: true,
        contextType: "./context#ContextValue",
      },
    },
  },
};

export default config;
