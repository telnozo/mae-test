const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store (for demonstration)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// --- API Endpoints ---

// GET / -> Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Basic Express Test API! 🚀');
});

// GET /users -> Returns all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id -> Returns a single user by ID
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST /users -> Adds a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1, // Simple ID generation
    name: req.body.name,
  };
  
  if (!newUser.name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
