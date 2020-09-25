// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { ListRecipies } from '../components/ListRecipies';
import { ALLRECIPIES } from '../src/queries';

export default function AllRecipies() {
  // return <div className={styles.container}>ola</div>;
  const { data, loading, error } = useQuery(ALLRECIPIES);
  if (loading) return '...loading';
  if (error) return '...error';
  if (!data) return '...no data';

  return <ListRecipies recipes={data.getAllRecipes} />;
}
