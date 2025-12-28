const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from SweetSocial!');
});

app.listen(3000, () => {
  console.log('SweetSocial app running on port 3000');
});