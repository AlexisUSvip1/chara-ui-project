// src/__tests__/ComponentsUI/CheckboxForm.test.tsx
// Pruebas unitarias para el componente CheckboxForm

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckboxForm } from '../../../../Components/ComponentsUI/Checkbox/Checkbox';

describe('CheckboxForm', () => {
  // Verifica que todos los campos de entrada y opciones de checkbox se rendericen correctamente
  it("renders all input fields and checkboxes", () => {
    render(<CheckboxForm />);

    // Verificación de presencia de campos y opciones
    expect(
      screen.getByPlaceholderText("ID de tu custom checkbox")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Label de tu custom checkbox")
    ).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  // Comprueba la funcionalidad de selección de los checkboxes
  it("checks the checkbox functionality", () => {
    render(<CheckboxForm />);

    const yesCheckbox = screen.getAllByRole("checkbox")[0];
    const noCheckbox = screen.getAllByRole("checkbox")[1];

    // Estado inicial de los checkboxes
    expect(yesCheckbox).not.toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    // Cambia el estado de selección de los checkboxes
    fireEvent.click(yesCheckbox);
    expect(yesCheckbox).toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    fireEvent.click(noCheckbox);
    expect(noCheckbox).toBeChecked();
    expect(yesCheckbox).not.toBeChecked();
  });

  // Deshabilita el botón de guardar si los campos requeridos están vacíos
  it("disables save button if required fields are missing", async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole("button", { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("ID de tu custom checkbox"), {
      target: { value: "test-id" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Label de tu custom checkbox"),
      {
        target: { value: "Test Label" },
      }
    );
    fireEvent.click(screen.getByText("Sí"));

    expect(saveButton).toBeDisabled();
  });

  // Verifica que el botón de guardar permanezca deshabilitado si falta un campo
  it("disables save button if some fields are missing", async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole("button", { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("ID de tu custom checkbox"), {
      target: { value: " " },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Label de tu custom checkbox"),
      {
        target: { value: "Test Label" },
      }
    );
    fireEvent.click(screen.getByText("Sí"));

    expect(saveButton).toBeDisabled();
  });

  // Mantiene el botón de guardar deshabilitado si los campos requeridos contienen solo espacios
  it("keeps the save button disabled if only spaces are entered in required fields", async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole("button", { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText("ID de tu custom checkbox"), {
      target: { value: "    " },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Label de tu custom checkbox"),
      {
        target: { value: "    " },
      }
    );
    fireEvent.click(screen.getByText("Sí"));

    await waitFor(() => {
      expect(saveButton).toBeDisabled();
    });
  });
});
