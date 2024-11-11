import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BaseEmpty } from '../../../../Components/Utils/BaseEmpty/BaseEmpty';
import { WarningIcon } from '@chakra-ui/icons';

describe('BaseEmpty Component', () => {
  /**
   * Test: should render with default message and icon
   * Verifica que el componente `BaseEmpty` se renderice con el mensaje e icono predeterminados.
   */
  it("should render with default message and icon", () => {
    render(<BaseEmpty />);

    // Verifica que el mensaje por defecto se muestra
    expect(screen.getByText("No hay datos disponibles")).toBeInTheDocument();

    // Verifica que el ícono por defecto se muestra
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  /**
   * Test: should render with a custom message
   * Verifica que el componente `BaseEmpty` se renderice con un mensaje personalizado cuando se le pasa como prop.
   */
  it("should render with a custom message", () => {
    const customMessage = "No se encontraron resultados";
    render(<BaseEmpty message={customMessage} />);

    // Verifica que el mensaje personalizado se muestra
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  /**
   * Test: should render with a custom icon
   * Verifica que el componente `BaseEmpty` se renderice con un icono personalizado cuando se le pasa como prop.
   */
  it("should render with a custom icon", () => {
    const CustomIcon = WarningIcon; // Usamos WarningIcon como ejemplo de un icono personalizado
    render(<BaseEmpty icon={CustomIcon} />);

    // Verifica que el icono personalizado se muestra
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });
});
