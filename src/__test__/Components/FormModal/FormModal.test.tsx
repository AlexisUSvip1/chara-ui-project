import { render, screen } from '@testing-library/react';
import { FormModal } from '../../../Components/FormModal/FormModal';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

describe('FormModal', () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it('renders CheckboxForm when title is "Checkbox"', () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Checkbox" />);
    
    // Verifica que el título del modal se encuentra en el documento
    expect(screen.getByText('Crear tu componente Checkbox')).toBeInTheDocument();

    // Busca el texto "Sí" que acompaña al Checkbox
    expect(screen.getByText('Sí')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();

    // Verifica el Checkbox usando el rol
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2); // Verifica que hay dos checkboxes, "Sí" y "No"
  });

  it('renders InputForm when title is "Input"', () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Input" />);
    expect(screen.getByText('Crear tu componente Input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ID de tu custom input')).toBeInTheDocument();
  });

  it('closes modal when onClose is triggered', () => {
    render(<FormModal isOpen={true} onClose={onCloseMock} title="Checkbox" />);
    screen.getByRole('button', { name: /close/i }).click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
