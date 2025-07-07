require('dotenv').config(); // Para leer variables desde .env en local

const express = require("express");
const cors = require("cors");
const db = require("./db"); // Conexión a la BD
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const dbEngine = db.engine || 'mysql'; // Detectar motor

app.use(cors());
app.use(express.json());

// 🔐 Registro de usuarios
app.post("/register", async (req, res) => {
  const { name_user, email, password } = req.body;

  if (!name_user || !email || !password) {
    return res.json({ success: false, message: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const placeholders = dbEngine === 'postgres' ? '$1, $2, $3' : '?, ?, ?';

    db.query(
      `INSERT INTO users (name_user, email, password) VALUES (${placeholders})`,
      [name_user, email, hashedPassword],
      (err) => {
        if (err) {
          console.error(err);
          return res.json({ success: false, message: "Error interno al registrar el usuario" });
        }
        res.status(200).json({ success: true, message: "Usuario registrado exitosamente" });
      }
    );
  } catch (error) {
    return res.json({ success: false, message: "Error interno al registrar el usuario" });
  }
});

// 🔑 Login
app.post("/login", async (req, res) => {
  const { name_user, password } = req.body;

  if (!name_user || !password)
    return res.status(400).send("Usuario y contraseña obligatorios");

  const placeholder = dbEngine === 'postgres' ? '$1' : '?';

  db.query(
    `SELECT * FROM users WHERE name_user = ${placeholder}`,
    [name_user],
    async (err, results) => {
      const user = dbEngine === 'postgres' ? results?.rows?.[0] : results?.[0];
      if (err || !user) return res.status(401).send("Usuario o contraseña incorrectos");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Contraseña incorrecta");

      const token = jwt.sign(
        { id: user.id, name_user: user.name_user },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "1h" }
      );

      res.json({ mensaje: "Inicio de sesión exitoso", token });
    }
  );
});

// 📰 Obtener artículos
app.get("/articulos", (req, res) => {
  db.query("SELECT * FROM articles ORDER BY fecha DESC", [], (err, results) => {
    if (err) {
      console.error("❌ Error en la consulta a articles:", err); // 👈 AÑADE
      return res.json({ success: false, message: "Error al recuperar artículos" });
    }
    const data = dbEngine === 'postgres' ? results.rows : results;
    res.json(data);
  });
});

// 📰 Crear artículo
app.post("/articulos", (req, res) => {
  const { titulo, subtitulo, resumen, url, imagen } = req.body;

  if (!titulo || !resumen || !url) {
    return res.json({ success: false, message: "Faltan campos obligatorios" });
  }

  const fecha = new Date();
  const placeholders = dbEngine === 'postgres'
    ? '$1, $2, $3, $4, $5, $6'
    : '?, ?, ?, ?, ?, ?';

  db.query(
    `INSERT INTO articles (titulo, subtitulo, resumen, url, imagen, fecha) VALUES (${placeholders})${dbEngine === 'postgres' ? ' RETURNING id' : ''}`,
    [titulo, subtitulo, resumen, url, imagen, fecha],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ success: false, message: "Error al guardar artículo" });
      }

      const insertId = dbEngine === 'postgres' ? result.rows[0].id : result.insertId;

      res.json({
        success: true,
        articulo: {
          id: insertId,
          titulo,
          subtitulo,
          resumen,
          url,
          imagen,
          fecha,
        },
      });
    }
  );
});

// 📚 Obtener libros
app.get("/libros", (req, res) => {
  db.query("SELECT * FROM books ORDER BY fecha DESC", [], (err, results) => {
    if (err) {
      return res.json({ success: false, message: "Error al recuperar libros" });
    }
    const data = dbEngine === 'postgres' ? results.rows : results;
    res.json(data);
  });
});

// 🚀 Arrancar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
