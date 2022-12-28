const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const  Db = require('./dboperations');
//const  Order = require('./Order');

const sql = require('mssql');
const config = {
  server: 'DESKTOP-8UNPRQJ\\SQLEXPRESS',
  database: 'callendar',
  user: 'cal',
  password: 'qazwsx1',
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
};
port = 8000;
const users = [];

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(bodyParser.json());

app.get('/api/events', (req, res) => {
  sql.connect(config, function (err) {
    if (err) {
      console.log('Error connect, send mock data', err);
      res.send(events);
    }

    const request = new sql.Request();
    request.query('select * FROM newCallendar', function (err, recordset) {
      if (err) {
        console.log('Send mock data', err);
        res.send(events);
      }

      res.send(recordset.recordset);
      sql.close(function (value) {
        console.log('Connection close', value);
      });
      console.log(recordset);
    });
  });
});

app.post('/api/events', (req, res) => {
  const data = req.body;
  events.push(data);

  sql.connect(config, function (err) {
    if (err) {
      console.log('Error connect', err);
    }

    const request = new sql.Request();
    const values=['99',data.title, data.date, data.description,data.icon,data.eventType,data.telephoneNumber,data.email,data.place ]
    const sql1="INSERT INTO newCallendar (id, title, date, description, icon, eventType, telephoneNumber, email, place) VALUES  ? ";
    request.query(
     sql1, [values],function (err, result, fields) {
       if(err){
         throw err
       }
      });

  });


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
    place: 'Parent house',
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
    place: 'Parent house',
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
    place: 'work',
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
    place: 'Kindergarten',
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
    place: 'Giant hotel',
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
    place: 'Cake shop on honey street',
  },
];
