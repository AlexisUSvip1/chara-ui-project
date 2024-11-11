// useCheckbox.ts
// Hook personalizado para gestionar el estado y la lógica de guardado de un checkbox personalizado.

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { postData } from "../../../services/apiService";
import { CheckboxData, UseCheckboxFormHook } from "./Checkbox.types";
import { checkboxValidationSchema } from "../../Utils/Validation/ValidateComponents.utils"; // Ajusta la ruta según corresponda

/**
 * useCheckbox
 * Hook que gestiona el estado de un formulario de checkbox personalizado y su lógica de validación y guardado.
 *
 * @returns {UseCheckboxFormHook} - Objeto con los estados y funciones para manejar el formulario.
 */
export const useCheckbox = (): UseCheckboxFormHook => {
  // Estado y funciones
  const toast = useToast(); // Para mostrar notificaciones en pantalla
  const [checkboxId, setCheckboxId] = useState<string>(""); // ID único del checkbox
  const [label, setLabel] = useState<string>(""); // Etiqueta para el checkbox
  const [isChecked, setIsChecked] = useState<boolean | null>(null); // Estado del checkbox (seleccionado/no seleccionado)
  const [data, setData] = useState<CheckboxData[]>([]); // Almacena los datos del checkbox guardado

  /**
   * handleSave
   * Función para validar y guardar el nuevo checkbox.
   * Si la validación es exitosa, envía los datos y muestra una notificación de éxito.
   * Si falla, muestra una notificación de error.
   */
  const handleSave = async () => {
    const newData: CheckboxData = {
      type: "checkbox",
      props: {
        id: checkboxId,
        label,
        isChecked,
      },
    };
  
    try {
      // Validación de datos del checkbox
      await checkboxValidationSchema.validate(newData.props, { abortEarly: false });
  
      // Envío de datos a la API
      await postData("checkbox", [newData]);
      setData((prevData) => [...prevData, newData]);
  
      toast({
        title: "Guardado exitoso",
        description: "El componente checkbox ha sido guardado correctamente.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
  
      // Limpiar formulario
      setCheckboxId("");
      setLabel("");
      setIsChecked(null);
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
          description: "Hubo un problema al guardar el componente checkbox.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        console.error("Error al guardar el componente Checkbox:", error);
      }
    }
  };

  // Retornar estados y funciones del formulario
  return {
    data,
    checkboxId,
    setCheckboxId,
    label,
    setLabel,
    isChecked,
    setIsChecked,
    handleSave,
  };
};
