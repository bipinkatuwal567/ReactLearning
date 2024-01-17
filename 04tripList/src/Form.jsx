import { useState } from 'react';

export default function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { description, quantity, id: Date.now(), packed: false };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for you 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(index => <option value={index} key={index}>{index}</option>)}
      </select>
      <input
        type="text"
        placeholder='Enter something...'
        value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
