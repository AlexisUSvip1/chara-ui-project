// index.js
// Configuración principal de rutas para la API, agrupando las rutas de Input, Checkbox y Select.

const express = require("express");
const inputRoutes = require("./InputApi/serverInput");
const checkboxRoutes = require("./CheckboxApi/serverCheckbox");
const selectRoutes = require("./SelectApi/serverSelect");

const router = express.Router();

/**
 * Monta las rutas de cada tipo de componente en el router principal:
 * - Rutas de Input en "/input"
 * - Rutas de Checkbox en "/checkbox"
 * - Rutas de Select en "/select"
 */
router.use("/input", inputRoutes);
router.use("/checkbox", checkboxRoutes);
router.use("/select", selectRoutes);

module.exports = router;
