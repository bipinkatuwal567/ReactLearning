import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const cartPizzaQuantity = useSelector(getTotalCartQuantity);
  const cartPizzaPrice = useSelector(getTotalCartPrice);

  if(!cartPizzaQuantity) return null;
  
  return (
    <div className="flex items-center justify-between bg-stone-900 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-stone-300 sm:space-x-6">
        <span>{cartPizzaQuantity} pizzas</span>
        <span>{formatCurrency(cartPizzaPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
