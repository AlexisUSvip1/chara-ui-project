import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CounterComponents } from '../../../../Components/FormModal/ShowComponentsUI/CounterComponents';

describe('CounterComponents', () => {
  const mockData = [
    { type: 'input', props: { id: '1', label: 'First Input', placeholder: 'Enter text', isRequired: true } },
    { type: 'checkbox', props: { id: '2', label: 'Agree to Terms', isChecked: true } },
  ];

  it('should render the CounterComponents modal with data', () => {
    render(<CounterComponents isOpen={true} onClose={() => {}} title="Test Title" data={mockData} />);
    
    // Check that the modal title appears
    expect(screen.getByText('Ver Componentes de Test Title')).toBeInTheDocument();

    // Check that each item label appears
    expect(screen.getByText('First Input')).toBeInTheDocument();
    expect(screen.getByText('Agree to Terms')).toBeInTheDocument();

    // Check that input and checkbox are rendered correctly
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('readonly');

    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toBeChecked();
  });

  it('should render BaseEmpty message when there is no data', () => {
    render(<CounterComponents isOpen={true} onClose={() => {}} title="Test Title" data={[]} />);

    // Check for BaseEmpty component message
    expect(screen.getByText('Aún no hay registros')).toBeInTheDocument();
  });
});
