import React from 'react';
import Link from 'next/link';
import { capitalize } from '../../src/capitalize';

export const RecipeItem = ({ id, name, category }) => {
  return (
    <Link href={`/recipes/${id}`}>
      <a className='box' key={id}>
        <h4 className='title is-4 is-spaced'>{name}</h4>
        <p className='subtitle is-6'>
          <em>{capitalize(category)}</em>
        </p>
      </a>
    </Link>
  );
};
