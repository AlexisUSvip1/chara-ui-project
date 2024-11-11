// inputRoutes.js
// Rutas de la API para gestionar datos de componentes de tipo Input.

const express = require("express");
const router = express.Router();

let inputData = [];

/**
 * POST /
 * Ruta para agregar múltiples datos de Input.
 * Espera una lista de objetos Input en el cuerpo de la solicitud.
 */
router.post("/", (req, res) => {
  const newInputs = req.body;

  if (Array.isArray(newInputs)) {
    inputData = [...inputData, ...newInputs];
    res
      .status(201)
      .json({
        message: "Datos de Input guardados correctamente",
        data: newInputs,
      });
  } else {
    res
      .status(400)
      .json({ message: "Formato incorrecto. Debe ser una lista de objetos." });
  }
});

/**
 * GET /
 * Ruta para obtener todos los datos de Input almacenados.
 */
router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Datos de Input obtenidos", data: inputData });
});

module.exports = router;
