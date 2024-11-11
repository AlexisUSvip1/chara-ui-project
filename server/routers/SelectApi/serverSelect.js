// selectRoutes.js
// Rutas de la API para gestionar datos de componentes de tipo Select.

const express = require("express");
const router = express.Router();

let selectData = [];

/**
 * POST /
 * Ruta para agregar múltiples datos de Select.
 * Espera una lista de objetos Select en el cuerpo de la solicitud.
 */
router.post("/", (req, res) => {
  const newSelects = req.body;
  if (Array.isArray(newSelects)) {
    selectData.push(...newSelects);
    res.status(201).json({ message: "Datos de Select guardados correctamente", data: newSelects });
  } else {
    res.status(400).json({ message: "Formato incorrecto. Debe ser una lista de objetos." });
  }
});

/**
 * GET /
 * Ruta para obtener todos los datos de Select almacenados.
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "Datos de Select obtenidos", data: selectData });
});

module.exports = router;
