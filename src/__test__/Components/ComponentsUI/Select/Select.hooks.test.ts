import {describe , vi } from "vitest";
import { postData } from "../../../../services/apiService";
import { selectValidationSchema } from "../../../../Components/Utils/Validation/ValidateComponents.utils";
import { useSelect } from "../../../../Components/ComponentsUI/Select/Select.hook";
import { act, renderHook } from "@testing-library/react";

// Mock para API y Toast usando Vitest
vi.mock("../../../../services/apiService", () => ({
  postData: vi.fn(),
}));
const toastMock = vi.fn();
vi.mock("@chakra-ui/react", () => ({
  useToast: () => toastMock,
}));
vi.mock("../../../../Components/Utils/Validation/ValidateComponents.utils", () => ({
  selectValidationSchema: {
    validate: vi.fn(),
  },
}));

describe("useSelect", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSelect());

    expect(result.current.selectId).toBe("");
    expect(result.current.label).toBe("");
    expect(result.current.placeholder).toBe("");
    expect(result.current.options).toEqual([]);
    expect(result.current.selectDataArray).toEqual([]);
  });

  it("should add an option", () => {
    const { result } = renderHook(() => useSelect());

    act(() => {
      result.current.addOption();
    });

    expect(result.current.options.length).toBe(1);
    expect(result.current.options[0].label).toBe("");
  });

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

  
  it("should remove an option", () => {
    
    
      const { result } = renderHook(() => useSelect());
  
      // Añade dos opciones antes de intentar eliminar una
      act(() => {
        result.current.addOption();
 
      });
  
      expect(result.current.options.length).toBe(1); // Verifica que hay dos opciones
   
      // Elimina la opción con ID 1
      act(() => {
        result.current.removeOption(1);
      });
  
      expect(result.current.options.length).toBe(0);
   
  });

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

  it("should show validation error when data is invalid", async () => {
    const { result } = renderHook(() => useSelect());
  
    // Simula un error de validación en la función validate
    vi.spyOn(selectValidationSchema, "validate").mockRejectedValueOnce({
      name: "ValidationError",
      message: "Validation error"
    });
  
    await act(async () => {
      await result.current.handleSave();
    });
  
    // Verifica que el toastMock sea llamado con el mensaje específico de error de validación
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos correctamente.",
        status: "error",
      })
    );
  });
  

  it("should handle server error during save", async () => {
    const { result } = renderHook(() => useSelect());

    (selectValidationSchema.validate as vi.Mock).mockResolvedValue(true);
    (postData as vi.Mock).mockRejectedValueOnce(new Error("Server error"));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(expect.objectContaining({
      title: "Error al guardar",
      description: "Hubo un problema al guardar el componente select.",
      status: "error"
    }));
  });
});
