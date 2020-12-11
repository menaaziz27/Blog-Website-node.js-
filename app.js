const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
})
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/about.html'))
})
app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/contact.html'))
})
app.get('/post', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/post.html'))
})

app.listen(3000);