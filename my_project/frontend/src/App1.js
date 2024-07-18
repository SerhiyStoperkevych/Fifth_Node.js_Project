import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App1 = () => {
  const [items, setItems] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Please provide your input.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username: username,
        password: password,
      });
      console.log('Response from server:', response.data);
      setItems([...items, response.data]);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding item:', error.response.data);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <div>
        <label>Username:</label>
        <input value={username} onChange={handleUsername} />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePassword} />
      </div>
      <button onClick={addItem}>Apply</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
                <label>Name:</label>
                <span>{item.username}</span>
            </div>
            <div>
                <label>Password:</label>
                <span>{item.password}</span>
            </div>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App1;
