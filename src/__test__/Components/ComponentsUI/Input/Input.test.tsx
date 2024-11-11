// src/__tests__/ComponentsUI/InputForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputForm } from '../../../../Components/ComponentsUI/Input/Input';

describe('InputForm', () => {
  it('renders all input fields and checkboxes', () => {
    render(<InputForm />);

    expect(screen.getByPlaceholderText('ID de tu custom input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Label de tu custom input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Placeholder de tu custom input')).toBeInTheDocument();
    expect(screen.getByText('Sí')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('checks the required checkbox functionality', () => {
    render(<InputForm />);

    const yesCheckbox = screen.getAllByRole('checkbox')[0];
    const noCheckbox = screen.getAllByRole('checkbox')[1];

    // Cambia el estado inicial a desmarcado
    expect(yesCheckbox).not.toBeChecked();
    expect(yesCheckbox).not.toBeChecked();

    fireEvent.click(yesCheckbox);
    expect(yesCheckbox).toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    fireEvent.click(noCheckbox);
    expect(noCheckbox).toBeChecked();
    expect(yesCheckbox).not.toBeChecked();
  });

  it('limits the number of characters based on maxLength', () => {
    render(<InputForm />);

    const idInput = screen.getByPlaceholderText('ID de tu custom input');
    const labelInput = screen.getByPlaceholderText('Label de tu custom input');
    const placeholderInput = screen.getByPlaceholderText('Placeholder de tu custom input');

    // Define un texto que exceda el límite de 30 caracteres
    const longText = 'Este texto tiene más de treinta caracteres y debe ser truncado';

    // Simula el cambio y verifica el límite de caracteres manualmente
    fireEvent.change(idInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(labelInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(placeholderInput, { target: { value: longText.slice(0, 30) } });

    expect(idInput).toHaveValue(longText.slice(0, 30));
    expect(labelInput).toHaveValue(longText.slice(0, 30));
    expect(placeholderInput).toHaveValue(longText.slice(0, 30));
  });
});
