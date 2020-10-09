import { gql } from '@apollo/client';
import { Recipe } from '../components';

export const HELLO = gql`
  query {
    hello
  }
`;
export const FRAGMENT_RECIPE = gql`
  fragment NewRecipe on Recipe {
    id
    name
  }
`;

export const ALLRECIPIES = gql`
  query {
    getAllRecipes {
      ...NewRecipe
      category
      username
    }
  }
  ${FRAGMENT_RECIPE}
`;

export const GETRECIPE = gql`
  query GetRecipe($id: ID!) {
    getRecipe(id: $id) {
      ...NewRecipe
      category
      description
      instructions
      createdDate
      likes
      username
    }
  }
  ${FRAGMENT_RECIPE}
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
      id
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
// export const GETUSERRECIPES = gql`
//   query GetUserRecipes {
//     getUserRecipes {
//       id
//       name
//       createdDate
//       likes
//     }
//   }
// `;

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
export const LIKERECIPE = gql`
  mutation LikeRecipe($id: ID!) {
    likeRecipe(id: $id) {
      id
      name
    }
  }
`;

export const ADDRECIPE = gql`
  mutation AddRecipe($data: AddRecipeInput) {
    addRecipe(data: $data) {
      ...NewRecipe
    }
  }
  ${FRAGMENT_RECIPE}
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
