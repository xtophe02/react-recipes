import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { Layout, SignIn, Error } from '../components';
import { SIGNIN } from '../src/queries';
import { isLoggedInVar, userLoggedInVar } from '../apollo/cache';
import { withSession } from '../src/withSession';

const initValues = {
  email: 'moreira.christophe@outlook.com',
  password: 'fcportu',
};

const signin = ({ isLoggedIn }) => {
  const router = useRouter();
  if (isLoggedIn) {
    router.push('/');
  }
  const client = useApolloClient();
  const [state, setState] = React.useState(initValues);
  const [signIn, { loading, error }] = useMutation(SIGNIN, {
    onCompleted: ({ signIn }) => {
      client.resetStore();
      localStorage.setItem('email', signIn.email as string);
      localStorage.setItem('username', signIn.username as string);
      isLoggedInVar(true);
      userLoggedInVar(signIn.username);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const { email, password } = state;
    const isInvalid = !email || !password!;
    return isInvalid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = state;
      await signIn({ variables: { data: state } });
      setState(initValues);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title='Sign In' subtitle='Login with your crendetials'>
      {error && <Error message={error.message} />}
      <form onSubmit={handleSubmit}>
        <SignIn
          values={state}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          isValid={validateForm()}
          error={error}
        />
      </form>
    </Layout>
  );
};

export default withSession(signin);
