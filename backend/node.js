const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('./cors');
const operations = require('./operations');

port = 8000;

app.use(function (req, res, next) {
  cors.cors(res);
  next();
});
app.use(express.json());
app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
  operations.getEvents().then((response) => {
    res.send(response);
  });
});

app.post('/api/events', (req, res) => {
  operations.postEvents(req).then((response) => {
    if (!response) {
      res.sendStatus(404);
    }
    if (response) {
      res.json('Successfully added');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
