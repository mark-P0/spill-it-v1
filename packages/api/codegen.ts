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
        /**
         * Codegen docs recommend the use of this setting for Apollo, but the Apollo tutorial does not use it
         *
         * - https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#integration-with-apollo-server
         * - https://www.apollographql.com/tutorials/lift-off-part2/08-server-codegen
         */
        useIndexSignature: true,

        /**
         * Matt Pocock's `tsconfig.json` cheatsheet recommends the use of `verbatimModuleSyntax`
         *
         * By default the codegen does not respect this setting, and so it must be manually enabled.
         *
         * - https://www.totaltypescript.com/tsconfig-cheat-sheet#base-options
         */
        useTypeImports: true,

        /**
         * Relative to generated file (the path to which this whole object is assigned above)
         *
         * - https://www.apollographql.com/tutorials/lift-off-part2/08-server-codegen
         */
        ...{
          contextType: "../src/context#ContextValue",

          /**
           * This concept is a bit fuzzy, but it allows objects of "other types" to be returned in place of objects of "GraphQL types",
           * then let the resolvers of those "GraphQL types" to use the objects of "other types" for further processing,
           * i.e. delegating the work to property resolvers
           *
           * - "GraphQL types" → Types defined in the GraphQL schema
           * - "Other types" → Arbitrary types, e.g. database types, model types
           *
           * ---
           *
           * Types can be renamed in case of name conflicts (encountered when type-checking)
           *
           * ---
           *
           * - https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#use-your-model-types-mappers
           * - https://the-guild.dev/blog/better-type-safety-for-resolvers-with-graphql-codegen
           */
          mappers: {
            User: "@spill-it-v1/db#User as DBUser",
          },
        },
      },
    },
  },
};

export default config;
