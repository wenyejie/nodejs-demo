/**
 *
 *
 * @author: Storm
 * @date: 2018/04/02
 */

const express = require('express');

const utility = require('utility');

const app = express();

app.get('/', (request, response) => {
  const q = request.query.q || '';

  console.log(q);

  const md5Value = utility.md5(q);

  response.send(md5Value);
});


app.listen(3000, (request, response) => {
  console.log('App is running at port 3000');
});