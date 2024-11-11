// checkboxRoutes.js
// Rutas de la API para gestionar datos de componentes de tipo Checkbox.

const express = require("express");
const router = express.Router();

let checkboxData = [];

/**
 * POST /
 * Ruta para agregar múltiples datos de Checkbox.
 * Espera una lista de objetos Checkbox en el cuerpo de la solicitud.
 */
router.post("/", (req, res) => {
  const newCheckboxes = req.body;
  if (Array.isArray(newCheckboxes)) {
    checkboxData.push(...newCheckboxes);
    res.status(201).json({ message: "Datos de Checkbox guardados correctamente", data: newCheckboxes });
  } else {
    res.status(400).json({ message: "Formato incorrecto. Debe ser una lista de objetos." });
  }
});

/**
 * GET /
 * Ruta para obtener todos los datos de Checkbox almacenados.
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "Datos de Checkbox obtenidos", data: checkboxData });
});

module.exports = router;
