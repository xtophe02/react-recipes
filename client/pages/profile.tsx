// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { Layout, Profile } from '../components/';
import { ALLRECIPIES } from '../src/queries';
import { withSession } from '../src/withSession';
import { initializeApollo } from '../apollo/client';

const profile = () => {
  return (
    <Layout title='Profile' subtitle='username'>
      <Profile />
    </Layout>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALLRECIPIES,
    // variables: allPostsQueryVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
export default withSession(profile);
