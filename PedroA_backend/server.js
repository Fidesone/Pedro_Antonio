const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // Conexión a la BD
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 🔑 **Registro de usuarios con contraseña encriptada**
app.post("/register", async (req, res) => {
  const { name_user, email, password } = req.body;
if (!name_user || !email || !password) {
  console.log("⚠️ Campos faltantes en la solicitud:", req.body);
  return res.json({ success: false, message: "Todos los campos son obligatorios" });
}
try {
    // Hashear la contraseña antes de guardarla en la BD
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name_user, email, password) VALUES (?, ?, ?)",
      [name_user, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("❌ Error al registrar el usuario:", err);
          return res.json({ success: false, message: "Error interno al registrar el usuario" });
        }
        res.status(200).json({ success: true, message: "Usuario registrado exitosamente" });
      }
    );
  } catch (error) {
    console.error("❌ Error al encriptar la contraseña:", error);
    return res.json({ success: false, message: "Error interno al registrar el usuario" });
  }
});

// 🔐 **Inicio de sesión con validación de contraseña**
app.post("/login", async (req, res) => {
  const { name_user, password } = req.body;
  if (!name_user || !password)
    return res.status(400).send("Usuario y contraseña obligatorios");

  db.query(
    "SELECT * FROM users WHERE name_user = ?",
    [name_user],
    async (err, results) => {
      if (err) return res.json({ success: false, message: "Error interno al registrar el usuario" });
      if (results.length === 0) return res.status(401).send("Usuario no encontrado");

      const user = results[0];

      // 🛠 **Verificar la contraseña ingresada contra la almacenada**
      console.log("Contraseña almacenada en BD:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send("Contraseña incorrecta");

      // 🔥 **Generar un token JWT**
      const token = jwt.sign({ id: user.id, name_user: user.name_user }, "secret_key", { expiresIn: "1h" });
      res.json({ mensaje: "Inicio de sesión exitoso", token });
    }
  );
});

app.get("/articulos", (req, res) => {
  db.query("SELECT * FROM articles ORDER BY fecha DESC", (err, results) => {
    if (err) {
      console.error("❌ Error al obtener artículos:", err);
      return res.json({ success: false, message: "Error al recuperar artículos" });
    }
    res.json(results);
  });
});

app.get("/libros", (req, res) => {
  console.log("📚 Se ha accedido a /libros");
  db.query("SELECT * FROM books ORDER BY fecha DESC", (err, results) => {
    if (err) {
      console.error("❌ Error al obtener libros:", err);
      return res.json({ success: false, message: "Error al recuperar libros" });
    }
    res.json(results);
  });
});



// 🚀 **Iniciar servidor**
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
