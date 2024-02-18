import React from 'react';
import CreateUser from '../features/user/CreateUser';

export default function Home() {
  return (
    <div className="m-10 text-center sm:m-16">
      <h1 className="mb-8 font-semibold text-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}
