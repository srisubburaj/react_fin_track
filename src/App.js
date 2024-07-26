import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleAddItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice) }]);
      setItemName('');
      setItemPrice('');
    }
  };

  return (
    <div className="App">
      <h1>Personal Finance Tracker</h1>
      <div className="input-section">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Item name"
        />
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Item price"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div className="items-list">
        <h2>Items List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
