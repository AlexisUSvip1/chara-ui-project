// ReusableFormModal.tsx
// Modal reutilizable para crear diferentes tipos de componentes de formularios, como Input, Checkbox y Select.

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { FormModalProps } from "./FormModal.types";
import { styles } from "./FormModal.style";
import { InputForm } from "../ComponentsUI/Input/Input";
import { CheckboxForm } from "../ComponentsUI/Checkbox/Checkbox";
import { SelectForm } from "../ComponentsUI/Select/Select";

/**
 * FormModal
 * Modal reutilizable que muestra un formulario específico (Input, Checkbox o Select) en función del título recibido.
 *
 * @component
 * @param {FormModalProps} props - Propiedades para configurar el modal.
 * @param {boolean} props.isOpen - Controla si el modal está abierto.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título del modal, que define el tipo de formulario que se mostrará.
 * @returns {JSX.Element} - Componente Modal que renderiza el formulario correspondiente.
 */
export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
}: FormModalProps): JSX.Element => {
  // Ajuste de altura basado en el tipo de componente
  const modalHeight =
    title.toLowerCase() === "select option"
      ? ["100%", "700px"]
      : ["90%", "500px"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "xs", md: "lg" }}
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(10px)" />
      <ModalContent {...styles.containerModal} height={modalHeight}>
        <ModalCloseButton />
        <ModalHeader
          {...styles.modalHeader}
          fontSize={{ base: "lg", md: "2xl" }}
        >
          Crear tu componente {title}
        </ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            {title === "Input" ? (
              <InputForm />
            ) : title.toLowerCase() === "checkbox" ? (
              <CheckboxForm />
            ) : (
              <SelectForm />
            )}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
