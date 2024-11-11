import { ButtonProps } from "@chakra-ui/react";

export interface SaveButtonProps extends ButtonProps {
  title: string;
  onClick: () => void;
}
