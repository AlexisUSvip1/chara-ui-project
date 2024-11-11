// FormModal.types.ts
// Tipos e interfaces para las propiedades del componente FormModal.

/**
 * FormModalProps
 * Propiedades que configuran el comportamiento y contenido del modal FormModal.
 *
 * @property {boolean} isOpen - Controla si el modal está visible.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {string} title - Título que define el tipo de formulario a mostrar dentro del modal (e.g., "Input", "Checkbox", "Select").
 */
export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}
