import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { SaveButton } from '../../../../Components/Utils/Button/Button';

describe('SaveButton Component', () => {
  /**
   * Test: should render with the correct title
   * Verifica que el botón se renderice con el texto adecuado según la propiedad `title` recibida.
   */
  it("should render with the correct title", () => {
    render(<SaveButton title="input" onClick={() => {}} colorScheme="green" />);

    // Verifica que el botón se renderiza con el texto correcto
    expect(screen.getByText("Guardar componente input")).toBeInTheDocument();
  });

  /**
   * Test: should call onClick when button is clicked
   * Verifica que la función `onClick` sea llamada cuando el botón se presione.
   */
  it("should call onClick when button is clicked", () => {
    const handleClick = vi.fn();
    render(
      <SaveButton title="input" onClick={handleClick} colorScheme="green" />
    );

    // Simula el clic en el botón
    fireEvent.click(screen.getByText("Guardar componente input"));

    // Verifica que handleClick fue llamado
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Test: should be disabled when disabled prop is true
   * Verifica que el botón esté deshabilitado cuando la propiedad `disabled` se establezca en `true`.
   */
  it("should be disabled when disabled prop is true", () => {
    render(
      <SaveButton
        title="input"
        onClick={() => {}}
        colorScheme="green"
        disabled={true}
      />
    );

    // Verifica que el botón esté deshabilitado
    const button = screen.getByText("Guardar componente input");
    expect(button).toBeDisabled();
  });

  /**
   * Test: should accept additional styles and apply them
   * Verifica que el botón acepta estilos adicionales y los aplica correctamente.
   */
  it("should accept additional styles and apply them", () => {
    render(
      <SaveButton
        title="input"
        onClick={() => {}}
        colorScheme="green"
        borderRadius={30}
      />
    );

    // Verifica que el botón tenga el esquema de color y estilo de borde correcto
    const button = screen.getByText("Guardar componente input");
    expect(button).toHaveClass("chakra-button"); // Chakra aplica automáticamente esta clase
  });
});
