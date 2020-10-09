import React from 'react';
import { useRouter } from 'next/router';
import { capitalize } from '../../src/capitalize';
import { DELETERECIPE, LIKERECIPE, USERLOGGEDIN } from '../../src/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Error } from '../index';

export const Recipe = ({ data }) => {
  const router = useRouter();
  const [deleteRecipe] = useMutation(DELETERECIPE);
  const [likeRecipe] = useMutation(LIKERECIPE);
  const {
    data: { userLoggedIn },
  } = useQuery(USERLOGGEDIN);

  return (
    <>
      <div>
        {Object.keys(data).map((val) => {
          if (val === '__typename') return null;
          return (
            <div key={val} className='block'>
              <p className='is-size-5'>
                <strong>{capitalize(val)}</strong>: {data[val]}
              </p>
            </div>
          );
        })}
      </div>
      <div className='buttons is-right'>
        {data.username === userLoggedIn && (
          <button
            className='button is-danger'
            onClick={async () => {
              try {
                await deleteRecipe({ variables: { id: data.id } });
                router.back();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
        {data.username !== userLoggedIn && (
          <button
            className='button is-info'
            onClick={async () => {
              try {
                await likeRecipe({ variables: { id: data.id } });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <span className='icon '>
              <i className='far fa-thumbs-up'></i>
            </span>
          </button>
        )}

        <button className='button' onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </>
  );
};
