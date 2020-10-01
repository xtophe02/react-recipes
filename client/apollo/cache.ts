import { InMemoryCache } from '@apollo/client';
const ssrMode = typeof window === 'undefined';
// import { persistCache } from "apollo-cache-persist";

export const cache: InMemoryCache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        userLoggedIn() {
          return userLoggedInVar();
        },
      },
    },
  },
});
// if (!ssrMode) {
//   persistCache({
//     cache,
//     storage: window.localStorage,
//   });
// }
export const userLoggedInVar = ssrMode
  ? null
  : cache.makeVar<string>(localStorage.getItem('username'));
export const isLoggedInVar = ssrMode
  ? null
  : cache.makeVar<boolean>(!!localStorage.getItem('email'));
