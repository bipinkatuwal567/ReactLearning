import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LinkButton({ children, to }) {
  const classname = 'text-blue-500 hover:text-blue-600 text-sm hover:underline';
  const navigate = useNavigate();

  if (to === '-1')
    return (
      <button onClick={() => navigate(-1)} className={classname} to={to}>
        {children}
      </button>
    );

  return (
    <Link className={classname} to={to}>
      {children}
    </Link>
  );
}
