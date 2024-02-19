import React from "react";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleClick(){
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: 15,
      totalPrice: 1 * unitPrice,
    }
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut  ? "grayscale opacity-70" : ""}`} />
      <div className="flex flex-col pt-0.5 grow">
        <p className="font-medium">{name}</p>
        <p className="capitalize italic text-sm text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex justify-between items-center">
          {!soldOut ? <p className="text-sm">{formatCurrency(unitPrice)}</p> : <p className="uppercase text-sm text-stone-500 font-medium">Sold out</p>}
          {!soldOut && <Button onClick={handleClick} type="small">Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
