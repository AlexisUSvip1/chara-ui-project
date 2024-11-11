// InputForm.js
// Formulario para configurar y guardar un componente de input personalizado.

import { Box, Text, Input, Container, Checkbox } from "@chakra-ui/react";
import { styles } from "./Input.styles";
import { SaveButton } from "../../Utils/Button/Button";
import { useInput } from "./useInput.hooks";

/**
 * InputForm
 * Componente que renderiza un formulario para configurar un input personalizado.
 *
 * @component
 * @returns {JSX.Element} - Formulario de configuración de un input, incluyendo opciones para ID, label, placeholder y si es requerido.
 */
export const InputForm = (): JSX.Element => {
  const {
    inputId,
    label,
    placeholder,
    isRequired,
    setInputId,
    setLabel,
    setPlaceholder,
    setIsRequired,
    handleSave,
  } = useInput();

  // Validación del formulario: todos los campos deben estar completos
  const isFormValid =
    inputId.trim() && label.trim() && placeholder.trim() && isRequired !== null;

  return (
    <>
      <Container
        width={"100%"}
        display={"flex"}
        flexDirection={"column"}
        gap={5}
      >
        <Box>
          <Text mb={1} {...styles.labelStyle}>
            Ingresa un ID único para tu custom input
          </Text>
          <Input
            placeholder="ID de tu custom input"
            {...styles.inputStyle}
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            maxLength={30}
            maxWidth={"100%"}
          />
        </Box>
        <Box>
          <Text mb={1} {...styles.labelStyle}>
            Ingresa el nombre de tu label
          </Text>
          <Input
            placeholder="Label de tu custom input"
            {...styles.inputStyle}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            maxLength={30}
          />
        </Box>
        <Box>
          <Text mb={1} {...styles.labelStyle}>
            Ingresa el nombre de tu placeholder
          </Text>
          <Input
            placeholder="Placeholder de tu custom input"
            {...styles.inputStyle}
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            maxLength={30}
          />
        </Box>
        <Box>
          <Text mb={1} fontWeight={"bold"}>
            ¿Es requerido este campo?
          </Text>
          <Box display="flex" alignItems="center">
            <Text mr={2}>Sí</Text>
            <Checkbox
              isChecked={isRequired === true}
              onChange={() => setIsRequired(true)}
            />
            <Text ml={4} mr={2}>
              No
            </Text>
            <Checkbox
              isChecked={isRequired === false}
              onChange={() => setIsRequired(false)}
            />
          </Box>
        </Box>
      </Container>
      <Box display={"flex"} justifyContent={"space-around"}>
        <SaveButton
          title="input"
          onClick={handleSave}
          colorScheme="green"
          borderRadius={30}
          variant={"solid"}
          disabled={!isFormValid}
        />
      </Box>
    </>
  );
};
