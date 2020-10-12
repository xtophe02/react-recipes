import React from 'react';
import Link from 'next/link'
export const ProfileInfo = ({ currentUser }) => {
  const { email, username, joinDate, favorites } = currentUser;
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString('pt-PT');
    const newTime = new Date(date).toLocaleTimeString('pt-PT');
    return `${newDate} at ${newTime}`;
  };
console.log(currentUser)
  return (
    <div>
      <div className='block'>
        <strong>Email: </strong>
        {email}
      </div>
      <div className='block'>
        <strong>Username: </strong>
        {username}
      </div>
      <div className='block'>
        <strong>Join Date: </strong>
        {formatDate(joinDate)}
      </div>
      <div className='block'>
        <strong>Favorites: </strong>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <Link href={`/recipes/${favorite.id}`}>
                <li key={favorite.id}>{favorite.name}</li>
              </Link>
            ))
          ) : (
            <em>No favorites yet. Go ahead and add them!</em>
          )}
        </ul>
      </div>
    </div>
  );
};
