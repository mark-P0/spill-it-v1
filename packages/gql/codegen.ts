import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./definitions.graphql.ts",
  ignoreNoDocuments: true,

  generates: {
    /** https://the-guild.dev/graphql/codegen/docs/guides/vanilla-typescript */
    "./codegen/ui/": {
      preset: "client",
      documents: "./definitions.graphql.ts",
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
