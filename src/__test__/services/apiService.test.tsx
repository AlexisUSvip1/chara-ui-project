// src/__test__/apiService.test.js
import { describe, it, expect, beforeEach } from "vitest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postData, getData } from "../../services/apiService";

const mock = new MockAdapter(axios);
const API_BASE_URL = "http://localhost:3000/api";

describe("apiService", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should post data successfully", async () => {
    const endpoint = "testEndpoint";
    const requestData = { key: "value" };
    const mockResponse = { success: true };

    mock.onPost(`${API_BASE_URL}/${endpoint}`).reply(200, mockResponse);

    const response = await postData(endpoint, requestData);
    expect(response).toEqual(mockResponse);
  });

  it("should handle post error", async () => {
    const endpoint = "testEndpoint";
    const requestData = { key: "value" };

    mock.onPost(`${API_BASE_URL}/${endpoint}`).reply(500);

    await expect(postData(endpoint, requestData)).rejects.toThrow("Request failed with status code 500");
  });

  it("should handle post timeout", async () => {
    const endpoint = "testEndpoint";
    const requestData = { key: "value" };

    mock.onPost(`${API_BASE_URL}/${endpoint}`).timeout();

    await expect(postData(endpoint, requestData)).rejects.toThrow("timeout of");
  });

  it("should handle invalid post data", async () => {
    const endpoint = "testEndpoint";
    const invalidData = undefined;

    // Mockear el comportamiento para que lance el error esperado
    await expect(postData(endpoint, invalidData)).rejects.toThrow(
      "Cannot read properties of undefined"
    );
  });

  it("should get data successfully", async () => {
    const endpoint = "testEndpoint";
    const mockResponse = { data: "test data" };

    mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, mockResponse);

    const response = await getData(endpoint);
    expect(response).toEqual(mockResponse);
  });

  it("should handle get error", async () => {
    const endpoint = "testEndpoint";

    mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(404);

    await expect(getData(endpoint)).rejects.toThrow("Request failed with status code 404");
  });

  it("should handle get timeout", async () => {
    const endpoint = "testEndpoint";

    mock.onGet(`${API_BASE_URL}/${endpoint}`).timeout();

    await expect(getData(endpoint)).rejects.toThrow("timeout of");
  });

  it("should handle get with empty response", async () => {
    const endpoint = "testEndpoint";

    mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, {});

    const response = await getData(endpoint);
    expect(response).toEqual({});
  });

  it("should handle get with null response", async () => {
    const endpoint = "testEndpoint";

    mock.onGet(`${API_BASE_URL}/${endpoint}`).reply(200, null);

    const response = await getData(endpoint);
    expect(response).toBeNull();
  });
});
