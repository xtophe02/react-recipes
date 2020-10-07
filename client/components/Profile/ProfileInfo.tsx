import React from 'react';

export const ProfileInfo = ({ email, username, joinDate, favorites }) => {
  const formatDate = (date) => {
    const newDate = new Date(date).toLocaleDateString('pt-PT');
    const newTime = new Date(date).toLocaleTimeString('pt-PT');
    return `${newDate} at ${newTime}`;
  };
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
          {!favorites ? (
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
