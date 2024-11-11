// SelectForm.tsx
// Formulario para configurar y guardar un componente select personalizado con opciones múltiples.

import { Box, Text, Container, Input, IconButton } from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { SaveButton } from "../../Utils/Button/Button";
import { useSelect } from "./Select.hook";
import { styles } from "./Select.styles";

/**
 * SelectForm
 * Componente que renderiza un formulario para configurar un select personalizado.
 * Permite agregar, editar y eliminar opciones.
 *
 * @component
 * @returns {JSX.Element} - Formulario de configuración de un select, incluyendo ID, label, placeholder y opciones.
 */
export const SelectForm = (): JSX.Element => {
  const {
    options,
    selectId,
    label,
    setSelectId,
    setLabel,
    setPlaceholder,
    placeholder,
    addOption,
    updateOptionLabel,
    removeOption,
    handleSave,
  } = useSelect();

  // Validación del formulario: todos los campos deben estar completos
  const areOptionsValid = options.every((option) => option.label.trim() !== "");
  const isFormValid =
    label.trim() &&
    selectId.trim() &&
    placeholder.trim() &&
    options.length !== 0 &&
    areOptionsValid;

  return (
    <>
      <Container {...styles.container}>
        <Box>
          <Text {...styles.labelStyle}>
            Ingresa un ID único para tu custom Select
          </Text>
          <Input
            placeholder="ID de tu custom Select"
            maxLength={30}
            value={selectId}
            onChange={(e) => setSelectId(e.target.value)}
            {...styles.inputStyle}
          />
        </Box>
        <Box>
          <Text {...styles.labelStyle}>
            Ingresa el nombre de tu select option
          </Text>
          <Input
            placeholder="Label de tu custom Select"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            {...styles.inputStyle}
            maxLength={30}
          />
        </Box>
        <Box>
          <Text {...styles.labelStyle}>
            Ingresa el placeholder de tu select option
          </Text>
          <Input
            placeholder="placeholder de tu custom Select"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            {...styles.inputStyle}
            maxLength={30}
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mt={4}
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={5} mt={4}>
            <Text {...styles.labelStyle}>Cantidad de options</Text>
            <Input
              type="number"
              width="80px"
              textAlign="center"
              value={options.length}
              isReadOnly
              maxLength={30}
              aria-label="Cantidad de options"
              {...styles.inputStyle}
            />
          </Box>
          <IconButton
            icon={<AddIcon />}
            aria-label="Agregar opción"
            onClick={addOption}
            {...styles.iconButtonStyle}
          />
        </Box>

        <Box mt={4} {...styles.optionsContent}>
          {options.map((option) => (
            <Box
              key={option.id}
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
            >
              <Input
                placeholder={`Opción ${option.id}`}
                value={option.label}
                onChange={(e) => updateOptionLabel(option.id, e.target.value)}
                {...styles.inputStyle}
                maxLength={30}
              />
              <IconButton
                icon={<CloseIcon />}
                onClick={() => removeOption(option.id)}
                aria-label="Eliminar opción"
                maxLength={30}
                {...styles.iconButtonStyle}
              />
            </Box>
          ))}
        </Box>
      </Container>

      <Box {...styles.containerComponent}>
        <SaveButton
          title="select"
          onClick={handleSave}
          colorScheme="green"
          borderRadius={30}
          isDisabled={!isFormValid}
        />
      </Box>
    </>
  );
};
