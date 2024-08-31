/**
 * https://stackoverflow.com/a/59417899
 * - Strictly speaking, a "document" is a a collection of definitions
 * - A "definition" can be an operation (`query`), fragment (`fragment`), type system (`type`), or type system extension (`extend type`)
 * - Type System definitions and extensions are used to form a schema, as in Schema Definition Language (SDL)
 * - Operation and Fragment definitions are called "executable definitions"
 * - GraphQL services receive documents that only contain executable definitions
 * - This also seems to be why the term "document" is used to exclusively refer to "executable definitions" and "schema" to "type system definitions and extensions"
 */

export const typeDefs = /* GraphQL */ `
  type Query {
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
`;
