import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      id
      name
      email
    }
  }
`;

export const GET_LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      description
      imageSrc
      category
      roomCount
      bathroomCount
      guestCount
      location
      price
      userId
    }
  }
`;
