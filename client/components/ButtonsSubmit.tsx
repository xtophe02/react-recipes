import React from 'react';
import { useRouter } from 'next/router';

export const ButtonsSubmit = ({ handleSubmit, loading, isValid }) => {
  const router = useRouter();

  return (
    <div className='field is-grouped is-grouped-right'>
      <p className='control'>
        <button
          disabled={isValid}
          className={`button is-primary is-outlined ${
            loading && 'is-loading'
          } `}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </p>
      <p className='control'>
        <button
          className='button is-outlined'
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancel
        </button>
      </p>
    </div>
  );
};
