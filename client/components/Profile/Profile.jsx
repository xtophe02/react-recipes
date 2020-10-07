import React from 'react';
import { ProfileInfo } from './ProfileInfo';
import { UserRecipes } from './UserRecipes';

export const Profile = ({ currentUser }) => {
  if (!currentUser) {
    return null;
  }
  return (
    <div className='columns'>
      <div className='column'>
        <ProfileInfo {...currentUser} />
      </div>
      <div className='column'>
        <UserRecipes {...currentUser} />
      </div>
    </div>
  );
};
