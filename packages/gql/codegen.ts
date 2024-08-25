import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./definitions.graphql",
  ignoreNoDocuments: true,

  generates: {
    /** https://the-guild.dev/graphql/codegen/docs/guides/vanilla-typescript */
    "./codegen/ui/": {
      preset: "client",
      documents: "./definitions.graphql",
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
