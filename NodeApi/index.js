const express = require('express');

const app = express();

// Database
let users = [
  { id: 123, name: 'Ahmed', age: 21, gender: 'Male', email: 'Ahmed@gmail.com' },
  { id: 124, name: 'Omar', age: 21, gender: 'Male', email: 'Omar@gmail.com' },
  { id: 125, name: 'Eslam', age: 21, gender: 'Male', email: 'Eslam@gmail.com' }
];

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  next();
});

// Route to get all users
app.get('/', (req, res) => {
  res.json(users);
});


// Route to get a user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route to create a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email
  };
  users.push(newUser);
  res.json(newUser);
});

// Route to update a user by ID
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.email = req.body.email || user.email;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route to delete a user by ID
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.json({ message: 'User deleted' });
});

// Listen on port 5500
app.listen(5500, () => {
  console.log('Server started on port 5500');
});
