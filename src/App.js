import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleAddItem = async () => {
    if (itemName && itemPrice) {
      try {
        // Call the API to add an item
        const response = await fetch('https://oikucoexi0.execute-api.us-west-2.amazonaws.com/Master/add-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: itemName,
            price: parseFloat(itemPrice),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Add the item to the list
          setItems([...items, { name: itemName, price: parseFloat(itemPrice) }]);
          // Clear the form fields
          setItemName('');
          setItemPrice('');
          setMessage('Item added successfully!');
        } else {
          const errorData = await response.json();
          setMessage(`Error: ${errorData.message}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    } else {
      setMessage('Please enter both item name and price.');
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
      {message && <p>{message}</p>}
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
