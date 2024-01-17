import { useState } from 'react';
import './index.css';
import Logo from './Logo';
import Form from './Form';
import Packinglist from './Packinglist';
import Stats from './Stats';

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem){
    setItems(items => [...items, newItem]);
  }

  function handleDeleteItems(id){
    setItems(items => items.filter(item => item.id !== id));
  }

  function handlePackedItems(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  function clearList(){
    const confirm = window.confirm("Do you want to clear list?");

    if(confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <Packinglist item={items} onPackedItem={handlePackedItems} onDeleteItem={handleDeleteItems} onClearList={clearList} />
      <Stats items={items} />
    </div>
  )
}

export default App
