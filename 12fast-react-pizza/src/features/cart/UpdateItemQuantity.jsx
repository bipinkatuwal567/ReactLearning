import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseQuantityItem, increaseQuantityItem } from './cartSlice';

export default function UpdateItemQuantity({pizzaId, currentyQuantity}) {
    const dispatch = useDispatch();

  return (
    <div className='flex items-center gap-1 md:gap-3'>
        <Button type="round" onClick={() => dispatch(decreaseQuantityItem(pizzaId))}>-</Button>
        <p>{currentyQuantity}</p>
        <Button type="round" onClick={() => dispatch(increaseQuantityItem(pizzaId))}>+</Button>
    </div>
  )
}
