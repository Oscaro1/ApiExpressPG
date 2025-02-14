const express = require('express');
const pg = require('pg').Pool;
const pool = require('./db');

const init = async () => {
  const app = express();
  app.use(express.json()); //req.body
  pool.connectDB(); //validamos la conexion a bd

  //ROUTES//

  //get all messages
  app.get('/allmessages', async (req, res) => {
    pool.getMessages(req, res);
  });

  //get a message
  app.get('/allmessages/:id', async (req, res) => {
    pool.getMessage(req, res);
  });

  //create a message
  app.post('/cmessages', async (req, res) => {
    pool.addMessage(req, res);
  });

  //update message
  app.put('/umessages/:id', async (req, res) => {
    pool.updateMessage(req, res);
  });

  //delete message
  app.put('/dmessages/:id', async (req, res) => {
    pool.deleteMessage(req, res);
  });

  app.listen(5000, () => {
    console.log('Server on port 5000!');
  });
};

init();
