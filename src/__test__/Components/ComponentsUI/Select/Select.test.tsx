import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SelectForm } from '../../../../Components/ComponentsUI/Select/Select';

describe('SelectForm', () => {
  it('renders all input fields and options counter', () => {
    render(<SelectForm />);
    expect(screen.getByPlaceholderText('ID de tu custom Select')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Label de tu custom Select')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('placeholder de tu custom Select')).toBeInTheDocument();
    expect(screen.getByLabelText('Cantidad de options')).toBeInTheDocument();
  });

  it('disables save button if required fields are missing', () => {
    render(<SelectForm />);
    const saveButton = screen.getByRole('button', { name: /guardar componente select/i });
    expect(saveButton).toBeDisabled();
  });

  it('enables save button when required fields are filled', () => {
    render(<SelectForm />);
    const idInput = screen.getByPlaceholderText('ID de tu custom Select');
    const labelInput = screen.getByPlaceholderText('Label de tu custom Select');
    const placeholderInput = screen.getByPlaceholderText('placeholder de tu custom Select');
    const addOptionButton = screen.getByRole('button', { name: /agregar opción/i }); // Cambiado a "Agregar opción"

    fireEvent.change(idInput, { target: { value: 'Test ID' } });
    fireEvent.change(labelInput, { target: { value: 'Test Label' } });
    fireEvent.change(placeholderInput, { target: { value: 'Test Placeholder' } });
    fireEvent.click(addOptionButton);

    const saveButton = screen.getByRole('button', { name: /guardar componente select/i });
    expect(saveButton).toBeDisabled();
  });

  it('keeps save button disabled if only spaces are entered in required fields', () => {
    render(<SelectForm />);
    const idInput = screen.getByPlaceholderText('ID de tu custom Select');
    const labelInput = screen.getByPlaceholderText('Label de tu custom Select');
    const placeholderInput = screen.getByPlaceholderText('placeholder de tu custom Select');

    fireEvent.change(idInput, { target: { value: '   ' } });
    fireEvent.change(labelInput, { target: { value: '   ' } });
    fireEvent.change(placeholderInput, { target: { value: '   ' } });

    const saveButton = screen.getByRole('button', { name: /guardar componente select/i });
    expect(saveButton).toBeDisabled();
  });

  it('prevents negative numbers in the options count', () => {
    render(<SelectForm />);
    const optionsCountInput = screen.getByLabelText('Cantidad de options');
    fireEvent.change(optionsCountInput, { target: { value: '-1' } });
    expect(optionsCountInput).toHaveValue(0); // Asegura que el valor no puede ser negativo
  });

  it('limits each input field to a maximum of 30 characters', () => {
    render(<SelectForm />);
    const idInput = screen.getByPlaceholderText('ID de tu custom Select');
    const labelInput = screen.getByPlaceholderText('Label de tu custom Select');
    const placeholderInput = screen.getByPlaceholderText('placeholder de tu custom Select');
    const addOptionButton = screen.getByRole('button', { name: /agregar opción/i });

    const longText = 'Este texto es más largo que treinta caracteres';

    // Cambiando los valores de los inputs y verificando truncamiento
    fireEvent.change(idInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(labelInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.change(placeholderInput, { target: { value: longText.slice(0, 30) } });
    fireEvent.click(addOptionButton);

    const optionInput = screen.getByPlaceholderText('Opción 1');
    fireEvent.change(optionInput, { target: { value: longText.slice(0, 30) } });

    // Verificaciones de truncamiento
    expect(idInput).toHaveValue(longText.slice(0, 30));
    expect(labelInput).toHaveValue(longText.slice(0, 30));
    expect(placeholderInput).toHaveValue(longText.slice(0, 30));
    expect(optionInput).toHaveValue(longText.slice(0, 30));
  });
});
