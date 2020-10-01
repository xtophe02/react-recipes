import { useMemo } from 'react';
import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { cache } from './cache';

let apolloClient;

const ssrMode = typeof window === 'undefined';

// const httpLink = createHttpLink({
//   uri: ssrMode
//     ? 'http://react-recipes-backend:4000/graphql'
//     : 'http://localhost:4000/graphql',
//   credentials: 'same-origin',
// });
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = ssrMode ? null : localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
  extend type Query {
    userLoggedIn: String!
  }
`;

function createApolloClient(headers) {
  return new ApolloClient({
    ssrMode,
    link: createHttpLink({
      uri: ssrMode
        ? 'http://react-recipes-backend:4000/graphql'
        : 'http://localhost:4000/graphql',
      credentials: 'include',
      headers: { ...headers },
    }),
    // link: authLink.concat(httpLink),
    cache: ssrMode ? new InMemoryCache() : cache,
    typeDefs,
  });
}

export function initializeApollo(initialState = null, headers = null) {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
