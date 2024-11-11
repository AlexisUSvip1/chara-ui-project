// SaveButton.tsx
import { Button } from "@chakra-ui/react";
import { SaveButtonProps } from "./Button.types";


export const SaveButton: React.FC<SaveButtonProps> = ({ title, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      Guardar componente {title}
    </Button>
  );
};
