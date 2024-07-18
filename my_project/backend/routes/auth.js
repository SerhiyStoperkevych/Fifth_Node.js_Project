const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const newUser = { id: Date.now().toString(), username, password };
    const itemsFilePath = path.join(__dirname, '../items.json');

    fs.readFile(itemsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading items.json:', err);
        return res.status(500).send('Internal Server Error');
      }

      let items = [];
      try {
        items = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing items.json:', parseError);
        return res.status(500).send('Internal Server Error');
      }

      items.push(newUser);
      fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
          console.error('Error writing to items.json:', err);
          return res.status(500).send('Internal Server Error');
        }
        res.status(201).json(newUser);
      });
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
