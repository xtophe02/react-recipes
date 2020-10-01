import React from 'react';
import { capitalize } from '../../src/capitalize';

export const InputItem = ({
  name,
  type = 'text',
  handleChange,
  value,
  error = false,
}) => {
  return (
    <div className='field'>
      <label className='label'>{capitalize(name)}</label>
      <div className='control'>
        <input
          name={name}
          className={`input ${error && 'is-danger'}`}
          type={type}
          onChange={handleChange}
          value={value}
          autoComplete='off'
        />
      </div>
      <p className='help is-danger'>{error && error.message}</p>
    </div>
  );
};
