export default function Item({ item, onDeleteItem, onPackedItem }) {
  return (
    <li>
      <input value={item.packed} onClick={() => onPackedItem(item.id)} type="checkbox" />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
