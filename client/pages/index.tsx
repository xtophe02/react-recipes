// import styles from '../styles/Home.module.css';

import { useQuery, gql } from '@apollo/client';
import { ALLRECIPIES, USERLOGGEDIN } from '../src/queries';
import Link from 'next/link';
import { Layout, ListRecipies } from '../components';
import { initializeApollo } from '../apollo/client';
import { withSession } from '../src/withSession';

const Home = ({ paths }) => {
  // return <div className={styles.container}>ola</div>;
  // const { data } = useQuery(ISLOGGEDIN);
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const { data } = useQuery(USERLOGGEDIN);

  let title;
  React.useEffect(() => {
    title = data.userLoggedIn;
  }, []);

  return (
    <Layout
      // title='Welcome'
      title={data ? `Welcome ${data.userLoggedIn}` : 'Please to sign In'}
      // title={title ? `Welcome ${title}` : 'Please to sign In'}
      subtitle='All Recipies'
    >
      <ListRecipies paths={paths} />
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
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const apolloClient = initializeApollo();

//   const {
//     data: { getAllRecipes },
//   } = await apolloClient.query({
//     query: ALLRECIPIES,
//   });

//   const paths = getAllRecipes.map((recipe) => ({
//     params: { id: recipe.id },
//   }));
//   // console.log(paths);
//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
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

export default Home;
