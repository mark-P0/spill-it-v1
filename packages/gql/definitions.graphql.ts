/**
 * https://stackoverflow.com/a/59417899
 * - Strictly speaking, a "document" is a a collection of definitions
 * - A "definition" can be an operation (`query`), fragment (`fragment`), type system (`type`), or type system extension (`extend type`)
 * - Type System definitions and extensions are used to form a schema, as in Schema Definition Language (SDL)
 * - Operation and Fragment definitions are called "executable definitions"
 * - GraphQL services receive documents that only contain executable definitions
 * - This also seems to be why the term "document" is used to exclusively refer to "executable definitions" and "schema" to "type system definitions and extensions"
 *
 * ---
 *
 * `GraphQL` comment used for syntax highlighting and Prettier formatting
 *
 * - https://github.com/prettier/prettier/issues/16124
 * - https://github.com/graphql/graphiql/blob/main/packages/vscode-graphql-syntax/tests/__fixtures__/test.ts
 */
export const typeDefs = /* GraphQL */ `
  input AccessTokenQueryInput {
    googleToken: String
  }

  type Query {
    accessToken(input: AccessTokenQueryInput!): String!

    user(id: Int!): User
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
  }

  type User {
    id: String!
    email: String!
  }

  query GetUser($userId: Int!) {
    user(id: $userId) {
      email
      id
    }
  }

  query GetAccessToken($input: AccessTokenQueryInput!) {
    accessToken(input: $input)
  }
`;
