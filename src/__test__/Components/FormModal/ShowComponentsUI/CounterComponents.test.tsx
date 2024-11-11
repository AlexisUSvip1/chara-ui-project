// src/__tests__/Components/FormModal/ShowComponentsUI/CounterComponents.test.tsx
// Pruebas unitarias para el componente CounterComponents.

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CounterComponents } from "../../../../Components/FormModal/ShowComponentsUI/CounterComponents";

describe("CounterComponents", () => {
  // Datos simulados para pruebas que representan un input y un checkbox
  const mockData = [
    {
      type: "input",
      props: {
        id: "1",
        label: "First Input",
        placeholder: "Enter text",
        isRequired: true,
      },
    },
    {
      type: "checkbox",
      props: { id: "2", label: "Agree to Terms", isChecked: true },
    },
  ];

  /**
   * Prueba: Renderiza el modal con datos
   * Verifica que el modal de CounterComponents renderice correctamente cuando se pasa data.
   */
  it("should render the CounterComponents modal with data", () => {
    render(
      <CounterComponents
        isOpen={true}
        onClose={() => {}}
        title="Test Title"
        data={mockData}
      />
    );

    // Verifica que el título del modal aparece correctamente
    expect(
      screen.getByText("Ver Componentes de Test Title")
    ).toBeInTheDocument();

    // Verifica que las etiquetas de los ítems de datos se muestran correctamente
    expect(screen.getByText("First Input")).toBeInTheDocument();
    expect(screen.getByText("Agree to Terms")).toBeInTheDocument();

    // Verifica que el input y el checkbox se renderizan correctamente
    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("readonly"); // Verifica que el input es de solo lectura

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).toBeChecked(); // Verifica que el checkbox está marcado
  });

  /**
   * Prueba: Renderiza BaseEmpty cuando no hay datos
   * Verifica que el componente muestre el mensaje de BaseEmpty cuando la data está vacía.
   */
  it("should render BaseEmpty message when there is no data", () => {
    render(
      <CounterComponents
        isOpen={true}
        onClose={() => {}}
        title="Test Title"
        data={[]}
      />
    );

    // Verifica que se muestra el mensaje de BaseEmpty
    expect(screen.getByText("Aún no hay registros")).toBeInTheDocument();
  });
});
