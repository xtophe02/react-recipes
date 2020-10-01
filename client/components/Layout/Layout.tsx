import React from 'react';
import Hero from './Hero';
import { NavBar } from './NavBar';

export const Layout = ({ title, subtitle, children, isLoggedIn }) => {
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Hero title={title} subtitle={subtitle} />
      <div className='container'>{children}</div>
    </>
  );
};
