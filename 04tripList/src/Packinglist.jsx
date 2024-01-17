import { useState } from 'react';
import Item from './Item';

export default function Packinglist({ item, onDeleteItem, onPackedItem, onClearList }) {
  const [sorting, setSorting] = useState("input");

  let sortedItem;

  if (sorting === "input") sortedItem = item;

  if (sorting === "description") sortedItem = item.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sorting === "packed") sortedItem = item.slice().sort((a, b) => Number(a.packed - b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItem.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onPackedItem={onPackedItem} key={item.id} />
        ))}
      </ul>
      <div className="actions">
        <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
