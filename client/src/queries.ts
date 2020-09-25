import { gql } from '@apollo/client';

export const HELLO = gql`
  query {
    hello
  }
`;
export const ALLRECIPIES = gql`
  query {
    getAllRecipes {
      id
      name
      category
      description
      instructions
      createdDate
      likes
    }
  }
`;
