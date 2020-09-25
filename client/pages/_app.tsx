import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import '../styles/styles.scss';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
