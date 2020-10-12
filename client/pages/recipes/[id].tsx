// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { Recipe, Layout, Error } from '../../components';
import { useRouter } from 'next/router';
import { initializeApollo } from '../../apollo/client';
import { withSession } from '../../src/withSession';
import { GETRECIPE, ALLRECIPIES } from '../../src/queries';

const recipePage = ({ recipe }) => {
  // const { data, loading, error } = useQuery(CURRENTUSER);
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';

  const router = useRouter();
  // const { id } = router.query;

  return (
    <Layout
      title='Recipe'
      // subtitle={!data ? '...no data' : data.getRecipe.name}
    >
      {/* {error && <Error message={error.message} />} */}
      {/* <Recipe data={data.getRecipe} /> */}
      <Recipe {...recipe} />
    </Layout>
  );
};
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const apolloClient = initializeApollo();

  const {
    data: { getAllRecipes },
  } = await apolloClient.query({
    query: ALLRECIPIES,
  });

  const paths = getAllRecipes.map((recipe) => ({
    params: { id: recipe.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  const {
    data: { getRecipe },
  } = await apolloClient.query({
    query: GETRECIPE,
    variables: params,
  });

  return {
    props: {
      // initialApolloState: apolloClient.cache.extract(),
      recipe: getRecipe,
    },
  };
}
export default recipePage;
