const sql = require('mssql');
const config = require('./config');

async function getEvents() {
  try {
    let pool = await sql.connect(config);
    let events = await pool.request().query('select * FROM newCallendar');

    return events.recordset;
  } catch (err) {
    console.log('Error', err);
  }
}

async function postEvents(req) {
  try {
    let pool = await sql.connect(config);
    let addEvents = await pool
      .request()
      //mock ID-unused
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
        'insert into newCallendar (id, title, date, description, icon, eventType, telephoneNumber, email, place) values (@id, @title, @date, @description,@icon,@eventType,@telephoneNumber,@email,@place)'
      );

    return true;
  } catch (err) {
    console.log('Error', err);
    return false;
  }
}

module.exports = { getEvents, postEvents };
