import React from 'react';
import { useQuery } from '@apollo/client';

import { ALLRECIPIES } from '../../src/queries';
import { RecipeItem } from './RecipeItem';

export const ListRecipies = () => {
  const { data, loading, error } = useQuery(ALLRECIPIES);
  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';

  if (data.getAllRecipes.length <= 0)
    return <p>No Recipes... Please to add a few</p>;

  return (
    <div className='columns is-centered'>
      <div className='column is-8 has-text-centered'>
        <ul>
          {data.getAllRecipes.map((recipe) => (
            <RecipeItem key={recipe.id} {...recipe} />
          ))}
        </ul>
      </div>
    </div>
  );
};
