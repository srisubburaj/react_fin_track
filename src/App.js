import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddItem = async () => {
    if (itemId && itemName && itemPrice) {
      try {
        const response = await fetch('https://oikucoexi0.execute-api.us-west-2.amazonaws.com/Master/add-item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: itemId,
            name: itemName,
            price: parseFloat(itemPrice),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setItems([...items, { itemId: itemId, name: itemName, price: parseFloat(itemPrice) }]);
          setItemId('');
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
      setMessage('Please enter item ID, name, and price.');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('https://your-api-endpoint/signup', {
        username,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://your-api-endpoint/login', {
        username,
        password,
      });
      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup}>Sign Up</button>

          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Personal Finance Tracker</h1>
          <div className="input-section">
            <input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="Item ID"
            />
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
                  {item.itemId} - {item.name} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
