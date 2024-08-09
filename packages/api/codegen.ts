/**
 * pnpm graphql-codegen
 * pnpm graphql-codegen --watch
 */

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/type-defs.ts",
  generates: {
    "./codegen/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        useTypeImports: true,

        /** Relative to generated file */
        contextType: "../src/context#ContextValue",
      },
    },
  },
};

export default config;
