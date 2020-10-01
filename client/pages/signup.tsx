import React from 'react';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { Layout, SignUp, Error } from '../components';
import { isLoggedInVar, userLoggedInVar } from '../apollo/cache';
import { SIGNUP } from '../src/queries';

const initValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signup = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [state, setState] = React.useState(initValues);
  const [signUp, { loading, error }] = useMutation(SIGNUP, {
    onCompleted: ({ signUp }) => {
      client.resetStore();
      localStorage.setItem('email', signUp.email as string);
      localStorage.setItem('username', signUp.username as string);
      isLoggedInVar(true);
      userLoggedInVar(signUp.username);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const { username, email, password, confirmPassword } = state;
    const isInvalid =
      !username || !email || !password! || password !== confirmPassword;

    return isInvalid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password } = state;
      await signUp({ variables: { data: { username, email, password } } });
      setState(initValues);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title='Sign Up' subtitle='Create your crendetials'>
      {error && <Error message={error.message} />}
      <form onSubmit={handleSubmit}>
        <SignUp
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

export default signup;
