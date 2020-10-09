// import styles from '../styles/Home.module.css';
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Layout } from '../components/';
import { SEARCHRECIPES } from '../src/queries';
import Link from 'next/link';

const search = () => {
  React.useEffect(() => {
    setState(sessionStorage.getItem('searchItem') || '');
    setRecipes(JSON.parse(sessionStorage.getItem('recipes')));
  }, []);
  const [recipes, setRecipes] = React.useState([]);
  const [state, setState] = React.useState('');

  // const { data, loading, error } = useQuery(SEARCHRECIPES, {
  //   variables: { searchTerm: state },
  // });
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const client = useApolloClient();
  const handleChange = async (e) => {
    const value = e.target.value;
    setState(value);
    const { data } = await client.query({
      query: SEARCHRECIPES,
      variables: { searchTerm: value },
    });
    sessionStorage.setItem('searchItem', value);
    sessionStorage.setItem('recipes', JSON.stringify(data.searchRecipes));

    setRecipes(data.searchRecipes);
  };

  return (
    <Layout title='Search' subtitle='Search any item'>
      <div className='block'>
        <input
          className='input'
          type='text'
          value={state}
          placeholder='Search Recipes'
          onChange={handleChange}
        ></input>
      </div>
      <div className='columns'>
        <div className='column'></div>
        <div className='column is-6'>
          {recipes &&
            recipes.map((recipe) => (
              <div className='box level is-size-5' key={recipe.id}>
                <div className='level-left'>
                  <Link href={`recipes/${recipe.id}`}>
                    <a className='level-item'>{recipe.name}</a>
                  </Link>
                </div>
                <div className='level-right'>
                  <p className='level-item'>
                    <i className='far fa-thumbs-up'></i>
                    {recipe.likes}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className='column'></div>
      </div>
    </Layout>
  );
};
export default search;
