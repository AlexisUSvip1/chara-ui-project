import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { getData } from "../../services/apiService";
import {
  UsePreviewContainerHook,
  ComponentData,
} from "./PreviewContainer.types";

/**
 * usePreviewContainer
 * Hook personalizado para manejar el estado y funciones relacionadas con la creación y visualización de componentes personalizados.
 *
 * @returns {UsePreviewContainerHook} - Estado y funciones para manejar el modal y la obtención de datos de componentes.
 */
export const usePreviewContainer = (): UsePreviewContainerHook => {
  const [modalTitle, setModalTitle] = useState<string>(""); // Título dinámico del modal
  const [componentData, setComponentData] = useState<ComponentData[]>([]); // Datos de componentes para mostrar en el modal de vista

  const { isOpen, onOpen, onClose } = useDisclosure(); // Control de modal de creación
  const {
    isOpen: isCounterOpen,
    onOpen: onOpenCounter,
    onClose: onCloseCounter,
  } = useDisclosure(); // Control de modal de visualización

  /**
   * handleOpenModal
   * Abre el modal de creación y establece el título del modal según el tipo de componente.
   *
   * @param {string} componentName - Nombre del componente que se va a crear (Input, Checkbox, Select).
   */
  const handleOpenModal = (componentName: string) => {
    // Especificamos que `componentName` es de tipo string
    setModalTitle(componentName);
    onOpen();
  };

  /**
   * handleGetInformation
   * Obtiene datos de componentes ya creados desde la API y abre el modal de conteo.
   *
   * @param {string} componentName - Nombre del tipo de componente para obtener datos (input, checkbox, select).
   */
  const handleGetInformation = async (componentName: string) => {
    // Especificamos que `componentName` es de tipo string
    setModalTitle(componentName);
    try {
      // Llama a la API para obtener datos de componentes según el tipo
      const response = await getData(componentName);
      const data = response.data.filter((item: ComponentData) => item.props); // Especificamos que `item` es de tipo `ComponentData`
      setComponentData(data); // Almacena los datos en el estado
    } catch (error) {
      console.error(`Error al obtener datos para ${componentName}:`, error);
    }
    onOpenCounter(); // Abre el modal de conteo
  };

  return {
    modalTitle,
    componentData,
    isOpen,
    onClose,
    isCounterOpen,
    onCloseCounter,
    handleGetInformation,
    handleOpenModal,
  };
};
