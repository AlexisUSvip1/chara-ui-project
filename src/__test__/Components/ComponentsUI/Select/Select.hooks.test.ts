// src/__tests__/Components/ComponentsUI/Select/Select.hook.test.ts
// Pruebas unitarias para el hook useSelect

import { describe, vi } from "vitest";
import { postData } from "../../../../services/apiService";
import { selectValidationSchema } from "../../../../Components/Utils/Validation/ValidateComponents.utils";
import { useSelect } from "../../../../Components/ComponentsUI/Select/Select.hook";
import { act, renderHook } from "@testing-library/react";

vi.mock("../../../../services/apiService", () => ({
  postData: vi.fn(),
}));
const toastMock = vi.fn();
vi.mock("@chakra-ui/react", () => ({
  useToast: () => toastMock,
}));
vi.mock(
  "../../../../Components/Utils/Validation/ValidateComponents.utils",
  () => ({
    selectValidationSchema: {
      validate: vi.fn(),
    },
  })
);

describe("useSelect", () => {
  // Limpia los mocks después de cada prueba
  afterEach(() => {
    vi.clearAllMocks();
  });

  // Verifica que el hook se inicialice con valores predeterminados
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSelect());
    expect(result.current.selectId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.placeholder).toBe("");
    expect(result.current.options).toEqual([]);
    expect(result.current.selectDataArray).toEqual([]);
  });

  // Añade una opción al hook y verifica que se actualice
  it("should add an option", () => {
    const { result } = renderHook(() => useSelect());
    act(() => {
      result.current.addOption();
    });
    expect(result.current.options.length).toBe(1);
    expect(result.current.options[0].label).toBe("");
  });

  // Actualiza la etiqueta de una opción específica
  it("should update option label", () => {
    const { result } = renderHook(() => useSelect());
    act(() => {
      result.current.addOption();
    });
    act(() => {
      result.current.updateOptionLabel(1, "Updated Label");
    });
    expect(result.current.options[0].label).toBe("Updated Label");
  });

  // Elimina una opción del hook
  it("should remove an option", () => {
    const { result } = renderHook(() => useSelect());
    act(() => {
      result.current.addOption();
    });
    expect(result.current.options.length).toBe(1);
    act(() => {
      result.current.removeOption(1);
    });
    expect(result.current.options.length).toBe(0);
  });

  // Resetea los campos tras un guardado exitoso
  it("should reset fields after successful save", async () => {
    const { result } = renderHook(() => useSelect());
    act(() => {
      result.current.setSelectId("Test ID");
      result.current.setLabel("Test Label");
      result.current.setPlaceholder("Test Placeholder");
      result.current.addOption();
      result.current.updateOptionLabel(1, "Option 1");
    });

    (selectValidationSchema.validate as vi.Mock).mockResolvedValue(true);
    (postData as vi.Mock).mockResolvedValue({ success: true });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.selectId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.placeholder).toBe("");
    expect(result.current.options).toEqual([]);
  });

  // Muestra un error de validación cuando los datos son inválidos
  it("should show validation error when data is invalid", async () => {
    const { result } = renderHook(() => useSelect());
    vi.spyOn(selectValidationSchema, "validate").mockRejectedValueOnce({
      name: "ValidationError",
      message: "Validation error",
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error de validación",
        description:
          "Por favor completa todos los campos requeridos correctamente.",
        status: "error",
      })
    );
  });

  // Maneja errores del servidor al guardar
  it("should handle server error during save", async () => {
    const { result } = renderHook(() => useSelect());
    (selectValidationSchema.validate as vi.Mock).mockResolvedValue(true);
    (postData as vi.Mock).mockRejectedValueOnce(new Error("Server error"));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error al guardar",
        description: "Hubo un problema al guardar el componente select.",
        status: "error",
      })
    );
  });
});
