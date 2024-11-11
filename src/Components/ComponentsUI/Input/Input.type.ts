// InputForm.types.ts
// Tipos e interfaces utilizados para el formulario de input personalizado.

/**
 * InputData
 * Representa la estructura de datos de un input personalizado.
 *
 * @property {string} type - Tipo de componente, en este caso "input".
 * @property {InputProps} props - Propiedades específicas del input, como id, label, placeholder y si es requerido.
 */
export interface InputData {
  type: string;
  props: InputProps;
}

/**
 * InputProps
 * Propiedades específicas de un input personalizado.
 *
 * @property {string} id - ID único del input.
 * @property {string} label - Etiqueta asociada al input.
 * @property {string} placeholder - Texto de ayuda que aparece en el input cuando está vacío.
 * @property {boolean} isRequired - Define si el campo input es requerido.
 */
export interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
}

/**
 * UseInputFormHook
 * Interface para el hook `useInput`, que contiene el estado y funciones para manejar el formulario de input.
 *
 * @property {string} inputId - ID actual del input en edición.
 * @property {string} label - Etiqueta del input en edición.
 * @property {string} placeholder - Placeholder del input en edición.
 * @property {boolean} isRequired - Estado de si el input es requerido.
 * @property {function} setInputId - Función para actualizar el ID del input.
 * @property {function} setLabel - Función para actualizar la etiqueta del input.
 * @property {function} setPlaceholder - Función para actualizar el placeholder del input.
 * @property {function} setIsRequired - Función para definir si el input es requerido.
 * @property {function} handleSave - Función para guardar el input con validación y notificación.
 */
export interface UseInputFormHook {
  inputId: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  setInputId: (id: string) => void;
  setLabel: (label: string) => void;
  setPlaceholder: (placeholder: string) => void;
  setIsRequired: (isRequired: boolean) => void;
  handleSave: () => Promise<void>; 
}
