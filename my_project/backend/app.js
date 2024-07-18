const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);

let items = [];

// Read items from items.json file
const itemsFilePath = path.join(__dirname, 'items.json');

mongoose.connect('mongodb://localhost:27017/auth-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    fs.readFile(itemsFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading items.json:', err);
      } else {
        items = JSON.parse(data);
      }
    });
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Example API routes
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);

  // Save the new item to items.json file
  fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      console.error('Error writing to items.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(newItem);
    }
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== id);

  // Save the updated items to items.json file
  fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
    if (err) {
      console.error('Error writing to items.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
