import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    getAllRecipes: [Recipe]
  }
  type Mutation {
    addRecipe(data: AddRecipeInput): Recipe
  }
  input AddRecipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    likes: Int
  }
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    favorites: [Recipe]
    joinDate: Date
  }
  type Recipe {
    id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: Date
    likes: Int
    username: User
  }
  scalar Date
`;
