import React from 'react';
import Hero from './Hero';
import { NavBar } from './NavBar';
import { useQuery } from '@apollo/client';
import { ISLOGGEDIN } from '../../src/queries';

export const Layout = ({ title, subtitle, children }) => {
  const { data } = useQuery(ISLOGGEDIN);
  // let isLoggedIn;
  // React.useEffect(() => {
  //   isLoggedIn = data.isLoggedIn;
  //   console.log(isLoggedIn);
  // }, [data]);
  // console.log(isLoggedIn);
  return (
    <>
      <NavBar isLoggedIn={data && data.isLoggedIn} />
      <Hero title={title} subtitle={subtitle} />
      <div className='container'>{children}</div>
    </>
  );
};
