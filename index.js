const express = require('express');
const nodemon = require('nodemon');
const app = express();
const port = 3005; 

app.get('/', (req, res) => {
  res.send('hello world')
});

app.listen(port, () => {
  console.log("Server is running on https://localhost:" + port);
});


