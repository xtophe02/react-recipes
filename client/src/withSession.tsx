import React from 'react';
import { useQuery } from '@apollo/client';

import { ISLOGGEDIN } from './queries';

export const withSession = (Component) => (props) => {
  const { data } = useQuery(ISLOGGEDIN);

  return <Component {...props} isLoggedIn={data ? data.isLoggedIn : null} />;
};
