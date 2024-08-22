/**
 * `GraphQL` comment used for syntax highlighting and Prettier formatting
 *
 * - https://github.com/prettier/prettier/issues/16124
 * - https://github.com/graphql/graphiql/blob/main/packages/vscode-graphql-syntax/tests/__fixtures__/test.ts
 */
export const typeDefs = /* GraphQL */ `
  type Query {
    user(id: Int!): User
  }

  type User {
    id: String!
    email: String!
  }
`;
