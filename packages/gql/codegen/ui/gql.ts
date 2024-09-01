/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  input AccessTokenQueryInput {\n    googleToken: String\n  }\n\n  type Query {\n    accessToken(input: AccessTokenQueryInput!): String!\n\n    user(id: Int!): User\n  }\n\n  type Mutation {\n    createUser(email: String!, password: String!): User!\n  }\n\n  type User {\n    id: String!\n    email: String!\n  }\n\n  query GetUser($userId: Int!) {\n    user(id: $userId) {\n      email\n      id\n    }\n  }\n\n  query GetAccessToken($input: AccessTokenQueryInput!) {\n    accessToken(input: $input)\n  }\n": types.GetUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  input AccessTokenQueryInput {\n    googleToken: String\n  }\n\n  type Query {\n    accessToken(input: AccessTokenQueryInput!): String!\n\n    user(id: Int!): User\n  }\n\n  type Mutation {\n    createUser(email: String!, password: String!): User!\n  }\n\n  type User {\n    id: String!\n    email: String!\n  }\n\n  query GetUser($userId: Int!) {\n    user(id: $userId) {\n      email\n      id\n    }\n  }\n\n  query GetAccessToken($input: AccessTokenQueryInput!) {\n    accessToken(input: $input)\n  }\n"): typeof import('./graphql').GetUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
