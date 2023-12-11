export const typeDefs = `
  type Query {
    users: [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
