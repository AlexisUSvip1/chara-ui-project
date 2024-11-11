// CheckboxForm.tsx
// Componente que permite crear un Checkbox personalizado con opciones de configuración e integración de validación.

import { Box, Text, Input, Container, Checkbox } from "@chakra-ui/react";
import { styles } from "./Checkbox.styles";
import { SaveButton } from "../../Utils/Button/Button";
import { useCheckbox } from "./Checkbox.hooks";

/**
 * CheckboxForm
 * Formulario para crear y configurar un checkbox personalizado.
 * Permite al usuario ingresar un ID, etiqueta (label) y especificar si está seleccionado (checked).
 *
 * @component
 * @returns {JSX.Element} - Formulario de Checkbox con inputs, opciones de checkbox y botón de guardar.
 */
export const CheckboxForm = () => {
  const {
    checkboxId,
    setCheckboxId,
    label,
    setLabel,
    isChecked,
    setIsChecked,
    handleSave,
  } = useCheckbox(); // Hook personalizado para manejar el estado del formulario y funciones de guardado.

  // Verificación de formulario válido: el ID, label y selección deben ser válidos.
  const isFormValid = checkboxId.trim() && label.trim() && isChecked !== null;

  return (
    <>
      <Container width="100%" padding={0} display="flex" flexDirection="column" gap={5}>
        <Box>
          <Text mb={1} {...styles.labelStyle}>Ingresa un ID único para tu custom Checkbox</Text>
          <Input
            placeholder="ID de tu custom checkbox"
            value={checkboxId}
            onChange={(e) => setCheckboxId(e.target.value)}
            {...styles.inputStyle}
          />
        </Box>
        <Box>
          <Text mb={1} {...styles.labelStyle}>Ingresa el nombre de tu label</Text>
          <Input
            placeholder="Label de tu custom checkbox"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            {...styles.inputStyle}
          />
        </Box>
        <Box>
          <Text mb={1} fontWeight="bold">¿Es checkado este campo?</Text>
          <Box display="flex" alignItems="center">
            <Text mr={2}>Sí</Text>
            <Checkbox isChecked={isChecked === true} onChange={() => setIsChecked(true)} />
            <Text ml={4} mr={2}>No</Text>
            <Checkbox isChecked={isChecked === false} onChange={() => setIsChecked(false)} />
          </Box>
        </Box>
      </Container>
      <Box display="flex" justifyContent="space-around" marginTop={70}>
        <SaveButton
          title="checkbox"
          onClick={handleSave}
          colorScheme="green"
          borderRadius={30}
          isDisabled={!isFormValid}
        />
      </Box>
    </>
  );
};
