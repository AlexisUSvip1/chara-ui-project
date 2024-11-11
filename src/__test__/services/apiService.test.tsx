// apiService.test.tsx
// Pruebas unitarias para el servicio API utilizando axios-mock-adapter para simular respuestas HTTP.

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postData, getData } from "../../services/apiService";

// URL base de la API obtenida de las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe("apiService", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    // Crea una instancia de MockAdapter para axios antes de cada prueba
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    // Restaura axios a su estado original después de cada prueba
    mock.restore();
  });

  describe("postData", () => {
    const endpoint = "testEndpoint";
    const requestData = { key: "value" };

    /**
     * Prueba: post data successfully
     * Verifica que postData envíe datos exitosamente y reciba la respuesta correcta.
     */
    it("should post data successfully", async () => {
      mock.onPost(`${API_BASE_URL}/${endpoint}`).reply(200, { success: true });

      const response = await postData(endpoint, requestData);
      expect(response).toEqual({ success: true });
    });

    /**
     * Prueba: handle post error
     * Verifica que postData maneje correctamente un error de respuesta HTTP 500.
     */
    it("should handle post error", async () => {
      mock.onPost(`${API_BASE_URL}/${endpoint}`).reply(500);

      await expect(postData(endpoint, requestData)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });

    /**
     * Prueba: handle post timeout
     * Verifica que postData maneje correctamente un tiempo de espera agotado.
     */
    it("should handle post timeout", async () => {
      mock.onPost(`${API_BASE_URL}/${endpoint}`).timeout();

      await expect(postData(endpoint, requestData)).rejects.toThrow(
        "timeout of"
      );
    });

    /**
     * Prueba: handle invalid post data
     * Verifica que postData arroje un error al recibir datos de entrada inválidos (undefined).
     */
    it("should handle invalid post data", async () => {
      await expect(postData(endpoint, undefined)).rejects.toThrow(
        "Cannot read properties of undefined"
      );
    });
  });

  describe("getData", () => {
    const endpoint = "testEndpoint";

    /**
     * Prueba: get data successfully
     * Verifica que getData reciba datos correctamente desde el endpoint.
     */
    it("should get data successfully", async () => {
      mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, { key: "value" });

      const response = await getData(endpoint);
      expect(response).toEqual({ key: "value" }); // Comparar con la estructura correcta
    });

    /**
     * Prueba: handle get error
     * Verifica que getData maneje correctamente un error de respuesta HTTP 500.
     */
    it("should handle get error", async () => {
      mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(500);

      await expect(getData(endpoint)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });

    /**
     * Prueba: handle get timeout
     * Verifica que getData maneje correctamente un tiempo de espera agotado.
     */
    it("should handle get timeout", async () => {
      mock.onGet(`${API_BASE_URL}/${endpoint}`).timeout();

      await expect(getData(endpoint)).rejects.toThrow("timeout of");
    });

    /**
     * Prueba: handle get with empty response
     * Verifica que getData maneje correctamente una respuesta vacía del servidor.
     */
    it("should handle get with empty response", async () => {
      mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, null);

      const response = await getData(endpoint);
      expect(response).toBeNull();
    });

    /**
     * Prueba: handle get with null response
     * Verifica que getData maneje correctamente una respuesta nula del servidor.
     */
    it("should handle get with null response", async () => {
      mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, null);

      const response = await getData(endpoint);
      expect(response).toBeNull();
    });
  });
});
