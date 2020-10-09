import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Link from 'next/link';
import {
  GETUSERRECIPES,
  DELETERECIPE,
  ALLRECIPIES,
  CURRENTUSER,
} from '../../src/queries';

export const UserRecipes = ({ username }) => {
  const { data, loading, error } = useQuery(ALLRECIPIES);
  // if (loading) {
  //   <p>loading...</p>;
  // }
  // if (error) {
  //   <p>error...</p>;
  // }
  // if (!data) {
  //   <p>no data</p>;
  // }

  const [deleteRecipe] = useMutation(DELETERECIPE, {
    update(cache, { data }) {
      // cache.writeQuery({
      //   query: DELETERECIPE,
      //   variables: { id: data.deleteRecipe.id },
      //   data,
      // });
      cache.modify({
        id: cache.identify(data.deleteRecipe),
        fields: {
          getAllRecipes(existingRecipesRefs, { readField }) {
            return existingRecipesRefs.filter(
              (recepieRef) =>
                data.deleteRecipe.id !== readField('id', recepieRef)
            );
          },
        },
      });
    },
    refetchQueries: [
      {
        query: ALLRECIPIES,
      },
      {
        query: CURRENTUSER,
      },
    ],
  });
  return (
    <>
      <h1 className='title is-6'>{username} Recipes</h1>
      {data && data.getAllRecipes.length <= 0 ? (
        <em>no recipes found</em>
      ) : (
        data &&
        data.getAllRecipes.map((recipe) => {
          if (recipe.username === username) {
            return (
              <div key={recipe.id} className='media'>
                <Link href={`/recipes/${recipe.id}`}>
                  <div className='media-content'>
                    <a className='has-text-primary'>{recipe.name}</a>
                  </div>
                </Link>
                <div className='media-right'>
                  <a
                    className='delete'
                    onClick={async () => {
                      try {
                        await deleteRecipe({ variables: { id: recipe.id } });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  ></a>
                </div>
              </div>
            );
          }
        })
      )}
    </>
  );
};
