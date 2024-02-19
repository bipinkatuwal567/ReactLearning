import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    'my-2 text-sm inline-block rounded-full bg-yellow-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-3',
    small: base + ' text-sm px-4 py-2 md:px-5 md:py-2.5',
    secondary:
      'my-2 inline-block text-sm rounded-full font-semibold border-2 border-stone-300 uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
