import React from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GETUSERRECIPES } from '../../src/queries';

export const UserRecipes = ({ username }) => {
  const { data, loading, error } = useQuery(GETUSERRECIPES);
  if (loading) {
    <p>loading...</p>;
  }
  if (error) {
    <p>error...</p>;
  }
  if (!data) {
    <p>no data</p>;
  }

  return (
    <>
      <h1 className='title is-6'>{username} Recipes</h1>
      {data && data.getUserRecipes.length <= 0 ? (
        <em>no recipes found</em>
      ) : (
        data &&
        data.getUserRecipes.map((recipe) => (
          <Link href={`/recipes/${recipe.id}`}>
            <p key={recipe.id}>
              <button className='button is-white '>
                {recipe.name}--
                <em> created: {recipe.createdDate.split('T')[0]}</em>
              </button>
            </p>
          </Link>
        ))
      )}
    </>
  );
};
