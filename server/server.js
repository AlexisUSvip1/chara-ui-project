// server.js
// Configuración del servidor utilizando Express. Permite la comunicación entre el frontend y el backend mediante una API REST.

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routers");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS y procesar JSON en las solicitudes
app.use(cors());
app.use(bodyParser.json());

// Configuración de rutas de la API
app.use("/api", routes);

// Inicia el servidor en el puerto especificado y muestra un mensaje en la consola
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
