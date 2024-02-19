import React from 'react';
import { useSelector } from 'react-redux';

export default function Username() {
  const username = useSelector(state => state.user.username);
  return (
    <div className="text-semibold hidden text-base font-semibold uppercase md:block">
      <p>{username}</p>
    </div>
  );
}
