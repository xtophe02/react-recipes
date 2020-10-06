import React from 'react';
import { useRouter } from 'next/router';
import { capitalize } from '../../src/capitalize';

export const Recipe = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div>
        {Object.keys(data).map((val) => (
          <div key={val} className='block'>
            <p className='is-size-5'>
              <strong>{capitalize(val)}</strong>: {data[val]}
            </p>
          </div>
        ))}
      </div>
      <div className='buttons  is-right'>
        <button className='button' onClick={() => router.back()}>
          Go back
        </button>
      </div>
    </>
  );
};
