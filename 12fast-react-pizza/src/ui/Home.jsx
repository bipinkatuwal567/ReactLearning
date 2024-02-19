import React from 'react';
import CreateUser from '../features/user/CreateUser';
import { useSelector } from 'react-redux';
import Button from './Button';

export default function Home() {
  const username = useSelector(state => state.user.username);
  return (
    <div className="m-10 text-center sm:m-16">
      <h1 className="mb-8 font-semibold text-xl md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? <CreateUser /> : <Button to="/menu" type="primary">Continue Ordering, {username}</Button>}
    </div>
  );
}
