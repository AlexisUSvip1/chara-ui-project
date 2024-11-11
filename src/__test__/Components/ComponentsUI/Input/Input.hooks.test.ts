// src/__test__/Components/ComponentsUI/Input/Input.hooks.test.ts
import { renderHook, act } from '@testing-library/react';
import { useInput } from '../../../../Components/ComponentsUI/Input/useInput.hooks';
import { vi } from 'vitest';
import { postData } from '../../../../services/apiService';
import { inputValidationSchema } from '../../../../Components/Utils/Validation/ValidateComponents.utils';
// Mock para postData y useToast
vi.mock('../../../../services/apiService', () => ({
  postData: vi.fn(),
}));
const toastMock = vi.fn();
vi.mock('@chakra-ui/react', () => ({
  useToast: () => toastMock,
}));
describe('useInput Hook', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useInput());
    
    expect(result.current.inputId).toBe('');
    expect(result.current.label).toBe('');
    expect(result.current.placeholder).toBe('');
    expect(result.current.isRequired).toBe(false);
  });

  it('should update values correctly', () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.setInputId('testId');
      result.current.setLabel('testLabel');
      result.current.setPlaceholder('testPlaceholder');
      result.current.setIsRequired(true);
    });

    expect(result.current.inputId).toBe('testId');
    expect(result.current.label).toBe('testLabel');
    expect(result.current.placeholder).toBe('testPlaceholder');
    expect(result.current.isRequired).toBe(true);
  });

  it('should call handleSave function', async () => {
    const { result } = renderHook(() => useInput());
    const handleSaveMock = vi.fn(result.current.handleSave);

    await act(async () => {
      await handleSaveMock();
    });

    expect(handleSaveMock).toHaveBeenCalled();
  });

  it('should call handleSave successfully and show success toast', async () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.setInputId('testId');
      result.current.setLabel('testLabel');
      result.current.setPlaceholder('testPlaceholder');
      result.current.setIsRequired(true);
    });

    (postData as jest.Mock).mockResolvedValueOnce({ success: true });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(postData).toHaveBeenCalledWith("input", [
      expect.objectContaining({
        type: 'input',
        props: {
          id: 'testId',
          label: 'testLabel',
          placeholder: 'testPlaceholder',
          isRequired: true,
        },
      }),
    ]);

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Guardado exitoso",
        description: "El componente input ha sido guardado correctamente.",
        status: "success",
      })
    );
  });

  it('should show validation error when data is invalid', async () => {
    const { result } = renderHook(() => useInput());

    // Mock para forzar un error de validación
    vi.spyOn(inputValidationSchema, 'validate').mockRejectedValueOnce({
      name: 'ValidationError',
      message: 'Validation error',
      errors: ['El campo label es requerido.'],
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos.",
        status: "error",
      })
    );
  });

  it('should show API error when postData fails', async () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.setInputId('testId');
      result.current.setLabel('testLabel');
      result.current.setPlaceholder('testPlaceholder');
      result.current.setIsRequired(true);
    });
    // Mock para forzar un error en la API
    (postData as jest.Mock).mockRejectedValueOnce(new Error('Server error'));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error al guardar",
        description: "Hubo un problema al guardar el componente input.",
        status: "error",
        duration: 4000,
          isClosable: true,
          position: "top",
      })
    );
  });
  it('should show API error when postData some results', async () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.setInputId('');
      result.current.setLabel('testLabel');
      result.current.setPlaceholder('testPlaceholder');
      result.current.setIsRequired(true);
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      })
    );
  });
  it('should show API error when postData isEmpty', async () => {
    const { result } = renderHook(() => useInput());

    act(() => {
      result.current.setInputId('');
      result.current.setLabel('');
      result.current.setPlaceholder('');
      result.current.setIsRequired();
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Error de validación",
        description: "Por favor completa todos los campos requeridos.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      })
    );
  });
});
