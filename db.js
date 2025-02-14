const Pool = require('pg').Pool;

// Configurar los detalles de conexión a PostgreSQL
const pool = new Pool({
  user: 'serbero',
  host: 'localhost',
  database: 'zurak',
  password: 'serbero',
  port: '5432',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Conectar la BD
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL!!!');
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
};

// Agregar un nuevo mensaje
const addMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const newMessage = await pool.query('insert into chat.messages (content) values ($1) returning *', [content]);
    res.json(newMessage.rows[0]);
    //console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
};

// Consultar todos los mensajes
const getMessages = async (req, res) => {
  try {
    const allmessages = await pool.query('SELECT * FROM chat.messages WHERE status=1 order by id asc');
    res.json(allmessages.rows);
    //console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
};

// Consultar mensaje por id
const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await pool.query('SELECT * FROM chat.messages where id = $1', [id]);
    res.json(message.rows[0]);
    //console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
};

// Actualizar mensaje
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params; //where
    const { content } = req.body; //set

    const updateMsg = await pool.query('update chat.messages set content = $1 where id=$2', [content, id]);
    res.json('Mensaje actualizado.');
    console.log(content);
  } catch (err) {
    console.error(err.message);
  }
};

// Borrar mensaje (solo cambia el estatus a false (0), borrado suave)
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params; //where

    const updateMsg = await pool.query('update chat.messages set status = 0 where id=$1', [id]);
    res.json('Mensaje borrado.');
    //res.json(updateMsg.rows[0]);
    console.log(content);
  } catch (err) {
    console.error(err.message);
  }
};

// Exportar las funciones de la bd
module.exports = { pool, connectDB, addMessage, getMessages, getMessage, updateMessage, deleteMessage };
