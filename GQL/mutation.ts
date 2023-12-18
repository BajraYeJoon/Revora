import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
      email
    }
  }
`;

export const CREATE_LISTING_MUTATION = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      title
      description
      listingImage
      category
      roomCount
      bathroomCount
      maxGuests
      location
      price
      userId
    }
  }
`;
