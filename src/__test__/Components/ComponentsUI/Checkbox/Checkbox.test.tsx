// src/__tests__/ComponentsUI/CheckboxForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CheckboxForm } from '../../../../Components/ComponentsUI/Checkbox/Checkbox';

describe('CheckboxForm', () => {
  it('renders all input fields and checkboxes', () => {
    render(<CheckboxForm />);

    // Verifica que los inputs y el checkbox estén en el documento
    expect(screen.getByPlaceholderText('ID de tu custom checkbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Label de tu custom checkbox')).toBeInTheDocument();
    expect(screen.getByText('Sí')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('checks the checkbox functionality', () => {
    render(<CheckboxForm />);

    const yesCheckbox = screen.getAllByRole('checkbox')[0];
    const noCheckbox = screen.getAllByRole('checkbox')[1];

    // Verifica el estado inicial
    expect(yesCheckbox).not.toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    // Cambia el estado de los checkboxes
    fireEvent.click(yesCheckbox);
    expect(yesCheckbox).toBeChecked();
    expect(noCheckbox).not.toBeChecked();

    fireEvent.click(noCheckbox);
    expect(noCheckbox).toBeChecked();
    expect(yesCheckbox).not.toBeChecked();
  });

 
  it('disables save button if required fields are missing', async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole('button', { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('ID de tu custom checkbox'), {
      target: { value: 'test-id' },
    });
    fireEvent.change(screen.getByPlaceholderText('Label de tu custom checkbox'), {
      target: { value: 'Test Label' },
    });
    fireEvent.click(screen.getByText('Sí'));

    expect(saveButton).toBeDisabled();

  });


  it('disables save button if soome files or one are missing', async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole('button', { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('ID de tu custom checkbox'), {
      target: { value: ' ' },
    });
    fireEvent.change(screen.getByPlaceholderText('Label de tu custom checkbox'), {
      target: { value: 'Test Label' },
    });
    fireEvent.click(screen.getByText('Sí'));

    expect(saveButton).toBeDisabled();

  });
  it('keeps the save button disabled if only spaces are entered in required fields', async () => {
    render(<CheckboxForm />);
    const saveButton = screen.getByRole('button', { name: /guardar/i });

    expect(saveButton).toBeDisabled();

    fireEvent.change(screen.getByPlaceholderText('ID de tu custom checkbox'), {
      target: { value: '    ' },
    });
    fireEvent.change(screen.getByPlaceholderText('Label de tu custom checkbox'), {
      target: { value: '    ' },
    });
    fireEvent.click(screen.getByText('Sí'));

    await waitFor(() => {
      expect(saveButton).toBeDisabled();
    });
  });
});
