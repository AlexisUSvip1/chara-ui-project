// apiService.js
// Servicio API que centraliza las solicitudes HTTP para interactuar con la API del servidor.

import axios from "axios";

// URL base de la API
const API_BASE_URL = "http://localhost:3000/api";

/**
 * postData
 * Realiza una solicitud HTTP POST a un endpoint específico de la API.
 *
 * @param {string} endpoint - Endpoint de la API al cual enviar la solicitud (ej. 'users').
 * @param {object} data - Datos a enviar en el cuerpo de la solicitud. Debe ser un objeto.
 * @returns {Promise<any>} - Respuesta de la API en formato JSON.
 * @throws {Error} - Lanza un error si los datos son indefinidos o si la solicitud falla.
 */
export const postData = async (endpoint, data) => {
  try {
    if (!data) {
      throw new Error("Cannot read properties of undefined"); // Error personalizado
    }
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error en el POST de ${endpoint}:`, error);
    throw error;
  }
};

/**
 * getData
 * Realiza una solicitud HTTP GET a un endpoint específico de la API.
 *
 * @param {string} endpoint - Endpoint de la API al cual enviar la solicitud (ej. 'users').
 * @returns {Promise<any>} - Respuesta de la API en formato JSON.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const getData = async (endpoint) => {
  console.log(`${API_BASE_URL}/${endpoint}`);
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error en el GET de ${endpoint}:`, error);
    throw error;
  }
};
