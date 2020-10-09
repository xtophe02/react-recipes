import React from 'react';
import { ProfileInfo } from './ProfileInfo';
import { UserRecipes } from './UserRecipes';
import { useQuery } from '@apollo/client';
import { CURRENTUSER } from '../../src/queries';

export const Profile = () => {
  const { data, loading, error } = useQuery(CURRENTUSER);
  if (loading) return '...loading';
  if (error) return '...error';
  if (!data) return '...no data';
  // let username;
  // React.useEffect(() => {
  //   username = data.currentUser.username;
  // }, []);
  return (
    <div className='columns'>
      <div className='column'>
        <ProfileInfo {...data} />
      </div>
      <div className='column'>
        <UserRecipes
          username={data && data.currentUser && data.currentUser.username}
        />
      </div>
    </div>
  );
};
