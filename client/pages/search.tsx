// import styles from '../styles/Home.module.css';
import React from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { Layout, Profile } from '../components/';
import { SEARCHRECIPES } from '../src/queries';
import { withSession } from '../src/withSession';

const search = ({ isLoggedIn }) => {
  const [recipes, setRecipes] = React.useState([]);

  // const { data, loading, error } = useQuery(SEARCHRECIPES, {
  //   variables: { searchTerm: state },
  // });
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const client = useApolloClient();
  const handleChange = async (e) => {
    const { data } = await client.query({
      query: SEARCHRECIPES,
      variables: { searchTerm: e.target.value },
    });

    setRecipes(data.searchRecipes);
  };
  // React.useEffect(() => {
  //   handleChange('');
  // }, []);
  return (
    <Layout title='Search' subtitle='Search any item' isLoggedIn={isLoggedIn}>
      <div className='block'>
        <input
          className='input'
          type='text'
          placeholder='Search Recipes'
          onChange={handleChange}
        ></input>
      </div>

      {recipes.map((recipe) => (
        <p key={recipe.id}>{recipe.name}</p>
      ))}
    </Layout>
  );
};
export default withSession(search);
