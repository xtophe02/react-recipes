// import styles from '../styles/Home.module.css';

import { gql, useQuery } from '@apollo/client';
import { HELLO } from '../src/queries';
import Link from 'next/link';

export default function Home() {
  // return <div className={styles.container}>ola</div>;
  const { data, loading, error } = useQuery(HELLO);
  if (loading) return '...loading';
  if (error) return '...error';
  if (!data) return '...no data';

  return (
    <>
      <p>{data.hello}</p>
      <Link href='/all-recipies'>
        <a>All Recipies</a>
      </Link>
    </>
  );
}
