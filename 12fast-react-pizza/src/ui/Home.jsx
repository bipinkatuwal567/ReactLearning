import React from 'react';
import CreateUser from '../features/user/CreateUser';

export default function Home() {
  return (
    <div className='text-center m-10 sm:m-16'>
      <h1 className="font-semibold mb-8">
        The best pizza.
        <br />
        <span className='text-yellow-500'>
        Straight out of the oven, straight to you.
        </span>

      </h1>
        <CreateUser />
    </div>
  );
}
