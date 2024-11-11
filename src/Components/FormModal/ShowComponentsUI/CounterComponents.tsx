// CounterComponents.tsx
// Modal que muestra una lista de componentes (Input, Checkbox y Select) en un diseño de tarjeta para cada tipo de componente.

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Text, Input, Checkbox, Select, Box, Container } from "@chakra-ui/react";
import { BaseEmpty } from "../../Utils/BaseEmpty/BaseEmpty";
import { CounterComponentsProps } from "./CounterComponents.types";

/**
 * CounterComponents
 * Componente modal que renderiza una lista de componentes en función de los datos pasados, permitiendo visualizar componentes Input, Checkbox y Select.
 *
 * @component
 * @param {CounterComponentsProps} props - Propiedades para configurar el modal y los componentes a mostrar.
 * @param {boolean} props.isOpen - Controla si el modal está abierto.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título del modal.
 * @param {Array} props.data - Array de objetos que representan componentes para mostrar (input, checkbox, select).
 * @returns {JSX.Element} - Componente Modal que renderiza la lista de componentes en base a los datos recibidos.
 */
export const CounterComponents = ({ isOpen, onClose, title, data }: CounterComponentsProps) => {
  // Renderiza un componente Input en modo lectura
  const renderInput = (props: { label: string; placeholder?: string; id: string; isRequired?: boolean }) => (
    <Box flex="1 1 45%" border="1px solid #e2e8f0" borderRadius="md" p={4}>
      <Text fontWeight="bold">{props.label}</Text>
      <Input placeholder={props.placeholder} defaultValue={props.id} isRequired={props.isRequired} readOnly />
      {props.isRequired && <Text color="red.500" fontSize="sm">Campo requerido</Text>}
    </Box>
  );

  // Renderiza un componente Checkbox en modo lectura
  const renderCheckbox = (props: { isChecked?: boolean; label: string }) => (
    <Box flex="1 1 45%" border="1px solid #e2e8f0" borderRadius="md" p={4}>
      <Checkbox isChecked={props.isChecked} readOnly />
      <Text fontWeight="bold">{props.label}</Text>
    </Box>
  );

  // Renderiza un componente Select en modo lectura
  const renderSelectOption = (props: { label: string; placeholder?: string; options?: { value: string; label: string }[] }) => (
    <Box flex="1 1 45%" border="1px solid #e2e8f0" borderRadius="md" p={4}>
      <Text fontWeight="bold">{props.label}</Text>
      <Select placeholder={props.placeholder || "Seleccione una opción"} isReadOnly>
        {props.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Box>
  );

  // Selecciona y renderiza el componente según su tipo
  const renderComponent = (item: { type: string; props: any }) => {
    switch (item.type) {
      case "input":
        return renderInput(item.props);
      case "checkbox":
        return renderCheckbox(item.props);
      case "select":
        return renderSelectOption(item.props);
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" />
      <ModalContent overflowY="auto" maxHeight="600px" width={{ base: "100%", md: "90%" }}>
        <ModalCloseButton />
        <ModalHeader>Ver Componentes de {title}</ModalHeader>
        <ModalBody display="flex" justifyContent="center" alignItems="center">
          {data.length === 0 ? (
            <Container centerContent>
              <BaseEmpty message="Aún no hay registros" />
            </Container>
          ) : (
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              wrap="wrap"
              justify="center"
              align="center"
            >
              {data.map((item, index) => (
                <Box key={index} width={{ base: "100%", md: "45%" }} mb={4}>
                  {renderComponent(item)}
                </Box>
              ))}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
