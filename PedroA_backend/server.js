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
  if (!name_user || !email || !password)
    console.log("⚠️ Campos faltantes en la solicitud:", req.body);
    return res.status(400).send("Todos los campos son obligatorios");

  try {
    // Hashear la contraseña antes de guardarla en la BD
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name_user, email, password) VALUES (?, ?, ?)",
      [name_user, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("❌ Error al registrar el usuario:", err);
          return res.status(500).send("Error interno al registrar el usuario");
        }
        res.status(200).json({ success: true, message: "Usuario registrado exitosamente" });
      }
    );
  } catch (error) {
    console.error("❌ Error al encriptar la contraseña:", error);
    res.status(500).send("Error interno en el servidor");
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
      if (err) return res.status(500).send("Error en el servidor");
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

// 🚀 **Iniciar servidor**
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
