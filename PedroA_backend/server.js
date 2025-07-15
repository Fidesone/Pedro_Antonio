require('dotenv').config(); // Para leer variables desde .env en local

const express = require("express");
const cors = require("cors");
const db = require("./db"); // Conexión a la BD
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const dbEngine = db.engine || 'mysql'; // Detectar motor

app.use(express.json());

app.use(cors());



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
  db.query("SELECT * FROM articles ORDER BY fecha ASC", [], (err, results) => {
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
// 📚 Crear libro
app.post("/libros", (req, res) => {
  console.log("📥 Nuevo libro recibido para guardar:");
  const {
    titulo,
    autor,
    descripcion,
    imagen,
    categoria,
    anoPublicacion,
    editorial,
    premio
  } = req.body;

  console.log("📥 Datos recibidos para nuevo libro:", req.body);

  if (!titulo || !autor || !descripcion || !anoPublicacion || !editorial) {
    return res.json({ success: false, message: "Faltan campos obligatorios" });
  }

  const fecha = new Date();

  const placeholders = dbEngine === 'postgres'
    ? '$1, $2, $3, $4, $5, $6, $7, $8, $9'
    : '?, ?, ?, ?, ?, ?, ?, ?, ?';

  const values = [
    titulo,
    autor,
    descripcion,
    imagen,
    categoria,
    fecha,
    anoPublicacion,
    editorial,
    premio
  ];

  db.query(
    `INSERT INTO books (
      titulo, autor, descripcion, imagen, categoria, fecha, anoPublicacion, editorial, premio
    ) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) {
        console.error("❌ Error al guardar libro:", err);
        return res.json({ success: false, message: "Error al guardar libro" });
      }

      console.log("✅ Libro guardado correctamente:", result);
      res.json({ success: true, message: "Libro guardado correctamente" });
    }
  );
});

// 📚 Modificar libro por ID
app.put("/libros/:id", (req, res) => {
  const {
    titulo,
    autor,
    descripcion,
    imagen,
    categoria,
    anoPublicacion,
    editorial,
    premio
  } = req.body;

  const idLibro = req.params.id;

  if (!idLibro) {
    return res.status(400).json({ success: false, message: "ID del libro no proporcionado" });
  }

  const placeholders = dbEngine === 'postgres'
    ? 'titulo = $1, autor = $2, descripcion = $3, imagen = $4, categoria = $5, anoPublicacion = $6, editorial = $7, premio = $8'
    : 'titulo = ?, autor = ?, descripcion = ?, imagen = ?, categoria = ?, anoPublicacion = ?, editorial = ?, premio = ?';

  const values = [
    titulo,
    autor,
    descripcion,
    imagen,
    categoria,
    anoPublicacion,
    editorial,
    premio,
    idLibro
  ];
console.log("📤 ID libro:", idLibro);
console.log("📦 Datos recibidos:", req.body);

  const updateQuery = `UPDATE books SET ${placeholders} WHERE id = ${dbEngine === 'postgres' ? '$9' : '?'}`;

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("❌ Error al modificar libro:", err);
      return res.status(500).json({ success: false, message: "Error al modificar libro" });
    }

    res.json({ success: true, message: "Libro modificado correctamente" });
  });
});



// 🚀 Arrancar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
