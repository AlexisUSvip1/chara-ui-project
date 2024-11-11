import { describe, it, expect, beforeEach, vi } from "vitest";
import { useToast } from "@chakra-ui/react";
import { useCheckbox } from "../../../../Components/ComponentsUI/Checkbox/Checkbox.hooks";
import { act, renderHook } from "@testing-library/react";
import { checkboxValidationSchema } from "../../../../Components/Utils/Validation/ValidateComponents.utils";
import { postData } from "../../../../services/apiService";
import { ValidationError } from "yup";

// Mockear módulos con `vi` en lugar de `jest`
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

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useCheckbox());
    expect(result.current.checkboxId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.isChecked).toBe(null);
    expect(result.current.data).toEqual([]);
  });

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

  it("should send the information when the state is full", async () => {
    const { result } = renderHook(() => useCheckbox());
  
    // Simulamos llenar el estado con valores completos
    act(() => {
      result.current.setCheckboxId("test-id-full");
      result.current.setLabel("test-label-full");
      result.current.setIsChecked(true);
    });
  
    // Mockear la validación y la llamada a postData como exitosa
    vi.spyOn(checkboxValidationSchema, "validate").mockResolvedValue({ isChecked: true, id:'', label:'' });
    (postData as vi.Mock).mockResolvedValue({ success: true });
  
    // Ejecutar la función de guardar
    await act(async () => {
      await result.current.handleSave();
    });
  
    // Verificar que postData fue llamada con los datos completos
    expect(postData).toHaveBeenCalledWith("checkbox", [
      {
        type: "checkbox",
        props: { id: "test-id-full", label: "test-label-full", isChecked: true },
      },
    ]);
  
    // Verificar que se muestra el toast de éxito
    expect(toastMock).toHaveBeenCalledWith({
      title: "Guardado exitoso",
      description: "El componente checkbox ha sido guardado correctamente.",
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  });
  it("should show validation error if data is invalid", async () => {
    const { result } = renderHook(() => useCheckbox());
    
    vi.spyOn(checkboxValidationSchema, "validate").mockRejectedValueOnce(new ValidationError("Validation error"));
  
    await act(async () => {
      await result.current.handleSave();
    });
  
    expect(toastMock).toHaveBeenCalledWith({
      title: "Error de validación",
      description: "Por favor completa todos los campos requeridos correctamente.",
      status: "error",
      duration: 4000,
      isClosable: true,
      position: "top",
    });
  });
  it("should reset checkboxId, label, and isChecked after successful save", async () => {
    const { result } = renderHook(() => useCheckbox());

    // Mock para simular una validación exitosa
    (checkboxValidationSchema.validate as vi.Mock).mockResolvedValue(true);
    // Mock para simular un envío exitoso de datos
    (postData as vi.Mock).mockResolvedValue({ success: true });

    // Establecer valores en los estados
    act(() => {
      result.current.setCheckboxId("test-id");
      result.current.setLabel("Test Label");
      result.current.setIsChecked(true);
    });

    // Ejecutar el handleSave
    await act(async () => {
      await result.current.handleSave();
    });

    // Verificar que los estados estén vacíos después de guardar
    expect(result.current.checkboxId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.isChecked).toBeNull();
  });
  
});
