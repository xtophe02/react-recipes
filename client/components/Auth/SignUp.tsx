import React from 'react';

import { InputItem } from './InputItem';
import { ButtonsSubmit } from '../Buttons/ButtonsSubmit';

export const SignUp = ({
  values,
  handleChange,
  handleSubmit,
  loading,
  error,
  isValid,
}) => {
  const { username, email, password, confirmPassword } = values;
  return (
    <div className='columns'>
      <div className='column'></div>
      <div className='column is-three-quarters'>
        <InputItem
          name='username'
          value={username}
          handleChange={handleChange}
          error={error}
        />
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
        <InputItem
          name='confirmPassword'
          value={confirmPassword}
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
