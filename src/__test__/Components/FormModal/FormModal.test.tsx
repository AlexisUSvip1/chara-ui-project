// src/__tests__/Components/FormModal/FormModal.test.tsx
// Pruebas unitarias para el componente FormModal.

import { render, screen } from "@testing-library/react";
import { FormModal } from "../../../Components/FormModal/FormModal";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("FormModal", () => {
  // Mock para la función onClose que se llama al cerrar el modal
  const onCloseMock = vi.fn();

  // Limpia el mock antes de cada prueba
  beforeEach(() => {
    onCloseMock.mockClear();
  });

  /**
   * Prueba: renderiza CheckboxForm
   * Verifica que el modal renderice correctamente el formulario Checkbox cuando el título es "Checkbox".
   */
  it('renders CheckboxForm when title is "Checkbox"', () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Checkbox" />);

    // Verifica que el título del modal se muestra correctamente
    expect(
      screen.getByText("Crear tu componente Checkbox")
    ).toBeInTheDocument();

    // Verifica los textos "Sí" y "No" correspondientes al Checkbox
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();

    // Verifica que existen dos checkboxes usando el rol
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBe(2); // Verifica que hay dos checkboxes: "Sí" y "No"
  });

  /**
   * Prueba: renderiza InputForm
   * Verifica que el modal renderice correctamente el formulario Input cuando el título es "Input".
   */
  it('renders InputForm when title is "Input"', () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Input" />);

    // Verifica que el título y el placeholder de input se muestran correctamente
    expect(screen.getByText("Crear tu componente Input")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("ID de tu custom input")
    ).toBeInTheDocument();
  });

  /**
   * Prueba: cierre del modal
   * Verifica que la función onClose se llame correctamente cuando se cierra el modal.
   */
  it("closes modal when onClose is triggered", () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Checkbox" />);

    // Simula el clic en el botón de cierre del modal
    screen.getByRole("button", { name: /close/i }).click();

    // Verifica que la función onClose se llame una vez
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
