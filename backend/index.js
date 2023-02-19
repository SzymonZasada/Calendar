const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('./cors');
const mockData = require('./mock-data');
const { port } = require('./config');

app.use(function (req, res, next) {
  cors.cors(res);
  next();
});
app.use(express.json());
app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
  res.send(mockData);
});

app.post('/api/events', (req, res) => {
  mockData.push(req.body);
  res.json('Successfully added');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
