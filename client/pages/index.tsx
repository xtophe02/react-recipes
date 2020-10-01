// import styles from '../styles/Home.module.css';

import { useQuery, gql } from '@apollo/client';
import { ALLRECIPIES, USERLOGGEDIN } from '../src/queries';
import Link from 'next/link';
import { Layout, ListRecipies } from '../components';
import { initializeApollo } from '../apollo/client';
import { withSession } from '../src/withSession';

const Home = ({ isLoggedIn }) => {
  // return <div className={styles.container}>ola</div>;
  // const { data } = useQuery(ISLOGGEDIN);
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const { data } = useQuery(USERLOGGEDIN);

  return (
    <Layout
      title={`Welcome ${data && data.userLoggedIn}`}
      subtitle='All Recipies'
      isLoggedIn={isLoggedIn}
    >
      <ListRecipies />
    </Layout>
  );
};

// export async function getServerSideProps({ req, res }) {
//   const apolloClient = initializeApollo(null, req.headers);

//   await apolloClient.query({
//     query: CURRENTUSER,
//     // variables: allPostsQueryVars,
//   });

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract(),
//       teste: 'sss',
//     },
//     // unstable_revalidate: 1,
//   };
// }

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

export default withSession(Home);
