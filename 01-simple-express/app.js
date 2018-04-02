const express = require('express');
const app = express();


app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(3000, () => {
  console.log('app is listening at port 3000');
});