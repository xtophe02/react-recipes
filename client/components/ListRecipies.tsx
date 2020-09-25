import { link } from 'fs';
import React from 'react';

export const ListRecipies = ({ recipes }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>{recipe.name}</li>
      ))}
    </ul>
  );
};
