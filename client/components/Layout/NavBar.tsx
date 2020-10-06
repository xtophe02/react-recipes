import React from 'react';
import Link from 'next/link';
import { useMutation, useApolloClient } from '@apollo/client';
import { LOGOUT } from '../../src/queries';
import { isLoggedInVar, userLoggedInVar } from '../../apollo/cache';

const NavLink = ({ href, className, name }) => (
  <Link href={href}>
    <a className={className}>{name}</a>
  </Link>
);

export const NavBar = ({ isLoggedIn }) => {
  const client = useApolloClient();
  const [logout] = useMutation(LOGOUT);
  return (
    <nav
      className='navbar is-light is-fixed-top'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='navbar-brand'>
        <a className='navbar-item' href='https://bulma.io'>
          <img
            src='https://bulma.io/images/bulma-logo.png'
            width='112'
            height='28'
          />
        </a>

        <a
          role='button'
          className='navbar-burger burger'
          aria-label='menu'
          aria-expanded='false'
          data-target='navbarBasicExample'
        >
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
          <span aria-hidden='true'></span>
        </a>
      </div>

      <div id='navbarBasicExample' className='navbar-menu'>
        <div className='navbar-start'>
          <NavLink href='/' className='navbar-item' name='Home' />
          <NavLink href='/search' className='navbar-item' name='Search' />
          {isLoggedIn && (
            <>
              <NavLink
                href='/add-recipe'
                className='navbar-item'
                name='Add Recipe'
              />
              <NavLink href='/profile' className='navbar-item' name='Profile' />
            </>
          )}
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              {!isLoggedIn ? (
                <>
                  <NavLink
                    href='/signup'
                    className='button is-primary'
                    name='Sign Up'
                  />

                  <NavLink
                    href='/signin'
                    className='button is-link is-outlined'
                    name='Log In'
                  />
                </>
              ) : (
                <a
                  className='button is-danger is-outlined'
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    localStorage.removeItem('email');
                    localStorage.removeItem('username');
                    isLoggedInVar(false);
                    userLoggedInVar('');
                    client.resetStore();
                  }}
                >
                  Log Out
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
