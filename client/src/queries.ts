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
    }
  }
`;
export const GETRECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($data: SignUpInput) {
    signUp(data: $data) {
      email
      username
    }
  }
`;
export const DELETERECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id) {
      name
    }
  }
`;
export const SIGNIN = gql`
  mutation SignIn($data: SignInInput) {
    signIn(data: $data) {
      email
      username
    }
  }
`;
export const CURRENTUSER = gql`
  query CurrentUser {
    currentUser {
      email
      joinDate
      username
      favorites {
        id
        name
      }
    }
  }
`;
export const GETUSERRECIPES = gql`
  query GetUserRecipes {
    getUserRecipes {
      id
      name
      createdDate
      likes
    }
  }
`;

export const ISLOGGEDIN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
export const USERLOGGEDIN = gql`
  query UserLoggedIn {
    userLoggedIn @client
  }
`;
export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const ADDRECIPE = gql`
  mutation AddRecipe($data: AddRecipeInput) {
    addRecipe(data: $data) {
      name
    }
  }
`;
export const SEARCHRECIPES = gql`
  query SearchRecipes($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      id
      name
      likes
    }
  }
`;
