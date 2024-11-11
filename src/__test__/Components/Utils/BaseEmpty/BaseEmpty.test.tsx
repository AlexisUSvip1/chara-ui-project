import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BaseEmpty } from '../../../../Components/Utils/BaseEmpty/BaseEmpty';
import { WarningIcon } from '@chakra-ui/icons';

describe('BaseEmpty Component', () => {
  it('should render with default message and icon', () => {
    render(<BaseEmpty />);

    // Verifica que el mensaje por defecto se muestra
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
    
    // Verifica que el ícono por defecto se muestra
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with a custom message', () => {
    const customMessage = 'No se encontraron resultados';
    render(<BaseEmpty message={customMessage} />);

    // Verifica que el mensaje personalizado se muestra
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should render with a custom icon', () => {
    const CustomIcon = WarningIcon; // Usamos WarningIcon como ejemplo de un icono personalizado
    render(<BaseEmpty icon={CustomIcon} />);

    // Verifica que el icono personalizado se muestra
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
});
