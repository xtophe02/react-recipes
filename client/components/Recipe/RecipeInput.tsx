import React from 'react';
import { capitalize } from '../../src/capitalize';

export const RecipeInput = ({ name, value, handleChange }) => {
  return (
    <div className='field'>
      <label className='label'>{capitalize(name)}</label>
      <div className='control'>
        {name === 'name' ? (
          <input
            className='input'
            type='text'
            value={value}
            name={name}
            onChange={handleChange}
          />
        ) : (
          <textarea
            className='textarea'
            value={value}
            name={name}
            onChange={handleChange}
            placeholder={`...add ${name}`}
          ></textarea>
        )}
      </div>
    </div>
  );
};
