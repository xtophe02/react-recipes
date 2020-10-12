import React from 'react'
import { useRouter } from 'next/router';

export const ButtonBack = () => {
  const router = useRouter();
  return (
    <button className='button' onClick={() => router.back()}>
    Go back
  </button>
  )
}
