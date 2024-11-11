// CheckboxForm.types.ts
// Tipos de datos e interfaces utilizados en el formulario y hook de Checkbox personalizado.

/**
 * CheckboxData
 * Representa los datos de un checkbox personalizado, que incluye el tipo de componente y sus propiedades.
 *
 * @property {string} type - Tipo de componente, en este caso, siempre "checkbox".
 * @property {CheckboxProps} props - Propiedades específicas del checkbox, incluyendo id, label y estado de selección.
 */
export interface CheckboxData {
  type: string;
  props: CheckboxProps;
}

/**
 * CheckboxProps
 * Propiedades específicas de un checkbox personalizado.
 *
 * @property {string} id - ID único del checkbox.
 * @property {string} label - Etiqueta visible asociada al checkbox.
 * @property {boolean | null} isChecked - Estado del checkbox, `true` para seleccionado, `false` para no seleccionado, y `null` si no se ha establecido.
 */
export interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean | null;
}

/**
 * UseCheckboxFormHook
 * Interface que define el contrato para el hook `useCheckbox`, incluyendo el estado y funciones para manejar el formulario del checkbox.
 *
 * @property {CheckboxData[]} data - Arreglo de objetos `CheckboxData` que almacena los datos de los checkboxes creados.
 * @property {string} checkboxId - ID actual del checkbox en edición.
 * @property {function} setCheckboxId - Función para actualizar el ID del checkbox.
 * @property {string} label - Etiqueta actual del checkbox en edición.
 * @property {function} setLabel - Función para actualizar la etiqueta del checkbox.
 * @property {boolean | null} isChecked - Estado actual de selección del checkbox en edición.
 * @property {function} setIsChecked - Función para actualizar el estado de selección del checkbox.
 * @property {function} handleSave - Función asincrónica que maneja la validación y el guardado del checkbox.
 */
export interface UseCheckboxFormHook {
  data: CheckboxData[];
  checkboxId: string;
  setCheckboxId: (id: string) => void;
  label: string;
  setLabel: (label: string) => void;
  isChecked: boolean | null;
  setIsChecked: (checked: boolean | null) => void;
  handleSave: () => Promise<void>;
}
