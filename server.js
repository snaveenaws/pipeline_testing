const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
const users = []; // This is just a demo, in a real app use a database

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.username }, 'secret', { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).send('Invalid credentials');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, password: hashedPassword });
  res.send('User registered');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
