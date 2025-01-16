const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" })); // Permitir cualquier origen para pruebas

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware para servir archivos estáticos
app.use(express.static("Public"));

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "brdq446oga7eyw1ycchp-mysql.services.clever-cloud.com",
    user: "unoa2qah2mup8wlc",
    password: "gLUQFefO5K9jreJp6470",
    database: "brdq446oga7eyw1ycchp",
    port: 3306,
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos:", err.message);
    } else {
        console.log("Conexión a la base de datos exitosa");
    }
});

// Ruta principal para servir el HTML
app.get("/contacto", (req, res) => {
    res.sendFile(__dirname + "Public/Index.html"); // Ruta corregida
});

// Ruta para manejar el formulario
app.post("/validar", (req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;

    // Validaciones más estrictas
    if (!nombre.trim() || nombre.length < 3) {
        return res.status(400).json({ error: "El nombre debe tener al menos 3 caracteres." });
    }

    if (!/^[0-9]+$/.test(telefono)) {
        return res.status(400).json({ error: "El teléfono debe contener solo números." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "El formato del correo no es válido." });
    }

    if (mensaje.trim().length < 10) {
        return res.status(400).json({ error: "El mensaje debe tener al menos 10 caracteres." });
    }

    // Inserción en la base de datos
    const query = "INSERT INTO formulario_de_consulta (nombre, telefono, email, mensaje) VALUES (?, ?, ?, ?)";
    db.query(query, [nombre, telefono, email, mensaje], (err) => {
        if (err) {
            console.error("Error al guardar en la base de datos:", err);
            return res.status(500).json({ error: "Error al guardar los datos." });
        }
        res.json({ success: "¡Mensaje enviado correctamente!" });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3320; // Definido en el archivo .env
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://127.0.0.1:${PORT}`);
});
