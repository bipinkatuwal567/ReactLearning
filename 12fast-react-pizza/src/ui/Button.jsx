import React from 'react'
import { Link } from 'react-router-dom';

export default function Button({children, disabled, to}) {
    const classname = "my-2 inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-3";

    if(to) return <Link className={classname} to={to}>
        {children}
    </Link>

  return (
    <button className={classname} disabled={disabled}>
        {children}
    </button>
  )
}
