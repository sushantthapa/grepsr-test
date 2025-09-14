const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API Service is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Service running on port ${PORT}`);
});

