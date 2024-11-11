// src/__tests__/ComponentsUI/Checkbox/Checkbox.hooks.test.ts
// Pruebas unitarias para el hook useCheckbox

import { describe, it, expect, beforeEach, vi } from "vitest";
import { useToast } from "@chakra-ui/react";
import { useCheckbox } from "../../../../Components/ComponentsUI/Checkbox/Checkbox.hooks";
import { act, renderHook } from "@testing-library/react";
import { checkboxValidationSchema } from "../../../../Components/Utils/Validation/ValidateComponents.utils";
import { postData } from "../../../../services/apiService";
import { ValidationError } from "yup";

// Mock para useToast de Chakra UI y postData
vi.mock("@chakra-ui/react", () => ({
  useToast: vi.fn(),
}));

vi.mock("../../../../services/apiService", () => ({
  postData: vi.fn(),
}));

describe("useCheckbox", () => {
  const toastMock = vi.fn();
  (useToast as vi.Mock).mockReturnValue(toastMock);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Verifica que el hook inicialice con valores por defecto
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCheckbox());
    expect(result.current.checkboxId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.isChecked).toBe(null);
    expect(result.current.data).toEqual([]);
  });

  // Verifica la actualización de los estados checkboxId, label, y isChecked
  it("should update checkboxId, label, and isChecked", () => {
    const { result } = renderHook(() => useCheckbox());

    act(() => {
      result.current.setCheckboxId("test-id");
      result.current.setLabel("test-label");
      result.current.setIsChecked(true);
    });

    expect(result.current.checkboxId).toBe("test-id");
    expect(result.current.label).toBe("test-label");
    expect(result.current.isChecked).toBe(true);
  });

  // Verifica el envío de información con datos completos
  it("should send the information when the state is full", async () => {
    const { result } = renderHook(() => useCheckbox());

    act(() => {
      result.current.setCheckboxId("test-id-full");
      result.current.setLabel("test-label-full");
      result.current.setIsChecked(true);
    });

    // Mock para validación y envío de datos
    vi.spyOn(checkboxValidationSchema, "validate").mockResolvedValue({
      isChecked: true,
      id: "",
      label: "",
    });
    (postData as vi.Mock).mockResolvedValue({ success: true });

    await act(async () => {
      await result.current.handleSave();
    });

    // Verifica que se llamó a postData y se muestra el toast de éxito
    expect(postData).toHaveBeenCalledWith("checkbox", [
      {
        type: "checkbox",
        props: {
          id: "test-id-full",
          label: "test-label-full",
          isChecked: true,
        },
      },
    ]);

    expect(toastMock).toHaveBeenCalledWith({
      title: "Guardado exitoso",
      description: "El componente checkbox ha sido guardado correctamente.",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  });

  // Verifica el error de validación si los datos no son válidos
  it("should show validation error if data is invalid", async () => {
    const { result } = renderHook(() => useCheckbox());

    vi.spyOn(checkboxValidationSchema, "validate").mockRejectedValueOnce(
      new ValidationError("Validation error")
    );

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith({
      title: "Error de validación",
      description:
        "Por favor completa todos los campos requeridos correctamente.",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  });

  // Resetea los campos después de guardar exitosamente
  it("should reset checkboxId, label, and isChecked after successful save", async () => {
    const { result } = renderHook(() => useCheckbox());

    (checkboxValidationSchema.validate as vi.Mock).mockResolvedValue(true);
    (postData as vi.Mock).mockResolvedValue({ success: true });

    act(() => {
      result.current.setCheckboxId("test-id");
      result.current.setLabel("Test Label");
      result.current.setIsChecked(true);
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(result.current.checkboxId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.isChecked).toBeNull();
  });
});
