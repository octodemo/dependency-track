const express = require('express');
const app = express();
const port = 3000;

// Database connection setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// User endpoint
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.send(user);
});

// get user account balance
app.get('/user/:id/balance', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const balance = user.balance;
  res.send(balance);
}

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});