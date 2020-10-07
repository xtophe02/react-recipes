import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ISLOGGEDIN } from './queries';

export const withSession = (Component) => (props) => {
  const router = useRouter();
  const { data } = useQuery(ISLOGGEDIN);

  React.useEffect(() => {
    if (!data.isLoggedIn) {
      router.push('/');
    }
  }, []);

  return <Component {...props} isLoggedIn={data ? data.isLoggedIn : null} />;
};
