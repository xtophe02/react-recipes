import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    getAllRecipes: [Recipe]
    getRecipe(id: ID!): Recipe
    currentUser: User
    searchRecipes(searchTerm: String): [Recipe]
    getUserRecipes: [Recipe]
  }
  type Mutation {
    addRecipe(data: AddRecipeInput): Recipe
    deleteRecipe(id: ID!): Recipe
    signUp(data: SignUpInput): User
    signIn(data: SignInInput): User
    logout: Boolean!
    likeRecipe(id: ID!): Recipe
  }
  input AddRecipeInput {
    name: String!
    category: String!
    description: String!
    instructions: String!
    likes: Int
  }
  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }
  input SignInInput {
    email: String!
    password: String!
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
    username: String
  }
  type Token {
    token: String
  }
  scalar Date
`;
