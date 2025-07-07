const isProduction = process.env.NODE_ENV === 'production';

let db;

if (isProduction) {
  // PostgreSQL (Neon)
  const { Pool } = require('pg');
  console.log("🌐 DATABASE_URL:", process.env.DATABASE_URL);
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  db = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback);
    },
    engine: 'postgres', // 👈 Añadido aquí
  };

  console.log('🚀 Conectado a PostgreSQL (Neon)');
} else {
  // MySQL local
  const mysql = require('mysql2');

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Pedro_BBDD',
  });

  connection.connect((err) => {
    if (err) {
      console.error('❌ Error conectando a MySQL:', err);
    } else {
      console.log('🚀 Conectado a MySQL local');
    }
  });

  db = {
    query: (text, params, callback) => {
      return connection.query(text, params, callback);
    },
    engine: 'mysql', // 👈 Añadido aquí también
  };
}

module.exports = db;
