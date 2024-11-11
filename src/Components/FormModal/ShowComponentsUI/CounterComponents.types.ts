// CounterComponents.types.ts
// Tipos e interfaces para las propiedades y datos del componente CounterComponents.

/**
 * CounterComponentsProps
 * Propiedades para configurar el comportamiento y contenido del componente CounterComponents.
 *
 * @property {boolean} isOpen - Controla si el modal está visible.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {string} title - Título que se muestra en el modal.
 * @property {Array<ComponentData>} data - Array de datos de componentes (input, checkbox, select) a renderizar.
 */
export interface CounterComponentsProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Array<ComponentData>;
}

/**
 * InputData
 * Estructura de datos para un componente de tipo Input.
 *
 * @property {string} id - ID único del input.
 * @property {string} type - Tipo del componente, en este caso "input".
 * @property {string} label - Etiqueta del input.
 * @property {string} placeholder - Texto de ayuda que aparece en el input cuando está vacío.
 * @property {boolean} isRequired - Define si el campo input es requerido.
 */
export interface InputData {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  value?: string;
}

/**
 * CheckboxData
 * Estructura de datos para un componente de tipo Checkbox.
 *
 * @property {string} id - ID único del checkbox.
 * @property {string} type - Tipo del componente, en este caso "checkbox".
 * @property {string} label - Etiqueta del checkbox.
 * @property {boolean} isChecked - Define si el checkbox está marcado.
 */
export interface CheckboxData {
  id: string;
  type: string;
  label: string;
  isChecked: boolean;
}

/**
 * SelectOption
 * Representa una opción individual en un componente de tipo Select.
 *
 * @property {string} value - Valor de la opción.
 * @property {string} label - Texto de la opción.
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * SelectData
 * Estructura de datos para un componente de tipo Select.
 *
 * @property {string} id - ID único del select.
 * @property {string} type - Tipo del componente, en este caso "select".
 * @property {string} label - Etiqueta del select.
 * @property {string} placeholder - Texto de ayuda que aparece en el select cuando está vacío.
 * @property {SelectOption[]} options - Array de opciones que contiene el select.
 */
export interface SelectData {
  id: string;
  type: "select";
  label: string;
  placeholder: string;
  options: SelectOption[];
}

/**
 * ComponentData
 * Tipo que representa los datos de un componente, que puede ser un Input, Checkbox o Select.
 */
export type ComponentData = InputData | CheckboxData | SelectData;
