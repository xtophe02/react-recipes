import React from 'react';
import { useRouter } from 'next/router';
import { capitalize } from '../../src/capitalize';
import {
  DELETERECIPE,
  LIKERECIPE,
  USERLOGGEDIN,
  GETRECIPE,
} from '../../src/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Error } from '../index';
import { ButtonBack } from '../Buttons/ButtonBack';

export const Recipe = (data) => {
  // const {author, category, description, instructions, createdDate, likes, id, name} = data
  // const { data, loading, error } = useQuery(GETRECIPE, {var});
  // console.log(data);
  const [deleteRecipe] = useMutation(DELETERECIPE);
  const [likeRecipe] = useMutation(LIKERECIPE, {
    onCompleted: (data) => console.log(data),
  });

  const [like, setLike] = React.useState(
    data.author.favorites.includes(data.id)
  );
  const {
    data: { userLoggedIn },
  } = useQuery(USERLOGGEDIN);
  // const router = useRouter();
  // console.log(data);
  return (
    <>
      <div>
        {Object.keys(data).map((val) => {
          if (val === '__typename' || val === 'id') return null;

          if (val === 'author') {
            return (
              <div key={data[val].id} className='block'>
                <p className='is-size-5'>
                  <strong>{capitalize(val)}</strong>: {data[val].username}
                </p>
              </div>
            );
          }
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
        {data.author.username === userLoggedIn && (
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
        {data.author.username !== userLoggedIn && (
          <button
            className={`button ${like && 'is-info'}`}
            onClick={async () => {
              setLike(!like);
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

        <ButtonBack />
      </div>
    </>
  );
};
