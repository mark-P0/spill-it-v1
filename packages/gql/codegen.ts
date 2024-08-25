import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./documents.graphql",
  // documents: ["src/**/*.ts"],
  // ignoreNoDocuments: true,
  generates: {
    "./codegen/ui/": {
      preset: "client",
      documents: "./documents.graphql",
      config: {
        useTypeImports: true,
        documentMode: "string",
      },
    },
    // "./schema.graphql": {
    //   plugins: ["schema-ast"],
    //   config: {
    //     includeDirectives: true,
    //   },
    // },
  },
};

export default config;
