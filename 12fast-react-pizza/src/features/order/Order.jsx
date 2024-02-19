// Test ID: IIDSAT
import React from 'react';

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import { useLoaderData } from 'react-router-dom';
import OrderItem from './OrderItem';

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order #{id} status
        </h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 uppercase text-sm font-bold tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 uppercase text-sm font-bold tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap gap-2 bg-stone-200 justify-between items-center px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className='divide-y-2 border-t border-b'>
        {cart.map(cart => <OrderItem item={cart} key={cart.key} />)}
      </ul>

      <div className='space-y-2 px-6 py-5 bg-stone-200'>
        <p className='text-sm font-medium text-stone-600'>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className='text-sm font-medium text-stone-600'>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className='font-bold'>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export default Order;

export async function loader({ params }) {
  const order = getOrder(params.orderId);
  return order;
}
