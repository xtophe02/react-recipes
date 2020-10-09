import { InMemoryCache } from '@apollo/client';
const ssrMode = typeof window === 'undefined';
// import { persistCache } from "apollo-cache-persist";

export const cache: InMemoryCache = new InMemoryCache({
  // addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedInVar();
        },
        userLoggedIn() {
          return userLoggedInVar();
        },
        getAllRecipes: {
          merge: false,
        },
        // getAllRecipes: {
        //   // keyArgs: false,
        //   merge(existing: any[], incoming: any[], { readField, mergeObjects }) {
        //     const merged: any[] = existing ? existing.slice(0) : [];
        //     const recipeToIndex: Record<string, number> = Object.create(null);
        //     if (existing) {
        //       existing.forEach((recipe, index) => {
        //         recipeToIndex[readField<string>('name', recipe)] = index;
        //       });
        //     }
        //     console.log('recipeToIndex', recipeToIndex);
        //     incoming.forEach((recipe) => {
        //       const name = readField<string>('name', recipe);
        //       const index = recipeToIndex[name];
        //       console.log('index', index);
        //       if (typeof index === 'number') {
        //         // Merge the new author data with the existing author data.
        //         merged[index] = mergeObjects(merged[index], recipe);
        //       } else {
        //         // First time we've seen this author in this array.
        //         recipeToIndex[name] = merged.length;
        //         merged.push(recipe);
        //       }
        //     });
        //     return merged;
        //   },
        // },
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
