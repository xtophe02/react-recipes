// import styles from '../styles/Home.module.css';
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Layout, AddRecipe, Error } from '../components/';
import { withSession } from '../src/withSession';
import { ADDRECIPE, GETRECIPE, FRAGMENT_RECIPE } from '../src/queries';
import { useRouter } from 'next/router';

const initValues = {
  name: '',
  category: 'breakfast',
  description: '',
  instructions: '',
};

const addRecipe = ({ isLoggedIn }) => {
  const router = useRouter();
  if (!isLoggedIn && typeof window !== 'undefined') {
    router.push('/');
  }
  const [state, setState] = React.useState(initValues);
  const [addRecipe, { loading, error }] = useMutation(ADDRECIPE, {
    update(cache, { data: { addRecipe } }) {
      // cache.writeQuery({
      //   query: GETRECIPE,
      //   variables: { id: addRecipe.id },
      //   data: addRecipe,
      // });
      cache.modify({
        fields: {
          getAllRecipes(existingRecipiesRefs = [], { readField }) {
            const newRecipeRef = cache.writeFragment({
              data: addRecipe,
              fragment: FRAGMENT_RECIPE,
            });
            // const newRecipeRef = cache.writeQuery({
            //   query: GETRECIPE,
            //   variables: { id: addRecipe.id },
            //   data: addRecipe,
            // });

            return [...existingRecipiesRefs, newRecipeRef];
          },
        },
      });
    },
  });

  // if (loading) return '...loading';
  // if (error) return '...error';
  // if (!data) return '...no data';
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };
  const isValid = () => {
    const { name, category, description, instructions } = state;
    const isInvalid =
      !name || !category || !description! || !instructions || !instructions;

    return isInvalid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRecipe({ variables: { data: state } });
      setState(initValues);
      router.push('/');
    } catch (error) {}
  };
  return (
    <Layout title='Recipe' subtitle='Add Recipe' isLoggedIn={isLoggedIn}>
      {error && <Error message={error.message} />}
      <form onSubmit={handleSubmit}>
        <AddRecipe
          values={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isValid={isValid()}
        />
      </form>
    </Layout>
  );
};
export default withSession(addRecipe);
