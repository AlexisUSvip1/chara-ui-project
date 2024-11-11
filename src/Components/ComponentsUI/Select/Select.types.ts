// Select.types.ts
// Tipos e interfaces utilizados en el formulario y hook de Select.

/**
 * Option
 * Representa una opción individual en el select.
 *
 * @property {number} id - ID único de la opción.
 * @property {string} label - Texto de la opción.
 */
export interface Option {
  id: number;
  label: string;
}

/**
 * SelectData
 * Estructura de datos del select personalizado, que incluye su tipo y propiedades.
 *
 * @property {string} type - Tipo de componente, en este caso "select".
 * @property {SelectProps} props - Propiedades específicas del select.
 */
export interface SelectData {
  type: string;
  props: SelectProps;
}

/**
 * SelectProps
 * Propiedades de un select personalizado.
 *
 * @property {string} selectId - ID único del select.
 * @property {string} label - Etiqueta del select.
 * @property {Option[]} options - Array de opciones que el select contiene.
 * @property {string} placeholder - Texto de ayuda que aparece en el select cuando está vacío.
 */
export interface SelectProps {
  selectId: string;
  label: string;
  options: Option[];
  placeholder: string;
}

/**
 * UseSelectHook
 * Interface para el hook `useSelect`, que incluye el estado y las funciones para manejar el select personalizado.
 *
 * @property {SelectData[]} selectDataArray - Arreglo de datos guardados de selects personalizados.
 * @property {string} selectId - ID actual del select en edición.
 * @property {string} label - Etiqueta del select en edición.
 * @property {string} placeholder - Placeholder del select en edición.
 * @property {Option[]} options - Opciones disponibles para el select.
 * @property {function} setSelectId - Función para actualizar el ID del select.
 * @property {function} setLabel - Función para actualizar la etiqueta del select.
 * @property {function} setPlaceholder - Función para actualizar el placeholder del select.
 * @property {function} addOption - Función para agregar una nueva opción al select.
 * @property {function} updateOptionLabel - Función para actualizar el texto de una opción.
 * @property {function} removeOption - Función para eliminar una opción del select.
 * @property {function} handleSave - Función para guardar el select.
 */
export interface UseSelectHook {
  selectDataArray: SelectData[];
  selectId: string;
  label: string;
  placeholder: string;
  options: Option[];
  setSelectId: (id: string) => void;
  setLabel: (label: string) => void;
  setPlaceholder: (placeholder: string) => void;
  addOption: () => void;
  updateOptionLabel: (id: number, newLabel: string) => void;
  removeOption: (id: number) => void;
  handleSave: () => Promise<void>;
}
