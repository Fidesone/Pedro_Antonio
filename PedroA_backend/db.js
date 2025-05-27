const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tienes otro usuario
  password: 'root', // Añade tu contraseña si la tienes
  database: 'Pedro_BBDD'
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
  } else {
    console.log('🚀 Conectado a MySQL');
  }
  
});

module.exports = db;
