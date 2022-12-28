const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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
      console.log('Error connect, send mock data', err);
      res.send(events);
    }

    const request = new sql.Request();
    request
      .input('id', sql.NVarChar(50), '99')
      .input('title', sql.NVarChar(50), req.body.title)
      .input('date', sql.NVarChar(50), req.body.date)
      .input('description', sql.NVarChar(50), req.body.description)
      .input('icon', sql.NVarChar(50), req.body.icon)
      .input('eventType', sql.NVarChar(50), req.body.eventType)
      .input('telephoneNumber', sql.NVarChar(50), req.body.telephoneNumber)
      .input('email', sql.NVarChar(50), req.body.email)
      .input('place', sql.NVarChar(50), req.body.place)
      .query(
        'insert into newCallendar (id, title, date, description, icon, eventType, telephoneNumber, email, place) values (@id, @title, @date, @description,@icon,@eventType,@telephoneNumber,@email,@place)',
        function (err, result) {
          if (err) {
            console.log(err);
            res.sendStatus(400);
          }
          if (!err) {
            res.json('Successfully added');
          }
          sql.close();
        }
      );
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
