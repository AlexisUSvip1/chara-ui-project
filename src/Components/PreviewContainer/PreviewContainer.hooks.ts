import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { getData } from "../../services/apiService"; // Asegúrate de tener esta función en tu archivo de servicio

export const usePreviewContainer = () => {
  const [modalTitle, setModalTitle] = useState("");
  const [componentData, setComponentData] = useState([]); // Estado para almacenar los datos de componentes
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCounterOpen, onOpen: onOpenCounter, onClose: onCloseCounter } = useDisclosure();

  const handleOpenModal = (componentName: string) => {
    setModalTitle(componentName);
    onOpen();
  };

  const handleGetInformation = async (componentName: string) => {
    setModalTitle(componentName);
    try {
      const response = await getData(componentName); // Obtén los datos desde la API según el tipo
      const data = response.data.filter((item: { props: unknown; }) => item.props); // Solo guarda los elementos con 'props'
      setComponentData(data);
    } catch (error) {
      console.error(`Error al obtener datos para ${componentName}:`, error);
    }
    onOpenCounter();
  };
  

  return {
    modalTitle,
    componentData,
    isOpen,
    onClose,
    isCounterOpen,
    onCloseCounter,
    handleGetInformation,
    handleOpenModal
  };
};
