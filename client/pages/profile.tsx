// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { Layout, Profile } from '../components/';
import { CURRENTUSER } from '../src/queries';
import { withSession } from '../src/withSession';

const profile = ({ isLoggedIn }) => {
  const { data, loading, error } = useQuery(CURRENTUSER);
  // if (loading) return '...loading';
  // if (error) return '...error';
  if (!data) return '...no data';

  return (
    <Layout
      title='Profile'
      subtitle={loading ? '...loading' : data.currentUser.username}
      isLoggedIn={isLoggedIn}
    >
      <Profile />
    </Layout>
  );
};
export default withSession(profile);
