import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header className="border-b-2 border-stone-300 bg-yellow-500 px-4 py-3 sm:px-6 flex justify-between items-center">
      <Link to="/" className="uppercase tracking-widest font-semibold">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
