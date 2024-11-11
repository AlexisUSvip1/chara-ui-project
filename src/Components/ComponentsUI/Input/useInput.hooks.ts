// useInput.ts
// Hook personalizado para gestionar el estado, la validación y el guardado de un formulario de input.

import { useState } from "react";
import { InputData, UseInputFormHook } from "./Input.type";
import { postData } from "../../../services/apiService"; // Importar función desde apiService.js
import { useToast } from "@chakra-ui/react";
import { inputValidationSchema } from "../../Utils/Validation/ValidateComponents.utils";

/**
 * useInput
 * Hook que gestiona el estado de un formulario de input personalizado, así como su validación y guardado.
 *
 * @returns {UseInputFormHook} - Objeto que contiene el estado y funciones para manejar el formulario del input.
 */
export const useInput = (): UseInputFormHook => {
  const toast = useToast();
  const [inputId, setInputId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [isRequired, setIsRequired] = useState<boolean>(false);

  /**
   * handleSave
   * Función asincrónica para validar y guardar el input personalizado.
   * Valida los datos del input y muestra notificaciones según el resultado.
   */
  const handleSave = async (): Promise<void> => {
    const data: InputData = {
      type: 'input',
      props: {
        id: inputId,
        label,
        placeholder,
        isRequired,
      }
    };
    try {
      await inputValidationSchema.validate(data.props, { abortEarly: false });
      await postData("input", [data]);
      toast({
        title: "Guardado exitoso",
        description: "El componente input ha sido guardado correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        toast({
          title: "Error de validación",
          description: "Por favor completa todos los campos requeridos.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.error("Errores de validación:", error.errors);
      } else {
        toast({
          title: "Error al guardar",
          description: "Hubo un problema al guardar el componente input.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.error("Error al guardar el componente input:", error);
      }
    }
  };

  return {
    inputId,
    label,
    placeholder,
    isRequired,
    setInputId,
    setLabel,
    setPlaceholder,
    setIsRequired,
    handleSave,
  };
};
