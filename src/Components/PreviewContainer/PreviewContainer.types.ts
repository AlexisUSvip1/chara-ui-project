// PreviewContainer.types.ts
// Tipos e interfaces utilizados en el hook usePreviewContainer.

/**
 * ComponentData
 * Estructura de los datos de cada componente personalizado.
 *
 * @property {string} type - Tipo de componente (Input, Checkbox, Select).
 * @property {object} props - Propiedades específicas del componente.
 */
export interface ComponentData {
  type: string;
  props: {
    id?: string;
    label?: string;
    placeholder?: string;
    isChecked?: boolean;
    options?: Array<{ id: number; label: string }>;
  };
}

/**
 * UsePreviewContainerHook
 * Interface para el hook `usePreviewContainer`, que contiene el estado y funciones para manejar el modal de creación
 * y visualización de componentes.
 *
 * @property {string} modalTitle - Título dinámico del modal, depende del tipo de componente.
 * @property {ComponentData[]} componentData - Lista de datos de componentes personalizados obtenidos de la API.
 * @property {boolean} isOpen - Estado que indica si el modal de creación está abierto.
 * @property {boolean} isCounterOpen - Estado que indica si el modal de visualización de componentes está abierto.
 * @property {function} onClose - Función para cerrar el modal de creación.
 * @property {function} onCloseCounter - Función para cerrar el modal de visualización de componentes.
 * @property {function} handleGetInformation - Función para obtener datos de componentes y abrir el modal de visualización.
 * @property {function} handleOpenModal - Función para abrir el modal de creación y establecer el título.
 */
export interface UsePreviewContainerHook {
  modalTitle: string;
  componentData: ComponentData[];
  isOpen: boolean;
  isCounterOpen: boolean;
  onClose: () => void;
  onCloseCounter: () => void;
  handleGetInformation: (componentName: string) => Promise<void>;
  handleOpenModal: (componentName: string) => void;
}
