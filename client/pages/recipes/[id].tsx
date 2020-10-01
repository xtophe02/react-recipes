// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { Recipe, Layout } from '../../components';
import { useRouter } from 'next/router';

import { withSession } from '../../src/withSession';
import { GETRECIPE } from '../../src/queries';

const recipePage = ({ isLoggedIn }) => {
  // const { data, loading, error } = useQuery(CURRENTUSER);
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(GETRECIPE, { variables: { id } });
  if (!data) return '...no data';

  return (
    <Layout
      title='Recipe'
      subtitle={!data ? '...no data' : data.getRecipe.name}
      isLoggedIn={isLoggedIn}
    >
      <Recipe data={data.getRecipe} />
    </Layout>
  );
};
export default withSession(recipePage);
