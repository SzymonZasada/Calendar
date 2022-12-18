const express = require('express');
const bodyParser = require('body-parser');
const app = express();

port = 8000;
//I create api route with custom data
const users = [];

app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
app.use(express.json());
app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
  res.send(events);
});

app.post('/api/events', (req, res) => {
  const ev = req.body;
  events.push(ev);
  res.json('event addedd');
});


app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

let events = [
  {
    id: 1,
    title: 'Moms birthday',
    date: 'Sat Oct 1 2022 19:44:38 GMT+0200',
    description: 'buy a bike',
    icon: 'cake',
    eventType: 'family',
    telephoneNumber: '123485663',
    email: 'momemail@gmail.com',
    place: 'Parent house'
  },
  {
    id: 2,
    title: 'Dads birthday',
    date: 'Fri Sep 30 2022 00:00:00 GMT+0200',
    description: 'buy a car',
    icon: 'cake',
    eventType: 'family',
    telephoneNumber: '958473664',
    email: 'dademail@gmail.com',
    place: 'Parent house'
  },
  {
    id: 3,
    title: 'Business meeting',
    date: 'Fri Oct 07 2022 00:00:00 GMT+0200',
    description: 'Remember about business cards',
    icon: 'business',
    eventType: 'work',
    telephoneNumber: '958473664',
    email: 'work@work.com',
    place: 'work'
  },
  {
    id: 4,
    title: 'Kindergarten',
    date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
    description: 'Pick up my son',
    icon: 'child_care',
    eventType: 'family',
    telephoneNumber: '746357442',
    email: 'kindergarden@gmail.com',
    place: 'Kindergarten'
  },
  {
    id: 5,
    title: 'Meeting with Dominika',
    date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
    description: 'Ask for a new job',
    icon: 'free_breakfast',
    eventType: 'friends',
    telephoneNumber: '123485663',
    email: 'myfriend@gmail.com',
    place: 'Giant hotel'
  },
  {
    id: 5,
    title: 'Order a cake',
    date: 'Wed Sep 14 2022 00:00:00 GMT+0200',
    description: 'Order a chocolate cake for mom',
    icon: 'cake',
    eventType: 'family',
    telephoneNumber: '452345',
    email: 'cakedelivery@gmail.com',
    place: 'Cake shop on honey street'
  }
];
