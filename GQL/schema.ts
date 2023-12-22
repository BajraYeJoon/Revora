export const typeDefs = `
  type Query {
    users: [User!]!
    listings: [Listing!]!
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

  type Mutation {
    createListing(input: CreateListingInput!): Listing!
  }
  
  input LocationInput {
    value: String!
    label: String!
    flag: String!
    latlng: [Float!]!
    region: String!
  }

  input CreateListingInput {
    title: String!
    description: String!
    listingImage: String!
    category: String!
    roomCount: Int!
    bathroomCount: Int!
    maxGuests: Int!
    location: LocationInput!
    price: String!
  }
  
  type Listing {
    id: ID!
    title: String!
    description: String!
    listingImage: String!
    category: String!
    roomCount: Int!
    bathroomCount: Int!
    maxGuests: Int!
    location: String!
    price: Int!
    userId: ID!
  }
`;
