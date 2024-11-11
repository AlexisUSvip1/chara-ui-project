// useSelect.hooks.ts
// Hook personalizado para gestionar el estado y las funciones de un select con opciones personalizadas.

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { postData } from "../../../services/apiService";
import { Option, SelectData, UseSelectHook } from "./Select.types";
import { selectValidationSchema } from "../../Utils/Validation/ValidateComponents.utils";

/**
 * useSelect
 * Hook que gestiona el estado y las funciones para un formulario de select personalizado,
 * permitiendo agregar, editar y eliminar opciones.
 *
 * @returns {UseSelectHook} - Objeto con el estado y funciones del select personalizado.
 */
export const useSelect = (): UseSelectHook => {
  const toast = useToast();
  const [selectId, setSelectId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);
  const [placeholder, setPlaceholder] = useState<string>("");
  const [selectDataArray, setSelectDataArray] = useState<SelectData[]>([]);

  const addOption = () => {
    const newOption: Option = { id: options.length + 1, label: "" };
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const updateOptionLabel = (id: number, newLabel: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => (option.id === id ? { ...option, label: newLabel } : option))
    );
  };

  const removeOption = (id: number) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.id !== id));
  };

  /**
   * handleSave
   * Función para validar y guardar el select personalizado.
   */
  const handleSave = async () => {
    const newSelectData: SelectData = {
      type: "select",
      props: {
        selectId,
        label,
        options,
        placeholder,
      },
    };

    try {
      await selectValidationSchema.validate(newSelectData.props, { abortEarly: false });

      setSelectDataArray((prevData) => [...prevData, newSelectData]);
      await postData("select", [newSelectData]);

      toast({
        title: "Guardado exitoso",
        description: "El componente select ha sido guardado correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

      setSelectId("");
      setLabel("");
      setPlaceholder("");
      setOptions([]);
    } catch (error) {
      if (error.name === "ValidationError") {
        toast({
          title: "Error de validación",
          description: "Por favor completa todos los campos requeridos correctamente.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.error("Errores de validación:", error.errors);
      } else {
        toast({
          title: "Error al guardar",
          description: "Hubo un problema al guardar el componente select.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.error("Error al guardar el componente Select:", error);
      }
    }
  };

  return {
    options,
    selectDataArray,
    selectId,
    label,
    setSelectId,
    setPlaceholder,
    placeholder,
    setLabel,
    addOption,
    updateOptionLabel,
    removeOption,
    handleSave,
  };
};
