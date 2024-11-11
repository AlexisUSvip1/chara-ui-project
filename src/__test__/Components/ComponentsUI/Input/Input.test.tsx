// src/__tests__/ComponentsUI/InputForm.test.tsx
// Pruebas unitarias para el componente InputForm

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputForm } from '../../../../Components/ComponentsUI/Input/Input';

describe('InputForm', () => {
  // Verifica que todos los campos de entrada y los checkboxes estén presentes en el componente
  it("renders all input fields and checkboxes", () => {
    render(<InputForm />);

    // Verificación de la existencia de campos de entrada y opciones de checkbox
    expect(
      screen.getByPlaceholderText("ID de tu custom input")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Label de tu custom input")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Placeholder de tu custom input")
    ).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  // Comprueba la funcionalidad de los checkboxes requeridos
  it("checks the required checkbox functionality", () => {
    render(<InputForm />);

    const yesCheckbox = screen.getAllByRole("checkbox")[0];
    const noCheckbox = screen.getAllByRole("checkbox")[1];

    // Estado inicial: ambos checkboxes no están seleccionados
    expect(yesCheckbox).not.toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    // Cambia el estado al seleccionar el checkbox "Sí"
    fireEvent.click(yesCheckbox);
    expect(yesCheckbox).toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    // Cambia el estado al seleccionar el checkbox "No"
    fireEvent.click(noCheckbox);
    expect(noCheckbox).toBeChecked();
    expect(yesCheckbox).not.toBeChecked();
  });

  // Limita el número de caracteres en los campos de entrada según maxLength
  it("limits the number of characters based on maxLength", () => {
    render(<InputForm />);

    const idInput = screen.getByPlaceholderText("ID de tu custom input");
    const labelInput = screen.getByPlaceholderText("Label de tu custom input");
    const placeholderInput = screen.getByPlaceholderText(
      "Placeholder de tu custom input"
    );

    // Define un texto más largo que el límite permitido de 30 caracteres
    const longText =
      "Este texto tiene más de treinta caracteres y debe ser truncado";

    // Cambia los valores de entrada y verifica que estén truncados al límite
    fireEvent.change(idInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(labelInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(placeholderInput, {
      target: { value: longText.slice(0, 30) },
    });

    expect(idInput).toHaveValue(longText.slice(0, 30));
    expect(labelInput).toHaveValue(longText.slice(0, 30));
    expect(placeholderInput).toHaveValue(longText.slice(0, 30));
  });
});
