// src/__tests__/Hooks/usePreviewContainer.test.ts
// Pruebas unitarias para el hook usePreviewContainer utilizando mocks para la función getData en apiService.

import { act, renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";
import { usePreviewContainer } from "../../../Components/PreviewContainer/PreviewContainer.hooks";
import { getData } from "../../../services/apiService";
import { waitFor } from "@testing-library/react";

// Mock de la función getData para simular la respuesta de la API
vi.mock("../../../services/apiService", () => ({
  getData: vi.fn(),
}));

describe("usePreviewContainer Hook", () => {
  /**
   * Prueba: setea el título del modal
   * Verifica que el título del modal se actualice correctamente al llamar a handleOpenModal.
   */
  it("should set modal title when handleOpenModal is called", () => {
    const { result } = renderHook(() => usePreviewContainer());
    act(() => result.current.handleOpenModal("Input"));
    expect(result.current.modalTitle).toBe("Input");
  });

  /**
   * Prueba: fetch de datos exitoso
   * Verifica que handleGetInformation haga una solicitud exitosa, estableciendo correctamente componentData.
   */
  it("should fetch data and set componentData on successful call to handleGetInformation", async () => {
    const mockData = { data: [{ props: {} }, { props: {} }] };
    (getData as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Input");
    });

    // Espera hasta que componentData tenga la longitud esperada
    await waitFor(() => expect(result.current.componentData).toHaveLength(2), {
      timeout: 2000,
    });
  });

  /**
   * Prueba: manejo de errores en fetch de datos
   * Verifica que handleGetInformation maneje correctamente un fallo en la solicitud y que componentData se mantenga vacío.
   */
  it("should handle error when data fetch fails in handleGetInformation", async () => {
    (getData as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Input");
    });

    // Espera hasta que componentData esté vacío tras un fallo en la solicitud
    await waitFor(() => expect(result.current.componentData).toEqual([]), {
      timeout: 2000,
    });
  });

  /**
   * Prueba: toggle de estado isOpen
   * Verifica que el estado isOpen cambie correctamente al abrir y cerrar el modal.
   */
  it("should toggle isOpen state with onOpen and onClose", () => {
    const { result } = renderHook(() => usePreviewContainer());
    act(() => result.current.handleOpenModal("Input"));
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);
  });

  /**
   * Prueba: toggle de estado isCounterOpen
   * Verifica que el estado isCounterOpen cambie correctamente al abrir y cerrar el contador.
   */
  it("should toggle isCounterOpen state with onOpenCounter and onCloseCounter", async () => {
    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Checkbox");
    });
    expect(result.current.isCounterOpen).toBe(true);

    act(() => result.current.onCloseCounter());
    expect(result.current.isCounterOpen).toBe(false);
  });
});
