import React from 'react';

import { InputItem } from './InputItem';
import { ButtonsSubmit } from '../ButtonsSubmit';

export const SignIn = ({
  values,
  handleChange,
  handleSubmit,
  loading,
  error,
  isValid,
}) => {
  const { email, password } = values;
  return (
    <div className='columns'>
      <div className='column'></div>
      <div className='column is-three-quarters'>
        <InputItem
          name='email'
          value={email}
          handleChange={handleChange}
          type='email'
        />
        <InputItem
          name='password'
          value={password}
          handleChange={handleChange}
          type='password'
        />

        <ButtonsSubmit
          handleSubmit={handleSubmit}
          loading={loading}
          isValid={isValid}
        />
      </div>
      <div className='column'></div>
    </div>
  );
};
