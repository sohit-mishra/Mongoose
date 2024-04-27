const express = require('express');
const nodemon = require('nodemon');
const connectToDatabase = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
connectToDatabase();

app.get('/', async (req, res) => {
  res.status(200).send("Hello World");
});

app.get('/read', async (req, res) => {
  try {
    const users = await Product.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/create', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
